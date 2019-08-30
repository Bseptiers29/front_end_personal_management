<template>
  <div class="mt-3">
    <div class="row mt-3">
      <p class="h1 text-right col-10 text-info mb-5">Ajouter des congés au personnel {{prenom}} {{nom}}</p>
    </div>
    <div id="imgDiv">
      <img
        class="rounded float-right col-2 mr-5 img-thumbnail img-fluid. max-width: 100%;"
        alt="image du personnel"
        v-bind:src="this.Url + this.image"
        id="imgpersos"
      />
    </div>
    <table class="table col-8 text-center ml-5">
      <thead class="thead-light">
        <tr>
          <th scope="col">Prénom :</th>
          <th scope="col">Nom :</th>
          <th scope="col">Proféssion :</th>
          <th scope="col">Service :</th>
          <th scope="col">Congés Disponibles :</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{prenom}}</td>
          <td>{{nom}}</td>
          <td>{{profession}}</td>
          <td>{{service}}</td>
          <td>{{conges}}</td>
        </tr>
      </tbody>
    </table>
    <form @submit.prevent>
      <div class="row mt-5">
        <div class="col offset-2">
          <label>En Congés du :</label>
          <input type="date" class="form-control col-4" v-model="debutconges" />
        </div>
        <div class="col">
          <label>Au :</label>
          <input type="date" class="form-control col-4" v-model="finconges" />
        </div>
      </div>
      <div class="row offset-2" id="buttongroup">
        <button type="submit" class="btn btn-info col-2" @click="checkForm()">Ajouter</button>
        <button
          type="submit"
          class="btn btn-warning col-2 ml-5"
          @click="postStatus()"
        >Annuler</button>
      </div>
    </form>
    <div class="col-1 float-right" id="grpancien">
      <p class="float-right text-right font-weight-bold" id="grpancien">Ancienneté</p>
      <br />
      <span class="float-right text-right font-weight-light" id="grpancien">{{moment(anciennete).format('DD-MM-YYYY')}}</span>
    </div>
    <p v-if="errors.length" class="mt-5 ml-2">
      <b style="color :red">Veuillez corriger les erreurs suivantes :</b>
      <ul>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </p>
    <p class="h4 text-left col-10 text-info mt-5">Liste des congés du personnel</p>
     <ul class="list-group list-group-flush col-3 ml-5" v-if="finconges">
      <li class="list-group-item">
        Du : {{moment(debutconges).format('DD-MM-YYYY')}} - Au : {{moment(finconges).format('DD-MM-YYYY')}}
        <a @click="debutconges = '', finconges = ''">
          <font-awesome-icon class="ml-5" icon="times" style="font-size: 1.2em; color:red;" />
        </a>
      </li>
    </ul>
    <ul class="list-group list-group-flush col-3 ml-5" v-for="(conge) of result" :key="conge.Idc">
      <li class="list-group-item">
        Du : {{moment(conge.DebutConges).format('DD-MM-YYYY')}} - Au : {{moment(conge.FinConges).format('DD-MM-YYYY')}}
        <a @click="deleteConges(conge.Idc)">
          <font-awesome-icon class="ml-5" icon="times" style="font-size: 1.2em; color:#c20103;" />
        </a>
      </li>
    </ul>
  </div>
</template>

<style class="scoped">
.offset-3 {
  margin-left: 33em;
}
#grpancien {
  margin-top: -0.9vh;
  margin-right: 7vh;
}
#imgpersos {
  height: auto;
}
</style>

<script>
import * as moment from "moment";
import "moment/locale/pt-br";

moment.locale("eu");

export default {
  name: "LisVacation",
  data: function() {
    return {
      errors: [],
      prenom: null,
      nom: null,
      sécusociale: null,
      anciennete: null,
      date_naissance: null,
      email: null,
      adresse: null,
      telephone: null,
      profession: null,
      service: null,
      image: null,
      status: null,
      conges: null,
      debutconges: null,
      finconges: null,
      Url:
        "https://app-c7edeb26-e069-443f-8987-b321e80adc7b.cleverapps.io/images/",
      headers: {
        "Content-Type": "application/json"
      },
      result: null,
      dateActuelle: moment().format("L")
    };
  },
  created() {
    this.getPersonnelLeave();
    this.getPersonnel();
  },
  updated() {
    this.setStatus();
  },
  watch: {
    $route: function() {
      this.getPersonnelLeave();
      this.getPersonnel();
      this.setStatus();
    }
  },
  props: {
    id: String
  },
  methods: {
    checkForm: function() {
      this.errors = [];
      if (!this.debutconges) {
        this.errors.push("Date de début de congés requise");
      }
      if (!this.finconges) {
        this.errors.push("Date de fin de congés requise");
      }
      if(!this.errors.length){
        this.verifDates();
      }
    },
    verifDates: function(){
      var d1 = this.debutconges;
      var d2 = this.finconges;
      if (d1 > d2 || d1 === d2) {
        alert(
          "Les dates entrées ne sont pas valide, veuillez modifier vos champs"
        );
      } else {
      this.setCongesDispo();
      }
    },
    setCongesDispo: function() {
      var now = moment(this.debutconges); //todays date
      var end = moment(this.finconges); // another date
      var duration = moment.duration(end.diff(now));
      let days = duration._data.days + 1;
      if(days > this.conges){
        return alert("Le personnel ne dispose pas de jours de congés suffisants.")
      } else {
      let result = this.conges - days;
      this.conges = result;
      this.postConges();
      }
    },
    setStatus: function() {
      if (
        !this.result.length
      ){
        if(
          this.dateActuelle < this.finconges &&
          this.dateActuelle > this.debutconges ||
          this.dateActuelle === this.finconges ||
          this.dateActuelle === this.debutconges
        ){
          this.status = "En Congés";
        } else {
            this.status = "Disponible";
        }
      } else if (
          this.dateActuelle < this.result[0].FinConges  &&
          this.dateActuelle > this.result[0].DebutConges ||
          this.dateActuelle < this.finconges &&
          this.dateActuelle > this.debutconges ||
          this.dateActuelle === this.result[0].FinConges ||
          this.dateActuelle === this.result[0].DebutConges  ||
          this.dateActuelle === this.finconges ||
          this.dateActuelle === this.debutconges
        )  {
            this.status = "En Congés";
          } else {
            this.status = "Disponible";
          }
    },
    getPersonnelLeave: async function() {
      try {
        let response = await fetch(
          `https://app-c7edeb26-e069-443f-8987-b321e80adc7b.cleverapps.io/v1/personnels_conges/${this.id}`
        );
        let result = await response.json();
        this.result = result
      } catch (err) {
        return alert("Erreur lors de la connexion a la base de données.");
      }
    },
    getPersonnel: async function() {
      try {
        let response = await fetch(
          `https://app-c7edeb26-e069-443f-8987-b321e80adc7b.cleverapps.io/v1/personnels/${this.id}`
        );
        let result = await response.json();
        (this.prenom = result.Prenom),
          (this.nom = result.Nom),
          (this.sécusociale = result.SecuriteSociale),
          (this.anciennete = result.Anciennete),
          (this.date_naissance = result.Date_naissance),
          (this.email = result.Email),
          (this.adresse = result.Adresse),
          (this.telephone = result.Telephone),
          (this.profession = result.Profession),
          (this.service = result.Service),
          (this.conges = result.CongesDispo),
          (this.image = result.Image),
          (this.status = result.Status);
      } catch (err) {}
    },
    deleteConges: async function(id) {
        if (
        confirm(
          "Voulez vous vraiment supprimer ces dates de congés?"
        )
      ){
      let response = await fetch(
        `https://app-c7edeb26-e069-443f-8987-b321e80adc7b.cleverapps.io/v1/conges/${id}`,
        {
          method: "DELETE"
        }
      );
        if (await response) {
          this.getPersonnelLeave(this.id);
        } else {
          alert("La suppression a échoué");
        }
      }
    },
    postConges: async function() {
        this.setStatus();
        let response = await fetch(
          `https://app-c7edeb26-e069-443f-8987-b321e80adc7b.cleverapps.io/v1/conges`,
          {
            body: JSON.stringify({
              DebutConges: this.debutconges,
              FinConges: this.finconges,
              ID_Personnel: this.id
            }),
            method: "POST",
            headers: this.headers
          }
        );
        this.postStatus();
        this.$router.push({ name: "TabPersonnal" });
    },
    postStatus: async function() {
      let res = await fetch(
          `https://app-c7edeb26-e069-443f-8987-b321e80adc7b.cleverapps.io/v1/personnels/${this.id}`,
          {
            body: JSON.stringify({
              Prenom: this.prenom,
              Nom: this.nom,
              SecuriteSociale: this.sécusociale,
              Anciennete: this.anciennete,
              Date_naissance: this.date_naissance,
              Email: this.email,
              Adresse: this.adresse,
              Telephone: this.telephone,
              Profession: this.profession,
              Service: this.service,
              CongesDispo: this.conges,
              Image: this.image,
              Status: this.status
            }),
            method: "PUT",
            headers: this.headers
          }
        );
        this.$router.push({ name: "TabPersonnal" });
    }
  }
};
</script>
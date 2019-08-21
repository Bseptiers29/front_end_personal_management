<template>
  <div class="mt-3">
    <div>
      {{dateActuelle}}
      <img
        src="../assets/img/imgDefault.png"
        class="rounded float-right col-2 mr-5 img-thumbnail"
        alt
      />
    </div>
    <table class="table col-8 text-center ml-5">
      <thead class="thead-light">
        <tr>
          <th scope="col">Prénom :</th>
          <th scope="col">Nom :</th>
          <th scope="col">Proféssion :</th>
          <th scope="col">Service :</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{prenom}}</td>
          <td>{{nom}}</td>
          <td>{{profession}}</td>
          <td>{{service}}</td>
        </tr>
      </tbody>
    </table>
    <form @submit.prevent>
      <div class="row mt-5">
        <div class="col-2 offset-1">
          <label>Ajoutez des Congés :</label>
          <input type="number" class="form-control" v-model="conges" />
        </div>
      </div>
      <div class="row mt-5">
        <div class="col offset-2">
          <label>En Congés du :</label>
          <input type="date" class="form-control col-4" v-model="debutconges" />
        </div>
        <div class="col">
          <label>Au :</label>
          <input type="date" class="form-control col-4" v-model="finconges" @click="compareDates()" />
        </div>
      </div>
      <div class="row offset-4">
        <div class="mt-4 ml-5 col">
          <input class="btn-info btn mx-auto col-2" type="submit" @click="postConges()" />
        </div>
      </div>
    </form>
    <div class="col-1 float-right" id="grpancien">
      <p class="float-right text-right font-weight-bold" id="grpancien">Ancienneté</p>
      <br />
      <span class="float-right text-right font-weight-light" id="grpancien">{{anciennete}}</span>
    </div>
    <p class="h4 text-left col-10 text-info mt-5">Liste des congés du personnel</p>
    <ul class="list-group list-group-flush col-3 ml-5" v-for="(conge) of result" :key="conge.Idc">
      <li class="list-group-item">
        Du : {{conge.DebutConges}} - Au : {{conge.FinConges}}
        <a @click="deleteConges(conge.Idc)">
          <font-awesome-icon class="ml-5" icon="times" style="font-size: 1.2em; color:red;" />
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
  margin-top: -10vh;
  margin-right: 7vh;
}
</style>

<script>
import * as moment from "moment";
import "moment/locale/pt-br";

moment.locale("fr");

export default {
  name: "LisVacation",
  data: function() {
    return {
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
      conges: null,
      debutconges: null,
      finconges: null,
      idc: null,
      resultcalc: null,
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
  watch: {
    $route: function() {
      this.getPersonnelLeave();
      this.getPersonnel();
    }
  },
  props: {
    id: String
  },
  methods: {
    compateDates: function() {
      if (this.finconges < this.dateActuelle) {
        console.log("La personne est en vacances");
      } else {
        console.log("La personne est active");
      }
    },
    getPersonnelLeave: async function(id) {
      try {
        let response = await fetch(
          `http://app-c7edeb26-e069-443f-8987-b321e80adc7b.cleverapps.io/v1/personnels_conges/${this.id}`
        );
        let result = await response.json();
        this.result = result;
      } catch (err) {
        console.log(err.message);
      }
    },
    getPersonnel: async function(id) {
      try {
        let response = await fetch(
          `http://app-c7edeb26-e069-443f-8987-b321e80adc7b.cleverapps.io/v1/personnels/${this.id}`
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
          (this.conges = result.CongesDispo);
        this.image = result.Image;
      } catch (err) {
        console.log(err.message);
      }
    },
    deleteConges: async function(id) {
      let response = await fetch(
        `http://app-c7edeb26-e069-443f-8987-b321e80adc7b.cleverapps.io/v1/conges/${id}`,
        {
          method: "DELETE"
        }
      );
      if (await response) {
        this.getPersonnelLeave(this.id);
      } else {
        alert("La suppression a échoué");
      }
    },
    postConges: async function() {
      let response = await fetch(
        `http://app-c7edeb26-e069-443f-8987-b321e80adc7b.cleverapps.io/v1/conges`,
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
      let res = await fetch(
        `http://app-c7edeb26-e069-443f-8987-b321e80adc7b.cleverapps.io/v1/personnels/${this.id}`,
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
            Image: this.image
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
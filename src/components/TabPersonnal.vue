<template>
  <div>
    <div class="row mt-3">
      <p class="h1 text-right col-10 text-info">Outil de Gestion de Personnels</p>
    </div>
    <div class="col float-left mt-2">
      <div class="row">
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input ml-2 mt-5"
            id="customCheck1"
            @change="checkConges($event)"
            @blur="checkOut()"
            v-model="enConges"
          />
          <label class="custom-control-label mt-4 ml-2" for="customCheck1">En Congés</label>
        </div>
      </div>
      <div class="row">
        <div class="custom-control custom-checkbox">
          <input
            type="checkbox"
            class="custom-control-input mb-2 ml-2"
            id="customCheck2"
            @change="checkDispo($event)"
            @blur="checkOut()"
            v-model="dispo"
          />
          <label class="custom-control-label ml-2" for="customCheck2">Disponibles</label>
        </div>
      </div>
    </div>
    <div class="col float-left ml-2 mt-4">
      <div class="row float-left mt-4">
        <a @click="$router.push({name: 'AddPersonnal' })">
          <font-awesome-icon icon="plus-circle" style="font-size: 2.3em; color:#d5461e;" />
        </a>
        <span class="mt-2 ml-1">Ajout d'un membre du personnel</span>
      </div>
    </div>
    <table class="table table-bordered table-hover mt-4 text-center col-8 offset-2">
      <thead>
        <tr class="bg-info">
          <th scope="col">Prénom :</th>
          <th scope="col">Nom :</th>
          <th scope="col">Profession :</th>
          <th scope="col">Service :</th>
          <th scope="col">Congés :</th>
          <th scope="col">Editer :</th>
          <th scope="col">Supprimer :</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(personnel) of resultPersonnel"
          :key="personnel.Id"
          @click="$router.push({name: 'ListVacation' ,params: {id: `${personnel.Id}`}})"
          id="userDetails"
        >
          <td>{{personnel.Prenom}}</td>
          <td>{{personnel.Nom}}</td>
          <td>{{personnel.Profession}}</td>
          <td>{{personnel.Service}}</td>
          <td class="persosStatus">{{personnel.Status}}</td>
          <td
            @click.stop="$router.push({name: 'UpdatePersonnal' ,params : {id: `${personnel.Id}` }})"
            id="userEdit"
          >
            <font-awesome-icon icon="user-edit" style="font-size: 1.2em; color:#22aa4a;" />
          </td>
          <td @click.stop="deletePersonnel(personnel.Id)" id="userDelete">
            <font-awesome-icon icon="times" style="font-size: 1.2em; color:#c20103;" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style class="scoped">
th {
  color: white;
}
#userDetails {
  cursor: pointer;
}
</style>
<script>
import * as moment from "moment";
import "moment/locale/pt-br";

moment.locale("eu");

export default {
  name: "TabPersonnal",
  data: function() {
    return {
      resultPersonnel: [],
      resultConges: [],
      enConges: false,
      dispo: false,
      dateActuelle: moment().format("L")
    };
  },
  updated() {
    this.setColorBack();
  },
  created() {
    this.getPersonnelLeave();
    this.getPersonnels();
  },
  watch: {
    $route: function() {
      this.getPersonnelLeave();
      this.getPersonnels();
    }
  },
  methods: {
    checkOut: function() {
      this.dispo = false;
      this.enConges = false;
      this.getPersonnels();
    },
    checkConges: function(event) {
      if (event.target.checked) {
        this.filterConges();
      } else {
        this.getPersonnels();
      }
    },
    checkDispo: function(event) {
      if (event.target.checked) {
        this.filterDispo();
      } else {
        this.getPersonnels();
      }
    },
    setColorBack: function() {
      let element = document.getElementsByClassName("persosStatus");
      for (let i = 0; i < element.length; i++) {
        if (element[i].textContent === "Disponible") {
          element[i].style.backgroundColor = "#22aa4a";
        } else if (element[i].textContent === "En Congés") {
          element[i].style.backgroundColor = "#c20103";
        }
      }
    },
    filterConges: function() {
      this.dispo = false;
      for (let i = 0; i < this.resultPersonnel.length; i++) {
        if (this.resultPersonnel[i].Status != "Disponible") {
          const res = this.resultPersonnel.filter(
            personnel => personnel.Status != "Disponible"
          );
          this.resultPersonnel = res;
        }
      }
    },
    filterDispo: function() {
      this.enConges = false;
      for (let i = 0; i < this.resultPersonnel.length; i++) {
        if (this.resultPersonnel[i].Status != "En Congés") {
          const res = this.resultPersonnel.filter(
            personnel => personnel.Status != "En Congés"
          );
          this.resultPersonnel = res;
        }
      }
    },
    getPersonnelLeave: async function() {
      try {
        let response = await fetch(
          `https://app-c7edeb26-e069-443f-8987-b321e80adc7b.cleverapps.io/v1/personnels_conges`
        );
        let result = await response.json();
        this.resultConges = result;
      } catch (err) {}
    },
    getPersonnels: async function() {
      try {
        let response = await fetch(
          "https://app-c7edeb26-e069-443f-8987-b321e80adc7b.cleverapps.io/v1/personnels"
        );
        let result = await response.json();
        this.resultPersonnel = result;
      } catch (err) {
        return alert("Erreur lors de la connexion a la base de données.");
      }
    },
    deletePersonnel: async function(id) {
      if (
        confirm(
          "Voulez vous vraiment supprimer cet utilisateur ainsi que tout ces congés?"
        )
      ) {
        let response = await fetch(
          `https://app-c7edeb26-e069-443f-8987-b321e80adc7b.cleverapps.io/v1/personnels/${id}`,
          {
            method: "DELETE"
          }
        );
        if (await response) {
          this.getPersonnels();
        } else {
          alert("La suppression a échoué");
        }
      }
    }
  }
};
</script>
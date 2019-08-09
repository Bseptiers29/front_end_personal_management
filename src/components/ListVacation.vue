<template>
  <div class="mt-3">
    <div>
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
          <th scope="col">Congés :</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{{prenom}}</td>
          <td>{{nom}}</td>
          <td>{{profession}}</td>
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
      <div class="row offset-3">
        <div class="mt-4 ml-5 col">
          <input class="btn-info btn mx-auto col-2" type="submit" @click="updatePersonnel(id)" />
        </div>
      </div>
    </form>
    <div class="col-1 float-right" id="grpancien">
      <p class="float-right text-right font-weight-bold" id="grpancien">Ancienneté</p>
      <br />
      <span class="float-right text-right font-weight-light" id="grpancien">{{anciennete}}</span>
    </div>
    <p class="h4 text-left col-10 text-info mt-5">Liste des congés du personnel</p>
    <ul class="list-group list-group-flush col-3 ml-5" v-if="debutconges">
      <li class="list-group-item">
        Du : {{debutconges}} - Au : {{finconges}}
        <a @click="deletePersonnel(id)">
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
  margin-top: -4vh;
  margin-right: 7vh;
}
</style>

<script>
export default {
  name: "LisVacation",
  data: function() {
    return {
      prenom: null,
      nom: null,
      anciennete: null,
      email: null,
      profession: null,
      service: null,
      image: null,
      date_naissance: null,
      conges: null,
      debutconges: null,
      finconges: null,
      headers: {
        "Content-Type": "application/json"
      }
    };
  },
  created() {
    this.getPersonnel();
  },
  watch: {
    $route: function() {
      this.getPersonnel();
    }
  },
  props: {
    id: String
  },
  methods: {
    getPersonnel: async function(id) {
      try {
        let response = await fetch(
          `http://app-25aa53e5-cf91-4429-82b4-66bc31bc8731.cleverapps.io/v1/personnel/${this.id}`
        );
        let result = await response.json();
        (this.prenom = result.prenom),
          (this.nom = result.nom),
          (this.anciennete = result.anciennete),
          (this.email = result.email),
          (this.profession = result.profession),
          (this.service = result.service),
          (this.image = result.image),
          (this.date_naissance = result.date_naissance),
          (this.conges = result.congesdispo),
          (this.debutconges = result.debutconges),
          (this.finconges = result.finconges);
      } catch (err) {
        console.log(err.message);
      }
    },
    updatePersonnel: async function(id) {
      let response = await fetch(
        `http://app-25aa53e5-cf91-4429-82b4-66bc31bc8731.cleverapps.io/v1/conges/${this.id}`,
        {
          body: JSON.stringify({
            debutconges: this.debutconges,
            finconges: this.finconges
          }),
          method: "PUT",
          headers: this.headers
        }
      );
    },
    deletePersonnel: async function(id) {
      let response = await fetch(
        `http://app-25aa53e5-cf91-4429-82b4-66bc31bc8731.cleverapps.io/v1/personnel/${this.id}`,
        {
          method: "DELETE"
        }
      );
      if (await response) {
        this.getConges();
      } else {
        alert("La suppression a échoué");
      }
      dateconges: "";
    }
  }
};
</script>
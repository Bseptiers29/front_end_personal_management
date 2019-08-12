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
          <input type="date" class="form-control col-4" v-model="finconges" />
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
      profession: null,
      service: null,
      image: null,
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
    this.getConges();
  },
  watch: {
    $route: function() {
      this.getPersonnel();
      this.getConges();
    }
  },
  props: {
    id: String,
    idc: String
  },
  methods: {
    getPersonnel: async function(id) {
      try {
        let response = await fetch(
          `http://app-25aa53e5-cf91-4429-82b4-66bc31bc8731.cleverapps.io/v1/personnels/${this.id}`
        );
        let result = await response.json();
        (this.prenom = result.Prenom),
          (this.nom = result.Nom),
          (this.anciennete = result.Anciennete),
          (this.profession = result.Profession),
          (this.service = result.Service),
          (this.image = result.Image);
      } catch (err) {
        console.log(err.message);
      }
    },
    getConges: async function(idc) {
      try {
        let response = await fetch(
          `http://app-25aa53e5-cf91-4429-82b4-66bc31bc8731.cleverapps.io/v1/conges/${this.idc}`
        );
        let result = await response.json();
        (this.conges = result.CongesDispo),
          (this.debutconges = result.DebutConges),
          (this.finconges = result.FinConges);
      } catch (err) {
        console.log(err.message);
      }
    },
    postConges: async function() {
      let response = await fetch(
        `http://app-25aa53e5-cf91-4429-82b4-66bc31bc8731.cleverapps.io/v1/conges`,
        {
          body: JSON.stringify({
            CongesDispo: this.conges,
            DebutConges: this.debutconges,
            FinConges: this.finconges
          }),
          method: "POST",
          headers: this.headers
        }
      );
      this.$router.push({ name: "TabPersonnal" });
    }
  },

  updateConges: async function(idc) {
    let response = await fetch(
      `http://app-25aa53e5-cf91-4429-82b4-66bc31bc8731.cleverapps.io/v1/conges/${this.idc}`,
      {
        body: JSON.stringify({
          conges: this.CongesDispo,
          debutconges: this.DebutConges,
          finconges: this.FinConges
        }),
        method: "PUT",
        headers: this.headers
      }
    );
    this.$router.push({ name: "TabPersonnal" });
  },
  deleteConges: async function(idc) {
    let response = await fetch(
      `http://app-25aa53e5-cf91-4429-82b4-66bc31bc8731.cleverapps.io/v1/conges/${this.idc}`,
      {
        method: "DELETE"
      }
    );
  }
};
</script>
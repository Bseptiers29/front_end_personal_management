<template>
  <div class="mt-4">
    <div class="row mt-3">
      <p class="h1 text-right col-10 text-info">Ajouter un membre du personnel</p>
    </div>
    <form class="mt-4 form-group mr-5" @submit.prevent>
      <div class>
        <img
          src="../assets/img/imgDefault.png"
          class="rounded float-right col-2 mr-5 img-thumbnail"
          alt="image du personnel"
        />
      </div>
      <div class="row offset-1">
        <div class="col-6 mt-3">
          <label for="inputPrenom">Prénom :</label>
          <input
            type="text"
            class="form-control"
            id="inputPrenom"
            placeholder="Prénom"
            v-model="prenom"
          />
        </div>
        <div class="col-6 mt-3">
          <label for="inputNom">Nom :</label>
          <input type="text" class="form-control" id="inputNom" placeholder="Nom" v-model="nom" />
        </div>
      </div>
      <div class="row offset-1">
        <div class="col-6 mt-3">
          <label for="inputCongésDisp">Congés Disponibles :</label>
          <input
            type="number"
            class="form-control"
            id="inputCongésDisp"
            placeholder="Congés"
            v-model="conges"
          />
        </div>
        <div class="col-6 mt-3">
          <label for="inputAncienneté">Ancienneté</label>
          <input
            type="date"
            class="form-control"
            id="inputAncienneté"
            placeholder="Ancienneté"
            v-model="anciennete"
          />
        </div>
      </div>
      <div class="row offset-1">
        <div class="col-6 mt-3">
          <label for="inputAge">Age :</label>
          <input
            type="date"
            class="form-control"
            id="inputEmail1"
            placeholder="Age"
            v-model="date_naissance"
          />
        </div>
        <div class="col-6 mt-3">
          <label for="inputEmail">Email :</label>
          <input
            type="email"
            class="form-control"
            id="inputEmail"
            placeholder="Email"
            v-model="email"
          />
        </div>
      </div>
      <div class="row offset-1">
        <div class="col-6 mt-3">
          <label for="inputProfession">Proféssion :</label>
          <input
            type="text"
            class="form-control"
            id="inputProfession"
            placeholder="Proféssion"
            v-model="profession"
          />
        </div>
        <div class="col-6 mt-3">
          <label for="inputService">Service</label>
          <input
            type="text"
            class="form-control"
            id="inputService"
            placeholder="Service"
            v-model="service"
          />
        </div>
      </div>
      <div class="ml-5" id="form_end">
        <div class="row ml-5">
          <div class="col float-right ml-2 mr-5 mt-2">
            <label class="btn btn-default btn-file float-right" for="file">
              <font-awesome-icon icon="plus-circle" style="font-size: 2.3em; color:orange;" />
              <span class="ml-2">Ajouter une photo</span>
              <input id="file" type="file" style="display: none;" @change="handleFiles()" />
            </label>
          </div>
        </div>
      </div>
      <div class="row offset-2 mt-3">
        <button type="submit" class="btn btn-info mt-5 col-1 ml-5" @click="postPersonnel()">Ajouter</button>
        <button
          type="submit"
          class="btn btn-warning mt-5 col-1 ml-5"
          @click="$router.push({name: 'TabPersonnal' })"
        >Annuler</button>
      </div>
    </form>
  </div>
</template>

<style class="scoped">
</style>

<script>
export default {
  name: "Personnal",
  data: function() {
    return {
      prenom: null,
      nom: null,
      conges: null,
      anciennete: null,
      date_naissance: null,
      email: null,
      profession: null,
      service: null,
      image: null,
      headers: {
        "Content-Type": "application/json"
      }
    };
  },
  methods: {
    handleFiles: function() {
      var fichierSelectionne = document.getElementById("file").files[0];
      console.log(fichierSelectionne);
      this.image = fichierSelectionne;
    },
    postPersonnel: async function() {
      let response = await fetch(
        `http://app-25aa53e5-cf91-4429-82b4-66bc31bc8731.cleverapps.io/v1/personnel`,
        {
          body: JSON.stringify({
            prenom: this.prenom,
            nom: this.nom,
            anciennete: this.anciennete,
            email: this.email,
            profession: this.profession,
            service: this.service,
            image: this.image.name,
            date_naissance: this.date_naissance,
            congesdispo: this.conges,
            debutconges: null,
            finconges: null
          }),
          method: "POST",
          headers: this.headers
        }
      );
    }
  }
};
</script>
<template>
  <div class="mt-4">
    <div class="row mt-3">
      <p class="h1 text-right col-10 text-info">Ajouter un membre du personnel</p>
    </div>
    <form class="mt-4 form-group mr-5" @submit.prevent>
      <div id="imgpersos">
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
          <label for="inputSécuDisp">N° Sécurité Sociale :</label>
          <input
            type="number"
            class="form-control"
            id="inputSécuDisp"
            placeholder="N° Sécurité Sociale"
            v-model="sécusociale"
          />
        </div>
        <div class="col-6 mt-3">
          <label for="inputAncienneté">Ancienneté :</label>
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
          <label for="inputAge">Date de naissance :</label>
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
          <label for="inputAdresse">Adresse :</label>
          <input
            type="text"
            class="form-control"
            id="inputAdresse"
            placeholder="Adresse"
            v-model="adresse"
          />
        </div>
        <div class="col-6 mt-3">
          <label for="inputTelephone">Téléphone :</label>
          <input
            type="text"
            class="form-control"
            id="inputTelephone"
            placeholder="Telephone"
            v-model="telephone"
          />
        </div>
      </div>
      <div class="row offset-1" id="entrpgroup">
        <div class="col-5 mt-3">
          <label for="inputProfession">Proféssion :</label>
          <input
            type="text"
            class="form-control"
            id="inputProfession"
            placeholder="Proféssion"
            v-model="profession"
          />
        </div>
        <div class="col-5 mt-3">
          <label for="inputService">Service :</label>
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
      <div class="row offset-2" id="buttongroup">
        <button type="submit" class="btn btn-info col-1 ml-5" @click="postPersonnel()">Ajouter</button>
        <button
          type="submit"
          class="btn btn-warning col-1 ml-5"
          @click="$router.push({name: 'TabPersonnal' })"
        >Annuler</button>
      </div>
    </form>
  </div>
</template>

<style class="scoped">
#entrpgroup {
  width: 87%;
}
#form_end {
  margin-top: -15vh;
}
#buttongroup {
  margin-top: 17vh;
}
</style>

<script>
export default {
  name: "Personnal",
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
      headers: {
        Accept: "application/json",
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
        `http://app-c7edeb26-e069-443f-8987-b321e80adc7b.cleverapps.io/v1/personnels`,
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
            Image: this.image.name
          }),
          method: "POST",
          headers: this.headers
        }
      );
      this.$router.push({ name: "TabPersonnal" });
    }
  }
};
</script>
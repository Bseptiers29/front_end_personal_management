<template>
  <div class="mt-4">
    <div class="row mt-3">
      <p class="h1 text-right col-10 text-info">Ajouter un membre du personnel</p>
    </div>
    <form
      class="mt-4 form-group mr-5"
      @submit.prevent
      action="/files"
      method="POST"
      enctype="multipart/form-data"
    >
      <div id="imgDiv">
        <img
          src="../assets/img/imgDefault.png"
          class="rounded float-right col-2 mr-5 img-thumbnail"
          alt="image du personnel"
        />
      </div>
      <div class="row offset-1">
        <div class="col-6 mt-3">
          <label for="inputPrenom">Prénom* :</label>
          <input
            type="text"
            class="form-control"
            id="inputPrenom"
            placeholder="Prénom"
            v-model="prenom"
          />
        </div>
        <div class="col-6 mt-3">
          <label for="inputNom">Nom* :</label>
          <input type="text" class="form-control" id="inputNom" placeholder="Nom" v-model="nom" />
        </div>
      </div>
      <div class="row offset-1">
        <div class="col-6 mt-3">
          <label for="inputSécuDisp">N° Sécurité Sociale* :</label>
          <input
            type="number"
            class="form-control"
            id="inputSécuDisp"
            placeholder="N° Sécurité Sociale"
            v-model="sécusociale"
          />
        </div>
        <div class="col-6 mt-3">
          <label for="inputAncienneté">Ancienneté* :</label>
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
          <label for="inputAge">Date de naissance* :</label>
          <input
            type="date"
            class="form-control"
            id="inputEmail1"
            placeholder="Age"
            v-model="date_naissance"
          />
        </div>
        <div class="col-6 mt-3">
          <label for="inputEmail">Email* :</label>
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
          <label for="inputAdresse">Adresse* :</label>
          <input
            type="text"
            class="form-control"
            id="inputAdresse"
            placeholder="Adresse"
            v-model="adresse"
          />
        </div>
        <div class="col-6 mt-3">
          <label for="inputTelephone">Téléphone* :</label>
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
          <label for="inputProfession">Proféssion* :</label>
          <input
            type="text"
            class="form-control"
            id="inputProfession"
            placeholder="Proféssion"
            v-model="profession"
          />
        </div>
        <div class="col-5 mt-3">
          <label for="inputService">Service* :</label>
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
              <span class="ml-2">Ajouter une photo *</span>
              <input
                id="file"
                type="file"
                style="display: none;"
                @change="handleFiles()"
                name="profiles"
              />
            </label>
            <div class="col-2 float-right" id="InputConges">
              <label>Congés :</label>
              <input
                type="number"
                class="form-control"
                placeholder="Congés Disponibles"
                v-model="conges"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>
      <i class="h6 mt-4 ml-1">* Champs requis</i>
      <div class="row offset-2" id="buttongroup">
        <button type="submit" class="btn btn-info col-1 ml-5" @click="checkForm()">Ajouter</button>
        <button
          type="submit"
          class="btn btn-warning col-1 ml-5"
          @click="$router.push({name: 'TabPersonnal' })"
        >Annuler</button>
      </div>
    </form>
    <p v-if="errors.length">
      <b style="color :red">Veuillez corriger les erreurs suivantes :</b>
      <ul>
        <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
      </ul>
    </p>
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
  margin-top: 8vh;
}
</style>

<script>
export default {
  name: "Personnal",
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
      conges: null,
      image: null,
      status: "Disponible",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    };
  },
  methods: {
    checkForm: function() {
      this.errors = [];
      if (!this.prenom) {
        this.errors.push("Prénom requis");
      }
      if (!this.nom) {
        this.errors.push("Nom requis");
      }
      if (!this.sécusociale) {
        this.errors.push("N° de sécurité sociale requis");
      }
      if (!this.anciennete) {
        this.errors.push("Date de signature de contrat requise");
      }
      if (!this.date_naissance) {
        this.errors.push("Date de naissance requise");
      }
      if (!this.email) {
        this.errors.push("Email requis");
      }
      if (!this.adresse) {
        this.errors.push("Adresse requise");
      }
      if (!this.telephone) {
        this.errors.push("N° de téléphone requis");
      }
      if (!this.profession) {
        this.errors.push("Profession requise");
      }
      if (!this.service) {
        this.errors.push("Service requis");
      }
      if (!this.image) {
        this.errors.push("Image requise");
      } else {
      this.postPersonnel();
      }
    },
    handleFiles: function() {
      var fichierSelectionne = document.getElementById("file").files[0];
      this.image = fichierSelectionne;
      if (!this.image.name) {
        return alert(
          "Une erreur c'est produite pendant la selection de l'image, veuillez réessayer"
        );
      } else {
        return alert(`Le fichier a bien été selectionné : ${this.image.name}`);
      }
    },
    postPersonnel: async function() {
      let response = await fetch(
        `http://app-c7edeb26-e069-443f-8987-b321e80adc7b.cleverapps.io/v1/personnels`,
        {
          body: JSON.stringify({
            Prenom: this.prenom,
            Nom: this.nom.toUpperCase(),
            SecuriteSociale: this.sécusociale,
            Anciennete: this.anciennete,
            Date_naissance: this.date_naissance,
            Email: this.email,
            Adresse: this.adresse,
            Telephone: this.telephone,
            Profession: this.profession,
            Service: this.service,
            CongesDispo: this.conges,
            Image: this.image.name,
            Status: this.status
          }),
          method: "POST",
          headers: this.headers
        }
      );
      let formData = new FormData();

      formData.append("profiles", this.image);
      let res = await fetch(
        `http://app-c7edeb26-e069-443f-8987-b321e80adc7b.cleverapps.io/files`,
        {
          method: "POST",
          body: formData
        }
      );
      this.$router.push({ name: "TabPersonnal" });
    }
  }
};
</script>
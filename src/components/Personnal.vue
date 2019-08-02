<template>
  <div class="mt-4">
    <div class="row mt-3">
      <p class="h1 text-right col-10 text-info">Modifier un membre du personnel</p>
    </div>
    <form class="mt-4 form-group mr-5">
      <div class>
        <img src="../assets/img/Moi.png" class="rounded float-right col-2 mr-5 img-thumbnail" alt />
      </div>
      <div class="row offset-1">
        <div class="col-6 mt-3">
          <label for="inputPrenom">Prénom :</label>
          <input type="text" class="form-control" id="inputPrenom" placeholder="Prénom" />
        </div>
        <div class="col-6 mt-3">
          <label for="inputNom">Nom :</label>
          <input type="text" class="form-control" id="inputNom" placeholder="Nom" />
        </div>
      </div>
      <div class="row offset-1">
        <div class="col-6 mt-3">
          <label for="inputCongésDisp">Congés Disponibles :</label>
          <input type="number" class="form-control" id="inputCongésDisp" placeholder="Congés" />
        </div>
        <div class="col-6 mt-3">
          <label for="inputAncienneté">Ancienneté</label>
          <input type="date" class="form-control" id="inputAncienneté" placeholder="Ancienneté" />
        </div>
      </div>
      <div class="row offset-1">
        <div class="col-6 mt-3">
          <label for="inputAge">Age :</label>
          <input type="date" class="form-control" id="inputEmail1" placeholder="Age" />
        </div>
        <div class="col-6 mt-3">
          <label for="inputEmail">Email :</label>
          <input type="email" class="form-control" id="inputEmail" placeholder="Email" />
        </div>
      </div>
      <div class="row offset-1">
        <div class="col-6 mt-3">
          <label for="inputProfession">Proféssion :</label>
          <input type="text" class="form-control" id="inputProfession" placeholder="Proféssion" />
        </div>
        <div class="col-6 mt-3">
          <label for="inputService">Service</label>
          <input type="text" class="form-control" id="inputService" placeholder="Service" />
        </div>
      </div>
      <div class="ml-5" id="form_end">
        <div class="row ml-5">
          <div class="col float-right ml-2 mr-5 mt-2">
            <label class="btn btn-default btn-file float-right">
              <font-awesome-icon icon="plus-circle" style="font-size: 2.3em; color:orange;" />
              <span class="ml-2">Ajouter une photo</span>
              <input type="file" style="display: none;" />
            </label>
          </div>
        </div>
      </div>
      <div class="row offset-2 mt-3">
        <button type="submit" class="btn btn-info mt-5 col-1 ml-5">Ajouter</button>
        <button type="submit" class="btn btn-warning mt-5 col-1 ml-5">Annuler</button>
      </div>
    </form>
  </div>
</template>

<style class="scoped">
</style>

<script>
export default {
  name: "Personnal"
};
</script>
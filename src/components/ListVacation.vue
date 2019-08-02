<template>
  <div class="mt-3">
    <div>
      <img src="../assets/img/imgDefault.png" class="rounded float-right col-2 mr-5 img-thumbnail" alt />
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
          <td>Jacques</td>
          <td>Dupont</td>
          <td>Ingénieur</td>
          <td>18</td>
        </tr>
      </tbody>
    </table>
    <form>
      <div class="row mt-5">
        <div class="col offset-2">
          <label>En Congés du :</label>
          <input type="date" class="form-control col-4" />
        </div>
        <div class="col">
          <label>Au :</label>
          <input type="date" class="form-control col-4" />
        </div>
      </div>
      <div class="row offset-3">
        <div class="mt-4 ml-5 col">
          <input class="btn-info btn mx-auto col-2" type="submit" />
        </div>
      </div>
    </form>
    <div class="col-2 float-right mr-2" id="truc">
      <p class="float-right mr-5 text-right font-weight-bold" id="truc">Ancienneté :</p>
      <br />
      <span class="float-right mr-5 text-right font-weight-light" id="truc">18 / 03 / 1995</span>
    </div>
    <p class="h4 text-left col-10 text-info mt-5">Liste des congés du personnel</p>
    <ul class="list-group list-group-flush col-3 ml-5">
      <li class="list-group-item">
        Du : 18 / 03 / 2019 - Au : 25 / 03 / 2019
        <font-awesome-icon class="ml-5" icon="times" style="font-size: 1.2em; color:red;" />
      </li>
    </ul>
  </div>
</template>

<style class="scoped">
.offset-3 {
  margin-left: 31em;
}
#truc {
  margin-top: -3vh;
}
</style>

<script>
export default {
  name: "LisVacation"
};
</script>
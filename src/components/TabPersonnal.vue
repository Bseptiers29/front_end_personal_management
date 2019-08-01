<template>
  <div>
    <div class="row mt-3">
      <p class="h1 text-right col-10">Outil de Gestion de Personnels</p>
    </div>
    <div class="col float-left mt-2">
      <div class="row">
        <input type="checkbox" class="mb-2 ml-2 mt-4" />
        <span class="mt-4 ml-2">En Congés</span>
      </div>
      <div class="row">
        <input type="checkbox" class="mt-2 ml-2" />
        <span class="mt-2 ml-2">Disponibles</span>
      </div>
    </div>
    <div class="col float-left ml-2 mt-4">
      <div class="row float-left mt-2">
        <a @click="$router.push({name: 'AddPersonnal'})">
          <font-awesome-icon icon="plus-circle" style="font-size: 2.3em; color:orange;" />
        </a>
        <span class="mt-2 ml-1">Ajout d'un membre du personnel</span>
      </div>
    </div>
    <table class="table table-bordered table-hover mt-4 text-center col-8 offset-2">
      <thead>
        <tr class="bg-primary">
          <th>Prénom :</th>
          <th>Nom :</th>
          <th>Profession :</th>
          <th>Service :</th>
          <th>Congés :</th>
        </tr>
      </thead>
      <tbody>
        <tr @click="$router.push({name: 'AddPersonnal'})">
          <td>Jacques</td>
          <td>Dupont</td>
          <td>Ingénieur</td>
          <td>Industrie</td>
          <td @click.stop="$router.push({name: 'ListVacation'})" class="bg-danger">18 jours</td>
        </tr>
        <tr>
          <td>Marc</td>
          <td>Bertrand</td>
          <td>Commercial</td>
          <td>Automobile</td>
          <td class="bg-success">10 jours</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style class="scoped">
th {
  color: white;
}
</style>
<script>
export default {
  name: "TabPersonnal"
};
</script>
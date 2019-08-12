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
            onClick="console.log('En Congés')"
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
            onClick="console.log('Disponibles')"
          />
          <label class="custom-control-label ml-2" for="customCheck2">Disponibles</label>
        </div>
      </div>
    </div>
    <div class="col float-left ml-2 mt-4">
      <div class="row float-left mt-4">
        <a @click="$router.push({name: 'AddPersonnal' })">
          <font-awesome-icon icon="plus-circle" style="font-size: 2.3em; color:orange;" />
        </a>
        <span class="mt-2 ml-1">Ajout d'un membre du personnel</span>
      </div>
    </div>
    <table class="table table-bordered table-hover mt-4 text-center col-8 offset-2">
      <thead>
        <tr class="bg-info">
          <th>Prénom :</th>
          <th>Nom :</th>
          <th>Profession :</th>
          <th>Service :</th>
          <th>Congés :</th>
          <th>Editer :</th>
          <th>Supprimer :</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(personnel) of result"
          :key="personnel.ID"
          @click="$router.push({name: 'ListVacation' ,params: {id: `${personnel.Id}` , idc: `${personnel.Id_Conges}`}})"
          id="userDetails"
        >
          <td>{{personnel.Prenom}}</td>
          <td>{{personnel.Nom}}</td>
          <td>{{personnel.Profession}}</td>
          <td>{{personnel.Service}}</td>
          <td class="bg-danger">{{personnel.congesdispo}}</td>
          <td
            @click.stop="$router.push({name: 'UpdatePersonnal' ,params : {id: `${personnel.Id}` }})"
            id="userEdit"
          >
            <font-awesome-icon icon="user-edit" style="font-size: 1.2em; color:green;" />
          </td>
          <td @click.stop="deletePersonnel(personnel.ID)" id="userDelete">
            <font-awesome-icon icon="times" style="font-size: 1.2em; color:red;" />
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
export default {
  name: "TabPersonnal",
  data: function() {
    return {
      result: null
    };
  },
  created() {
    this.getPersonnels();
  },
  watch: {
    $route: function() {
      this.getPersonnels();
    }
  },
  methods: {
    getPersonnels: async function() {
      try {
        let response = await fetch(
          "http://app-25aa53e5-cf91-4429-82b4-66bc31bc8731.cleverapps.io/v1/personnels"
        );
        let result = await response.json();
        this.result = result;
      } catch (err) {
        console.log(err.message);
      }
    },
    deletePersonnel: async function(id) {
      let response = await fetch(
        `http://app-25aa53e5-cf91-4429-82b4-66bc31bc8731.cleverapps.io/v1/personnels/${id}`,
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
};
</script>
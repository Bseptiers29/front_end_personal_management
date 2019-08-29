import Vue from "vue";
import Router from "vue-router";
import TabPersonnal from "./components/TabPersonnal";
import Personnal from "./components/Personnal";
import ListVacation from "./components/ListVacation";
import AddPersonnal from "./components/AddPersonnal";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "TabPersonnal",
      component: TabPersonnal
    },
    {
      path: "/personnel/modifier/",
      name: "UpdatePersonnal",
      component: Personnal,
      props: true
    },
    {
      path: "/conges/",
      name: "ListVacation",
      component: ListVacation,
      props: true
    },
    {
      path: "/personnel/ajout",
      name: "AddPersonnal",
      component: AddPersonnal
    }
  ]
});

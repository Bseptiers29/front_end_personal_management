import Vue from "vue";
import Router from "vue-router";
import TabPersonnal from "./components/TabPersonnal";
import Personnal from "./components/Personnal";
import ListVacation from "./components/ListVacation";

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
      path: "/personnal",
      name: "AddPersonnal",
      component: Personnal
    },
    {
      path: "/list",
      name: "ListVacation",
      component: ListVacation
    }
  ]
});
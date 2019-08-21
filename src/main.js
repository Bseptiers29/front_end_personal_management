import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlusCircle,
  faTimes,
  faUserEdit
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import App from "./App.vue";
import router from "./router";
import "./assets/style/main.scss";

library.add(faUserEdit);
library.add(faPlusCircle);
library.add(faTimes);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

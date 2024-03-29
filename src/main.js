import Vue from "vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlusCircle,
  faTimes,
  faUserEdit
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import moment from "moment";

import App from "./App.vue";
import router from "./router";

library.add(faUserEdit);
library.add(faPlusCircle);
library.add(faTimes);

Vue.prototype.moment = moment;
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

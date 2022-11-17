import Vue from 'vue'
import Vuelidate from 'vuelidate'
import vClickOutside from 'v-click-outside'
import VueScrollTo from 'vue-scrollto';

// import vClickOutside from "click-outside-vue3"

Vue.use(Vuelidate)
Vue.use(vClickOutside)
Vue.use(VueScrollTo, {
    container: "#ts-of-scroll-y",
    easing: 'ease-out'
  });
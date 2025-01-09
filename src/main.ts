import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from "pinia";
import {router} from "./router.ts";
import "vue3-toastify/dist/index.css"
import VueTippy from 'vue-tippy'
import './assets/tippy.css'
import {createAuth0} from "@auth0/auth0-vue";

const pinia = createPinia()

const app = createApp(App)
app.use(VueTippy)
app.use(pinia)
app.use(router)
app.use(
  createAuth0({
    domain: "azenox.eu.auth0.com",
    clientId: "xKAgsosGIqC4XQs2qE0B57GU3QxXc7gQ",
    authorizationParams: {
      redirect_uri: window.location.origin + '/account/authorize'
    }
  })
)
app.mount('#app')

console.log(window.location.origin)
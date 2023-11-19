// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './assets/reset.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia().use(piniaPluginPersistedstate))
app.use(router)
// app.use(VueKonva)
app.mount('#app')

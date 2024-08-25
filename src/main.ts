import { createApp } from 'vue'
import './assets/css/reset.css'

import { createPinia } from 'pinia'
import App from './App.vue'
import Router from './router/index.ts'
import { useUserStore } from './store/user.ts'

const app = createApp(App)
app.use(createPinia())
const userStore = useUserStore()
await userStore.fetchprofile()
app.use(Router).mount('#app')

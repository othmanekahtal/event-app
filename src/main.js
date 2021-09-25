import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'nprogress/nprogress.css'
import GBstore from '@/store/GBstore.js';

createApp(App)
  .use(store)
  .use(router)
  .provide('GBstore', GBstore)
  .mount('#app')

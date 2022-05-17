import App from './App.vue';
import i18n from '../../i18n';
import store from '../../store';
import { createApp } from 'vue';
import router from '../../router';

createApp(App)
.use(i18n)
.use(store)
.use(router)
.mount('#app');
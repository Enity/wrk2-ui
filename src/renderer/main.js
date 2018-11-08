import Vue from 'vue';

import App from './App';
import router from './router';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
if (process.env.NODE_ENV !== 'development') {
    Vue.config.devtools = true;
}
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    template: '<App/>'
}).$mount('#app');

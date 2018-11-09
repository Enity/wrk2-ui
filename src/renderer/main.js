import Vue from 'vue';

import App from './App';
import router from './router';
import store from './store/store';

if (process.env.NODE_ENV !== 'development') {
    Vue.config.devtools = true;
}
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app');

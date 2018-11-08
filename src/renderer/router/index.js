import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'CreateBench',
            component: require('@/pages/CreateBench/CreateBench.vue').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
});

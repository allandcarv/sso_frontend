import Vue from 'vue';
import VueRouter from 'vue-router';

import UserHome from '../template/User/UserHome';

Vue.use(VueRouter);

const routes = [{
    name: 'home',
    path: '/',
    component: UserHome
}];

export default new VueRouter({
    mode: 'history',
    routes
})

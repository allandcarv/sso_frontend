import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';

import Auth from '../template/auth/Auth';
import UserHome from '../template/user/UserHome';
import AdminHome from '../template/admin/AdminHome';

import { baseApiUrl, userKey } from './global';

Vue.use(VueRouter);

const routes = [{
    name: 'auth',
    path: '/auth',
    component: Auth
}, {
    name: 'home',
    path: '/',
    component: UserHome
}, {
    name: 'admin',
    path: '/admin',
    component: AdminHome,
    meta: {
        requiresAdmin: true
    }
}];

const router = new VueRouter({
    mode: 'history',
    routes
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAdmin)) {
        const user = JSON.parse(localStorage.getItem(userKey));
        const url = `${baseApiUrl}/validateAdmin`;

        if (user && user.admin) {
            const isAdmin = await axios.post(url, user);
            isAdmin ? next() : next({ path: '/' })
        } else {
            next({ path: '/' });
        }
    } else {
        next();
    }
})
export default router;

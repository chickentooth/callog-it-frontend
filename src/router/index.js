import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/main/Dashboard.vue'
import Login from '@/components/main/Login.vue'
import Home from '@/components/Home.vue'
import CreateRequest from '@/components/forms/create_request_form.vue'
import createdJobAll from '@/components/my-created-job/All.vue'
Vue.use(Router)

const router =  new Router({
    mode: 'history', //remove hash mode
    routes: [
        {
            path: '/',
            component: Home,
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: Dashboard
                },
                {
                    path: '/create-request',
                    component: CreateRequest,
                    beforeEnter: guardRoute
                },
                {
                    path: '/created-job-all',
                    component: createdJobAll,
                    beforeEnter: guardRoute
                }
            ],
            beforeEnter: guardRoute
        },
        {
            name: 'login',
            path: '/login',
            component: Login
        }
    ]
})


function guardRoute (to, from, next) {
    // work-around to get to the Vuex store (as of Vue 2.0)
    const auth = router.app.$options.store.state.auth

    if (!auth.isLoggedIn) {
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    } else {
        next()
    }
}

export default router

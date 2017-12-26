import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/main/Dashboard.vue'
import Login from '@/components/main/Login.vue'
import Home from '@/components/Home.vue'
import CreateRequest from '@/components/forms/create_request_form.vue'
import MyCreatedJobs from '@/components/main/MyCreatedJobs.vue'
import MyRelatedJobs from '@/components/main/MyRelatedJobs.vue'
import AssignedJobs from '@/components/main/AssignedJobs.vue'
import TeamJobs from '@/components/main/TeamJobs.vue'
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
                    name: 'create-request',
                    component: CreateRequest,
                    beforeEnter: guardRoute
                },
                {
                    path: '/created-jobs/:filter',
                    name: 'created-jobs',
                    component: MyCreatedJobs,
                    beforeEnter: guardRoute
                },
                {
                    path: '/related-jobs/:filter',
                    name: 'related-jobs',
                    component: MyRelatedJobs,
                    beforeEnter: guardRoute
                },
                {
                    path: '/assigned-jobs/:filter',
                    name: 'assigned-jobs',
                    component: AssignedJobs,
                    beforeEnter: guardRoute
                },
                {
                    path: '/team-jobs/:filter',
                    name: 'team-jobs',
                    component: TeamJobs,
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

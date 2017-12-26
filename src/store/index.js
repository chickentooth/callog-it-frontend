import Vue from 'vue'
import Vuex from 'vuex'
import { state } from './state'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import plugins from './plugins'
import CreateNewRequest from './modules/CreateNewRequest'
import MyCreatedJobs from './modules/MyCreatedJobs'
import MyRelatedJobs from './modules/MyRelatedJobs'
import AssignedJobs from './modules/AssignedJobs'
import TeamJobs from './modules/TeamJobs'

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    getters,
    actions,
    modules: {
        CreateNewRequest,
        MyCreatedJobs,
        MyRelatedJobs,
        AssignedJobs,
        TeamJobs
    },
    mutations,
    plugins
})

export default store
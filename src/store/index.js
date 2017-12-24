import Vue from 'vue'
import Vuex from 'vuex'
import { state } from './state'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'
import plugins from './plugins'
import CreateNewRequest from './modules/CreateNewRequest'
import MyCreatedJobAll from './modules/my-created-job/All'

Vue.use(Vuex)

const store = new Vuex.Store({
    state,
    getters,
    actions,
    modules: {
        CreateNewRequest,
        MyCreatedJobAll
    },
    mutations,
    plugins
})

export default store
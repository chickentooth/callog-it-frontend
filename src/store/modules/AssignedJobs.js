/**
 * Created by Dinh Bao Khanh */

import Vue from 'vue'

// init state
const state = {
    loading: false,
    error: null,
    success: false,
    active: false,
    data: []
}
const actions = {
    async fetchAllAssignedJobs ({commit}) {
        commit('FETCH_ALL_ASSIGNED_JOB')
        try {
            let data = await Vue.http.get('auth/records/assigned-to-me.json').then(respone => respone.body.data)
            commit('FETCH_ALL_ASSIGNED_JOB_SUCCESS', data)

        } catch (error) {
            commit('FETCH_ALL_ASSIGNED_JOB_FAILURE', error)
        }
    }
}

const mutations = {
    FETCH_ALL_ASSIGNED_JOB (state) {
        state.loading = true
    },
    FETCH_ALL_ASSIGNED_JOB_SUCCESS (state, data) {
        state.loading = false
        state.active = true
        state.success = true
        state.data = data
    },
    FETCH_ALL_ASSIGNED_JOB_FAILURE (state, error) {
        state.loading = false
        state.success = false
        state.active = true
        state.error = error
    }
}

export default {
    state,
    actions,
    mutations
}

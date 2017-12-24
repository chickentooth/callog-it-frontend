/**
 * Created by Dinh Bao Khanh.
 */
import {SEND_REQUEST, SEND_REQUEST_SUCCESS, SEND_REQUEST_FAILURE} from '../mutation-types'
import Vue from 'vue'

// init state
const state = {
    loading: false,
    error: null,
    success: false,
    employees: [],
    active: false
}
const getters = {
    employees : state => state.employees
}

const actions = {
    async sendRequest ({commit}, data) {
        commit(SEND_REQUEST)
        try {
            console.log(data)
            await Vue.http.post('auth/record.json', {data: data}).then(respone => respone.body.data)
            commit(SEND_REQUEST_SUCCESS)
        } catch (error) {
            commit(SEND_REQUEST_FAILURE, error)
        }
    },
    async fetchEmployees({commit}){
        try{
            let employees = await Vue.http.get('auth/employees.json').then(response => response.body.data)
            commit('UPDATE_EMPLOYEES_LIST', employees)
        }catch (error){
            commit('FETCH_EMPLOYEES_ERROR', error)
        }
    }
}

const mutations = {
    [SEND_REQUEST] (state) {
        state.loading = true
    },
    UPDATE_EMPLOYEES_LIST (state, employees) {
        state.employees = employees
    },

    [SEND_REQUEST_SUCCESS] (state) {
        state.loading = false
        state.active = true
        state.success = true
    },
    [SEND_REQUEST_FAILURE] (state, error) {
        state.loading = false
        state.success = false
        state.active = true
        state.error = error
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}

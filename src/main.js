// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './components/App.vue'
import router from './router'
import store from './store'
import jquery from 'jquery'
import config from './config/index'
import VueResource from 'vue-resource'


Vue.use(VueResource)
Vue.http.options.root = config.restServerAddress
Vue.config.productionTip = false


/* Auth plugin */
import Auth from './auth'
Vue.use(Auth)


/* eslint-disable no-new */
new Vue({
    el: '#app',
    // Attach the Vue instance to the window,
    // so it's available globally.
    created: function () {
        window.Vue = this
    },
    router,
    store,
    template: '<App/>',
    components: {App},
    render: h => h(App)
})

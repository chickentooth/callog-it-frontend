<template>
    <div id="page-container" v-bind:class="pageContainerClass">
        <side-overlay v-if="isLoggedIn"></side-overlay>
        <sidebar v-if="isLoggedIn"></sidebar>
        <app-header v-if="isLoggedIn"></app-header>
        <main id="main-container" style="min-height: 924px;">
            <router-view></router-view>
        </main>
        <app-footer></app-footer>
        <app-modal></app-modal>
    </div>
</template>
<script>
    import appHeader from './extends/Header.vue'
    import appFooter from './extends/Footer.vue'
    import sidebar from './extends/Sidebar.vue'
    import appModal from "./extends/AppModal.vue";
    import sideOverlay from './extends/SideOverlay.vue'

    import store from '../store'

    export default {
        name: 'Home',
        data: function () {
            return {
                isLoggedIn: store.state.auth.isLoggedIn
            }
        },
        components: {
            appHeader,
            appFooter,
            sidebar,
            appModal,
            sideOverlay
        },
        computed: {
            pageContainerClass: function () {
                return {
                    'sidebar-l': this.isLoggedIn,
                    'sidebar-o': this.isLoggedIn,
                    'side-scroll': this.isLoggedIn,
                    'header-navbar-fixed': this.isLoggedIn
                }
            }
        },
        mounted() {
            // Page is ready. Let's load our function
            window.App.init()
        }
    }
</script>

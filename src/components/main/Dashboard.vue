<template>
    <div>
    <h1 class="text-amethyst-dark">Hello world</h1>
    <h1 class="text-amethyst-dark">Howdy, {{username}}</h1>
    <img class="animated shake" src="../../assets/logo.png">
    </div>
</template>

<script>
    export default {
        name: 'Dashboard',
        data: function () {
            return {username: this.$store.state.user.name}
        }
    }
</script>
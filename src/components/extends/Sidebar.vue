<template>
  <nav id="sidebar">
    <!-- Sidebar Scroll Container -->
    <div class="slimScrollDiv" style="position: relative; overflow: hidden; width: auto; height: 149px;"><div id="sidebar-scroll" style="overflow: hidden; width: auto; height: 149px;">
      <!-- Sidebar Content -->
      <!-- Adding .sidebar-mini-hide to an element will hide it when the sidebar is in mini mode -->

      <!-- Sidebar Content -->
    </div><div class="slimScrollBar" style="background: rgb(255, 255, 255); width: 5px; position: absolute; top: 155px; opacity: 0.35; display: none; border-radius: 7px; z-index: 99; right: 2px; height: 351.215px;"></div><div class="slimScrollRail" style="width: 5px; height: 100%; position: absolute; top: 0px; display: none; border-radius: 7px; background: rgb(51, 51, 51); opacity: 1; z-index: 90; right: 2px;"></div></div>
    <!-- END Sidebar Scroll Container -->
  </nav>
</template>


<script>
  export default {
    name: 'Sidebar',
    methods : {
        goto (filter) {
            this.$route.push('created-jobs/' + filter)
        }
    }
  }
</script>

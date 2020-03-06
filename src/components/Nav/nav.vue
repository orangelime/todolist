<template>
  <div class="nav">
    <!-- use router-link component for navigation. -->
    <!-- specify the link by passing the `to` prop. -->
    <!-- `<router-link>` will be rendered as an `<a>` tag by default -->
    <router-link to="/todo" class="nav-item">
      Todo
      <i class="line"></i>
    </router-link>
    <router-link to="/weather" class="nav-item">
      Weather
      <i class="line"></i>
    </router-link>
    <router-link to="/aqi" class="nav-item">
      AQI
      <i class="line"></i>
    </router-link>
    <router-link to="/calculator" class="nav-item">
      Calculator
      <i class="line"></i>
    </router-link>
  </div>

</template>
<script>
export default {

}
</script>
<style>
@import url(nav.css);
</style>




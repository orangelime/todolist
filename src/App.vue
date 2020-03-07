<template>
  <div id="app">
    <Mynav></Mynav>
    <!-- route outlet -->
    <!-- component matched by the route will render here -->
    <router-view></router-view>
  </div>
</template>

<script>
import Mynav from './components/Nav/nav.vue'

export default {
  name: 'App',
  components: {
    Mynav
  }
}
</script>

<style>

/*transition name="xxx"
    xxx-enter 過渡進入開始狀態
    xxx-enter-to 過渡進入結束狀態
    xxx-enter-active 過渡進入時間、延遲、運動曲線

    xxx-leave 過渡離開狀態
    xxx-leave-to 過渡離開結束狀態
    xxx-leave-active 過渡離開時間、延遲、運動曲線
  */
  /*從左到右*/
  .slide-to-left-enter-active,
  .slide-to-left-leave-active{
    transition: all 1s;
  }
  .slide-to-left-enter,
  .slide-to-left-leave-to{
    transform: translateX(-100%);
  }
  /*從bottom到top*/
  .slide-to-top-enter-active,
  .slide-to-top-leave-active{
    transition: all 2s;
  }
  .slide-to-top-enter,
  .slide-to-top-leave-to{
    transform: translateY(100%);
  }
</style>

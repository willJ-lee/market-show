<template>
  <!-- 整个页面布局 -->
  <div class="wrapper">
    <!-- 顶部静态区域组件 -->
    <StaticPart />
   <!-- 附近推荐组件 -->
   <Nearby />
  </div>
  <!-- 底部dock栏组件 -->
  <Docker :currentIndex='0' />
</template>

<script>
import StaticPart from './StaticPart.vue'
import Nearby from './Nearby.vue'
import Docker from '../../components/Docker.vue'
export default {
  name: 'Home',
  components: {
    StaticPart,
    Nearby,
    Docker
  }
}
</script>

<style lang="scss" scoped>
  // 整个页面布局
  .wrapper {
    overflow-y: auto;
    position: absolute;
    padding: 0 .18rem .2rem .18rem;
    top: 0;
    right: 0;
    bottom: .5rem;
    left: 0;
  }
</style>

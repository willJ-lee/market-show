<template>
  <div class="wraper">
    <TopArea />
    <ProductList />
    <Order />
  </div>
</template>

<script>
import TopArea from './TopArea.vue'
import ProductList from './ProductList.vue'
import Order from './Order.vue'

export default {
  name: 'orderConfirmation',
  components: {
    TopArea,
    ProductList,
    Order
  }
}
</script>

<style lang="scss" scoped>
  .wraper {
    overflow-y: auto;
    position: absolute;
    padding: 0 .18rem;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #eee;
    margin-bottom: .55rem;
  }
</style>

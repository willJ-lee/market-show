<template>
  <div class="products">
    <div class="products__title">{{shopName}}</div>
    <div class="products__list">
      <div class="products__item" v-for="item in productList" :key='item._id'>
        <img class="products__item__img" :src="item.imgUrl">
        <div class="products__item__detail">
          <h4 class="products__item__title">{{item.name}}</h4>
          <p class="products__item__price">
            <span class="products__item__yen">&yen;{{item.price}} * {{item.count}}</span>
            <span class="products__item__origin">&yen;{{item.price * item.count}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { useCommonCartEffect } from '../../effects/cartEffects.js'

export default {
  name: 'ProductList',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { productList, shopName } = useCommonCartEffect(shopId)
    return { productList, shopName }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

  // 商品信息布局
  .products {
    margin-top: .16rem;
    background-color: $bgColor;
    &__title {
      padding: .16rem 0 .16rem .16rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }
    &__list {
      padding: 0 .16rem;
    }
    &__item {
      position: relative;
      display: flex;
      padding: 0 0 .16rem 0;
      &__img {
        margin: 0 .16rem 0 0;
        width: .46rem;
        height: .46rem;
      }
      &__detail {
        // overflow: hidden;
        // width: 100%;
        flex: 1;
      }
      &__title {
        margin-bottom: .06rem;
        font-weight: normal;
        line-height: .2rem;
        font-size: .14rem;
        color: $content-fontcolor;
        @include ellipsis;
      }
      &__price {
        display: flex;
        line-height: .2rem;
        font-size: .14rem;
        color: $highlight-color;
      }
      &__origin {
        flex: 1;
        text-align: right;
        color: #000;
      }
    }
  }
</style>

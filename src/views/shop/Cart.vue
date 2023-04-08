<template>
  <div class="mask" v-if='showCart && calculations.total > 0' @click="handleCartShowChange"></div>
  <div class="cart">
    <!-- 购物车选中商品展示 -->
    <div class="product" v-if='showCart && calculations.total > 0'>
      <div class="product__header">
        <div class="product__header__all">
          <span class="product__header__icon iconfont" v-html="calculations.allCheck ? '&#xe618;' : '&#xe6f7;'" @click="() => { setCartItemSelect(shopId) }"></span>
          全选
        </div>
        <div class="product__header__clear">
          <span class="product__header__clear__btn" @click="() => { cleanCartProducts(shopId) }">清空购物车</span>
        </div>
      </div>
      <div class="product__item" v-for="item in productList" :key="item._id">
        <div class="product__item__checked iconfont" v-html="item.check ? '&#xe618;' : '&#xe6f7;' " @click="() => { changeCartItemChecked(shopId, item._id) }"></div>
        <img class="product__item__img" :src="item.imgUrl">
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <!-- <p class="product__item__sales">月售{{item.sales}}件</p> -->
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus" @click="() => { changeCartItemInfo(shopId, item._id, item, -1) }">-</span>
          {{item.count || 0 }}
          <span class="product__number__plus" @click="() => { changeCartItemInfo(shopId, item._id, item, 1) }">+</span>
        </div>
      </div>
    </div>
    <!-- 购物车底部显示 -->
    <div class="check">
      <div class="check__icon">
        <img class="check__icon__img" src="http://www.dell-lee.com/imgs/vue3/basket.png" @click="handleCartShowChange">
        <div class="check__icon__tag">{{calculations.total}}</div>
      </div>
      <div class="check__info">
        总计: <span class="check__info__price">&yen; {{calculations.price}}</span>
      </div>
      <div class="check__btn" v-if='calculations.total > 0'>
        <router-link :to='`/orderConfirmation/${shopId}`'>
          去结算
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, defineCustomElement, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../../effects/cartEffects.js'

// 购物车操作相关
const useCartEffect = (shopId) => {
  const { changeCartItemInfo, productList, calculations } = useCommonCartEffect(shopId)
  const store = useStore()

  // 获取购物车内物品是否被选中
  const changeCartItemChecked = (shopId, productId) => {
    store.commit('changeCartItemChecked', { shopId, productId })
  }

  // 全选按钮实现
  const setCartItemSelect = (shopId) => {
    store.commit('setCartItemSelect', { shopId })
  }

  // 清空购物车
  const cleanCartProducts = (shopId) => {
    store.commit('cleanCartProducts', { shopId })
  }

  return { changeCartItemChecked, changeCartItemInfo, calculations, productList, cleanCartProducts, setCartItemSelect }
}

// 展示隐藏购物车逻辑
const toggleCartEffect = () => {
  const showCart = ref(false)
  const handleCartShowChange = () => {
    showCart.value = !showCart.value
  }
  return { showCart, handleCartShowChange }
}

export default {
  name: 'Cart',
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { showCart, handleCartShowChange } = toggleCartEffect()
    const { changeCartItemInfo, calculations, productList, changeCartItemChecked, cleanCartProducts, setCartItemSelect } = useCartEffect(shopId)
    return { calculations, productList, shopId, changeCartItemInfo, changeCartItemChecked, cleanCartProducts, setCartItemSelect, showCart, handleCartShowChange }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
  // 点击购物车弹出蒙层样式
  .mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.50);
  }
  // 购物车样式
  .cart {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    // height: .5rem;
    box-shadow: 0 -1px 1px 0 $content-bgColor;
    background: $bgColor;
  }
  .product {
    // overflow-y: scroll;
    overflow-y: scroll;
    flex: 1;
    padding: 0 .18rem 0 .16rem;
    // background: #fff;
    &__header {
      display: flex;
      line-height: .52rem;
      border-bottom: .01rem solid $content-bgColor;
      font-size: .14rem;
      color: $content-fontcolor;
      &__icon {
        line-height: .52rem;
        font-size: .25rem;
        vertical-align: top;
        color: $btn-color;
      }
      &__clear {
        flex: 1;
        text-align: right;
        &__btn {
          display: inline-block;
        }
      }
    }
    &__item {
      position: relative;
      display: flex;
      border-bottom: .01rem solid $content-bgColor;
      padding: .12rem 0;
      &__checked {
        margin-right: .2rem;
        line-height: .5rem;
        font-size: .25rem;
        color: $btn-color;
      }
      &__img {
        margin: 0 .16rem 0 0;
        width: .68rem;
        height: .68rem;
      }
      &__detail {
        overflow: hidden;
      }
      &__title {
        margin-bottom: .06rem;
        font-weight: normal;
        line-height: .2rem;
        font-size: .14rem;
        color: $content-fontcolor;
        @include ellipsis;
      }
      // &__sales {
      //   margin: .06rem 0;
      //   line-height: .16rem;
      //   font-size: .12rem;
      //   color: $content-fontcolor;
      // }
      &__price {
        line-height: .2rem;
        font-size: .14rem;
        color: $highlight-color;
      }
      &__yen {
        font-size: .12rem;
      }
      &__origin {
        margin-left: .06rem;
        font-size: .12rem;
        color: $light-fontColor;
        text-decoration: line-through;
      }
      .product__number {
        position: absolute;
        right: 0;
        bottom: .1rem;
        color: $content-fontcolor;
        &__minus, &__plus {
          display: inline-block;
          width: .2rem;
          height: .2rem;
          line-height: .16rem;
          border-radius: 50%;
          font-size: .2rem;
          text-align: center;
        }
        &__minus {
          margin-right: .1rem;
          border: .01rem solid $medium-fontColor;
          color: $medium-fontColor;
        }
        &__plus {
          margin-left: .1rem;
          background: $btn-color;
          color: $bgColor;
        }
      }
    }
  }

  // 购物车底部
  .check {
    display: flex;
    height: .5rem;
    line-height: .5rem;
    &__icon {
      position: relative;
      width: .84rem;
      line-height: .5rem;
      &__img {
        display: block;
        margin: .12rem auto;
        width: .28rem;
        height: .26rem;
      }
      &__tag {
        position: absolute;
        padding: 0 .01rem;
        left: .46rem;
        right: .17rem;
        top: .03rem;
        min-width: .2rem;
        height: .2rem;
        line-height: .2rem;
        text-align: center;
        background: $highlight-color;
        border-radius: .1rem;
        transform: scale(.5);
        transform-origin: left center;
        color: $bgColor;
      }
    }
    &__info {
      flex: 1;
      font-size: .12rem;
      color: #333;
      &__price {
        font-size: .18rem;
        color: $highlight-color;
      }
    }
    &__btn {
      width: .98rem;
      text-align: center;
      font-size: .14rem;
      color: $bgColor;
      background: #4FB0F9;
      a {
        color: $bgColor;
      }
    }
  }
</style>

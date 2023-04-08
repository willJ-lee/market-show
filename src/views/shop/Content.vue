<template>
  <div class="content">
    <div class="category">
      <ul class="category_content">
        <li
          :class="{'category__item': true, 'category__item--active': currentTab === item.tab}"
          v-for="item in categories" :key='item.name'
          @click="() => handleTabClick(item.tab)"
          >
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="product">
      <div class="product__item" v-for="item in list" :key="item._id">
        <img class="product__item__img" :src="item.imgUrl">
        <div class="product__item__detail">
          <h4 class="product__item__title">{{item.name}}</h4>
          <p class="product__item__sales">月售{{item.sales}}件</p>
          <p class="product__item__price">
            <span class="product__item__yen">&yen;</span>{{item.price}}
            <span class="product__item__origin">&yen;{{item.oldPrice}}</span>
          </p>
        </div>
        <div class="product__number">
          <span class="product__number__minus" @click="() => { changeCartItem(shopId, item._id, item, -1, shopName) }">-</span>
          {{ getProductCartCount(shopId, item._id) }}
          <!-- {{cartList?.[shopId]?.productList?.[item._id]?.count || 0 }} -->
          <span class="product__number__plus" @click="() => { changeCartItem(shopId, item._id, item, 1, shopName) }">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '../../utils/request.js'
import { useCommonCartEffect } from '../../effects/cartEffects.js'

// tab标签常量
const categories = [
  { name: '全部商品', tab: 'all' },
  { name: '秒杀', tab: 'seckill' },
  { name: '新鲜水果', tab: 'fruit' }
]
// 根据 tab 切换逻辑
const useTabEffect = () => {
  const currentTab = ref(categories[0].tab)
  const handleTabClick = (tab) => {
    currentTab.value = tab
  }
  return { currentTab, handleTabClick }
}
// 列表内容相关逻辑
const useCurrentListEffect = (currentTab, shopId) => {
  const content = reactive({ list: [] })
  const getContentData = async () => {
    const result = await get(`/api/shop/${shopId}/products`, { tab: currentTab.value })
    if (result?.errno === 0 && result?.data?.length) {
      content.list = result.data
    }
  }
  watchEffect(() => {
    getContentData(currentTab)
  })
  const { list } = toRefs(content)
  return { list, getContentData }
}

// 购物车相关逻辑
const useCartEffect = () => {
  const store = useStore()
  const { cartList, changeCartItemInfo } = useCommonCartEffect()
  const changeShopName = (shopId, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
  }
  const changeCartItem = (shopId, productId, item, num, shopName) => {
    changeCartItemInfo(shopId, productId, item, num)
    changeShopName(shopId, shopName)
  }
  // 获取数据里的商品数量
  const getProductCartCount = (shopId, productId) => {
    return cartList?.[shopId]?.productList?.[productId]?.count || 0
  }
  return { cartList, changeCartItem, getProductCartCount }
}

export default {
  name: 'Content',
  props: ['shopName'],
  setup () {
    const route = useRoute()
    const shopId = route.params.id
    const { currentTab, handleTabClick } = useTabEffect()
    const { list, getContentData } = useCurrentListEffect(currentTab, shopId)
    const { cartList, changeCartItem, getProductCartCount } = useCartEffect()
    getContentData()
    return { categories, currentTab, list, handleTabClick, shopId, changeCartItem, cartList, getProductCartCount }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';

.content {
  display: flex;
  position: absolute;
  top: 1.52rem;
  right: 0;
  bottom: .5rem;
  left: 0;
}
.category {
  overflow-y: scroll;
  width: .76rem;
  height: 100%;
  background: $search-bgcolor;
  &__content {
    height: 100%;
  }
  &__item {
    text-align: center;
    line-height: .4rem;
    font-size: .14rem;
    color: $content-fontcolor;
    &--active {
      border-radius: .02rem;
      background: $bgColor;
    }
  }
}
.product {
  // overflow-y: scroll;
  overflow-y: scroll;
  flex: 1;
  padding: 0 .18rem 0 .16rem;
  &__item {
    position: relative;
    display: flex;
    border-bottom: .01rem solid $content-bgColor;
      padding: .12rem 0;
    &__img {
      margin: 0 .16rem 0 0;
      width: .68rem;
      height: .68rem;
    }
    &__detail {
      overflow: hidden;
    }
    &__title {
      font-weight: normal;
      line-height: .2rem;
      font-size: .14rem;
      color: $content-fontcolor;
      @include ellipsis;
    }
    &__sales {
      margin: .06rem 0;
      line-height: .16rem;
      font-size: .12rem;
      color: $content-fontcolor;
    }
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
</style>

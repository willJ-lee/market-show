<template>
<div class="wraper">
  <div class="search">
    <div class="search__back iconfont" @click='handleBackClick'>&#xe6db;</div>
    <div class="search__content">
      <span class="search__content__icon iconfont">&#xe600;</span>
      <input type="text" class="search__content__input" placeholder="请输入商品名称搜索">
    </div>
  </div>
  <ShopInfo :nearbyItem="nearbyItem" :hindenborder= true v-show='nearbyItem.imgUrl' />
  <Content :shopName='nearbyItem.name'/>
  <Cart />
</div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import ShopInfo from '../../components/ShopInfo.vue'
import Content from './Content.vue'
import Cart from './Cart.vue'
import { get } from '../../utils/request.js'

// 根据点击id获取相对应的内容
const useShopInfoEffect = () => {
  const route = useRoute()
  const data = reactive({ nearbyItem: {} })
  const getnearbyItem = async () => {
    const result = await get(`/api/shop/${route.params.id}`)
    if (result?.errno === 0 && result?.data) {
      data.nearbyItem = result.data
    }
  }
  const { nearbyItem } = toRefs(data)
  return { nearbyItem, getnearbyItem }
}
// 点击back返回上级页面
const useBackBefore = () => {
  const router = useRouter()
  const handleBackClick = () => {
    router.back()
  }
  return { handleBackClick }
}
export default {
  name: 'Shop',
  components: { ShopInfo, Content, Cart },
  setup () {
    const { router } = useRouter
    const { nearbyItem, getnearbyItem } = useShopInfoEffect()
    const { handleBackClick } = useBackBefore()
    getnearbyItem()
    return { nearbyItem, handleBackClick }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';

.wraper {
  padding: 0 .18rem;
}
.search {
  display: flex;
  margin: .16rem 0 .16rem;
  height: .32rem;
  &__back {
    width: .30rem;
    line-height: .32rem;
    font-size: .3rem;
    color: #B6B6B6;
    // background: #000;
  }
  &__content {
    display: flex;
    flex: 1;
    background: $search-bgcolor;
    border-radius: .16rem;
    &__icon {
      margin: 0 .16rem 0;
      width: .16rem;
      line-height: .32rem;
      font-size: .18rem;
      color: $input-color;
    }
    &__input {
      padding: 0 .16rem 0 0;
      width: 100%;
      border: none;
      background: none;
      outline: none;
      font-size: .14rem;
      color: $content-fontcolor;
    }
  }
}
</style>

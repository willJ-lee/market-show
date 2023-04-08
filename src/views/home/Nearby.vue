<template>
   <!-- 附近推荐 -->
    <div class="nearby">
      <h3 class="nearby__title">附近店铺</h3>
      <router-link :to='`/shop/${nearbyItem._id}`'  v-for="nearbyItem in nearbyList" :key="nearbyItem._id">
        <ShopInfo :nearbyItem='nearbyItem'/>
      </router-link>
    </div>
</template>

<script>
import { ref } from 'vue'
import { get } from '../../utils/request.js'
import ShopInfo from '../../components/ShopInfo.vue'

// 获取附近店铺相关代码
const getNearbyListEffect = () => {
  const nearbyList = ref([])
  const getNearbyList = async () => {
    const result = await get('/api/shop/hot-list')
    if (result?.errno === 0 && result?.data?.length) {
      nearbyList.value = result.data
    }
  }
  return { nearbyList, getNearbyList }
}

export default {
  name: 'Nearby',
  components: { ShopInfo },
  setup () {
    const { nearbyList, getNearbyList } = getNearbyListEffect()
    getNearbyList()
    return { nearbyList }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
 //附近推荐
  .nearby {
    &__title {
      margin-top: .16rem;
      margin-bottom: .14rem;
      font-size: .18rem;
      font-weight: normal;
    }
  }
</style>

<template>
  <div class="wrapper">
    <div class="title">我的订单</div>
    <div class="orders">
      <div class="order" v-for='(item, index) in list' :key="index">
        <div class="order__title">
          {{item.shopName}}
          <span class="order__status">{{!item.isCanceled ? '已取消' : '已下单'}}</span>
        </div>
        <div class="order__content">
          <div class="order__content__imgs">
            <img class="order__content__img" v-for="(imgItem, imgIndex) in item.products " :key="imgIndex" :src='imgItem.product.img'>
          </div>
          <div class="order__info">
            <div class="order__info__price">&yen;{{item.totalPrice}}</div>
            <div class="order__info__count">共{{item.totalCount}}件</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Doker :currentIndex='2' />
</template>

<script>
import { toRefs, reactive } from 'vue'
import Doker from '../../components/Docker.vue'
import { get } from '../../utils/request.js'

const useOrderListEffect = () => {
  const data = reactive({ list: [] })
  const getOrderList = async () => {
    const result = await get('/api/order')
    if (result?.errno === 0 && result?.data?.length) {
      const orderList = result.data
      orderList.forEach((order) => {
        const products = order?.products || []
        let totalPrice = 0
        let totalCount = 0
        products.forEach((productItem) => {
          totalCount += (productItem?.orderSales) || 0
          totalPrice += ((productItem?.product?.price * productItem?.orderSales) || 0)
        })
        order.totalPrice = totalPrice
        order.totalCount = totalCount
      })
      data.list = result.data
    }
  }
  getOrderList()
  const { list } = toRefs(data)
  return { list }
}

export default {
  name: 'OrderList',
  components: {
    Doker
  },
  setup () {
    const { list } = useOrderListEffect()
    return { list }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';

  .wrapper {
    overflow-y: auto;
    position: absolute;
    padding: 0 .18rem .2rem .18rem;
    top: 0;
    right: 0;
    bottom: .5rem;
    left: 0;
    background-color: #eee;
  }
  .title {
    margin: 0 -.18rem .16rem;
    line-height: .44rem;
    background-color: $bgColor;
    text-align: center;
    font-size: .16rem;
    color: #333;
  }
  .orders {
  }
  .order {
    padding: .16rem;
    margin-bottom: .16rem;
    background-color: $bgColor;
    &__title {
      margin-bottom: .16rem;
      line-height: .22rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }
    &__status {
      float: right;
      font-size: .14rem;
      color: $light-fontColor;
    }
    &__content {
      display: flex;
      &__imgs {
        flex: 1;
      }
      &__img {
        margin-right: .12rem;
        width: .4rem;
        height: .4rem;
      }
    }
    &__info {
      width: .7rem;
      &__price {
        margin-bottom: .04rem;
        line-height: .2rem;
        font-size: .14rem;
        color: $highlight-color;
        text-align: right;
      }
      &__count {
        font-size: .12rem;
        text-align: right;
        color: $content-fontcolor;
      }
    }
  }
</style>

<template>
  <div class="order">
    <div class="order__price">实付金额
      <span class="order__price__money">&yen;{{calculations.price}}</span>
    </div>
    <div class="order__btn" @click='() => handleShowConfirm(true)'>提交订单</div>
  </div>
  <div class="mask"  v-if='showConfirm' @click='() => handleShowConfirm(false)'>
    <div class="mask__content">
      <div class="mask__content__title">确认要离开收银台?</div>
      <div class="mask__content__desc">请尽快完成支付，否则将被取消</div>
      <div class="mask__content__btns">
        <div class="mask__content__btn mask__content__btn--left" @click="() => { handleConfirmOrder(true) }">取消订单</div>
        <div class="mask__content__btn mask__content__btn--right" @click="() => { handleConfirmOrder(false) }">确认支付</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useCommonCartEffect } from '../../effects/cartEffects.js'
import { post } from '../../utils/request.js'

// 订单下单逻辑
const useMakeOrder = (productList, shopId, shopName) => {
  const router = useRouter()
  const store = useStore()
  const handleConfirmOrder = async (iscanceled) => {
    const products = []
    for (let i in productList.value) {
      const product = productList.value[i]
      products.push({ id: parseInt(product._id, 10), num: product.count })
      // console.log(products)
    }
    try {
      const result = await post('/api/order', {
        addressId: 1,
        shopId,
        shopName: shopName.value,
        iscanceled,
        products
      })
      if (result?.errno === 0) {
        router.push({ name: 'OrderList' })
        store.commit('clearCart', shopId)
      }
    } catch (e) {
      alert('请求失败')
    }
  }
  return { handleConfirmOrder }
}

// 蒙层显示逻辑
const useMaskChange = () => {
  const showConfirm = ref(false)
  const handleShowConfirm = (status) => {
    showConfirm.value = status
  }
  return { showConfirm, handleShowConfirm }
}
export default {
  name: 'Order',
  setup () {
    const route = useRoute()
    // const shopId = parseInt(route.params.id)
    const shopId = route.params.id
    const { calculations, productList, shopName } = useCommonCartEffect(shopId)
    const { showConfirm, handleShowConfirm } = useMaskChange()
    const { handleConfirmOrder } = useMakeOrder(productList, shopId, shopName)
    return { calculations, handleConfirmOrder, showConfirm, handleShowConfirm }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';

  // 底部
  .order {
    position: fixed;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding-left: .18rem;
    box-sizing: border-box;
    left: 0;
    right: 0;
    bottom: 0;
    height: .49rem;
    line-height: .49rem;
    background-color: $bgColor;
    &__price {
      font-size: 14px;
      color: $content-fontcolor;
      font-size: .14rem;
      line-height: .20rem;
      &__money {
        font-size: .16rem;
        line-height: .22rem;
        font-weight: bold;
      }
    }
    &__btn {
      width: .98rem;
      background-color: #4FB0F9;
      text-align: center;
      font-size: .14rem;
      color: $bgColor;
    }
  }

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.50);
    &__content {
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      width: 3rem;
      height: 1.57rem;
      background-color: #fff;
      text-align: center;
      border-radius: .04rem;
      &__title {
        margin: .24rem 0 0 0;
        font-size: .18rem;
        color: #333;
      }
      &__desc {
        margin: .08rem 0 0 0;
        font-size: .14rem;
        color: #666;
      }
      &__btns {
        display: flex;
        margin: .24rem .58rem;
      }
      &__btn {
        flex: 1;
        width: .8rem;
        line-height: .32rem;
        border-radius: .16rem;
        font-size: .14rem;
        &--left {
          margin-right: .12rem;
          border: .01rem solid #4FB0F9;
          color: #0091FF;
        }
        &--right {
          margin-left: .12rem;
          background: #4FB0F9;
          color: #fff;
          border: .01rem solid #fff;
        }
      }
    }
  }
</style>

<template>
  <div class="top">
      <div class="top__header">
        <div class="iconfont top__header__back" @click="handleClickBack">&#xe6db;</div>
        确认订单
      </div>
      <div class="top__receiver">
        <div class="top__receiver__title">收货地址</div>
        <div class="top__receiver__address">北京理工大学国防科技园2号楼10层</div>
        <div class="top__receiver__info">
          <span class="top__receiver__info__name">瑶妹（先生）</span>
          <span class="top__receiver__info__name">18539150233</span>
        </div>
        <div class="iconfont top__receiver__enter">&#xe6db;</div>
      </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'TopArea',
  setup () {
    const router = useRouter()
    const handleClickBack = () => {
      router.back()
    }
    return { handleClickBack }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/viriables.scss';
  .top {
    position: relative;
    padding: 0 .18rem;
    margin: 0 -.18rem;
    height: 1.96rem;
    background-size: 100% 1.59rem;
    background-image: linear-gradient(0deg, rgba(0,145,255,0.00) 4%, $btn-color 50%);
    background-repeat: no-repeat;
    &__header {
      position: relative;
      padding-top: .26rem;
      line-height: .24rem;
      text-align: center;
      font-size: .16rem;
      color: $bgColor;
      &__back {
        position: absolute;
        left: 0;
        line-height: .22rem;
        font-size: .22rem;
      }
    }
    &__receiver {
      position: absolute;
      padding: .16rem .16rem;
      left: .18rem;
      right: .18rem;
      bottom: 0;
      height: 1.11rem;
      box-sizing: border-box;
      background-color: $bgColor;
      border-radius: .04rem;
      &__title {
        line-height: .22rem;
        font-size: .16rem;
        padding-bottom: .14rem;
        color: $content-fontcolor;
      }
      &__address {
        line-height: .2rem;
        font-size: .14rem;
        padding-bottom: .06rem;
        color: $content-fontcolor;
      }
      &__info__name {
        font-size: .14rem;
        color: #666;
      }
      &__enter {
        transform: translateY(-50%) rotate(180deg);
        position: absolute;
        top: 50%;
        right: .16rem;
        // margin-top: -.08rem;
        // width: .16rem;
        // height: .16rem;
        font-size: .22rem;
        // transform: translateY(-50%);
      }
    }
  }
</style>

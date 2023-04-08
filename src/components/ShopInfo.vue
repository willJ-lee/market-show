<template>
  <div class="shop" >
    <img class="shop__img" :src="nearbyItem.imgUrl">
    <div class="shop__content" :class="{'shop__content': true, 'shop__content__borded': hindenborder ? false : true}">
      <div class="shop__content__title">{{nearbyItem.name}}</div>
      <div class="shop__content__tags">
        <span class="shop__content__tag">月售: {{nearbyItem.sales}}</span>
        <span class="shop__content__tag">起送¥ {{nearbyItem.expressLimit}}</span>
        <span class="shop__content__tag">基础运费¥ {{nearbyItem.expressPrice}}</span>
      </div>
      <p class="shop__content__highlight">{{nearbyItem.slogan}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopInfo',
  props: ['nearbyItem', 'hindenborder']
}
</script>

<style lang="scss" scoped>
@import '../style/viriables.scss';
.shop {
  display: flex;
  margin-bottom: .12rem;
  &__img {
    padding-right: .16rem;
    width: .56rem;
    height: .56rem;
  }
  &__content {
  padding-bottom: .12rem;
    &__borded {
      border-bottom: 1px solid $content-bgColor;
    }
    &__title {
      line-height: .22rem;
      font-size: .16rem;
      color: $content-fontcolor;
    }
    &__tags {
      margin-top: .08rem
    }
    &__tag {
      margin-right: .16rem;
      line-height: .18rem;
      font-size: .13rem;
      color: $content-fontcolor;
    }
    &__highlight {
      margin-top: .08rem;
      line-height: .18rem;
      font-size: .13rem;
      color: $highlight-color;
    }
  }
}

</style>

<template>
  <!-- 底部dock栏 -->
  <div class="docker">
    <div :class="{'docker__item' : true, 'docker__item--active': index === currentIndex}" class="docker__item" v-for='(item, index) in dockerList' :key='item.icon'>
      <router-link :to='item.to'>
        <div class="iconfont" v-html="item.icon"></div>
        <p class="docker__title">{{item.text}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Docker',
  props: ['currentIndex'],
  setup () {
    const dockerList = [
      { icon: '&#xe867;', text: '首页', to: { name: 'Home' } },
      { icon: '&#xe6e8;', text: '购物车', to: { name: 'CartList' } },
      { icon: '&#xe787;', text: '订单', to: { name: 'OrderList' } },
      { icon: '&#xe660;', text: '我的', to: { name: 'Home' } }
    ]
    return { dockerList }
  }
}
</script>

<style lang='scss' scoped>
@import '../style/viriables.scss';
 // dock栏布局
  .docker {
    display: flex;
    box-sizing: border-box;
    position: absolute;
    padding: 0 .18rem;
    left: 0;
    bottom: 0;
    width: 100%;
    height: .5rem;
    border-top: .01rem solid $content-bgColor;
    color: $content-fontcolor;
    &__item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      flex: 1;
      text-align: center;
      a {
        color: $content-fontcolor;
      }
      .iconfont {
        font-size: .2rem;
      }
      &--active {
        a {
          color: #1FA4FC
        }
      }
    }
    &__title {
      margin: 0;
      font-size: .12rem
    }
  }
</style>

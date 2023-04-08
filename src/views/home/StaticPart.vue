<template>
   <!-- 顶部定位布局 -->
    <div class="location">
      <span class="iconfont location__icon__left">&#xe790;</span>
      <p class="location__text">北京理工大学国防科技园2号楼10层惆ddak</p>
      <span class="iconfont location__icon__right">&#xe60b;</span>
    </div>
    <!-- 搜索框布局 -->
    <div class="search">
      <div class="iconfont search__icon">&#xe600;</div>
      <input type="text" class="search__input" placeholder="山姆会员商店优惠商品">
    </div>
    <!-- banner -->
    <div class="banner">
      <img class="banner__img" src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="">
    </div>
    <!-- icon图标点击区域 -->
    <div class="icons">
      <div class="icons__item" v-for='item in iconsList' :key='item.id'>
        <img class="icons__item__img" :src="item.imgUrl">
        <p class="icons__item__desc">{{item.desc}}</p>
      </div>
    </div>
    <!-- 分隔部分 -->
    <div class="gap"></div>
</template>

<script>
export default {
  name: 'StaticPart',
  setup () {
    const iconsList = [
      {
        id: 1,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        desc: '水果店'
      },
      {
        id: 2,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        desc: '超市便利'
      },
      {
        id: 3,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        desc: '超市便利'
      },
      {
        id: 4,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        desc: '医药健康'
      },
      {
        id: 5,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        desc: '超市便利'
      },
      {
        id: 6,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        desc: '超市便利'
      },
      {
        id: 7,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        desc: '蔬菜牛奶'
      },
      {
        id: 8,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        desc: '超市便利'
      },
      {
        id: 9,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        desc: '超市便利'
      },
      {
        id: 10,
        imgUrl: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        desc: '超市便利'
      }
    ]
    return { iconsList }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';
@import '../../style/mixins.scss';
 .location {
    display: flex;
    align-items: center;
    position: relative;
    padding: .16rem 0;
    height: .22rem;
    line-height: .22rem;
    font-size: .16rem;
    color: $content-fontcolor;
    &__icon__left {
      margin-right: .097rem;
      font-size: .2rem;
      left: 0;
    }
    &__icon__right {
      margin-left: .097rem;
      position: absolute;
      font-size: .2rem;
      right: 0
    }
    &__text {
      // display: inline-block;
      margin-right: .2rem;
      @include ellipsis;
    }
  }
  // 搜索部分
  .search {
    float: left;
    margin-bottom: .12rem;
    width: 100%;
    height: .32rem;
    background: #f5f5f5;
    border-radius: .16rem;
    &__input {
      float: left;
      width: 2rem;
      line-height: .32rem;
      padding-left: .10rem;
      border: none;
      outline: none;
      background: $search-bgcolor;
      font-size: .14rem;
      color: $input-color;
    }
    &__icon {
      float: left;
      margin-left: .16rem;
      font-size: .16rem;
      line-height: .32rem;
      color: $input-color;
    }
  }
  // banner
  .banner {
    // height: 0;
    // overflow: hidden;
    // padding-bottom: 25.4%;
    &__img {
      width: 100%;
    }
  }
  //icons图标功能区域
  .icons {
    display: flex;
    flex-wrap: wrap;
    &__item {
      display: flex;
      flex-wrap: wrap;
      // justify-items: center;
      // align-items: center;
      justify-content: center;
      margin-top: .16rem;
      width: 20%;
      &__img {
        width: .4rem;
        height: .4rem;
      }
      &__desc {
        margin-top: .06rem;
        color: $content-fontcolor ;
      }
    }
  }
  // 分隔部分
  .gap {
    margin: .16rem -.18rem 0;
    height: .1rem;
    background: $content-bgColor;
  }
</style>

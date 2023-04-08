import { createStore } from 'vuex'

// 本地存储相关方法
const setLocalCartData = (state) => {
  const { cartList } = state
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

const getLocalCartData = () => {
  return localStorage.cartList !== undefined ? JSON.parse(localStorage.cartList) : {}
}

export default createStore({
  state: {
    // 数据格式: {shopId: { shopName: '', productList: { productId: { ... } } }}
    cartList: getLocalCartData()
  },
  getters: {
  },
  mutations: {
    changeCartItemInfo (state, payload) {
      // 结构传递过来的数据
      const { shopId, productId, productInfo } = payload
      // 通过商铺ID获取cartlist中的商铺信息, 判断商铺信息是否存在, 没有的话赋值为默认值
      let shopInfo = state.cartList[shopId] || {
        shopName: '', productList: {}
      }
      // 获取商铺中的商铺
      let product = shopInfo.productList[productId]
      // 判断商品是否存在,不存在则将传递过来的商品productinfo保存到product中,将count赋值为0
      if (!product) {
        product = productInfo
        product.count = 0
      }
      // count数值加一
      product.count = product.count + payload.number
      if (payload.number > 0) { product.check = true }
      // count的值小于0则重新赋值为0
      if (product.count < 0) {
        product.count = 0
      }
      // 将修改过的product放回商铺中,替换原来的数据
      shopInfo.productList[productId] = product
      // 将商铺信息存放到cartList中
      state.cartList[shopId] = shopInfo

      setLocalCartData(state)
    },

    // 修改传递过来店铺的名字
    changeShopName (state, payload) {
      const { shopId, shopName } = payload
      const shopInfo = state.cartList[shopId] || {
        shopNmae: '', productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo

      setLocalCartData(state)
    },

    // 改变购物车物品选中状态
    changeCartItemChecked (state, payload) {
      const { shopId, productId } = payload
      const product = state.cartList[shopId].productList[productId]
      product.check = !product.check

      setLocalCartData(state)
    },

    // 全选功能
    setCartItemSelect (state, payload) {
      const { shopId } = payload
      const products = state.cartList[shopId].productList
      if (products) {
        for (const i in products) {
          const product = products[i]
          product.check = true
        }
      }

      setLocalCartData(state)
    },

    // 清空购物车
    cleanCartProducts (state, payload) {
      const { shopId } = payload
      state.cartList[shopId].productList = {}

      setLocalCartData(state)
    },

    // 完成支付后清空购物车
    clearCart (state, shopId) {
      state.cartList[shopId].productList = {}
    }
  },
  actions: {
  },
  modules: {
  }
})

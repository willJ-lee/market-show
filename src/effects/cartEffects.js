import { computed } from 'vue'
import { useStore } from 'vuex'

export const useCommonCartEffect = (shopId) => {
  const store = useStore()
  const cartList = store.state.cartList
  // 添加物品逻辑
  const changeCartItemInfo = (shopId, productId, productInfo, number) => {
    store.commit('changeCartItemInfo', { shopId, productId, productInfo, number })
  }

  // 获取productList
  const productList = computed(() => {
    const productList = cartList[shopId]?.productList
    const notEmptyProductList = {}
    for (let i in productList) {
      const product = productList[i]
      if (product.count > 0) {
        notEmptyProductList[i] = product
      }
    }
    return notEmptyProductList
  })

  // 获取shopName
  const shopName = computed(() => {
    const shopName = cartList[shopId].shopName
    return shopName
  })

  // 购物车物品数量 价格 是否选中状态的相关逻辑
  const calculations = computed(() => {
    const productList = cartList[shopId]?.productList
    let total = 0
    let price = 0
    let allCheck = true
    if (productList) {
      for (const i in productList) {
        const product = productList[i]
        // 计算数量
        total += product.count
        // 计算总价
        if (product.check) {
          price += (product.count * product.price)
        }
        // 是否全选状态
        if (product.count > 0 && !product.check) {
          allCheck = false
        }
      }
    }
    return { total, price: price.toFixed(2), allCheck }
  })

  return { changeCartItemInfo, cartList, productList, shopName, calculations }
}

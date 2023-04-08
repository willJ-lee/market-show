<template>
  <div class="toast">{{message}}</div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  name: 'Toast',
  props: ['message']
}
// 封装登录报错蒙层 然后导出
export const useToastEffect = () => {
  const toastData = reactive({
    showToast: false,
    toastMessage: ''
  })
  const errMessage = (message) => {
    toastData.showToast = true
    toastData.toastMessage = message
    setTimeout(() => {
      toastData.showToast = !toastData.showToast
    }, 2000)
  }
  const { showToast, toastMessage } = toRefs(toastData)
  return { showToast, toastMessage, errMessage }
}
</script>

<style lang='scss' scoped>
@import '../style/viriables.scss';
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    padding: .1rem;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, .35);
    border-radius: .05rem;
    color: $bgColor;
  }
</style>

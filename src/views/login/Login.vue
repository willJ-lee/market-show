<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png">
    <div class="wrapper__input">
      <input class="wrapper__input__content" v-model="username" placeholder="请输入用户名"/>
    </div>
    <div class="wrapper__input">
      <input type="password" class="wrapper__input__content"  v-model="password" placeholder="请输入密码" />
    </div>
    <div class="wrapper__login-button" @click='handlelogin'>登录</div>
    <div class="wrapper__login-link">
      <span class="wrapper__login-link-registe" @click='handleRegisterClcik'>立即注册</span>
      <span class="wrapper__login-link-separate">|</span>
      <span class="wrapper__login-link-reset">忘记密码</span>
    </div>
  </div>
  <Toast v-if='showToast' :message='toastMessage' />
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { post } from '../../utils/request.js'
// 引入弹出蒙层函数
import Toast, { useToastEffect } from '../../components/Toast.vue'

// 跳转到注册页面
const userRegisterEfffect = () => {
  const router = useRouter()
  const handleRegisterClcik = () => {
    router.push({ name: 'Register' })
  }
  return { handleRegisterClcik }
}

// 路由权限跳转 islogin
const useLoginEffect = (errMessage) => {
  const data = reactive({
    username: '',
    password: ''
  })
  const router = useRouter()
  const handlelogin = async () => {
    try {
      const { username, password } = data
      if (username !== '' || password !== '') {
        const result = await post('/api/user/login', {
          username: data.username,
          password: data.password
        })
        if (result?.errno === 0) {
          localStorage.isLogin = true
          router.push({ name: 'Home' })
        } else {
          errMessage('登录失败')
        }
      } else {
        errMessage('请输入用户名或密码')
      }
    } catch (e) {
      errMessage('请求失败')
    }
  }
  const { username, password } = toRefs(data)
  return { username, password, handlelogin }
}

export default {
  name: 'Login',
  components: {
    Toast
  },
  setup () {
    // 解构蒙层函数代码
    const { showToast, toastMessage, errMessage } = useToastEffect()
    const { username, password, handlelogin } = useLoginEffect(errMessage)
    const { handleRegisterClcik } = userRegisterEfffect()
    return { handlelogin, handleRegisterClcik, showToast, toastMessage, username, password }
  }
}
</script>

<style lang='scss' scoped>
@import '../../style/viriables.scss';
  .wrapper {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    &__img {
      display: block;
      margin:0 auto .4rem;
      width: .66rem;
      height: .66rem
    }
    &__input {
      margin: 0 .4rem .16rem;
      padding: 0 .16rem;
      height: .48rem;
      background: #F9F9F9;
      border: 1px solid rgba(0,0,0,0.10);
      border-radius: .06rem;;
      &__content {
        width: 100%;
        line-height: .48rem;
        border: none;
        outline: none;
        font-size: .16rem;
        background: none;
        &::placeholder {
          color: $content-notice-fontcolor;
        }
      }
    }
    &__login-button {
      margin: .32rem .4rem .16rem;
      height: .48rem;
      box-shadow: 0 .04rem .08rem 0 rgba(0,145,255,0.32);
      border-radius: .04rem;
      background: $btn-color;
      text-align: center;
      line-height: .48rem;
      font-size: .16rem;
      color: $bgColor;
    }
    &__login-link {
      text-align: center;
      font-size: .14rem;
      color: $content-notice-fontcolor;
      &-separate {
        margin: 0 .12rem;
      }
    }
  }
</style>

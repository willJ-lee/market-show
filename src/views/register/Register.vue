<template>
  <div class="wrapper">
    <img class="wrapper__img" src="http://www.dell-lee.com/imgs/vue3/user.png">
    <div class="wrapper__input">
      <input v-model="username" class="wrapper__input__content" placeholder="请输入用户名"/>
    </div>
    <div class="wrapper__input">
      <input v-model="password" type="password" class="wrapper__input__content" placeholder="请输入密码" />
    </div>
     <div class="wrapper__input">
      <input v-model="checkPassword" type="password" class="wrapper__input__content" placeholder="确认密码" />
    </div>
    <div class="wrapper__register-button" @click='handleRegister'>立即注册</div>
    <div class="wrapper__register-link">
      <span class="wrapper__register-link-login" @click='handleLoginClick'>已有账号去登录</span>
    </div>
  </div>
  <Toast v-if='showToast' :message="toastMessage"/>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { post } from '../../utils/request.js'
import Toast, { useToastEffect } from '../../components/Toast.vue'

// 注册页面校验,成功后跳转登录页面
const useRegisterEffect = (errMessage) => {
  const router = useRouter()
  const data = reactive({
    username: '',
    password: '',
    checkPassword: ''
  })
  const handleRegister = async () => {
    try {
      const result = await post('/api/user/register', {
        username: data.username,
        password: data.password,
        checkPassword: data.checkPassword
      })
      if (result?.errno === 0) {
        localStorage.isRegister = true
        router.push({ name: 'Login' })
      } else {
        errMessage('注册失败')
      }
    } catch (e) {
      errMessage('请求失败')
    }
  }
  const { username, password, checkPassword } = toRefs(data)
  return { username, password, checkPassword, handleRegister }
}
// 注册页面快捷跳转登录页面
const userRegisterToLoginEfffect = () => {
  const router = useRouter()
  const handleLoginClick = () => {
    router.push({ name: 'Login' })
  }
  return { handleLoginClick }
}

export default {
  name: 'Register',
  components: {
    Toast
  },
  setup () {
    // const router = useRouter()
    const { showToast, toastMessage, errMessage } = useToastEffect()
    const { username, password, checkPassword, handleRegister } = useRegisterEffect(errMessage)
    const { handleLoginClick } = userRegisterToLoginEfffect()
    return { handleLoginClick, username, password, checkPassword, handleRegister, showToast, toastMessage }
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
    &__register-button {
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
    &__register-link {
      text-align: center;
      font-size: .14rem;
      color: $content-notice-fontcolor;
    }
  }
</style>

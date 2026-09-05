import { lo } from 'element-plus/es/locales.mjs'
import { createStore } from 'vuex'
import { login,getinfo} from '~/api/manager'
import{
    setToken,
    removeToken
} from '~/composables/auth'
import { logout } from '../api/manager'
// 创建一个新的 store 实例
const store = createStore({
  state () {
    return {
      //用户信息
      user:{}
    }
  },
  mutations: {
    //记录用户信息
    SET_USERINFO(state,user){   //这是一个 mutation 的常量名称，不是普通数据。
        state.user=user
    }
  },
  actions:{
    //登录
    login({commit},{username,password}){  // ← commit 从 Pinia/Vuex 自动传进来  //commit是 Pinia（或 Vuex）在调用 actions 时自动传进来的一个函数，用于触发 mutations 来修改 state 数据。
      return new Promise((resolve,reject)=>{
        login(username,password).then(res=>{
          setToken(res.token)

          resolve(res)
        }).catch(err=>reject(err))
      })
    },

    //获取当前用户信息
    getinfo({commit}){  
      return new Promise((resolve,reject)=>{
        getinfo().then(res=>{
          commit("SET_USERINFO",res)
          resolve(res)
        }).catch(err=>reject(err))
      })
    },

    //退出登录
    logout({commit}){
      //移除cookie里的token
      removeToken()
      //清除当前用户状态vuex
      commit("SET_USERINFO",{})
    }



  }
})

export default store
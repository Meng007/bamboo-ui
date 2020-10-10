import Vue from 'vue'
import Vuex from 'vuex'
import { login, logout, getInfo } from '@/api/login/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    /*共享用户信息*/
    user:false,
    isAdmin: '',
    avatar:'',
    /*token*/
    token: '',
    isline: true

  },
  mutations: {
    RM_USER:(state) =>{
      state.user = ''
      state.avatar = ''
      state.isline = true
    },
    SET_ICON:(state,data) =>{
      state.avatar = data
    },
    SET_USER: (state,user) =>{
      state.user = user
      state.isline = false
    },
    SET_TOKEN: (state, token) => {
      state.token = token
    },
  },
  actions: {
    Login({commit},userInfo){
      const username = userInfo.username.trim()
      const password = userInfo.password
      const type = userInfo.type
      const code = userInfo.code
      const uuid = userInfo.uuid

      return new Promise((resolve, reject) => {
        login(username, password,type, code, uuid).then(res => {
          setToken(res.data.token)
          commit('SET_TOKEN', res.token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    Logout({commit}){
      return new Promise((resolve,reject) =>{
        logout().then(res =>{
          commit("SET_USER","")
          commit("RM_USER")
          removeToken()
          resolve(res)
        }).catch(error =>{
          reject(error)
        })
      })

    },
    GetUser({commit}){
      return new Promise((resolve,reject) =>{
        getInfo().then(res =>{
          if (res.status ===200){
            console.log(res)
            const avatar = res.data.icon == null ? require("@/assets/xs/xs.jpg") : process.env.VUE_APP_BASE_API + res.data.icon;
            commit('SET_USER',res.data)
            commit('SET_ICON', avatar)
            resolve(res)
          }
        }).catch(error =>{
          reject(error)
        })
      })

    },
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  },
  modules: {
  },
  getters:{
    avatar: state => state.avatar,
    user: state => state.user,
    isline: state => state.isline
  }
})

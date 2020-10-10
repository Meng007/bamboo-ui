import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login','/index','/lost','/take','/love','/about','/register']
const admin = ['/m/*']

router.beforeEach((to, from, next) => {
  NProgress.start()
  console.log(to)
  if (getToken()) {
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {

      if (store.getters.user == '') {
        store.dispatch('GetUser').then(res =>{
          if (to.path.startsWith("/admin")){
            if (store.getters.user.isAdmin ===1){
              next()
            }else {
              next({path: from.fullPath})
              NProgress.done()
            }
          }else {
            next()
          }
        })
      } else {
        if (to.path.startsWith("/admin")){
          if (store.getters.user.isAdmin ===1){
            next()
          }else {
            next({path: from.fullPath})
            NProgress.done()
          }
        }else {
          next()
        }
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

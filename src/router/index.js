import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
      /*首页*/
  {
    path: '/',
    name: 'Home',
    redirect: '/index',
    component: Home,
    children:[
      {
        path: '/index',
        name: 'index',
        component: () =>import('../views/Index.vue')
      },
      {
        path: '/lost',
        name: 'lost',
        component: () =>import('../views/page/Lost.vue')
      },
      {
        path: '/take',
        name: 'take',
        component: () =>import('../views/page/Take.vue')
      },
      {
        path: '/love',
        name: 'love',
        component: () =>import('../views/page/Love.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () =>import('../views/page/About.vue')
      }
    ]
  },
    {
      name: '404',
      path: '/404',
      component: () => import('../views/error/404.vue')
    },
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/set/lost',
      name: 'setLost',
      component:() =>import('../views/user/SetLost.vue')
    },
    {
      path: '/set/take',
      name: 'setTake',
      component:() =>import('../views/user/SetTake')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
      /*用户中兴*/
    {
      path: '/user/center',
      name: 'UserCenter',
      component:() =>import('../views/user/UserCenter'),
      redirect: '/my/info',
      children:[
        {
          path: '/my/info',
          name: 'info',
          component: () =>import('../views/user/profile/index.vue')
        },
        {
          path: '/my/goods',
          name: 'goods',
          component: () =>import('../views/user/Goods.vue')
        },
        {
          path: '/my/take',
          name: 'take',
          component: () =>import('../views/user/Take.vue')
        },
        {
          path: '/my/love',
          name: 'love',
          component: () =>import('../views/user/Love.vue')
        },
        {
          path: '/my/xx',
          name: 'xx',
          component: () =>import('../views/user/Xx.vue')
        }
      ]
    },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
      /*管理员*/
      {
          path: '/admin',
          name: 'admin',
          component: () =>import('../views/admin/Index.vue'),
          children:[
             {
              path: '/admin/member',
              name: 'member',
              component: () =>import('../views/admin/UserList.vue')
             },
            {
              path: '/admin/goods',
              name: 'goods',
              component: () =>import('../views/admin/GoodsList.vue')
            },
            {
              path: '/admin/type',
              name: 'type',
              component: () =>import('../views/admin/TypeList.vue')
            },
            {
              path: '/admin/notice',
              name: 'notice',
              component: () =>import('../views/admin/NoticeList.vue')
            },
            {
              path: '/admin/about',
              name: 'about',
              component: () =>import('../views/admin/AboutList.vue')
            },
            {
              path: '/admin/love',
              name: 'love',
              component: () =>import('../views/admin/LoveList.vue')
            },
            {
              path: '/admin/lb',
              component: () =>import('../views/admin/Carousel.vue')
            }
        ]
      }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

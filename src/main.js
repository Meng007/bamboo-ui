import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
//parseTime(scope.row.createTime, '{y}-{m}-{d}')
//elementUI 配置
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './permission'
import {parseTime,icons,getFastIcon} from '@/utils/sdz'
Vue.use(ElementUI)
Vue.prototype.parseTime = parseTime
Vue.prototype.incons = icons
Vue.prototype.getFastIcon = getFastIcon
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

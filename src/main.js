// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import store from './components/store'
import Todo from './components/Todo/todo.vue'
import Weather from './components/Weather/weather.vue'
import Aqi from './components/Aqi/aqi.vue'
import Calculator from './components/Calculator/calculator.vue'

//AXIOS
import Axios from 'axios'
//修改Vue原型屬性
Vue.prototype.$ajax = Axios

Vue.config.productionTip = false

Vue.use(VueRouter);

Vue.use(Vuex);

const routes = [
  {
    path:'/',
    //重定向
    redirect:'todo'
  },
  {
    path: '/todo',
    component: Todo
  },
  {
    path: '/weather',
    component: Weather
  },
  {
    path: '/aqi',
    component: Aqi
  },
  {
    path: '/calculator',
    component: Calculator
  }
];

const router = new VueRouter({
  routes,
  linkActiveClass:'active'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
}).$mount('#app')

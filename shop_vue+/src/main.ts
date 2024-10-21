import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from './views/Home.vue'
import Cart from './views/Cart.vue'

createApp(App).use(store).use(router).mount('#app')

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/cart',
        name: 'Cart',
        component: Cart
    }
]
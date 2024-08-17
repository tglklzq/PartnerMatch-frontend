import {createApp} from 'vue'
import App from './App.vue'
// 2. 引入组件样式
import 'vant/lib/index.css';
import '../global.css'

import * as VueRouter from 'vue-router'
import routes from "./config/router";


const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
})

const app = createApp(App)
app.use(router)
app.mount('#app')

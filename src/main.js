import { createApp } from 'vue'
// import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



const app = createApp(App)

app.use(store)
app.use(router)

app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}


import 'virtual:windi.css'//开发服务器启动,在内存中实时生成并注入的样式表    //由 Vite 插件在开发时动态生成的虚拟文件

import "./permisssion"//路由守卫（权限控制）

import "nprogress/nprogress.css"//全局loading进度条

app.mount('#app')

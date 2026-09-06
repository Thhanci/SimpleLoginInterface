import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
import {
    createRouter,
    createWebHashHistory
}from 'vue-router'

import Admin from '~/layouts/admin.vue'
import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'

const routes = [{
    path: "/",               // ← 根路径（后台首页）
    component: Admin,        // ← 先加载布局（admin.vue）
    children: [{
        path: "/",             // ← 子路由根路径
        component: Index,      // ← 再加载首页内容（index.vue）
        meta: { title: "后台首页" }
    }]
},{
    path:"/login",
    component:Login,
    meta:{  //预定义属性
        title:"登录页"  //自定义属性
    }
},{ 
    path: '/:pathMatch(.*)*', 
    name: 'NotFound', 
    component: NotFound 
}]

const router = createRouter({
    history:createWebHashHistory(),//sync
    routes:routes
})

export default router
import router from "~/router";//因为是./router/index 所以可以简写
import { getToken } from "~/composables/auth";
import { 
    toast,
    showFullLoading,
    hideFullLoading
 } from "./composables/util";
import store from "./store";

//全局前置守卫
router.beforeEach(async (to,from,next)=>{
    //显示loading
    showFullLoading()

    // console.log("全局前置守卫")
    
    // console.log("to “你要去哪儿”",to,"from “你从哪来” ",from,"next “放行函数”",next)

    const token = getToken()
    const whiteList = ["/login","/register","/forget"] //白名单，免登录访问的路由

    //没有登录，强制跳转回登录页
    if ((to.path === "/register" || to.path === "/forget")) {
        if (from.path !== "/login") {
            toast("请从登录页进入", "warning")
            return next({ path: from.path ? from.path : "/login" })
        }
    }
    
    if(!token && !whiteList.includes(to.path)){
        toast("请先登录","error")
        return next({path:"/login"})
    }

    //防止重复登录
    if(token && to.path == "/login"){
        toast("请勿重复登录","error")
        return next({path:from.path ? from.path : "/"})
    }

    //如果用户登录了，自动获取用户信息，并存储在vuex 当中
    if(token){
        await store.dispatch("getinfo")
    }


    //设置页面标题
    // console.log(to.meta.title)
    let title =(to.meta.title?to.meta.title:"")+"-demo"
    document.title=title


    next()
}) 

//全局后置守卫
router.afterEach((to, from) => {
  hideFullLoading()
})
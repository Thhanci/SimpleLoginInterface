```text
前端开发面试题：20个常见问题及参考答案

一、JavaScript

1. JavaScript 中 var、let、const 有什么区别？

参考答案：

主要有三个区别：

1. var 存在变量提升，可以重复声明。
2. let 和 const 不能重复声明，并且存在暂时性死区。
3. const 声明的变量不能重新赋值，let 可以。

例如：

let a = 10
a = 20

const b = 10
// b = 20 // 报错

实际开发中一般优先使用 const，需要重新赋值时使用 let，尽量少使用 var。


2. 什么是闭包？你在什么情况下使用过？

参考答案：

闭包就是一个函数能够访问它外部函数作用域中的变量，即使外部函数已经执行结束。

例如：

function outer() {
    let count = 0

    return function () {
        count++
        return count
    }
}

const fn = outer()

console.log(fn()) // 1
console.log(fn()) // 2

这里内部函数一直可以访问 count，所以形成了闭包。

闭包常见的用途有：

- 保存变量
- 实现数据私有
- 防抖和节流
- 柯里化等


3. 什么是 Promise？为什么要使用 Promise？

参考答案：

Promise 是 JavaScript 中处理异步操作的一种方式。

它有三种状态：

- pending：进行中
- fulfilled：成功
- rejected：失败

相比传统的多层回调，Promise 可以让异步代码更加清晰，也方便统一处理成功和失败。

例如：

axios.get('/user')
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })


4. async/await 和 Promise 是什么关系？

参考答案：

async/await 是建立在 Promise 之上的语法糖。

Promise 可以使用：

axios.get('/user')
    .then(res => {
        console.log(res)
    })

使用 async/await 后可以写成：

async function getUser() {
    try {
        const res = await axios.get('/user')
        console.log(res)
    } catch (err) {
        console.log(err)
    }
}

这样写起来更接近同步代码，可读性比较好。


二、Vue

5. Vue 3 中 ref 和 reactive 有什么区别？

参考答案：

ref 和 reactive 都可以实现响应式。

ref 一般适合基本数据类型，也可以存对象：

const count = ref(0)

count.value++

reactive 一般用于对象：

const user = reactive({
    name: '张三',
    age: 20
})

最大的区别是：

ref 访问和修改数据通常需要 .value，而 reactive 不需要。


6. Vue 中父组件和子组件怎么传递数据？

参考答案：

主要有两种：

父传子：使用 props

<Child :name="name" />

子组件：

const props = defineProps({
    name: String
})

子传父：使用 emit

子组件：

const emit = defineEmits(['change'])

emit('change', 'hello')

父组件监听：

<Child @change="handleChange" />

所以可以简单理解：

props：父传子
emit：子传父


7. Vue Router 是干什么的？你项目中为什么使用它？

参考答案：

Vue Router 是 Vue 官方的路由管理工具。

主要作用是实现单页面应用中的页面切换。

例如：

const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path: '/home',
        component: Home
    }
]

我的商城后台项目中需要登录页、首页等多个页面，所以使用 Vue Router 管理不同 URL 对应的组件。


8. Vue 项目中为什么需要 Axios？

参考答案：

Axios 是一个 HTTP 请求库，主要用于前端和后端进行数据通信。

比如登录：

axios.post('/login', {
    username: 'admin',
    password: '123456'
})

后端处理之后返回结果，前端再根据结果进行页面跳转或者提示。

我的项目中就是通过 Axios 完成前后端数据通信。


9. Vue 项目中什么是路由守卫？有什么作用？

参考答案：

路由守卫就是在进入某个路由之前进行判断。

比如后台管理系统中，用户没有登录，就不能直接访问首页。

可以判断 Cookie 或 Token：

router.beforeEach((to, from, next) => {
    const token = getToken()

    if (to.path !== '/login' && !token) {
        next('/login')
    } else {
        next()
    }
})

主要用于：

- 登录验证
- 权限控制
- 页面跳转控制

我的项目中使用 JWT 和 Cookie 实现身份认证和权限拦截。


三、HTTP / 网络

10. HTTP 和 HTTPS 有什么区别？

参考答案：

最大的区别是：

HTTPS = HTTP + SSL/TLS 加密。

HTTP 传输的数据没有经过加密，存在被窃取或者篡改的风险。

HTTPS 会对通信内容进行加密，并且可以验证服务器身份，所以安全性更高。

例如登录时，如果直接使用 HTTP，用户名和密码存在被窃取的风险。


11. 常见的 HTTP 状态码有哪些？

参考答案：

比较常见的有：

200：请求成功

301 / 302：重定向

400：请求参数错误

401：没有认证 / 未登录

403：没有权限

404：资源不存在

500：服务器内部错误

面试中如果问到 401 和 403 的区别，可以重点说：

401 一般表示没有通过身份认证；
403 表示身份可能已经认证，但没有访问权限。


12. 什么是跨域？前端一般怎么解决？

参考答案：

跨域是浏览器的同源策略导致的。

当：

协议
域名
端口

三个有一个不一样，就可能产生跨域问题。

常见解决方式：

1. CORS
2. 开发环境代理
3. JSONP（现在主要用于了解）

实际开发中比较常见的是后端配置 CORS，或者前端开发环境配置代理。


四、Java / 后端

13. 你简历里写了了解 Spring Boot，你能简单介绍一下 Spring Boot 吗？

参考答案：

Spring Boot 是基于 Spring 的快速开发框架。

它主要帮助我们：

- 快速创建 Spring 项目
- 自动配置
- 简化依赖配置
- 内置服务器
- 快速开发 RESTful API

我做过一个基于 Spring Boot 的美食网站后端服务，主要使用 Spring Boot 提供 API 接口，并结合 MySQL 实现数据存储。


14. 什么是 MVC？什么是三层架构？

参考答案：

MVC 可以理解为：

M：Model，数据模型
V：View，视图
C：Controller，控制器

三层架构一般是：

Controller
    ↓
Service
    ↓
Mapper / DAO
    ↓
Database

Controller 负责接收请求，Service 负责业务逻辑，Mapper/DAO 负责数据库操作。

我在美食网站后端项目中采用了 MVC 设计模式和三层架构。


15. 什么是 RESTful API？

参考答案：

RESTful API 是一种 API 设计风格，通常使用 HTTP 请求方法表示不同操作。

例如：

GET    /users       查询用户
POST   /users       创建用户
PUT    /users/1     修改用户
DELETE /users/1     删除用户

这样设计以后，接口的含义比较清晰。


五、MySQL / Redis

16. MySQL 中 WHERE 和 HAVING 有什么区别？

参考答案：

WHERE 是在分组之前进行过滤。

HAVING 是在分组之后进行过滤。

例如：

SELECT department, COUNT(*)
FROM employee
WHERE age > 20
GROUP BY department
HAVING COUNT(*) > 5;

这里：

WHERE：先过滤年龄
GROUP BY：进行分组
HAVING：再过滤分组结果


17. MySQL 中什么是索引？为什么使用索引？

参考答案：

索引可以理解成数据库中的“目录”。

如果一张表有很多数据，没有索引的时候，查询可能需要扫描大量数据。

建立索引以后，可以更快找到对应的数据。

例如：

CREATE INDEX idx_username
ON user(username);

但是索引也不是越多越好，因为索引会占用空间，而且增加、修改数据时也需要维护索引。


18. Redis 是干什么的？和 MySQL 有什么区别？

参考答案：

Redis 是一个基于内存的高性能键值数据库。

它的特点是：

- 速度快
- 支持多种数据结构
- 常用于缓存
- 也可以用于计数、排行榜、Session 等场景

MySQL 主要用于持久化存储业务数据。

可以简单理解：

MySQL：主要负责长期保存数据

Redis：主要负责快速读取数据、缓存数据

例如查询商品信息时，可以先查询 Redis，如果 Redis 没有，再查询 MySQL，然后把结果放入 Redis。


六、项目 / 实习经历

19. 你详细介绍一下你的 Vue3 商城后台项目，你主要负责了什么？

参考答案：

这个项目是一个基于 Vue 3 和 Vite 的商城后台管理项目。

主要使用了：

Vue 3
Vite
Vue Router
Vuex
Element Plus
Axios
WindiCSS
JWT
Cookie

其中 Vue Router 负责路由管理，Vuex 负责全局状态管理，Element Plus 负责 UI 组件，Axios 负责前后端通信。

登录认证方面使用 JWT 和 Cookie，并通过路由拦截实现权限控制。

这个项目主要让我熟悉了 Vue 项目的完整开发流程，包括页面开发、路由管理、状态管理、接口请求以及登录认证。


20. 你实习期间遇到过什么问题？是怎么解决的？

参考答案：

实习期间主要负责操作系统的基础功能测试和兼容性测试。

比如在不同硬件环境进行测试时，如果出现设备识别或者驱动加载异常，我会先按照测试步骤复现问题，然后记录具体的测试环境、操作步骤和异常现象，再反馈给相关人员。

问题修复之后，我会重新进行回归测试，确认问题是否真正解决。

通过这段实习，我比较深刻地认识到测试不仅仅是发现问题，还需要准确复现、记录、反馈以及验证问题修复结果。


七、面试官可能继续追问的问题

1. 你说你掌握 Vue3，那 Vue3 为什么比 Vue2 好？

至少需要准备：

Composition API
Proxy 响应式
更好的逻辑复用
更好的 TypeScript 支持


2. 你项目里的 JWT 是怎么实现登录的？

需要能讲清：

用户登录
 ↓
后端验证账号密码
 ↓
生成 JWT
 ↓
返回给前端
 ↓
前端保存 Token
 ↓
后续请求携带 Token
 ↓
后端验证 Token
 ↓
允许访问


3. Cookie 和 JWT 是一回事吗？

不是。

JWT 是一种身份凭证 / Token 格式。

Cookie 是浏览器保存和发送数据的一种机制。

JWT 可以放在 Cookie 里面。


4. Vuex 是干什么的？

一句话：

Vuex 用于集中管理多个组件需要共享的状态。

例如：

用户信息
登录状态
Token
购物车信息


5. 你的项目是你自己写的吗？有没有遇到过不会的问题？

参考答案：

项目过程中肯定会遇到一些自己不熟悉的问题，我一般会先根据报错信息自己分析和定位，然后查官方文档或者搜索资料，最后通过实际测试验证解决方案。

这个过程也让我对 Vue、Axios、路由和前后端交互有了更深入的理解。


八、面试重点

如果准备的是前端开发岗，建议重点复习：

1. JavaScript
   - var、let、const
   - 暂时性死区
   - 闭包
   - Promise
   - async/await
   - 防抖
   - 节流

2. Vue3
   - ref
   - reactive
   - props
   - emit
   - computed
   - watch
   - 生命周期
   - Vue Router
   - Vuex

3. 网络
   - HTTP / HTTPS
   - HTTP 状态码
   - Cookie
   - JWT
   - 跨域
   - Axios

4. 后端基础
   - Spring Boot
   - MVC
   - 三层架构
   - RESTful API

5. 数据库
   - MySQL
   - SQL
   - WHERE / HAVING
   - 索引
   - Redis

6. 项目
   - Vue3 商城后台
   - Spring Boot 美食网站
   - 登录认证
   - JWT + Cookie
   - 前后端交互
   - 项目中遇到的问题及解决方法
```





```text
================================================================================
                         20道前端面试题（含详解）
                    适用：初级前端 / Vue3 项目经验
================================================================================


一、HTML / CSS
================================================================================

1. HTML5 有哪些常用的新特性？
--------------------------------------------------------------------------------
参考回答：

HTML5 增加了很多语义化标签，比如 header、nav、main、section、article、footer 等。

还增加了多媒体标签，比如 audio、video，以及新的表单类型，比如 email、number、date。

另外还提供了 canvas、localStorage、sessionStorage 等功能。


2. CSS 中盒模型是什么？box-sizing 有什么作用？
--------------------------------------------------------------------------------
参考回答：

CSS 盒模型主要由 content → padding → border → margin 组成。

默认情况下 box-sizing: content-box，设置的 width 只包含 content。

如果设置 box-sizing: border-box，那么 width 和 height 会包含 content + padding + border，
实际开发中比较常用。


3. Flex 布局常用属性有哪些？
--------------------------------------------------------------------------------
参考回答：

Flex 是一种比较常用的一维布局方式。

父元素常用：
  display: flex;
  flex-direction
  justify-content
  align-items
  flex-wrap

其中：
  justify-content：控制主轴方向的对齐
  align-items：控制交叉轴方向的对齐
  flex-direction：设置主轴方向

例如实现水平垂直居中：
  display: flex;
  justify-content: center;
  align-items: center;


二、JavaScript
================================================================================

4. var、let、const 有什么区别？
--------------------------------------------------------------------------------
参考回答：

主要区别是作用域和变量是否可以重新赋值。

var 是函数作用域，存在变量提升。

let 和 const 是块级作用域，不允许在声明之前使用。

let 声明的变量可以重新赋值，而 const 声明的变量不能重新赋值。


5. 什么是闭包？有什么应用场景？
--------------------------------------------------------------------------------
参考回答：

闭包简单来说就是：一个函数能够访问它定义时所在作用域中的变量，即使这个函数在外部执行。

例如：
  function createCounter() {
      let count = 0;
      return function () {
          count++;
          return count;
      };
  }

这里内部函数一直可以访问 count。

常见应用包括：
  - 数据私有化
  - 防抖和节流
  - 函数工厂
  - 保存状态


6. 什么是原型链？
--------------------------------------------------------------------------------
参考回答：

JavaScript 中对象可以通过原型继承属性和方法。

当访问一个对象不存在的属性时，JavaScript 会沿着它的 __proto__ 向上查找。

例如：
  对象 → 对象的原型 → Object.prototype → null

这种逐级查找的关系就叫原型链。


7. == 和 === 有什么区别？
--------------------------------------------------------------------------------
参考回答：

== 会进行类型转换后再比较。
  例如：1 == "1"   // true

而 === 不会进行类型转换，需要类型和值都相同。
  例如：1 === "1"  // false

实际开发中一般更推荐使用 ===，避免隐式类型转换带来的问题。


8. Promise 是什么？async/await 和 Promise 有什么关系？
--------------------------------------------------------------------------------
参考回答：

Promise 是 JavaScript 中处理异步操作的一种方式。

Promise 有三种状态：pending、fulfilled、rejected，分别表示进行中、成功和失败。

async/await 是基于 Promise 的异步语法糖，可以让异步代码写起来更加接近同步代码。

例如：
  async function getData() {
      try {
          const res = await axios.get("/user");
          console.log(res);
      } catch (error) {
          console.log(error);
      }
  }


9. 什么是事件循环（Event Loop）？
--------------------------------------------------------------------------------
参考回答：

JavaScript 本身是单线程的，通过事件循环来处理异步任务。

简单来说：
  先执行同步代码
  遇到异步任务交给相应的环境处理
  异步任务完成后进入任务队列
  同步代码执行完成后，再执行队列中的任务

Promise 的回调属于微任务，setTimeout 的回调属于宏任务。

执行顺序：同步代码 → 微任务 → 宏任务 → 微任务 → 宏任务 ...


三、Vue3
================================================================================

10. Vue3 中 ref 和 reactive 有什么区别？
--------------------------------------------------------------------------------
参考回答：

ref 可以用来创建响应式数据，适合基本类型，也可以保存对象。
  const count = ref(0);
  在 JavaScript 中访问需要：count.value

reactive 主要用于创建响应式对象：
  const user = reactive({ name: "张三", age: 20 });

简单来说：ref 更灵活，reactive 更适合响应式对象。


11. Vue3 的生命周期有哪些？
--------------------------------------------------------------------------------
参考回答：

比较常用的有：onMounted、onUpdated、onBeforeUnmount、onUnmounted

例如：
  onMounted(() => {
      console.log("组件挂载完成");
  });

在项目中如果需要初始化数据或者添加事件监听，可以放在 onMounted 中；
组件销毁时需要清理事件监听，可以放在 onBeforeUnmount 或 onUnmounted 中。


12. Vue 中父子组件如何通信？
--------------------------------------------------------------------------------
参考回答：

父传子主要使用 props：
  <Child :name="username" />
  子组件：const props = defineProps({ name: String });

子传父主要使用 emit：
  const emit = defineEmits(["change"]);
  emit("change", value);

可以简单记成：父传子用 props，子传父用 emit。


13. Vue 中 v-if 和 v-show 有什么区别？
--------------------------------------------------------------------------------
参考回答：

v-if 是真正的条件渲染，条件不满足时元素不会存在于 DOM 中。

v-show 只是通过 CSS 的 display 控制元素显示隐藏，元素仍然存在。

所以：频繁切换使用 v-show，不经常切换使用 v-if。


14. Vue 中 computed 和 watch 有什么区别？
--------------------------------------------------------------------------------
参考回答：

computed 主要用于根据已有数据计算出新的数据，并且具有缓存。
  例如：const fullName = computed(() => firstName.value + lastName.value);

watch 主要用于监听数据变化，然后执行一些操作。
  例如：watch(count, (newValue) => { console.log(newValue); });

简单来说：computed 用来计算，watch 用来监听变化并执行副作用。


15. Vue Router 是做什么的？路由守卫有什么作用？
--------------------------------------------------------------------------------
参考回答：

Vue Router 用来实现 Vue 单页面应用中的路由管理，例如 /login、/home、/user。

路由守卫可以在进入路由之前进行判断。

例如用户访问后台页面时，可以检查有没有登录：
  router.beforeEach((to, from, next) => {
      // 判断登录状态
  });

如果没有登录，就跳转到登录页面。


四、项目 / 网络
================================================================================

16. Axios 是什么？项目中为什么使用 Axios？
--------------------------------------------------------------------------------
参考回答：

Axios 是一个基于 Promise 的 HTTP 请求库。

项目中可以使用它向后端发送 GET、POST、PUT、DELETE 等请求。

在 Vue 项目中使用 Axios 进行前后端数据交互，并且可以通过请求拦截器统一添加 Token，
通过响应拦截器统一处理错误信息。


17. HTTP 常见状态码有哪些？
--------------------------------------------------------------------------------
参考回答：

比较常见的有：
  200：请求成功
  201：创建成功
  400：请求参数错误
  401：未认证
  403：没有权限
  404：资源不存在
  500：服务器内部错误

其中 401 通常表示身份认证失败，403 通常表示已经识别身份但没有访问权限。


18. 什么是跨域？常见解决方案有哪些？
--------------------------------------------------------------------------------
参考回答：

浏览器为了安全，会限制不同源之间的资源访问，这就是跨域问题。

常见解决方式有：
  - CORS
  - 开发环境配置代理
  - JSONP（主要用于 GET，现代项目中使用较少）

例如 Vue 开发环境可以通过代理把 /api/user 代理到后端服务器。


19. JWT 和 Cookie 是什么关系？
--------------------------------------------------------------------------------
参考回答：

JWT 是一种身份凭证的数据格式/机制，Cookie 是浏览器保存和携带数据的一种方式。

两者不是同一个东西。

例如登录成功后，服务器生成 JWT：
  JWT → Cookie → 浏览器保存 → 后续请求自动携带 Cookie

也可以把 JWT 放在请求头中：Authorization: Bearer xxx

在 Vue3 项目中接触过 JWT 和 Cookie 的身份认证以及权限拦截。


五、项目实战题
================================================================================

20. 介绍一下你的 Vue3 商城后台项目，你主要做了什么？
--------------------------------------------------------------------------------
参考回答：

这是一个基于 Vue3 和 Vite 的商城后台管理项目。

项目主要使用 Vue3 作为前端框架，Vue Router 负责路由管理，Vuex 负责全局状态管理，
Element Plus 作为 UI 组件库，Axios 用来进行前后端数据交互，样式方面使用了 WindiCSS。

主要学习和实践了登录认证、路由管理、状态管理以及前后端接口交互等功能。
其中登录部分涉及 JWT 和 Cookie，并结合路由拦截来限制未登录用户访问后台页面。

通过这个项目，对 Vue3 项目的基本开发流程以及前后端数据交互有了比较完整的认识。


================================================================================
                      重点优先准备的 8 道题
================================================================================

如果你时间有限，不建议 20 道平均用力，优先把这 8 道讲熟：

① 闭包
② Promise / async/await
③ 事件循环（Event Loop）
④ ref / reactive
⑤ computed / watch
⑥ Vue Router + 路由守卫
⑦ Axios + HTTP 状态码
⑧ JWT + Cookie + 登录认证


================================================================================
                      项目题追问准备（必看）
================================================================================

面试官很可能会顺着第20题继续追问：

“你的登录功能具体怎么实现的？”
“为什么使用 JWT？”
“JWT 放在哪里？”
“Cookie 和 JWT 是什么关系？”
“路由守卫怎么判断有没有登录？”
“Vuex 在你的项目里存了什么？”
“Axios 拦截器怎么用？”
“如果 Token 过期怎么办？”

这些问题会比单纯背八股更贴近你的简历，建议提前准备好。


================================================================================
                      补充：原型链、事件循环、watch
================================================================================

一、原型链
--------------------------------------------------------------------------------
核心：自己没有 → 去原型找 → 原型没有 → 继续往上找。

查找路径：
  对象 → 对象的原型 → Object.prototype → null


二、事件循环（Event Loop）
--------------------------------------------------------------------------------
核心：JavaScript 一次执行一个任务，通过事件循环处理异步任务。

执行顺序：
  同步代码 → 微任务（Promise） → 宏任务（setTimeout） → 微任务 → 宏任务 ...


三、watch
--------------------------------------------------------------------------------
核心：监听数据变化，数据变化后执行回调函数。

语法：
  watch(要监听的数据, (新值, 旧值) => {
      // 数据变化后执行
  });


================================================================================
                      补充：setTimeout / setInterval
================================================================================

setTimeout  →  等待一段时间后执行一次（超时执行）
setInterval →  每隔一段时间重复执行（间隔执行）

停止方法：
  clearTimeout(timer)
  clearInterval(timer)


================================================================================
                              整理完毕
================================================================================
```







```text
flex-wrap 是什么？
————————————————————
flex-wrap 是 CSS Flexbox 布局中的一个属性，用来控制 Flex 容器中的子元素是否换行。

一句话理解：
flex-wrap 决定“一行排不下时怎么办”——是挤在一行（不换行），还是换到下一行（换行），还是反向换行。

基本用法：
nowrap（默认）→ 不换行，所有子元素挤在一行，会溢出容器
wrap           → 换行，排不下时换到下一行
wrap-reverse   → 反向换行，换行后从下往上排列

代码示例：
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
  <div class="item">5</div>
</div>

/* 不换行（默认）→ 所有元素挤在一行 */
.container {
  display: flex;
  flex-wrap: nowrap;
}

/* 换行 → 一行排不下就换行 */
.container {
  display: flex;
  flex-wrap: wrap;
}

/* 反向换行 → 从下往上排列 */
.container {
  display: flex;
  flex-wrap: wrap-reverse;
}

简写属性 flex-flow：
flex-flow = flex-direction + flex-wrap
flex-flow: row wrap;        // 水平排列 + 换行
flex-flow: column wrap;     // 垂直排列 + 换行
flex-flow: row nowrap;      // 水平排列 + 不换行（默认）

在 Windi/Tailwind 中的工具类：
flex-wrap        → flex-wrap: wrap
flex-nowrap      → flex-wrap: nowrap
flex-wrap-reverse → flex-wrap: wrap-reverse


ES6 模块化
————————————————————
ES6 模块化是 JavaScript 官方的模块系统，用 import 和 export 关键字把代码拆分成独立的文件，实现“各管各的，按需使用”。

一句话理解：
模块化就像“乐高积木”——每个 .js 文件是一块积木，用 export 把接口“凸出来”，用 import 把需要的部分“凹进去”拼在一起。

基本语法：
// user.js
// 命名导出（可导出多个）
export const name = '张三'
export function sayHello() {
  console.log('你好')
}
export class User { ... }

// 默认导出（一个文件只能有一个）
export default {
  name: '张三',
  age: 18
}

// main.js
// 导入命名导出（必须用 {}，名称要一致）
import { name, sayHello } from './user.js'

// 导入默认导出（不用 {}，名称可自定义）
import userData from './user.js'

// 全部导入
import * as user from './user.js'
console.log(user.name)

// 默认 + 命名混合导入
import userData, { sayHello } from './user.js'

导出方式对比：
export default  → 默认导出，一个文件只能一个，导入时不用 {}
export          → 命名导出，一个文件可以多个，导入时要用 {}

// 文件 utils.js
export default function add(a, b) { return a + b }
export const PI = 3.14
export const name = '工具集'

// 导入
import add, { PI, name } from './utils.js'


let 和 const 的区别
————————————————————
一句话理解：
let = “可换内容的盒子”，const = “贴了封条的盒子”——第一次放了东西进去后，就不能再换了。

核心区别：
let 可以重新赋值，const 不可以（常量）。
const 声明时必须初始化。

代码示例：
// let：可以重新赋值
let count = 0
count = 10
count = count + 5
console.log(count)  // 15

// const：不能重新赋值（报错）
const PI = 3.14
PI = 3.14159        // ❌ 报错

// const：必须初始化
const name           // ❌ 报错
const name = '张三'  // ✅ 正确

const 的“陷阱”：对象/数组的内容可以改
const user = { name: '张三', age: 18 }
user.age = 20       // ✅ 可以修改属性
user.gender = '男'   // ✅ 可以添加属性
user = { name: '李四' }  // ❌ 报错（不能重新赋值）

const list = [1, 2, 3]
list.push(4)         // ✅ 可以添加
list[0] = 0          // ✅ 可以修改
list = [5, 6, 7]    // ❌ 报错（不能重新赋值）

默认用 const，明确要重新赋值时用 let，永远不用 var。


var 和 let 的区别
————————————————————
一句话理解：
var 是“老式敞篷车”——不严谨，容易出问题；let 是“新款轿车”——更安全、更规范。

核心区别：
var = 函数级作用域 + 可重复声明 + 变量提升（会泄露）
let = 块级作用域 + 不可重复声明 + 暂时性死区（更安全）

具体区别示例：
1. 作用域不同
if (true) {
  var a = 10
}
console.log(a)  // 10（泄露了！）

if (true) {
  let b = 20
}
console.log(b)  // ❌ 报错

2. 变量提升不同
console.log(name)  // undefined
var name = '张三'

console.log(age)   // ❌ 报错
let age = 18

3. 重复声明不同
var count = 1
var count = 2      // ✅ 不会报错

let total = 1
let total = 2      // ❌ 报错

4. 全局变量是否挂到 window
var age = 18
console.log(window.age)  // 18

let name = '张三'
console.log(window.name)  // undefined

面试常考题：
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}
// 输出：3 3 3（全都是 3！）

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}
// 输出：0 1 2（符合预期！）

结论：永远用 let，永远不用 var！


数组常见方法
————————————————————
增删改：push、pop、shift、unshift、splice、slice
查找判断：indexOf、includes、find、findIndex、some、every
遍历转换：forEach、map、filter、reduce、join、concat
排序反转：sort、reverse

代码示例：
const arr = [1, 2, 3]

// 增
arr.push(4)     // [1, 2, 3, 4]
arr.unshift(0)  // [0, 1, 2, 3, 4]

// 删
arr.pop()       // 返回 4，arr 变为 [0, 1, 2, 3]
arr.shift()     // 返回 0，arr 变为 [1, 2, 3]

// 改：splice(索引, 删除数量, 添加元素)
arr.splice(1, 1, 10)  // arr 变为 [1, 10, 3]

// 查：slice(开始, 结束)
const newArr = arr.slice(0, 2)  // [1, 10]

// 查找
arr.indexOf(3)     // 2
arr.includes(5)    // true
arr.find(item => item > 3)       // 4
arr.findIndex(item => item > 3)  // 3
arr.some(item => item > 4)   // true
arr.every(item => item > 0)  // true

// 遍历
arr.forEach(item => console.log(item))
const doubled = arr.map(item => item * 2)  // [2, 4, 6, 8, 10]
const evens = arr.filter(item => item % 2 === 0)  // [2, 4]
const sum = arr.reduce((acc, item) => acc + item, 0)  // 15
arr.join('-')  // "1-2-3-4-5"
arr.concat([6, 7])  // [1, 2, 3, 4, 5, 6, 7]

// 排序
arr.sort((a, b) => a - b)  // [1, 1, 3, 4, 5, 9]
arr.reverse()


v-for 与 :key
————————————————————
v-for 遍历数组生成列表，:key 是每个列表项的唯一“身份证”。

代码示例：
<li v-for="item in list" :key="item">{{ item }}</li>

v-for="item in list"  → 遍历数组
:key="item"           → 唯一标识（高效更新）
{{ item }}            → 显示内容

等价于 JS：list.map(item => `<li>${item}</li>`).join('')

:key 的作用：
有 :key  → 精确匹配、高效更新、状态不乱
没 :key  → 可能状态错乱、性能下降

:key 应该用什么值？
<!-- 最好用唯一的 id -->
<li v-for="user in users" :key="user.id">{{ user.name }}</li>

<!-- 如果没有 id，用索引（但不太推荐） -->
<li v-for="(item, index) in list" :key="index">{{ item }}</li>

<!-- 不要用 Math.random() 或 index 当数组有增删时 -->
<li v-for="item in list" :key="Math.random()">...</li>


forEach 和 map 的区别
————————————————————
forEach → 遍历执行操作，不返回新数组（返回 undefined）
map    → 遍历转换数据，返回新数组

代码示例：
const arr = [1, 2, 3, 4, 5]

// forEach：不返回新数组
const result1 = arr.forEach(item => {
  console.log(item)
})
console.log(result1)  // undefined

// map：返回新数组
const result2 = arr.map(item => item * 2)
console.log(result2)  // [2, 4, 6, 8, 10]
console.log(arr)      // [1, 2, 3, 4, 5]（原数组不变）

// forEach：不能链式调用
arr.forEach(item => item * 2).filter(item => item > 5)  // 报错！

// map：可以链式调用
arr
  .map(item => item * 2)
  .filter(item => item > 5)
  .map(item => item + 1)

选择原则：
需要执行操作（如打印、修改外部变量）→ 用 forEach
需要得到新数据（如格式化、提取字段）→ 用 map


链式调用
————————————————————
链式调用 = 一行代码里连续调用多个方法

基本示例：
// ❌ 不链式
const arr = [1, 2, 3, 4, 5]
const doubled = arr.map(item => item * 2)
const filtered = doubled.filter(item => item > 5)
const result = filtered.join('-')
console.log(result)  // "6-8-10"

// ✅ 链式调用
const result = [1, 2, 3, 4, 5]
  .map(item => item * 2)
  .filter(item => item > 5)
  .join('-')
console.log(result)  // "6-8-10"

自定义链式调用（类方法）：
class Calculator {
  constructor(value = 0) {
    this.value = value
  }
  add(n) {
    this.value += n
    return this  // 关键：返回 this
  }
  subtract(n) {
    this.value -= n
    return this
  }
  multiply(n) {
    this.value *= n
    return this
  }
  getResult() {
    return this.value
  }
}

const result = new Calculator(10)
  .add(5)
  .multiply(2)
  .subtract(3)
  .getResult()
console.log(result)  // 27

核心条件：每个方法都返回一个对象，这个对象又有自己的方法。


forEach 和 for 的区别
————————————————————
for = 万能循环，控制力强
forEach = 数组遍历，代码简洁

代码示例：
// for：可以用 break 提前退出
for (let i = 0; i < arr.length; i++) {
  if (arr[i] > 3) break
  console.log(arr[i])  // 输出 1, 2, 3
}

// forEach：不能用 break
arr.forEach(item => {
  if (item > 3) break  // 报错！
})

// for：可以用 continue 跳过
for (let i = 0; i < arr.length; i++) {
  if (arr[i] % 2 === 0) continue
  console.log(arr[i])  // 输出 1, 3, 5
}

// forEach：用 return 跳过当前项
arr.forEach(item => {
  if (item % 2 === 0) return
  console.log(item)  // 输出 1, 3, 5
})

异步操作中的区别：
// forEach：不能等待异步（顺序不保证）
arr.forEach(async item => {
  const result = await fetchData(item)
  console.log(result)  // 可能乱序输出
})

// for：可以等待异步（顺序执行）
for (let i = 0; i < arr.length; i++) {
  const result = await fetchData(arr[i])
  console.log(result)  // 按顺序输出
}

选择原则：
需要 break/continue → for
需要异步顺序执行 → for
性能要求高（大数据） → for
简单遍历（无中断） → forEach

常用场景：
const users = [
  { id: 1, name: '张三', age: 18 },
  { id: 2, name: '李四', age: 20 }
]

// forEach：执行操作
users.forEach(user => console.log(user.name))

// map：转换数据
const names = users.map(user => user.name)  // ['张三', '李四']

// map：格式化数据
const formattedUsers = users.map(user => ({
  ...user,
  isAdult: user.age >= 18
}))
```

```text
//mysql
MySQL 基础语句复习手册


一、数据库操作
SHOW DATABASES;                      -- 查看所有数据库
CREATE DATABASE my_db;               -- 创建数据库
CREATE DATABASE IF NOT EXISTS my_db; -- 如果不存在则创建
DROP DATABASE my_db;                 -- 删除数据库
DROP DATABASE IF EXISTS my_db;       -- 如果存在则删除
USE my_db;                           -- 选择/切换数据库
SELECT DATABASE();                   -- 查看当前使用的数据库


二、表操作
SHOW TABLES;                         -- 查看所有表

-- 创建表
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,  -- 主键，自增
    username VARCHAR(50) NOT NULL,       -- 非空
    email VARCHAR(100) UNIQUE,           -- 唯一
    age INT DEFAULT 18,                  -- 默认值
    created_at DATETIME DEFAULT NOW()
);

DESC users;                          -- 查看表结构
SHOW COLUMNS FROM users;             -- 查看表结构
DROP TABLE users;                    -- 删除表
DROP TABLE IF EXISTS users;          -- 如果存在则删除

ALTER TABLE users ADD COLUMN phone VARCHAR(20);       -- 添加列
ALTER TABLE users DROP COLUMN phone;                  -- 删除列
ALTER TABLE users MODIFY COLUMN age TINYINT;          -- 修改列
ALTER TABLE users CHANGE COLUMN age user_age INT;     -- 修改列名


三、数据操作（CRUD）

1. 插入数据（INSERT）
INSERT INTO users (username, email, age) VALUES ('张三', 'zhangsan@qq.com', 18);
INSERT INTO users VALUES (NULL, '李四', 'lisi@qq.com', 20, NOW());
INSERT INTO users (username, email, age) VALUES 
    ('王五', 'wangwu@qq.com', 22),
    ('赵六', 'zhaoliu@qq.com', 25);

2. 查询数据（SELECT）
SELECT * FROM users;
SELECT username, email FROM users;
SELECT username AS '姓名', email AS '邮箱' FROM users;
SELECT DISTINCT age FROM users;

-- WHERE 条件查询
SELECT * FROM users WHERE age >= 18;
SELECT * FROM users WHERE username = '张三';
SELECT * FROM users WHERE age BETWEEN 18 AND 25;
SELECT * FROM users WHERE age IN (18, 22, 25);
SELECT * FROM users WHERE username LIKE '张%';   -- 以"张"开头
SELECT * FROM users WHERE email IS NULL;
SELECT * FROM users WHERE email IS NOT NULL;

-- 多条件
SELECT * FROM users WHERE age > 18 AND city = '北京';
SELECT * FROM users WHERE age < 18 OR age > 60;

-- ORDER BY 排序
SELECT * FROM users ORDER BY age ASC;        -- 升序（默认）
SELECT * FROM users ORDER BY age DESC;       -- 降序
SELECT * FROM users ORDER BY age DESC, id ASC;

-- LIMIT 限制条数
SELECT * FROM users LIMIT 10;
SELECT * FROM users LIMIT 10 OFFSET 5;
SELECT * FROM users LIMIT 5, 10;

3. 更新数据（UPDATE）
UPDATE users SET age = 19 WHERE id = 1;
UPDATE users SET age = 20, email = 'new@qq.com' WHERE username = '张三';
-- ⚠️ 不加 WHERE 会更新所有行！

4. 删除数据（DELETE）
DELETE FROM users WHERE id = 1;
-- ⚠️ 不加 WHERE 会删除所有行！
TRUNCATE TABLE users;   -- 清空表，重置自增 ID


四、聚合函数
COUNT(*)           -- 统计总行数
COUNT(email)       -- email 不为空的行数
COUNT(DISTINCT age) -- 不重复的年龄数
SUM(age)           -- 求和
AVG(age)           -- 平均值
MAX(age)           -- 最大值
MIN(age)           -- 最小值

-- 组合使用
SELECT 
    COUNT(*) AS total,
    AVG(age) AS avg_age,
    MAX(age) AS max_age,
    MIN(age) AS min_age
FROM users;


五、分组查询（GROUP BY + HAVING）
SELECT age, COUNT(*) AS count FROM users GROUP BY age;

-- 分组后筛选
SELECT age, COUNT(*) AS count 
FROM users 
GROUP BY age 
HAVING COUNT(*) > 1;

-- WHERE 和 HAVING 的区别
SELECT city, COUNT(*) AS count 
FROM users 
WHERE age >= 18          -- 先过滤行
GROUP BY city            -- 再分组
HAVING COUNT(*) > 5;     -- 最后过滤组


六、连接查询（JOIN）
-- 内连接：只返回匹配的数据
SELECT users.name, orders.amount
FROM users
INNER JOIN orders ON users.id = orders.user_id;

-- 左连接：返回左表所有数据
SELECT users.name, orders.amount
FROM users
LEFT JOIN orders ON users.id = orders.user_id;

-- 右连接：返回右表所有数据
SELECT users.name, orders.amount
FROM users
RIGHT JOIN orders ON users.id = orders.user_id;

-- 多表连接
SELECT u.name, o.amount, p.product_name
FROM users u
INNER JOIN orders o ON u.id = o.user_id
INNER JOIN products p ON o.product_id = p.id;


七、条件表达式
-- CASE WHEN
SELECT 
    name,
    age,
    CASE 
        WHEN age < 18 THEN '未成年'
        WHEN age >= 18 AND age < 60 THEN '成年'
        ELSE '老年'
    END AS age_group
FROM users;

-- IF 函数
SELECT 
    name,
    IF(age >= 18, '成年', '未成年') AS status
FROM users;


八、日期和字符串函数
SELECT NOW();          -- 当前日期时间
SELECT CURDATE();      -- 当前日期
SELECT CURTIME();      -- 当前时间

SELECT CONCAT(first_name, ' ', last_name) AS full_name FROM users;
SELECT UPPER(name) FROM users;
SELECT LOWER(name) FROM users;
SELECT LENGTH(name) FROM users;

SELECT YEAR(created_at) FROM users;
SELECT MONTH(created_at) FROM users;
SELECT DATE(created_at) FROM users;


九、记忆口诀
增删改查：INSERT / DELETE / UPDATE / SELECT
条件过滤：WHERE（行）→ GROUP BY（组）→ HAVING（组过滤）
排序限制：ORDER BY（排序）→ LIMIT（取几条）
表连接：INNER JOIN（匹配）/ LEFT JOIN（左全）/ RIGHT JOIN（右全）

⚠️ 危险操作三件套：UPDATE 和 DELETE 一定要加 WHERE！
```







```text
## 前端八股文是什么？

前端八股文指的是前端开发面试中高频出现的、偏重理论记忆的经典问题和标准答案。类似于古代科举考试的“八股文”格式，这些问题有相对固定的问法和回答范式，主要考察对基础知识的掌握程度。


## 前端八股文高频题汇总（含答案）

### 一、HTML / CSS 篇

1. CSS 盒模型是什么？
CSS 盒模型由 content（内容）、padding（内边距）、border（边框）、margin（外边距）四部分组成。
标准盒模型（box-sizing: content-box）：宽度 = content
怪异盒模型（box-sizing: border-box）：宽度 = content + padding + border

2. 什么是 BFC？
BFC（Block Formatting Context，块级格式化上下文）是页面上的一个独立渲染区域，内部元素不会影响外部元素。
触发方式：
- float: left / right
- position: absolute / fixed
- display: inline-block / flex / grid
- overflow: hidden / auto / scroll

3. 水平垂直居中的方式？
/* Flex 布局 */
.parent { display: flex; justify-content: center; align-items: center; }

/* Grid 布局 */
.parent { display: grid; place-items: center; }

/* 绝对定位 + transform */
.child { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); }

4. 重绘和回流（重排）的区别？
回流（Reflow）：触发布局变化（宽高、位置、删除/添加元素），开销大，回流一定导致重绘
重绘（Repaint）：触发外观变化（颜色、背景、阴影），开销小，重绘不一定导致回流


### 二、JavaScript 篇

5. 什么是闭包？有什么优缺点？
闭包是函数能够记住并访问其外部作用域变量的能力，即使外部函数已执行完毕。
优点：数据私有化、创建模块、实现柯里化
缺点：内存泄漏（变量不会被垃圾回收）

示例1：
function outer() {
  let count = 0
  return function inner() {
    count++
    console.log(count)
  }
}
const fn = outer()
fn() // 1
fn() // 2

示例2：
function outer() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
const fn = outer();
console.log(fn());  // 1
console.log(fn());  // 2
console.log(fn());  // 3

6. 什么是原型链？
每个对象都有 __proto__ 指向其构造函数的 prototype，当访问对象属性时，如果自身没有，就会沿着 __proto__ 向上查找，直到 null。

7. let、const、var 的区别？
var：函数级作用域，有变量提升，允许重复声明，允许重新赋值，挂到 window
let：块级作用域，有变量提升（暂时性死区），不允许重复声明，允许重新赋值，不挂到 window
const：块级作用域，有变量提升（暂时性死区），不允许重复声明，不允许重新赋值，不挂到 window

8. 箭头函数和普通函数的区别？
- 箭头函数没有自己的 this，继承外层作用域
- 箭头函数不能作为构造函数（不能用 new）
- 箭头函数没有 arguments 对象
- 箭头函数不能用作 Generator 函数

9. Promise 的三种状态？
pending（等待中）、fulfilled（成功）、rejected（失败）
状态只能从 pending → fulfilled 或 pending → rejected，不可逆。


### 三、Vue 篇

10. Vue 的生命周期钩子有哪些？
Vue 2：beforeCreate → created → beforeMount → mounted → beforeUpdate → updated → beforeDestroy → destroyed
Vue 3：onBeforeMount → onMounted → onBeforeUpdate → onUpdated → onBeforeUnmount → onUnmounted

11. v-if 和 v-show 的区别？
v-if：创建/销毁 DOM，条件为假时不渲染，切换开销大，适合不常变
v-show：切换 display: none，总是渲染，切换开销小，适合频繁切换

12. Vue 组件通信方式？
- 父子组件：props / emit
- 爷孙/跨级：provide / inject
- 兄弟组件：事件总线（EventBus）或 Vuex / Pinia
- 全局状态：Vuex / Pinia

13. computed 和 watch 的区别？
computed：计算派生数据，有缓存，不支持异步，必须返回
watch：监听数据变化执行副作用，无缓存，支持异步，不必须返回

14. Vue 3 的 ref 和 reactive 的区别？
ref：适用任意类型，访问需要 .value，允许重新赋值，解构丢失响应性
reactive：仅对象/数组，访问直接，不能整体替换，解构丢失响应性


### 四、浏览器 / 网络篇

15. 从输入 URL 到页面加载完成发生了什么？
DNS 解析 → TCP 连接（三次握手）→ 发送 HTTP 请求 → 服务器处理并返回 → 浏览器解析 HTML → 构建 DOM 树 → 构建 CSSOM 树 → 合并渲染树 → 布局 → 绘制 → 加载 JS 并执行

16. 什么是跨域？怎么解决？
浏览器同源策略限制，协议、域名、端口任一不同即为跨域。
解决方法：
- 开发环境：Vite/Webpack 代理
- 生产环境：Nginx 反向代理
- 后端配置 CORS（Access-Control-Allow-Origin: *）
- JSONP（只支持 GET，已淘汰）

17. localStorage、sessionStorage、Cookie 的区别？
localStorage：5-10MB，永久（手动清除），不随请求发送
sessionStorage：5-10MB，关闭浏览器失效，不随请求发送
Cookie：4KB，可设置过期时间，随请求自动携带


### 五、性能优化篇

18. 前端性能优化有哪些手段？
- 减少 HTTP 请求：合并文件、雪碧图、图片懒加载
- 减少包体积：代码分割、Tree Shaking、压缩（Gzip）
- 缓存策略：强缓存（Cache-Control）、协商缓存（ETag）
- 加载优化：CDN 加速、预加载（preload）、预连接（preconnect）
- 渲染优化：防抖/节流、虚拟列表、requestAnimationFrame

19. 防抖和节流的区别？
防抖（Debounce）：重置计时，只执行最后一次，适用于搜索框输入、窗口 resize
节流（Throttle）：固定间隔执行一次，适用于滚动加载、按钮防连点


### 六、代码输出题（常考）

第一题：var / let 循环
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}
// 输出：3 3 3

for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100)
}
// 输出：0 1 2

第二题：事件循环
console.log('1')
setTimeout(() => console.log('2'), 0)
Promise.resolve().then(() => console.log('3'))
console.log('4')
// 输出：1 → 4 → 3 → 2

第三题：闭包
function test() {
  for (var i = 0; i < 3; i++) {
    (function(j) {
      setTimeout(() => console.log(j), 100)
    })(i)
  }
}
test()
// 输出：0 1 2

以上这些就是前端面试中最常被问到的“八股文”题，熟练掌握这些能应对大部分基础面试。
```





```text
防抖（Debounce）

// ====== 防抖函数 ======
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// ====== 使用示例：搜索框 ======
const searchInput = document.getElementById('search');
const handleSearch = debounce(function() {
    console.log('搜索：', this.value);
}, 500);
searchInput.addEventListener('input', handleSearch);

// ====== 精简版（直接写） ======
let timer;
input.addEventListener('input', function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        console.log('搜索：', this.value);
    }, 500);
});

// ====== 防抖应用场景 ======
// 1. 搜索框输入
input.addEventListener('input', debounce(search, 300));
// 2. 窗口resize
window.addEventListener('resize', debounce(calcLayout, 200));
// 3. 按钮防连点
button.addEventListener('click', debounce(saveData, 1000));


节流（Throttle）

// ====== 节流函数（时间戳版） ======
function throttle(fn, delay) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= delay) {
            fn.apply(this, args);
            lastTime = now;
        }
    };
}

// ====== 使用示例：滚动加载 ======
const handleScroll = throttle(function() {
    console.log('滚动位置：', window.scrollY);
}, 200);
window.addEventListener('scroll', handleScroll);

// ====== 精简版（直接写） ======
let lastTime = 0;
window.addEventListener('scroll', function() {
    const now = Date.now();
    if (now - lastTime >= 200) {
        console.log('滚动：', window.scrollY);
        lastTime = now;
    }
});

// ====== 节流应用场景 ======
// 1. 滚动加载更多
window.addEventListener('scroll', throttle(loadMore, 300));
// 2. 鼠标移动
canvas.addEventListener('mousemove', throttle(draw, 16));
// 3. 游戏射击
button.addEventListener('click', throttle(shoot, 500));


完整HTML示例

<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial; padding: 20px; }
        input, button { padding: 10px; margin: 5px; }
        .box { height: 2000px; background: linear-gradient(to bottom, #f0f0f0, #ccc); margin-top: 20px; }
    </style>
</head>
<body>
    <h2>防抖 vs 节流</h2>
    <div>
        <h3>防抖：搜索输入</h3>
        <input id="search" placeholder="输入搜索关键词..." style="width:300px;">
        <span id="debounceLog">等待输入...</span>
    </div>
    <div>
        <h3>节流：点击加载</h3>
        <button id="loadBtn">点击加载（节流 1s）</button>
        <span id="throttleLog">点击次数：0</span>
    </div>
    <div class="box">滚动试试 ↓</div>

    <script>
        // 防抖
        function debounce(fn, delay) {
            let timer = null;
            return function(...args) {
                clearTimeout(timer);
                timer = setTimeout(() => fn.apply(this, args), delay);
            };
        }

        const searchInput = document.getElementById('search');
        const debounceLog = document.getElementById('debounceLog');

        const handleSearch = debounce(function() {
            debounceLog.textContent = '搜索：' + this.value;
            debounceLog.style.color = '#0a0';
        }, 500);

        searchInput.addEventListener('input', handleSearch);
        searchInput.addEventListener('input', function() {
            debounceLog.textContent = '输入中...';
            debounceLog.style.color = '#999';
        });

        // 节流
        function throttle(fn, delay) {
            let lastTime = 0;
            return function(...args) {
                const now = Date.now();
                if (now - lastTime >= delay) {
                    fn.apply(this, args);
                    lastTime = now;
                }
            };
        }

        let clickCount = 0;
        const loadBtn = document.getElementById('loadBtn');
        const throttleLog = document.getElementById('throttleLog');

        const handleClick = throttle(function() {
            clickCount++;
            throttleLog.textContent = '点击次数：' + clickCount + '（节流生效，1秒最多一次）';
        }, 1000);

        loadBtn.addEventListener('click', handleClick);

        // 滚动节流
        const handleScroll = throttle(function() {
            console.log('滚动位置：', window.scrollY);
        }, 200);
        window.addEventListener('scroll', handleScroll);
    </script>
</body>
</html>
```

```text
防抖（Debounce）- 搜索框输入


用户停止输入 500ms 后才发起请求，防止频繁请求


代码：
function debounce(fn, delay = 500) {
  let timer = null
  return function(...args) {
     // ③ 每次调用时，先清除之前的定时器
    // 如果之前有定时器在等待执行，就把它取消掉
    // 这就是防抖的核心：清除上一次的，重新计时
    clearTimeout(timer)
    // ④ 创建新的定时器
    // 等待 delay 毫秒后执行 fn(...args)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

// 使用
const search = debounce((keyword) => {
  console.log('搜索:', keyword)
}, 500)

// 连续输入 "abc"：
// 输入 a → 重置计时器
// 输入 b → 重置计时器
// 输入 c → 重置计时器
// 停止输入 500ms 后 → 只输出一次 "搜索: abc"


节流（Throttle）- 滚动加载


每 500ms 最多执行一次，控制频率


代码：
function throttle(fn, delay = 500) {
  let timer = null
  return function(...args) {
    if (timer) return
    timer = setTimeout(() => {
      fn(...args)
      timer = null
    }, delay)
  }
}

// 使用
const loadMore = throttle(() => {
  console.log('加载更多数据')
}, 500)

// 连续滚动：
// 第 0ms  → 执行 ✅
// 第 100ms → 跳过 ❌
// 第 300ms → 跳过 ❌
// 第 500ms → 执行 ✅（间隔到了）
// 第 600ms → 跳过 ❌


区别：
防抖 = 等你彻底停下来再执行（搜索框）
节流 = 每隔一段时间执行一次（滚动加载）
```


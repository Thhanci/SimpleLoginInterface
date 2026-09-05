【HTML+CSS 一个简洁的登录界面】https://www.bilibili.com/video/BV1X3411y7of?vd_source=3424baa0ba17a6687e097f58c68731c5



【Vue3+Vite+Element-Plus实战商城后台管理系统】https://www.bilibili.com/video/BV13f1zBLEo6?p=65&vd_source=3424baa0ba17a6687e097f58c68731c5





```text
//beginWithVite
npm -v
npm config get registry
npm config set registry=https://registry.npmmirror.com
npm init vite@latest shop-admin --template vue
cd shop-admin
npm install
npm run dev
```







| 属性值     | 定位参考                 | 是否脱离文档流                   | 使用场景                           |
| :--------- | :----------------------- | :------------------------------- | :--------------------------------- |
| `static`   | 无（默认定位）           | ❌ 否                             | 默认值，无需设置                   |
| `relative` | 自身原本位置             | ❌ 否（保留原占位）               | 微调元素位置、作为绝对定位的父容器 |
| `absolute` | 最近的非 `static` 父元素 | ✅ 是                             | 下拉菜单、角标、自定义弹窗         |
| `fixed`    | 浏览器视口（窗口）       | ✅ 是                             | 固定导航、回到顶部、弹窗           |
| `sticky`   | 父容器 + 滚动容器        | 混合（未滚动时占位，滚动后固定） | 吸顶导航、表头固定                 |





```text
position 所有属性值介绍


position 属性控制元素的定位方式，决定元素在页面中的位置。


一、所有属性值一览

static    → 定位参考：无（默认定位）→ 是否脱离文档流：否 → 使用场景：默认值，无需设置
relative  → 定位参考：自身原本位置 → 是否脱离文档流：否（保留原占位）→ 使用场景：微调元素位置、作为绝对定位的父容器
absolute  → 定位参考：最近的非 static 父元素 → 是否脱离文档流：是 → 使用场景：下拉菜单、角标、自定义弹窗
fixed     → 定位参考：浏览器视口（窗口）→ 是否脱离文档流：是 → 使用场景：固定导航、回到顶部、弹窗
sticky    → 定位参考：父容器 + 滚动容器 → 是否脱离文档流：混合（未滚动时占位，滚动后固定）→ 使用场景：吸顶导航、表头固定


二、详细说明

static（默认值）
元素按正常文档流排列，top/left/right/bottom 对其无效。
.box { position: static; }

relative（相对定位）
相对于自身原本位置偏移，原来占的空间还在，其他元素不会补位。
.box { position: relative; top: 10px; left: 20px; }

absolute（绝对定位）
相对于最近的非 static 父元素定位，完全脱离文档流，其他元素会补位。
.parent { position: relative; }
.child { position: absolute; top: 0; right: 0; }

fixed（固定定位）
相对于浏览器窗口定位，滚动时位置不变。
.header { position: fixed; top: 0; left: 0; right: 0; }

sticky（粘性定位）
结合 relative 和 fixed 的特点：未滚动时占位，滚动到阈值时固定。
.nav { position: sticky; top: 0; }


三、定位偏移属性

top: 10px;     → 离顶部 10px
bottom: 10px;  → 离底部 10px
left: 10px;    → 离左侧 10px
right: 10px;   → 离右侧 10px


四、z-index 控制层级

当元素重叠时，z-index 值越大越靠上。
.box1 { position: fixed; z-index: 100; }
.box2 { position: fixed; z-index: 50; }


五、常见场景示例

固定导航栏：
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}

吸顶导航：
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
}

弹窗居中：
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
}

右下角回到顶部：
.back-to-top {
  position: fixed;
  bottom: 30px;
  right: 30px;
}


六、总结表

static    → “站那别动” → 什么都不做
relative  → “自己挪个位置，但原来的坑还在” → 微调位置、给子元素做参考
absolute  → “离开队伍，跟最近的队长走” → 下拉菜单、角标
fixed     → “钉在窗户上，怎么滚动都不动” → 固定导航、弹窗
sticky    → “平时站着，滚到边缘就粘住” → 吸顶导航


记忆口诀：
static 是默认，relative 原地偏
absolute 跟父走，fixed 钉窗边
sticky 粘性定位，滚动到边就固定
```





```text
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>position 五种定位演示</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: Arial; padding: 20px; background: #f0f2f5; }

    .container { max-width: 700px; margin: 0 auto; }

    .title {
      text-align: center;
      padding: 20px;
      background: #fff;
      border-radius: 8px;
      margin-bottom: 20px;
      font-size: 20px;
    }

    .card {
      background: #fff;
      border-radius: 8px;
      padding: 16px 20px;
      margin-bottom: 16px;
      border-left: 4px solid #409EFF;
    }
    .card .label {
      font-weight: bold;
      color: #409EFF;
    }

    .box {
      width: 80px;
      height: 50px;
      color: #fff;
      font-size: 13px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
    }

    /* 父容器（用于 relative/absolute 演示） */
    .relative-box {
      position: relative;
      background: #f5f7fa;
      padding: 30px 20px;
      border: 2px dashed #ccc;
      border-radius: 6px;
      min-height: 120px;
      margin-top: 8px;
    }
    .relative-box .label {
      font-size: 12px;
      color: #999;
      font-weight: normal;
    }

    .static-box { background: #909399; }
    .relative-demo { background: #E6A23C; position: relative; top: 10px; left: 20px; }
    .absolute-demo { background: #F56C6C; position: absolute; top: 10px; right: 10px; }
    .fixed-demo { background: #67C23A; position: fixed; bottom: 20px; right: 20px; z-index: 999; }
    .sticky-demo { background: #409EFF; position: sticky; top: 0; z-index: 100; }

    .fixed-note {
      background: #fff3cd;
      padding: 10px 16px;
      border-radius: 6px;
      font-size: 14px;
      text-align: center;
      margin-top: 10px;
      border: 1px solid #ffc107;
    }
  </style>
</head>
<body>

<div class="container">

  <div class="title">📐 position 五种定位方式</div>

  <!-- 1. static -->
  <div class="card">
    <span class="label">1. static</span>（默认，无定位）
    <div style="margin-top:8px;">
      <div class="box static-box">static</div>
    </div>
  </div>

  <!-- 2. relative -->
  <div class="card">
    <span class="label">2. relative</span>（相对自身位置偏移，原占位保留）
    <div style="margin-top:8px;">
      <div class="box static-box" style="display:inline-block;">原位置</div>
      <div class="box relative-demo" style="display:inline-block;">relative<br><span style="font-size:10px;">↘ 偏移</span></div>
    </div>
  </div>

  <!-- 3. absolute -->
  <div class="card">
    <span class="label">3. absolute</span>（相对最近的非static父元素定位，脱离文档流）
    <div class="relative-box">
      <span class="label">⬅ 父容器 position: relative</span>
      <div class="box absolute-demo">absolute</div>
      <div style="color:#999; font-size:13px; margin-top:20px;">
        红色框在父容器右上角，脱离文档流
      </div>
    </div>
  </div>

  <!-- 4. fixed -->
  <div class="card">
    <span class="label">4. fixed</span>（相对视口固定，滚动不动）
    <div class="box fixed-demo">fixed</div>
    <div class="fixed-note">
      ✅ 绿色框固定在右下角，滚动页面它不动
    </div>
  </div>

  <!-- 5. sticky -->
  <div class="card" style="border-left-color:#409EFF;">
    <span class="label">5. sticky</span>（滚动到顶部时固定）
    <div style="background:#f5f7fa; padding:12px; border-radius:4px; margin-top:8px;">
      <div style="background:#409EFF; color:#fff; padding:12px; border-radius:4px; text-align:center; position:sticky; top:0; z-index:10;">
        ⭐ sticky 导航栏 — 滚到顶部时吸住
      </div>
      <div style="padding:12px; color:#666; font-size:13px; line-height:2;">
        <p>↓ 继续滚动，蓝色条会吸在顶部</p>
        <p>↓ 这就是 sticky 的效果</p>
        <p>↓ 滚动试试看</p>
        <p>↓ ...</p>
      </div>
    </div>
  </div>

  <!-- 总结 -->
  <div class="card" style="border-left-color:#909399; background:#fafafa;">
    <span class="label">📌 总结</span>
    <div style="font-size:13px; color:#555; margin-top:6px; line-height:1.8;">
      <strong>static</strong> → 默认，无定位<br>
      <strong>relative</strong> → 相对自身偏移，占位保留<br>
      <strong>absolute</strong> → 相对父元素定位，脱离文档流<br>
      <strong>fixed</strong> → 相对视口固定，滚动不动<br>
      <strong>sticky</strong> → 滚动到阈值时固定
    </div>
  </div>

  <div style="height:300px;"></div>

</div>

</body>
</html>
```







| 情况                 | 是否脱离 | 说明                       |
| :------------------- | :------- | :------------------------- |
| `position: static`   | ❌ 否     | 默认，正常排               |
| `position: relative` | ❌ 否     | 自己挪位置，但**占位还在** |
| `position: absolute` | ✅ 是     | 完全脱离，不占位           |
| `position: fixed`    | ✅ 是     | 完全脱离，不占位           |
| `position: sticky`   | 混合     | 正常时占位，固定时不占位   |
| `float: left/right`  | ✅ 是     | 浮动脱离，文字环绕         |



| 属性值           | 效果                       | 图示                 |
| :--------------- | :------------------------- | :------------------- |
| `repeat`（默认） | 水平和垂直都重复，铺满容器 | `[图][图][图]`       |
| `no-repeat`      | 只显示一张，不重复         | `[图]`（只有一张）   |
| `repeat-x`       | 只在水平方向重复           | `[图][图][图]`       |
| `repeat-y`       | 只在垂直方向重复           | `[图]` `[图]` `[图]` |

| 伪类        | 触发时机                 | 示例           |
| :---------- | :----------------------- | :------------- |
| `:hover`    | 鼠标**悬停**时           | 按钮变暗       |
| `:active`   | 鼠标**按下**时（未松开） | 按钮缩小       |
| `:focus`    | 元素**获得焦点**时       | 输入框边框变蓝 |
| `:visited`  | 链接**已被访问**后       | 链接变紫       |
| `:link`     | 链接**未被访问**时       | 链接变蓝       |
| `:disabled` | 元素**被禁用**时         | 按钮灰色不可点 |

```text
//display
一维布局（一行或一列）→ 用 flex
二维布局（行和列同时控制）→ 用 grid
普通文本内容 → 用默认 block/inline
不需要显示 → 用 none

flex → 一维布局（行/列），适合组件内部排列、居中对齐
grid → 二维布局（行+列），适合页面整体结构
block → 独占一行
inline → 文字内联
inline-block → 并排但可设宽高
none → 隐藏
```

| 对比         | Flex                       | Grid                       |
| :----------- | :------------------------- | :------------------------- |
| **维度**     | 一维（行或列）             | 二维（行和列同时控制）     |
| **适用场景** | 组件内部排列、导航栏、居中 | 页面整体布局、相册、仪表盘 |
| **对齐方式** | 主轴 + 交叉轴              | 行 + 列（更强大）          |
| **学习曲线** | 简单                       | 稍复杂                     |

| 属性                    | 值            | 图中效果                                  |
| :---------------------- | :------------ | :---------------------------------------- |
| `grid-template-columns` | `1fr 1fr 1fr` | 3列等宽（黄色占前2列，绿色占第3列一部分） |
| `grid-template-rows`    | `60px 60px`   | 2行，每行60px                             |
| `gap`                   | `10px`        | 元素之间10px间距                          |
| `grid-column: 1 / 3`    | 黄色元素      | 占第1列到第3列（横跨2列）                 |
| `grid-row: 1 / 3`       | 绿色元素      | 占第1行到第3行（纵跨2行）                 |

```javascript
<!DOCTYPE html>
<html>
<head>
  <style>
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr; /* 3列等宽 */
      grid-template-rows: 50px 50px;      /* 2行，每行50px */
      gap: 10px;
    }
    .grid div {
      background: #409EFF;
      color: #fff;
      text-align: center;
      padding: 8px;
      border-radius: 4px;
    }
    .c2 { grid-column: 1 / 3; background: #E6A23C; } /* 跨2列 */
    .r2 { grid-row: 1 / 3; background: #67C23A; }   /* 跨2行 */
  </style>
</head>
<body>

  <div class="grid">
    <div class="c2">跨2列</div>
    <div class="r2">跨2行</div>
    <div>3</div>
    <div>4</div>
  </div>

</body>
</html>
```


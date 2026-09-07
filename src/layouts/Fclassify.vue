<template>

    <!-- ===== 搜索框 ===== -->
    <div class="search-wrapper">
        <div class="search-box">
            <el-icon class="search-icon">
                <Search />
            </el-icon>
            <input type="text" v-model="searchKeyword" placeholder="搜索视频标题..." @input="handleSearch"
                @keyup.enter="handleSearchImmediately" />
            <span v-if="searchKeyword" class="clear-btn" @click="clearSearch">x</span>
        </div>
        <span class="search-count" v-if="searchKeyword">
            找到 {{ filteredList.length }} 个视频
        </span>
    </div>

    <!-- ===== 视频列表 ===== -->
    <div class="video-page">
        <div class="video-grid">
            <div v-for="video in filteredList" :key="video.id" class="video-card" @click="goToVideo(video.id)">
                <div class="cover-wrapper">
                    <img :src="video.cover" :alt="video.title" class="cover" loading="lazy" />
                    <span class="duration">{{ video.duration }}</span>
                </div>

                <!-- 标题（关键词高亮） -->
                <div class="title" v-html="highlightText(video.title, searchKeyword)"></div>

                <div class="info">
                    <span class="author">{{ video.author }}</span>
                    <span class="views">{{ video.views }}播放</span>
                    <span class="date">{{ video.date }}</span>
                </div>
            </div>
        </div>

        <!-- ===== 空状态 ===== -->
        <div v-if="searchKeyword && filteredList.length === 0" class="empty-state">
            <p> 没有找到相关视频</p>
        </div>
    </div>












<!-- 

    <div class="video-page">
        <div class="video-grid">
            <div v-for="video in filteredList" :key="video.id" class="video-card" @click="goToVideo(video.id)">

                <div class="cover-wrapper">
                    <img :src="video.cover" :alt="video.title" class="cover" loading="lazy" />
                    <span class="duration">{{ video.duration }}</span>
                </div>


                <div class="title">{{ video.title }}</div>


                <div class="info">
                    <span class="author">{{ video.author }}</span>
                    <span class="views">{{ video.views }}播放</span>
                    <span class="date">{{ video.date }}</span>
                </div>
            </div>
        </div>
    </div>
 -->

    
</template>

<script setup>
import { reactive, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Search } from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

const videoList = reactive([
    {
        id: 1,
        title: '【中日字幕/ED完整版】ナナヲアカリ「明日の私に幸あれ」【虽然是公会的前台小姐，因为讨厌加班，所以打算自己讨伐BOSS ED】',
        author: '百億_光年',
        views: '12.3万',
        cover: '/images/b01.jpg',
        duration: '04:32',
        date: '2024-12-18'
    },
    {
        id: 2,
        title: '【中日字幕/OP完整版】虽然是公会前台小姐但讨厌加班所以自己讨伐 OP「パーフェクトデイ」/ 310',
        author: '百億_光年',
        views: '8.7万',
        cover: '/images/b02.jpg',
        duration: '03:45',
        date: '2025-01-10'
    },
    {
        id: 3,
        title: '【OP/ED】虽然是公会的前台小姐，因为不想加班，所以单挑BOSS',
        author: 'crayonxx_',
        views: '5.2万',
        cover: '/images/b03.jpg',
        duration: '05:10',
        date: '2025-01-11'
    },
    {
        id: 4,
        title: '【中文字幕】Heiliges Requiem（神圣安魂曲）/ NEUN Episode 1',
        author: '钢板人锅包肉',
        views: '3.8万',
        cover: '/images/b04.jpg',
        duration: '06:20',
        date: '2024-09-09'
    },
    {
        id: 5,
        title: '《铠甲勇士》全部战歌全球数据排名，每一首都是当年的战力 BGM。【铠甲勇士官方二创大赛】',
        author: '沉默的高阳公主',
        views: '2.1万',
        cover: '/images/b05.jpg',
        duration: '08:15',
        date: '2025-08-12'
    },
    {
        id: 6,
        title: 'Empty old City - 青羅れるフィリア (feat. DAZBE)',
        author: 'Empty_old_City',
        views: '1.5万',
        cover: '/images/b06.jpg',
        duration: '04:50',
        date: '2025-08-20'
    },
    {
        id: 7,
        title: '【斯卡布罗集市｜末日三问】百万级录音棚听《Scarborough Fair》TV动画《末日三问》OST【Hi-Res】',
        author: 'JLRs-jayfm',
        views: '9.6万',
        cover: '/images/b07.jpg',
        duration: '05:28',
        date: '2023-07-05'
    },
    {
        id: 8,
        title: '【幻影绽放于幽梦之间】低语回响在午夜边缘 | Phantom Bloom',
        author: '猫可乐Sama',
        views: '6.3万',
        cover: '/images/b08.jpg',
        duration: '04:12',
        date: '2025-05-11'
    },
    {
        id: 9,
        title: '欧布奥特曼原生之初主题曲《True Fighter》原版',
        author: '大古音乐',
        views: '4.7万',
        cover: '/images/b09.jpg',
        duration: '03:58',
        date: '2022-02-24'
    },
    {
        id: 10,
        title: '百万级录音棚听《假面骑士：超越世代》主题曲「Promise」',
        author: 'JLRs-jayfm',
        views: '3.2万',
        cover: '/images/b10.jpg',
        duration: '04:45',
        date: '2025-05-10'
    }
])

const goToVideo = (id) => {
    //   router.push(`/video/${id}`)
    switch (id) {
        case 1:
            // window.location.href = 'https://www.bilibili.com/video/BV1FUkcYEEyE/?spm_id_from=333.1391.0.0&vd_source=7b46880138058a1e1001ebfdbea0e74a'
            window.open('https://www.bilibili.com/video/BV1FUkcYEEyE', '_blank')
            // console.log(route.path)
            break
        case 2:
            window.open('https://www.bilibili.com/video/BV1XxcnezECT', '_blank')
            break
        case 3:
            window.open('https://www.bilibili.com/video/BV1GdcxesEGp', '_blank')
            break
        case 4:
            window.open('https://www.bilibili.com/video/BV1XjpEeWEss', '_blank')
            break
        case 5:
            window.open('https://www.bilibili.com/video/BV1Qquz6XEWC', '_blank')
            break
        case 6:
            window.open('https://www.bilibili.com/video/BV1xJbZ62EoW', '_blank')
            break
        case 7:
            window.open('https://www.bilibili.com/video/BV15W4y1f7VT', '_blank')
            break
        case 8:
            window.open('https://www.bilibili.com/video/BV1ih5b61E24', '_blank')
            break
        case 9:
            window.open('https://www.bilibili.com/video/BV1HS4y1k71L', '_blank')
            break
        case 10:
            window.open('https://www.bilibili.com/video/BV1xsVdzDEJ1', '_blank')
            break
    }
}




// ============================================================
// 搜索框
// ============================================================
const searchKeyword = ref('')
let searchTimer = null

// 计算属性：过滤后的列表
const filteredList = computed(() => {
    if (!searchKeyword.value.trim()) {
        return videoList
    }
    const keyword = searchKeyword.value.trim().toLowerCase()
    return videoList.filter(video =>
        video.title && video.title.toLowerCase().includes(keyword)
    )
})

// 关键词高亮
const highlightText = (text, keyword) => {
    if (!keyword || !text) return text
    const regex = new RegExp(keyword.trim(), 'gi')
    return text.replace(regex, (match) => `<span class="highlight">${match}</span>`)
}

// 防抖搜索
const handleSearch = () => {
    if (searchTimer) {
        clearTimeout(searchTimer)
    }
    searchTimer = setTimeout(() => {
        // computed 自动更新
    }, 300)
}

const handleSearchImmediately = () => {
    // 1. 清除防抖定时器（防止冲突）
    if (searchTimer) {
        clearTimeout(searchTimer)
        searchTimer = null
    }
    // 2. 触发搜索（computed 自动更新）
    // 不需要额外操作，因为 filteredList 依赖 searchKeyword
    // 但为了确认搜索已触发，可以加个日志
    //   console.log('🔍 立即搜索:', searchKeyword.value)
}

// 清空搜索
const clearSearch = () => {
    searchKeyword.value = ''
}



</script>

<style>
.video-page .video-grid .video-card .title .highlight {
  background: #5dff35;
  color: #333;
  padding: 0 2px;
  border-radius: 2px;
}
</style>




<style scoped>
/* ===== 搜索框 ===== */
.search-wrapper {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.search-box {
    display: flex;
    align-items: center;
    flex: 1;
    max-width: 500px;
    background: #f5f7fa;
    border-radius: 8px;
    padding: 0 12px;
    border: 2px solid transparent;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.search-box:focus-within {
    border-color: #409EFF;
    box-shadow: 0 0 0 4px rgba(64, 158, 255, 0.1);
}

.search-icon {
    color: #909399;
    font-size: 18px;
}

.search-box input {
    flex: 1;
    padding: 10px 12px;
    border: none;
    outline: none;
    background: transparent;
    font-size: 14px;
    color: #333;
}

.search-box input::placeholder {
    color: #c0c4cc;
}

.clear-btn {
    cursor: pointer;
    color: #909399;
    font-size: 20px;
    padding: 0 4px;
    user-select: none;
}

.clear-btn:hover {
    color: #409EFF;
}

.search-count {
    font-size: 13px;
    color: #909399;
    white-space: nowrap;
}



/* ===== 空状态（新增） ===== */
.empty-state {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 200px;
    color: #909399;
    font-size: 16px;
}





/* ===== 视频页面 ===== */
.video-page {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
    height: calc(100vh - 180px);
    /* 减去头部+标签栏+padding 的高度 */
    overflow-y: auto;
    /* 垂直滚动 */
    overflow-x: hidden;
    /* 水平隐藏 */
    /* background-color: #000000; */
}

/* ===== 网格布局 ===== */
.video-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 20px 16px;
}

/* ===== 视频卡片 ===== */
.video-card {
    cursor: pointer;
    transition: transform 0.2s ease;
}

.video-card:hover {
    transform: translateY(-4px);
}

/* ===== 封面图 ===== */
.cover-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    /* 16:9 */
    overflow: hidden;
    border-radius: 8px;
    background: #f0f0f0;
}

.cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.duration {
    position: absolute;
    bottom: 6px;
    right: 6px;
    /* background: rgba(0, 0, 0, 0.8); */
    color: #fff;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 12px;
}

/* ===== 标题 ===== */
.title {
    margin-top: 8px;
    font-size: 14px;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    color: #222;
}

/* ===== 信息栏 ===== */
.info {
    margin-top: 4px;
    font-size: 12px;
    color: #999;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
}

.author {
    color: #666;
}

.author:hover {
    color: #409EFF;
}

.views::before {
    content: '· ';
}

.date::before {
    content: '· ';
}
</style>
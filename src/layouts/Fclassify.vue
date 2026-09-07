<template>
  <div class="video-page">
    <div class="video-grid">
      <div 
        v-for="video in videoList" 
        :key="video.id" 
        class="video-card"
        @click="goToVideo(video.id)"
      >
        <!-- 封面图 -->
        <div class="cover-wrapper">
          <img :src="video.cover" :alt="video.title" class="cover" loading="lazy" />
          <span class="duration">{{ video.duration }}</span>
        </div>
        
        <!-- 标题 -->
        <div class="title">{{ video.title }}</div>
        
        <!-- 作者信息 -->
        <div class="info">
          <span class="author">{{ video.author }}</span>
          <span class="views">{{ video.views }}播放</span>
          <span class="date">{{ video.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const videoList = reactive([
  {
    id: 1,
    title: '【中日字幕/ED完整版】ナナヲアカリ「明日の私に幸あれ」【虽然是公会的前台小姐，因为讨厌加班，所以打算自己讨伐BOSS ED】',
    author: '百億_光年',
    views: '12.3万',
    cover: 'https://picsum.photos/seed/video1/320/180',
    duration: '04:32',
    date: '2024-12-18'
  },
  {
    id: 2,
    title: '【中日字幕/OP完整版】虽然是公会前台小姐但讨厌加班所以自己讨伐 OP「パーフェクトデイ」/ 310',
    author: '百億_光年',
    views: '8.7万',
    cover: 'https://picsum.photos/seed/video2/320/180',
    duration: '03:45',
    date: '2025-01-10'
  },
  {
    id: 3,
    title: '【OP/ED】虽然是公会的前台小姐，因为不想加班，所以单挑BOSS',
    author: 'crayonxx_',
    views: '5.2万',
    cover: 'https://picsum.photos/seed/video3/320/180',
    duration: '05:10',
    date: '2025-01-11'
  },
  {
    id: 4,
    title: '【中文字幕】Heiliges Requiem（神圣安魂曲）/ NEUN Episode 1',
    author: '钢板人锅包肉',
    views: '3.8万',
    cover: 'https://picsum.photos/seed/video4/320/180',
    duration: '06:20',
    date: '2024-09-09'
  },
  {
    id: 5,
    title: '《铠甲勇士》全部战歌全球数据排名，每一首都是当年的战力 BGM。【铠甲勇士官方二创大赛】',
    author: '沉默的高阳公主',
    views: '2.1万',
    cover: 'https://picsum.photos/seed/video5/320/180',
    duration: '08:15',
    date: '2025-08-12'
  },
  {
    id: 6,
    title: 'Empty old City - 青羅れるフィリア (feat. DAZBE)',
    author: 'Empty_old_City',
    views: '1.5万',
    cover: 'https://picsum.photos/seed/video6/320/180',
    duration: '04:50',
    date: '2025-08-20'
  },
  {
    id: 7,
    title: '【斯卡布罗集市｜末日三问】百万级录音棚听《Scarborough Fair》TV动画《末日三问》OST【Hi-Res】',
    author: 'JLRs-jayfm',
    views: '9.6万',
    cover: 'https://picsum.photos/seed/video7/320/180',
    duration: '05:28',
    date: '2023-07-05'
  },
  {
    id: 8,
    title: '【幻影绽放于幽梦之间】低语回响在午夜边缘 | Phantom Bloom',
    author: '猫可乐Sama',
    views: '6.3万',
    cover: 'https://picsum.photos/seed/video8/320/180',
    duration: '04:12',
    date: '2025-05-11'
  },
  {
    id: 9,
    title: '欧布奥特曼原生之初主题曲《True Fighter》原版',
    author: '大古音乐',
    views: '4.7万',
    cover: 'https://picsum.photos/seed/video9/320/180',
    duration: '03:58',
    date: '2022-02-24'
  },
  {
    id: 10,
    title: '百万级录音棚听《假面骑士：超越世代》主题曲「Promise」',
    author: 'JLRs-jayfm',
    views: '3.2万',
    cover: 'https://picsum.photos/seed/video10/320/180',
    duration: '04:45',
    date: '2025-05-10'
  }
])

const goToVideo = (id) => {
  router.push(`/video/${id}`)
}
</script>

<style scoped>
.video-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  height: calc(100vh - 180px);  /* 减去头部+标签栏+padding 的高度 */
  overflow-y: auto;            /* 垂直滚动 */
  overflow-x: hidden;          /* 水平隐藏 */
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
  padding-bottom: 56.25%; /* 16:9 */
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
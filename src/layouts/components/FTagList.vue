<template>
    <div>标签导航</div>
     <div class="container">
        <div
        class="drag-box"
        :style="{ left: x + 'px', top: y + 'px' }"
        @mousedown="startDrag"
        @touchstart="startDragTouch"
        >
            拖我
        </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'

const x = ref(100)
const y = ref(100)

// ===== 鼠标拖拽 =====
const startDrag = (e) => {
  const startX = e.clientX - x.value
  const startY = e.clientY - y.value

  const onMove = (ev) => {
    x.value = ev.clientX - startX
    y.value = ev.clientY - startY
  }

  const onEnd = () => {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onEnd)
  }

  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onEnd)
}

// ===== 触摸拖拽（移动端） =====
const startDragTouch = (e) => {
  const touch = e.touches[0]
  const startX = touch.clientX - x.value
  const startY = touch.clientY - y.value

  const onMove = (ev) => {
    const t = ev.touches[0]
    x.value = t.clientX - startX
    y.value = t.clientY - startY
  }

  const onEnd = () => {
    document.removeEventListener('touchmove', onMove)
    document.removeEventListener('touchend', onEnd)
  }

  document.addEventListener('touchmove', onMove, { passive: false })
  document.addEventListener('touchend', onEnd)
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  position: relative;
  background: #f0f2f5;
  overflow: hidden;
}

.drag-box {
  position: absolute;
  width: 80px;
  height: 80px;
  background: #409EFF;
  color: #fff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  user-select: none;
  font-size: 14px;
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
  transition: box-shadow 0.2s;
}

.drag-box:active {
  cursor: grabbing;
  box-shadow: 0 6px 20px rgba(64, 158, 255, 0.5);
}
</style>
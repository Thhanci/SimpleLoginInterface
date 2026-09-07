<template>
  <div class="container" ref="containerRef">
    <!-- 3D 画布 -->
    <div ref="canvasWrapper" class="canvas-wrapper"></div>

    <!-- 提示 -->
    <div class="hint">🖱️ 拖拽模型移动 | 滚轮缩放</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

const containerRef = ref(null)
const canvasWrapper = ref(null)

let scene, camera, renderer, model
let isDragging = false
let prevMouse = { x: 0, y: 0 }

// 模型位置（屏幕坐标）
const modelPos = { x: 0, y: 0 }

// 模型在 3D 空间中的位置
const targetPos = new THREE.Vector3(0, 0, 0)

onMounted(() => {
  const container = containerRef.value
  const wrapper = canvasWrapper.value
  const width = container.clientWidth
  const height = container.clientHeight

  // ===== 1. 场景（透明） =====
  scene = new THREE.Scene()
  scene.background = null

  // ===== 2. 相机（正交相机，方便拖拽） =====
  const aspect = width / height
  const frustumSize = 5
  camera = new THREE.OrthographicCamera(
    -frustumSize * aspect / 2,
    frustumSize * aspect / 2,
    frustumSize / 2,
    -frustumSize / 2,
    0.1,
    100
  )
  camera.position.set(0, 0, 10)
  camera.lookAt(0, 0, 0)

  // ===== 3. 渲染器（透明） =====
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  })
  renderer.setSize(width, height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = true
  wrapper.appendChild(renderer.domElement)

  // ===== 4. 灯光 =====
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
  scene.add(ambientLight)

  const mainLight = new THREE.DirectionalLight(0xffffff, 1.5)
  mainLight.position.set(5, 8, 5)
  mainLight.castShadow = true
  scene.add(mainLight)

  const fillLight = new THREE.DirectionalLight(0x8888ff, 0.5)
  fillLight.position.set(-4, 2, 3)
  scene.add(fillLight)

  const rimLight = new THREE.DirectionalLight(0xffffff, 0.4)
  rimLight.position.set(0, 1, -5)
  scene.add(rimLight)

  // ===== 5. 加载模型 =====
  const loader = new GLTFLoader()
  const modelUrl = '/doll/aemeath.glb'

  loader.load(
    modelUrl,
    (gltf) => {
      model = gltf.scene
      model.position.set(0, 0, 0)
      // 根据模型大小调整缩放
      const box = new THREE.Box3().setFromObject(model)
      const size = box.getSize(new THREE.Vector3())
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 2.5 / maxDim
      model.scale.set(scale, scale, scale)
      model.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
        }
      })
      scene.add(model)
      console.log('✅ 模型加载成功')
    },
    undefined,
    (error) => {
      console.error('❌ 模型加载失败:', error)
      createFallbackCharacter()
    }
  )

  // ===== 6. 备用人偶 =====
  function createFallbackCharacter() {
    const group = new THREE.Group()
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x409EFF })
    const body = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.9, 0.35), bodyMat)
    body.position.y = 0.45
    group.add(body)

    const headMat = new THREE.MeshStandardMaterial({ color: 0xffd4a8 })
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 32), headMat)
    head.position.y = 1.1
    group.add(head)

    const armMat = new THREE.MeshStandardMaterial({ color: 0xffd4a8 })
    const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.6, 0.12), armMat)
    leftArm.position.set(-0.4, 0.55, 0)
    leftArm.rotation.z = 0.3
    group.add(leftArm)

    const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.6, 0.12), armMat)
    rightArm.position.set(0.4, 0.55, 0)
    rightArm.rotation.z = -0.3
    group.add(rightArm)

    const legMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50 })
    const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.45, 0.16), legMat)
    leftLeg.position.set(-0.15, 0.2, 0)
    group.add(leftLeg)

    const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.45, 0.16), legMat)
    rightLeg.position.set(0.15, 0.2, 0)
    group.add(rightLeg)

    const box = new THREE.Box3().setFromObject(group)
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 2.5 / maxDim
    group.scale.set(scale, scale, scale)
    scene.add(group)
  }

  // ============================================================
  // 7. 鼠标拖拽移动模型
  // ============================================================
  const onMouseDown = (e) => {
    isDragging = true
    const rect = container.getBoundingClientRect()
    prevMouse.x = e.clientX - rect.left
    prevMouse.y = e.clientY - rect.top
    container.style.cursor = 'grabbing'
  }

  const onMouseMove = (e) => {
    const rect = container.getBoundingClientRect()
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top

    if (isDragging && model) {
      // 屏幕坐标 → 世界坐标
      const aspect = container.clientWidth / container.clientHeight
      const frustumSize = 5
      const worldX = (mouseX / container.clientWidth - 0.5) * frustumSize * aspect
      const worldY = -(mouseY / container.clientHeight - 0.5) * frustumSize
      model.position.x = worldX
      model.position.y = worldY
    }

    // 更新鼠标悬停样式
    if (!isDragging) {
      const rect2 = container.getBoundingClientRect()
      const mx = e.clientX - rect2.left
      const my = e.clientY - rect2.top
      // 简单判断：是否在模型区域（可以优化为射线检测）
      container.style.cursor = 'grab'
    }
  }

  const onMouseUp = () => {
    isDragging = false
    container.style.cursor = 'grab'
  }

  // ===== 8. 触摸拖拽（移动端） =====
  const onTouchStart = (e) => {
    const touch = e.touches[0]
    const rect = container.getBoundingClientRect()
    prevMouse.x = touch.clientX - rect.left
    prevMouse.y = touch.clientY - rect.top
    isDragging = true
  }

  const onTouchMove = (e) => {
    e.preventDefault()
    if (!isDragging || !model) return
    const touch = e.touches[0]
    const rect = container.getBoundingClientRect()
    const mouseX = touch.clientX - rect.left
    const mouseY = touch.clientY - rect.top

    const aspect = container.clientWidth / container.clientHeight
    const frustumSize = 5
    const worldX = (mouseX / container.clientWidth - 0.5) * frustumSize * aspect
    const worldY = -(mouseY / container.clientHeight - 0.5) * frustumSize
    model.position.x = worldX
    model.position.y = worldY
  }

  const onTouchEnd = () => {
    isDragging = false
  }

  // ===== 9. 事件绑定 =====
  container.addEventListener('mousedown', onMouseDown)
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)

  container.addEventListener('touchstart', onTouchStart, { passive: true })
  container.addEventListener('touchmove', onTouchMove, { passive: false })
  container.addEventListener('touchend', onTouchEnd, { passive: true })

  // ===== 10. 窗口自适应 =====
  const handleResize = () => {
    const w = container.clientWidth
    const h = container.clientHeight
    const aspect = w / h
    const frustumSize = 5
    camera.left = -frustumSize * aspect / 2
    camera.right = frustumSize * aspect / 2
    camera.top = frustumSize / 2
    camera.bottom = -frustumSize / 2
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
  }
  window.addEventListener('resize', handleResize)

  // ===== 11. 动画循环 =====
  function animate() {
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
  }
  animate()

  // ===== 12. 清理 =====
  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('resize', handleResize)
    container.removeEventListener('mousedown', onMouseDown)
    container.removeEventListener('touchstart', onTouchStart)
    container.removeEventListener('touchmove', onTouchMove)
    container.removeEventListener('touchend', onTouchEnd)
    renderer.dispose()
    wrapper.removeChild(renderer.domElement)
  })
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  position: relative;
  background: transparent;
  overflow: hidden;
  cursor: grab;
  user-select: none;
}

.container:active {
  cursor: grabbing;
}

.canvas-wrapper {
  width: 100%;
  height: 100%;
}

.hint {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  background: rgba(255, 255, 255, 0.7);
  padding: 6px 16px;
  border-radius: 20px;
  pointer-events: none;
  user-select: none;
  backdrop-filter: blur(4px);
}
</style>
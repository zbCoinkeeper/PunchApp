<template>
  <div class="checkin-container">
    <!-- 页面标题 -->
    <van-nav-bar title="每日打卡" />

    <!-- 输入添加区域 -->
    <div class="add-section">
      <van-cell-group inset>
        <van-field
            v-model="newItemTitle"
            placeholder="输入新的打卡项目"
            :border="false"
            @keyup.enter="addItem"
        >
          <template #button>
            <van-button size="small" type="primary" @click="addItem">添加</van-button>
          </template>
        </van-field>
      </van-cell-group>
    </div>

    <!-- 打卡列表 -->
    <div class="list-section">
      <van-empty v-if="checkinItems.length === 0" description="暂无打卡项目" />

      <van-list
          v-else
          :immediate-check="false"
          :offset="50"
      >
        <van-swipe-cell
            v-for="(item, index) in checkinItems"
            :key="item.title"
            :on-close="() => onCloseSwipeCell(index)"
        >
          <van-cell
              :title="item.title"
              :value="item.completed ? '已完成' : '未完成'"
              :class="{ completed: item.completed }"
              @click="toggleComplete(item)"
          >
            <template #right-icon>
              <van-tag
                  :color="item.completed ? '#4fc08d' : '#f44336'"
                  class="status-tag"
              >
                {{ item.completed ? '今日已完成' : '点击打卡' }}
              </van-tag>
            </template>
          </van-cell>

          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="removeItem(index)" />
          </template>
        </van-swipe-cell>
      </van-list>
    </div>

    <!-- 底部装饰 -->
    <div class="footer-decoration">
      <van-image
          src="https://via.placeholder.com/800x150.png?text=Daily+Checkin+Footer"
          width="100%"
          height="auto"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { showToast } from 'vant'

// 打卡项类型定义
interface CheckinItem {
  title: string
  completed: boolean
}

// 响应式数据
const newItemTitle = ref('')
const checkinItems = ref<CheckinItem[]>([])

// 添加新打卡项
const addItem = () => {
  if (newItemTitle.value.trim() === '') {
    showToast('请输入打卡内容')
    return
  }

  checkinItems.value.push({
    title: newItemTitle.value,
    completed: false
  })

  newItemTitle.value = ''
  showToast('添加成功')
}

// 切换完成状态
const toggleComplete = (item: CheckinItem) => {
  item.completed = !item.completed
  showToast(item.completed ? '打卡成功！' : '状态已更新')
}

// 删除打卡项
const removeItem = (index: number) => {
  checkinItems.value.splice(index, 1)
  showToast('已删除')
}

// 滑动单元格关闭处理
const onCloseSwipeCell = (index: number) => {
  // 这里可以选择实现更复杂的滑动关闭逻辑
  return true
}
</script>

<style>
.checkin-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f5f8ff, #ffffff);
  display: flex;
  flex-direction: column;
  font-family: Arial, sans-serif;
}

.add-section {
  padding: 16px;
  background-color: #ffffff;
  margin-bottom: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.list-section {
  flex: 1;
  overflow-y: auto;
  padding: 0 8px;
}

.van-cell {
  margin-bottom: 10px;
  border-radius: 12px;
  transition: all 0.3s ease;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.van-cell:active {
  transform: translateX(5px);
}

.van-cell.completed .van-cell__title {
  text-decoration: line-through;
  color: #999999;
}

.status-tag {
  margin-right: 10px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
}

.delete-button {
  height: 100%;
}

.footer-decoration {
  margin-top: auto;
}

.van-empty {
  margin-top: 40px;
}
</style>
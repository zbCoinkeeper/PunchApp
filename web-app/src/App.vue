<template>
  <div id="app">
    <!-- 页面内容 -->
    <router-view />

    <!-- 底部 Tabbar -->
    <van-tabbar route>
      <van-tabbar-item replace to="/" icon="home-o">打卡</van-tabbar-item>
      <van-tabbar-item replace to="/cal" icon="search">统计</van-tabbar-item>
    </van-tabbar>
  </div>
</template>







<style scoped>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.page-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}
</style>
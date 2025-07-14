<template>
  <div>
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
  .app{

  }
</style>
<script lang="ts">
  import HabitPage from './HabitPage.svelte';
  import RingPage from "./RingPage.svelte";
  const tabs = [
    { label: '首页', content: HabitPage },
    { label: '分类', content: RingPage },
  ];

  let activeIndex = 0;

  function selectTab(index:number) {
    activeIndex = index;
  }
</script>

<style>
  /* 样式不变，和之前一样 */
  .mobile-tab {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #fff;
  }

  .tab-content {
    flex: 1;
    overflow-y: auto;
    background-color: #f5f5f5;
  }

  .tab-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid #ddd;
    background-color: #ffffff;
    height: 60px;
    box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 10;
  }

  .tab-item {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #666;
    cursor: pointer;
    transition: all 0.2s ease;
    padding-top: 8px;
  }

  .tab-item.active {
    color: #007AFF;
    font-weight: bold;
    position: relative;
  }

  .tab-item.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 30%;
    height: 3px;
    background-color: #007AFF;
  }
</style>

<div class="mobile-tab">
  <!-- 内容区域 -->
  <div class="tab-content">
    {#if tabs[activeIndex]?.content}
      <svelte:component this={tabs[activeIndex].content} />
    {/if}
  </div>

  <!-- 底部 tab 栏 -->
  <div class="tab-bar" role="tablist">
    {#each tabs as tab, i}
      <div
              class="tab-item {i === activeIndex ? 'active' : ''}"
              role="tab"
              aria-selected={i === activeIndex}
              tabindex="0"
              on:click={() => selectTab(i)}
              on:keydown={(e) => (e.key === 'Enter' || e.key === ' ') && selectTab(i)}
      >
        {tab.label}
      </div>
    {/each}
  </div>
</div>
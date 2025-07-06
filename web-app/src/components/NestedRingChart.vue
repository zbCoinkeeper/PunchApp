<template>
  <div class="ring-container"
    :style="{  width: props.baseSize,
            height: props.baseSize}"
      >
    <div
        v-for="(show, categoryName) in displayFlags"
        :key="categoryName"
        v-show="show"
        class="ring"
        :style="{
        border: `${props.borderWidth}px solid`,
        borderColor: colorMap[categoryName],
        width: size(categoryName),
        height: size(categoryName),
        margin: margin(categoryName)
      }"
    >
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  colorMap: {
    type: Object,
    required: true
  },
  displayFlags: {
    type: Object,
    required: true
  },
  baseSize: {
    type: Number,
    default: 200
  },
  step: {
    type: Number,
    default: 30
  },
  borderWidth: {
    type: Number,
    default: 20
  }
});

// 过滤出需要显示的类别
const displayedCategories = computed(() => {
  return Object.entries(props.displayFlags)
      .filter(([_, show]) => show)
      .map(([category]) => category);
});

// 圆环大小计算函数
const size = (category) => {
  //const baseSize = 200; // 最外层直径

  const index = displayedCategories.value.indexOf(category);
  return `${props.baseSize - index * props.step}px`;
};

// 外边距计算，让圆环居中
const margin = (category) => {
  const index = displayedCategories.value.indexOf(category);
  //const baseMargin = 0;
  const step = props.step/2; // 每圈外边距增加
  return `${step * index}px auto auto ${step * index}px`;
};
</script>

<style scoped>
.ring-container {
  position: relative;

}

.ring {
  position: absolute;
  border-radius: 50%;
  box-sizing: border-box;
}
</style>
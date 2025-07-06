<template>
  <NestedRingChart
      :color-map="colorMap"
      :display-flags="displayFlags"
      :base-size="50"
      :step="10"
      :border-width="10"
  />
</template>

<script setup>
import NestedRingChart from '../components/NestedRingChart.vue';
const colorMap = {  rest: '#D73244' ,work: '#A0F04A',study: '#71EFD0'};
const displayFlags = {  rest: true ,work: true, study: true,};
</script>
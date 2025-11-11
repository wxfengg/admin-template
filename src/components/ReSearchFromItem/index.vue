<script setup lang="ts">
const props = defineProps({
  span: {
    type: Number,
    default: 24
  },
  sm: {
    type: Number,
    default: 24
  },
  md: {
    type: Number,
    default: 12
  },
  lg: {
    type: Number,
    default: 8
  },
  xl: {
    type: Number,
    default: 6
  },
  label: {
    type: String,
    default: ""
  },
  prop: {
    type: String,
    default: ""
  }
});
</script>

<template>
  <el-col :span :md :lg :sm :xl>
    <el-form-item :label :prop>
      <slot />
    </el-form-item>
  </el-col>
</template>

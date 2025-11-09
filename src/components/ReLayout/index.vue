<script setup lang="ts">
defineOptions({
  name: "ReLayout"
});

const props = defineProps({
  /** 是否显示title，默认true */
  showTitle: {
    type: Boolean,
    default: true
  },
  /** 自定义title，不传则根据路由的标题 */
  title: {
    type: String,
    default: ""
  },
  /** 是否显示侧边区域，默认false */
  showSide: {
    type: Boolean,
    default: false
  }
});

const route = useRoute();
console.log("🚀 ~ route:", route);
</script>

<template>
  <el-row class="size-full box-border overflow-hidden">
    <el-col v-if="showSide" :xs="0" :sm="0" :md="4">
      <el-card shadow="never" class="mr-3 h-full">
        <slot name="side">侧边区域</slot>
      </el-card>
    </el-col>
    <el-col :xs="24" :md="showSide ? 20 : 24">
      <div class="size-full flex flex-col gap-3 overflow-hidden">
        <el-card shadow="never" class="">
          <div class="">
            <slot name="search">搜索区域</slot>
          </div>
        </el-card>
        <el-card
          shadow="never"
          :body-style="{ flex: 1, overflow: 'hidden' }"
          class="flex-1"
        >
          <slot>内容区域</slot>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

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
  <el-row>
    <el-col :span="4" v-if="showSide" class="mr-4">
      <el-card shadow="never">
        <slot name="side" />
      </el-card>
    </el-col>
    <el-col :span="showSide ? 20 : 24">
      <el-card shadow="never">
        <div class="bg-amber-500!">
          <slot />
        </div>
      </el-card>
    </el-col>
  </el-row>
  <!-- <div
    class="min-h-[500px] flex flex-col items-stretch gap-16px overflow-hidden"
  >
    
  </div> -->
</template>

<style lang="scss" scoped></style>

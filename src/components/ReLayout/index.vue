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
  /** 侧边区域宽度，默认208px */
  sideWidth: {
    type: Number,
    default: 208
  }
});

const route = useRoute();
</script>

<template>
  <div class="layout-container h-full!">
    <el-card
      shadow="never"
      class="min-h-[500px] h-full flex flex-col"
      header-class="p-0! pl-3! font-bold flex items-center h-12!"
      body-class="ht50"
    >
      <template #header>
        <div v-if="showTitle" class="text-[18px]">
          {{ title || route.meta.title }}
        </div>
        <div class="ml-2.5">
          <slot name="extra" />
        </div>
      </template>

      <div class="size-full flex overflow-hidden">
        <div
          v-if="$slots.side?.().length"
          class="border-r mr-4 pr-2.5 shrink-0"
          :style="{ width: sideWidth + 'px' }"
        >
          <slot name="side" />
        </div>

        <div
          class="grow size-full flex flex-col gap-3 overflow-hidden box-border"
        >
          <slot v-if="$slots.tab?.().length" name="tab" />

          <div v-if="$slots.search?.().length" class="-mb-3">
            <slot name="search" />
          </div>

          <div
            v-if="$slots['action-left']?.().length || $slots.action?.().length"
            class="flex items-baseline justify-between"
          >
            <div>
              <slot name="action-left" />
            </div>
            <div>
              <slot name="action" />
            </div>
          </div>

          <div
            class="w-full grow flex flex-col justify-between overflow-hidden"
          >
            <div class="grow overflow-hidden">
              <slot></slot>
            </div>
            <div
              v-if="$slots.page?.().length"
              class="mt-5 flex justify-end items-center"
            >
              <slot name="page" />
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.layout-container {
  :deep() {
    .el-card {
      .ht50 {
        height: calc(100% - 50px);
      }
    }
    .el-table {
      height: 100% !important;
    }

    .el-card__body {
      padding: 12px !important;
    }
  }
}
</style>

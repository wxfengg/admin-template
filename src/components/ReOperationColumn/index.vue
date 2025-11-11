<script lang="ts" setup>
interface Props {
  prop?: string;
  label?: string;
  fixed?: string;
  align?: string;
  showOverflowTooltip?: boolean;
  minWidth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  label: "操作",
  fixed: "right",
  align: "center"
});

const maxWidth = ref(0);
const calculateWidth = () => {
  let totalWidth = 0;
  maxWidth.value = 0; // 重置为初始值
  const els = document.getElementsByClassName("operation-button");
  Array.from(els).forEach(el => {
    const buttons = el.querySelectorAll(".el-button");
    totalWidth = Array.from(buttons).reduce((prev, button) => {
      return prev + button.scrollWidth + 4; // 4 是按钮之间的左边距2px(默认为8px，本组件内已重写左边距)+按钮的padding(默认2px)
    }, 24); // 24 是左右内边距

    maxWidth.value = Math.max(maxWidth.value, totalWidth);
  });
};

const vAuto = {
  mounted: () => {
    // 初次挂载的时候计算一次
    calculateWidth();
  },
  updated: () => {
    // 数据更新时重新计算一次
    calculateWidth();
  }
};

const finalWidth = computed(() => {
  return props.minWidth || maxWidth.value;
});
</script>

<template>
  <el-table-column
    :prop
    :label
    :fixed
    :align
    :show-overflow-tooltip
    :width="finalWidth"
  >
    <template #default="{ row }">
      <div v-auto class="operation-button">
        <slot :row="row"></slot>
      </div>
    </template>
  </el-table-column>
</template>

<style lang="scss" scoped>
.operation-button {
  :deep() {
    .el-button + .el-button {
      margin-left: 2px;
    }
  }
}
</style>

<script setup lang="ts">
const props = defineProps({
  total: {
    required: true,
    type: Number as PropType<number>,
    default: 0
  },
  page: {
    type: Number,
    default: 1
  },
  size: {
    type: Number,
    default: 10
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default() {
      return [10, 20, 50, 100];
    }
  },
  layout: {
    type: String,
    default: "total, prev, pager, next, sizes"
  },
  background: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(["pagination", "update:page", "update:size"]);
const currentPage = useVModel(props, "page", emit);
const pageSize = useVModel(props, "size", emit);

function onChange(page: number, size: number) {
  emit("pagination", { page, size });
}
</script>

<template>
  <div class="re-pagination">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :background="background"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      @change="onChange"
    />
  </div>
</template>

<style lang="scss" scoped>
.re-pagination {
  :deep() {
    .el-pager li.is-active {
      background-color: var(--el-color-primary) !important;
      color: #fff !important;
      border-radius: 8px;
      padding: 4px !important;
    }
  }
}
</style>

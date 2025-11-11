<script setup lang="ts">
import { throttle } from "lodash-es";

const props = defineProps({
  rules: {
    type: Object,
    default: () => ({})
  },
  gutter: {
    type: Number,
    default: 22
  },
  toggle: {
    type: Boolean,
    default: false
  },
  rowHeight: {
    type: Number,
    default: 50
  },
  // 最大行数，超过会展示"展开/收起"
  maxRow: {
    type: Number,
    default: 2
  }
});
const model = defineModel({
  type: Object,
  default: () => ({})
});

const emits = defineEmits(["search", "reset", "toggle", "getRef"]);
const formRef = useTemplateRef("formRef");
const rowRef = useTemplateRef("rowRef");
const isExpand = ref(false);
const showToggle = ref(false);

const filterLayoutHeight = computed(() => {
  return isExpand.value ? "inherit" : `${props.rowHeight * props.maxRow}px`;
});

const handleSearch = () => {
  model.value.current = 1;
  emits("search");
};
const handleReset = () => {
  model.value.current = 1;
  formRef.value?.resetFields();
  emits("reset");
};
const handleToggleExec = () => {
  const childrens: any[] = Array.from(rowRef.value.$el?.children) || [];
  childrens[childrens.length - 1].style.position = "relative";
  childrens.map((node, index) => {
    if (node.offsetTop > clientMaxHei.value - props.rowHeight) {
      childrens[index - 1].style.visibility = isExpand.value
        ? "visible"
        : "hidden";
      if (index == childrens.length - 1) {
        node.style.position = "sticky";
      }
      showToggle.value = true;
    } else {
      node.style.visibility = "visible";
      if (index == childrens.length - 1) {
        node.style.position = "relative";
        showToggle.value = false;
      }
    }
  });
};
const handleToggleClick = () => {
  isExpand.value = !isExpand.value;
  handleToggleExec();
  emits("toggle", isExpand.value);
};

const init = () => {
  isExpand.value = props.toggle;
  handleToggleExec();
};

const clientMaxHei = computed(() => {
  return props.rowHeight * props.maxRow;
});

const resizeFn = ref(throttle(handleToggleExec, 50));

onMounted(async () => {
  await nextTick();
  emits("getRef", formRef.value);
  init();
  resizeFn.value = throttle(handleToggleExec, 50);
});

useEventListener(window, "resize", () => {
  resizeFn.value;
});

const { width } = useElementSize(formRef);
watch(width, () => handleToggleExec());
</script>

<template>
  <el-form
    ref="formRef"
    :model="model"
    :rules="rules"
    :inline="true"
    label-width="auto"
    class="search-com"
    :style="{
      maxHeight: filterLayoutHeight
    }"
    @keyup.enter="handleSearch"
    @submit.prevent="handleSearch"
  >
    <el-row :gutter="gutter" ref="rowRef">
      <slot></slot>

      <ReSearchFormItem
        :class="['search-com-btns', showToggle && !isExpand && 'is-fixed']"
      >
        <el-button type="primary" @click="handleSearch">
          <template #icon>
            <IconifyIconOnline icon="ep:search" />
          </template>
          搜索
        </el-button>
        <el-button @click="handleReset">
          <template #icon>
            <IconifyIconOnline icon="ep:refresh" />
            <i-ep-refresh />
          </template>
          重置
        </el-button>

        <el-link
          v-if="showToggle"
          class="ml-3"
          type="primary"
          :underline="false"
          @click="handleToggleClick"
        >
          <template v-if="isExpand">
            收起
            <IconifyIconOnline icon="ep:arrow-up" />
          </template>
          <template v-else>
            展开
            <IconifyIconOnline icon="ep:arrow-down" />
          </template>
        </el-link>
      </ReSearchFormItem>
    </el-row>
  </el-form>
</template>

<style lang="scss" scoped>
.search-com {
  overflow: hidden;
}

.search-com-btns {
  width: 100%;
  padding-left: 0 !important;
  margin-left: auto;
  &.is-fixed {
    position: sticky;
    bottom: 0;
  }
  :deep(.el-form-item__content) {
    margin-left: auto;
    justify-content: flex-end;
    flex-wrap: nowrap;
    flex: none;
  }
}

:deep(.el-form-item) {
  width: 100% !important;
}
</style>

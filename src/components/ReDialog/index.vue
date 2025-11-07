<script setup lang="ts">
import { ElButton, ElDialog } from "element-plus";
import { ComponentInstance } from "vue";
import ReSubmitButton from "../ReSubmitButton";

defineOptions({
  name: "ReDialog",
  inheritAttrs: false
});

const props = defineProps({
  /**
   * 对话框可视区的最大高度，超过该高度时内容区域会出现滚动条
   * 可以输入数字（单位为px）或字符串（需要带单位，比如"500px"）
   * 默认值为 "500px"
   */
  maxHeight: {
    type: [String, Number],
    default: "500px"
  },
  /**
   * 底部按钮组是否显示
   * 默认值为 true
   */
  showFooterButton: {
    type: Boolean,
    default: true
  },
  /**
   * 确认按钮文本
   * 默认值为 "确 定"
   */
  confirmButtonText: {
    type: String,
    default: "确 定"
  },
  /**
   * 取消按钮文本
   * 默认值为 "取 消"
   */
  cancelButtonText: {
    type: String,
    default: "取 消"
  },
  /**
   * 是否可以通过点击 modal 关闭 Dialog
   * 默认值为 false
   */
  closeOnClickModal: {
    type: Boolean,
    default: false
  },
  /**
   * 对话框动画的自定义过渡配置。
   * 可以是一个字符串（过渡名称），也可以是一个包含 Vue 过渡属性的对象
   * 默认值为 "dialog-slide"
   **/
  transition: {
    type: String,
    default: "dialog-slide"
  },
  /**
   * 对话框宽度
   * 可以是一个数字（单位为px）或字符串（单位为px，也可以是百分比，比如"50%"）
   * 默认值为 "40%"
   */
  width: {
    type: [String, Number],
    default: "40%"
  }
});

const emits = defineEmits(["confirm", "cancel"]);

const attrs = useAttrs();
const slots = useSlots();
const getComponent = computed(() =>
  h(
    ElDialog,
    { ...props, ...attrs, ref: changeRef, class: "re-dialog" },
    {
      ...slots,
      default: () =>
        h(
          "div",
          {
            class: "overflow-y-auto pr-1 overflow-x-hidden",
            style: { maxHeight: getMaxHeight.value }
          },
          slots.default?.()
        ),
      footer: () =>
        slots.footer
          ? slots.footer()
          : props.showFooterButton
            ? h("div", { class: "flex justify-end flex-wrap gap-y-2" }, [
                h(
                  ElButton,
                  { onClick: onCancel },
                  props.cancelButtonText ?? "取 消"
                ),
                h(
                  ReSubmitButton,
                  { onClick: onConfirm },
                  props.confirmButtonText
                )
              ])
            : null
    }
  )
);
const getMaxHeight = computed(() => {
  return typeof props.maxHeight === "number"
    ? `${props.maxHeight}px`
    : props.maxHeight;
});

/** 透传暴露方法 */
const vm = getCurrentInstance();
const changeRef = (exposed: ComponentInstance<typeof ElDialog> | null) => {
  vm.exposed = exposed;
};

/** 透传默认确认按钮的点击事件 */
const onConfirm = () => {
  emits("confirm");
};

/** 透传默认取消按钮的点击事件 */
const onCancel = () => {
  emits("cancel");
};

// 断言组件实例类型，可以让外部使用时获得更好的类型提示
defineExpose({} as ComponentInstance<typeof ElDialog>);
</script>

<template>
  <div>
    <component :is="getComponent" />
  </div>
</template>

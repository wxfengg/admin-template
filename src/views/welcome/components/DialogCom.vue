<script setup lang="ts">
import { ElMessage } from "element-plus";

const dialogVisible1 = ref(false);
const dialogVisible2 = ref(false);
const dialogVisible3 = ref(false);
const dialogVisible4 = ref(false);

const handleConfirm = () => {
  dialogVisible1.value = false;
  ElMessage.success("点击了确认按钮");
};

const dialogRef = useTemplateRef("dialogRef");
const handleClose = () => {
  dialogRef.value?.handleClose?.();
};
</script>

<template>
  <el-card shadow="hover">
    <h3>弹窗的使用</h3>
    <div class="text-gray-400 text-sm mb-5">
      tips: 平台内置了一个基础的Dialog弹窗组件ReDialog，基于Element
      Plus的ElDialog二次封装，只是修改了部分样式并且规定了内容区域最大高度和部分默认属性，除此之外自带默认的按钮组，
      组件和原来的属性事件方法完全一致，可当成正常的ElDialog来使用，后续项目中需要使用弹窗的地方都
      <span class="text-red-500"> 统一使用该组件 </span>即可。
    </div>
    <ElButton type="primary" @click="dialogVisible1 = true">
      打开弹窗
    </ElButton>
    <ElButton type="primary" @click="dialogVisible2 = true">
      自定义footer插槽
    </ElButton>
    <ElButton type="primary" @click="dialogVisible3 = true">
      手动控制
    </ElButton>
    <ElButton type="primary" @click="dialogVisible4 = true">
      默认按钮组文案
    </ElButton>

    <ReDialog
      v-model="dialogVisible1"
      title="打开弹窗"
      @confirm="handleConfirm"
      @cancel="dialogVisible1 = false"
    >
      <div class="h-[800px] border">
        默认按钮组的点击事件通过 @confirm 和 @cancel
        事件透传出去，方便外部使用时监听处理。
      </div>
    </ReDialog>

    <ReDialog v-model="dialogVisible2" title="自定义footer插槽">
      默认按钮组可以通过show-footer-button属性控制显示与否，也可以使用footer插槽自定义覆盖默认的按钮组。
      <template #footer>
        <div>自定义footer插槽</div>
      </template>
    </ReDialog>

    <ReDialog
      ref="dialogRef"
      v-model="dialogVisible3"
      title="手动控制"
      :show-footer-button="false"
    >
      <div>可以调用组件本身暴露的方法手动关闭</div>
      <ElButton type="primary" @click="handleClose"> 关闭弹窗 </ElButton>
    </ReDialog>

    <ReDialog
      v-model="dialogVisible4"
      title="打开弹窗"
      @confirm="dialogVisible4 = false"
      @cancel="dialogVisible4 = false"
      confirm-button-text="自定义确认"
      cancel-button-text="我要取消了👋"
    >
      <div>
        可以通过 confirm-button-text 和 cancel-button-text
        属性自定义设置默认按钮组的文本内容
      </div>
    </ReDialog>
  </el-card>
</template>

<style lang="scss" scoped></style>

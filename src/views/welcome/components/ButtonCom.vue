<script setup lang="ts">
import ReSubmitButton from "@/components/ReSubmitButton";
import { ElMessage } from "element-plus";

const handleSubmit = () => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      ElMessage.success("提交成功");
      resolve();
    }, 2000);
  });
};
</script>

<template>
  <el-card shadow="hover">
    <h3>带Loading的Button</h3>
    <div class="text-gray-400 text-sm mb-5">
      tips: 一个默认带有loading的按钮，基于el-button进行二次封装，
      兼容原本所有属性和事件。
      <span class="text-red-500"> 常用于表单提交等需要异步操作的场景 </span>
      ，调用点击事件后自动进入loading状态，异步操作完成后自动关闭loading状态。
      值得一提的是，ReDialog组件默认自带的 确认按钮 也是使用了该按钮组件。
    </div>
    <div class="mt-5">
      <ReSubmitButton @click="handleSubmit" :debounce="1000" />
      <ReSubmitButton @click="handleSubmit">默认插槽覆盖文案</ReSubmitButton>
      <ReSubmitButton @click="ElMessage.info('点击了')" :debounce="0">
        不想要防抖
      </ReSubmitButton>
      <div class="text-sm text-gray-400">
        如果设置防抖时间(不设置默认防抖时间50ms)为1s 请求数据是2s
        实际表现为点击按钮后请求数据，请求完成后1s后关闭loading状态
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped></style>

<script setup lang="ts">
import ReText from "@/components/ReText";
import ReSegmented, { type OptionsType } from "@/components/ReSegmented";

const options = computed<Array<OptionsType>>(() => {
  return [
    {
      label: "分段1",
      value: "s1"
    },
    {
      label: "分段2",
      value: "s2"
    },
    {
      label: "自定义",
      tip: "如果不设置提示就不会出现，设置了就会出现😂",
      value: "s3"
    }
  ];
});
</script>

<template>
  <el-card shadow="hover">
    <h3>自定义text组件的使用</h3>
    <div class="w-[200px] border cursor-pointer">
      <ReText :tippy-props="{ arrow: false }">
        这是一段很长很长的文本,超出容器宽度会自动省略显示。这是一个带有文本省略和悬浮提示功能的
        Vue 3 组件，基于 Element Plus 的 el-text 组件和 vue-tippy 工具提示库。
      </ReText>
    </div>

    <h3 class="mt-5!">自定义分段器组件的使用</h3>
    <ReSegmented :options resize />

    <h3 class="mt-5!">useTemplateRef的使用</h3>
    <div>
      需要获取dom的ref推荐使用useTemplateRef("模板ref名称")Hooks获取，useTemplateRef会自动处理类型问题。
      <div class="mt-1 bg-gray-200 p-4">
        <div>{{ `<el-form ref="formRef"></el-form> ` }}</div>
        <div>{{ `const formRef = useTemplateRef("formRef");` }}</div>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped></style>

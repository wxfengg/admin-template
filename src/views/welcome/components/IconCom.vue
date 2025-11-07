<script setup lang="ts">
import BackTop from "@/assets/svg/back_top.svg?component";
import System from "@/assets/svg/system.svg?component";
import EpElemeFilled from "~icons/ep/eleme-filled";
import IconAvatar from "~icons/ep/avatar";
import Check from "~icons/ep/check";

defineOptions({
  name: "IconCom"
});
</script>

<template>
  <el-card shadow="hover">
    <h3>图标的使用</h3>
    <div>1.svg</div>
    <div class="flex border p-4">
      <BackTop class="mr-4" />
      <System />
    </div>

    <div class="mt-4">2.icon</div>
    <div class="border p-4">
      <div class="flex">
        组件形式第一种用法：
        <icon-avatar style="font-size: 2em; color: red" />
        <EpElemeFilled />
      </div>
      <div class="flex">
        组件形式第二种用法：
        <IconifyIconOffline :icon="Check" class="text-2xl" />
      </div>
      <div class="flex">
        在线icon(推荐)：
        <IconifyIconOnline
          icon="ep:info-filled"
          class="text-red-500 text-4xl"
        />
      </div>

      <div class="mt-5 text-gray-400 text-sm">
        tips: 平台内置了 @iconify/json 和 unplugin-icons
        插件，不需要再安装任何依赖，可直接使用
        <a
          href="https://icon-sets.iconify.design/"
          target="_blank"
          class="text-blue-500! underline!"
        >
          iconify
        </a>
        的 100 多个图标集和 200000 多个开源矢量图标（已经包括Element
        Plus的所有icon，
        <span class="text-red-500"> 后续统一使用iconify图标即可！！！ </span>
        ） 具体使用方法：在网站找到合适的icon图标后，复制Icon
        name放到自定义icon组件的icon属性中即可使用。
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped></style>

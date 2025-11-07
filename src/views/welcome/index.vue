<script setup lang="ts">
import IconCom from "./components/IconCom.vue";
import RefCom from "./components/RefCom.vue";
import DialogCom from "./components/DialogCom.vue";
import ButtonCom from "./components/ButtonCom.vue";
import FormCom from "./components/FormCom.vue";

defineOptions({ name: "Welcome" });
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <IconCom />

    <RefCom />

    <DialogCom />

    <ButtonCom />

    <FormCom />
  </div>
</template>

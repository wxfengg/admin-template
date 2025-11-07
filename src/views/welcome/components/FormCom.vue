<script setup lang="ts">
import { ElMessage } from "element-plus";

const formRef = useTemplateRef("formRef");
const dialog = ref({
  visible: false,
  formData: {
    delivery: false,
    input: "",
    region: "",
    count: "",
    date1: "",
    date2: "",
    dates: [],
    ip: "",
    deciveId: "",
    type: "",
    name: "",
    address: "",
    resource: "Venue",
    desc: "",
    num: 99,
    selects: []
  },
  rules: {
    input: [{ required: true, message: "输入框内容不能为空" }],
    dates: [{ required: true, message: "时间范围不能为空" }],
    date1: [{ required: true, message: "日期不能为空" }],
    date2: [{ required: true, message: "时间不能为空" }],
    ip: [{ required: true, message: "相机ip不能为空" }],
    deciveId: [{ required: true, message: "相机序列号不能为空" }],
    type: [{ required: true, message: "相机类型不能为空" }],
    name: [{ required: true, message: "姓名不能为空" }],
    address: [{ required: true, message: "车场地址不能为空" }],
    selects: [{ required: true, message: "多选选择框内容不能为空" }]
  }
});

const dialogSubmit = async () => {
  await formRef.value?.validate();
  ElMessage.success("表单验证通过");
};
</script>

<template>
  <el-card shadow="hover" class="col-span-2">
    <h3>表单的使用</h3>
    <div class="mt-3 text-gray-400 text-sm">
      为了适配移动端，让内容始终可以完整显示，建议带有表单或者弹窗内容需要按固定样式显示的此类弹窗宽度固定设置，不要使用百分比
    </div>
    <div class="mt-5">
      <ElButton type="primary" @click="dialog.visible = true">
        弹窗表单
      </ElButton>
      <ReDialog
        v-model="dialog.visible"
        title="弹窗表单"
        @cancel="dialog.visible = false"
        @confirm="dialogSubmit"
        width="850px"
      >
        <el-form
          ref="formRef"
          :model="dialog.formData"
          :rules="dialog.rules"
          label-width="auto"
          scroll-to-error
          :scroll-into-view-options="{ behavior: 'smooth' }"
        >
          <el-form-item label="Switch开关" prop="delivery">
            <el-switch v-model="dialog.formData.delivery" />
          </el-form-item>

          <el-col :span="24">
            <el-form-item label="输入框" prop="input">
              <el-input
                v-model="dialog.formData.input"
                placeholder="请输入"
                maxlength="30"
              />
            </el-form-item>
          </el-col>

          <el-form-item label="时间范围" prop="dates" required>
            <el-date-picker
              v-model="dialog.formData.dates"
              type="datetimerange"
              value-format="YYYY-MM-DD HH:mm:ss"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              :default-time="[
                new Date(0, 0, 0, 0, 0, 0),
                new Date(0, 0, 0, 23, 59, 59)
              ]"
              style="width: 100%"
            />
          </el-form-item>

          <el-form-item label="time2" required>
            <el-col :span="11">
              <el-form-item prop="date1">
                <el-date-picker
                  v-model="dialog.formData.date1"
                  type="datetime"
                  placeholder="请选择时间"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col class="text-center" :span="2">
              <span class="text-gray-500">-</span>
            </el-col>
            <el-col :span="11">
              <el-form-item prop="date2">
                <el-time-picker
                  v-model="dialog.formData.date2"
                  placeholder="请选择时间"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-form-item>

          <el-form-item label="相机" required>
            <el-row justify="space-between" class="w-full">
              <el-col :span="8">
                <el-form-item prop="ip">
                  <el-input
                    v-model="dialog.formData.ip"
                    placeholder="请输入相机ip"
                    maxlength="30"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item prop="deciveId">
                  <el-input
                    v-model="dialog.formData.deciveId"
                    placeholder="请输入相机序列号"
                    maxlength="30"
                  />
                </el-form-item>
              </el-col>

              <el-col :span="7">
                <el-form-item prop="type">
                  <el-select
                    v-model="dialog.formData.type"
                    placeholder="请选择相机类型"
                    clearable
                  >
                    <el-option label="类型 A" value="shanghai" />
                    <el-option label="类型 B" value="beijing" />
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>

          <el-row justify="space-between" :gutter="10">
            <el-col :span="12">
              <el-form-item label="姓名" prop="name">
                <el-input
                  v-model="dialog.formData.name"
                  placeholder="请输入姓名"
                  maxlength="30"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车场地址" prop="address">
                <el-input
                  v-model="dialog.formData.address"
                  placeholder="请输入车场地址"
                  maxlength="50"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row justify="space-between" :gutter="10">
            <el-col :span="12">
              <el-form-item label="选择1" prop="name">
                <el-select
                  v-model="dialog.formData.region"
                  placeholder="Activity zone"
                  clearable
                >
                  <el-option label="Zone one" value="shanghai" />
                  <el-option label="Zone two" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="选择2" prop="name">
                <el-select
                  v-model="dialog.formData.region"
                  placeholder="Activity zone"
                  clearable
                >
                  <el-option label="Zone one" value="shanghai" />
                  <el-option label="Zone two" value="beijing" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="单个选择" prop="region">
            <el-select
              v-model="dialog.formData.region"
              placeholder="Activity zone"
              clearable
            >
              <el-option label="Zone one" value="shanghai" />
              <el-option label="Zone two" value="beijing" />
            </el-select>
          </el-form-item>

          <el-row justify="space-between" :gutter="10">
            <el-col :span="12">
              <el-form-item label="数字输入" prop="num">
                <el-input-number
                  v-model="dialog.formData.num"
                  :min="1"
                  :max="1000"
                />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="数字输入" prop="num">
                <el-input-number
                  v-model="dialog.formData.num"
                  :min="1"
                  :max="1000"
                  controls-position="right"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
          </el-row>

          <el-form-item label="Resources" prop="resource">
            <el-radio-group v-model="dialog.formData.resource">
              <el-radio value="Sponsorship">Sponsorship</el-radio>
              <el-radio value="Venue">Venue</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="选择框多选" prop="selects">
            <el-select
              v-model="dialog.formData.selects"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :max-collapse-tags="1"
              filterable
              clearable
            >
              <el-option label="Apple" value="Apple" />
              <el-option label="Banner" value="Banner" />
              <el-option label="Cat" value="Cat" />
              <el-option label="Orange" value="Orange" />
              <el-option label="Dog" value="Dog" />
              <el-option label="iPhone" value="iPhone" />
            </el-select>
          </el-form-item>

          <el-form-item label="备注" prop="desc">
            <el-input
              v-model="dialog.formData.desc"
              type="textarea"
              show-word-limit
              maxlength="50"
            />
          </el-form-item>
        </el-form>
      </ReDialog>
    </div>
  </el-card>
</template>

<style lang="scss" scoped></style>

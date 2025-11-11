<script setup lang="ts">
import { ElMessage } from "element-plus";

defineOptions({
  name: "TableDemo"
});

const activeName = ref("1");

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 999, Grove St, Los Angeles"
  }
];

const currentPage1 = ref(5);
const size = ref<any>("default");

const searchFormRef = ref();
const searchParams = ref({
  current: 1,
  size: 10,
  model: {
    equipmentId: "",
    operationId: "", // 商户ID
    parkingId: "", // 停车场ID
    parkingIds: [], // 停车场ID
    deviceId: "",
    endTime: [],
    finishTime: [],
    isArchive: false,
    orderNo: "",
    phone: "",
    startTime: [],
    state: "", // 充电状态(1.充电中2.已完成3.充电异常4.待充电5.充电暂停
    valueAddedName: null // 增值业务名称
  }
});

const handleSearch = () => {
  ElMessage.success("执行搜索操作");
};
const handleReset = () => {
  ElMessage.info("重置搜索表单");
};

const data = [
  {
    value: "1",
    label: "Level one 1",
    children: [
      {
        value: "1-1",
        label: "Level two 1-1",
        children: [
          {
            value: "1-1-1",
            label: "Level three 1-1-1"
          }
        ]
      }
    ]
  },
  {
    value: "2",
    label: "Level one 2",
    children: [
      {
        value: "2-1",
        label: "Level two 2-1",
        children: [
          {
            value: "2-1-1",
            label: "Level three 2-1-1"
          }
        ]
      },
      {
        value: "2-2",
        label: "Level two 2-2",
        children: [
          {
            value: "2-2-1",
            label: "Level three 2-2-1"
          }
        ]
      }
    ]
  },
  {
    value: "3",
    label: "Level one 3",
    children: [
      {
        value: "3-1",
        label: "Level two 3-1",
        children: [
          {
            value: "3-1-1",
            label: "Level three 3-1-1"
          }
        ]
      },
      {
        value: "3-2",
        label: "Level two 3-2",
        children: [
          {
            value: "3-2-1",
            label: "Level three 3-2-1"
          }
        ]
      }
    ]
  }
];

const checkTreeVal = ref("1-1-1");
const defaultProps = {
  children: "children",
  label: "label"
};

const filterText = ref("");
const isShowSide = ref(true);
const xl = computed(() => (isShowSide.value ? 8 : 6));
</script>

<template>
  <ReLayout>
    <template #side v-if="isShowSide">
      <el-checkbox v-model="isShowSide" class="mb-1"> 固定侧边栏 </el-checkbox>
      <el-input
        v-model="filterText"
        class="mb-2"
        placeholder="Filter keyword"
      />
      <el-tree :data="data" :props="defaultProps" fil />
    </template>
    <template #tab>
      <el-tabs v-model="activeName">
        <el-tab-pane label="全部停车订单" name="1"></el-tab-pane>
        <el-tab-pane label="停车中的订单" name="2"></el-tab-pane>
        <el-tab-pane label="历史订单" name="3"></el-tab-pane>
      </el-tabs>
    </template>
    <template #search>
      <ReSearchForm
        v-model="searchParams"
        @get-ref="(val: any) => (searchFormRef = val)"
        @search="handleSearch"
        @reset="handleReset"
      >
        <ReSearchFormItem
          :xl
          prop="model.valueAddedName"
          label="树形选择"
          v-if="!isShowSide"
        >
          <el-tree-select
            v-model="checkTreeVal"
            :data="data"
            :render-after-expand="false"
          >
            <template #header>
              <el-checkbox v-model="isShowSide"> 固定侧边栏 </el-checkbox>
            </template>
          </el-tree-select>
        </ReSearchFormItem>

        <ReSearchFormItem :xl prop="model.orderNo" label="订单编号">
          <el-input
            v-model="searchParams.model.orderNo"
            placeholder="请输入订单编号"
            clearable
          />
        </ReSearchFormItem>

        <ReSearchFormItem :xl prop="model.state" label="充电状态">
          <el-select
            v-model="searchParams.model.state"
            placeholder="全部"
            clearable
          >
            <el-option
              v-for="item in 6"
              :label="item"
              :value="item"
              :key="item"
            />
          </el-select>
        </ReSearchFormItem>

        <ReSearchFormItem :xl prop="model.startTime" label="充电开始时间">
          <el-date-picker
            v-model="searchParams.model.startTime"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD HH:mm:ss"
            :default-time="[
              new Date(0, 0, 0, 0, 0, 0),
              new Date(0, 0, 0, 23, 59, 59)
            ]"
            style="width: 100%"
          />
        </ReSearchFormItem>

        <ReSearchFormItem :xl prop="model.finishTime" label="支付完成时间">
          <el-date-picker
            v-model="searchParams.model.finishTime"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD HH:mm:ss"
            :default-time="[
              new Date(0, 0, 0, 0, 0, 0),
              new Date(0, 0, 0, 23, 59, 59)
            ]"
            style="width: 100%"
          />
        </ReSearchFormItem>

        <ReSearchFormItem :xl prop="model.phone" label="用户手机号">
          <el-input
            v-model="searchParams.model.phone"
            placeholder="请输入用户手机"
            maxlength="11"
            clearable
          />
        </ReSearchFormItem>

        <ReSearchFormItem :xl prop="model.phone" label="用户手机号">
          <el-input
            v-model="searchParams.model.phone"
            placeholder="请输入用户手机"
            maxlength="11"
            clearable
          />
        </ReSearchFormItem>

        <ReSearchFormItem :xl prop="model.phone" label="用户手机号">
          <el-input
            v-model="searchParams.model.phone"
            placeholder="请输入用户手机"
            maxlength="11"
            clearable
          />
        </ReSearchFormItem>

        <ReSearchFormItem :xl prop="model.endTime" label="充电结束时间">
          <el-date-picker
            v-model="searchParams.model.endTime"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD HH:mm:ss"
            :default-time="[
              new Date(0, 0, 0, 0, 0, 0),
              new Date(0, 0, 0, 23, 59, 59)
            ]"
            style="width: 100%"
          />
        </ReSearchFormItem>

        <ReSearchFormItem :xl prop="model.equipmentId" label="设备编号">
          <el-input
            v-model="searchParams.model.equipmentId"
            placeholder="请输入"
            clearable
          />
        </ReSearchFormItem>

        <ReSearchFormItem :xl prop="model.valueAddedName" label="增值业务名称">
          <el-select
            v-model="searchParams.model.valueAddedName"
            placeholder="全部"
            clearable
          >
            <el-option label="安心充" value="SAFE_CHARGE" />
            <el-option label="中移数科活动" value="WX_MOBILE" />
            <el-option label="无" value="NONE" />
          </el-select>
        </ReSearchFormItem>
      </ReSearchForm>
    </template>
    <template #action>
      <el-button type="success" plain> 新增 </el-button>
      <el-button type="danger" plain> 删除 </el-button>
    </template>

    <el-table
      :data="tableData"
      cell-class-name="text-center! "
      header-cell-class-name="text-center! bg-[var(--el-fill-color-light)]! text-[var(--el-text-color-primary)]!"
    >
      <el-table-column prop="address" label="Address" width="200" />
      <el-table-column prop="date" label="Date" width="100" />
      <el-table-column prop="name" label="Name" width="200" />
      <el-table-column prop="name" label="Name" width="200" />
      <el-table-column prop="name" label="Name" width="200" />
      <el-table-column prop="name" label="Name" width="200" />
      <el-table-column prop="name" label="Name" width="200" />
      <el-table-column prop="name" label="Name" width="200" />
      <el-table-column prop="date" label="Date" width="100" />
      <el-table-column prop="name" label="Name" width="100" />
      <el-table-column prop="name" label="Name" width="100" />
      <el-table-column prop="address" label="Address" width="300" />
      <el-table-column prop="name" label="Name" width="100" />
      <el-table-column prop="name" label="Name" width="100" />
    </el-table>

    <div class="h-[500px] bg-amber-800"></div>
    <template #page>
      <el-pagination
        v-model:current-page="currentPage1"
        :page-size="100"
        :size="size"
        background
        layout="total, prev, pager, next"
        :total="1000"
      />
    </template>
  </ReLayout>
</template>

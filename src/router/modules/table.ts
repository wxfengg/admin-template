export default {
  path: "/table",
  redirect: "/table/demo",
  meta: {
    icon: "tabler:align-box-bottom-left",
    // showLink: false,
    title: "表格",
    rank: 99
  },
  children: [
    {
      path: "/table/demo",
      name: "TableDemo",
      component: () => import("@/views/table/index.vue"),
      meta: {
        title: "表格demo"
      }
    }
  ]
} satisfies RouteConfigsTable;

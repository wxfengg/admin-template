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
      name: "403",
      component: () => import("@/views/table/index.vue"),
      meta: {
        title: "403"
      }
    },
  ]
} satisfies RouteConfigsTable;

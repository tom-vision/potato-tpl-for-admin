const asyncRoutesMap = [
  {
    path: "news",
    meta: {
      index: "1",
      title: "资讯管理",
      role: ["admin"],
      subMenus: [
        {
          name: "资讯添加",
          link: "/home/news/edit"
        },
        {
          name: "资讯列表",
          link: "/home/news"
        },
        {
          name: "资讯标签",
          link: "/home/news/tag"
        }
      ]
    },
    component: () => import("./views/News.vue"),
    children: [
      {
        path: "",
        name: "newsList",
        meta: {
          title: "资讯列表"
        },
        component: () => import("./views/NewsList.vue")
      },
      {
        path: "edit",
        name: "newsEdit",
        meta: {
          title: "资讯编辑"
        },
        component: () => import("./views/NewsEdit.vue")
      },
      {
        path: "tag",
        name: "newsTag",
        meta: {
          title: "资讯标签"
        },
        component: () => import("./views/NewsTag.vue")
      }
    ]
  },
  {
    path: "banner",
    meta: {
      index: "2",
      title: "轮播管理",
      role: ["admin"],
      subMenus: [
        {
          name: "轮播添加",
          link: "/home/banner/edit"
        },
        {
          name: "轮播列表",
          link: "/home/banner"
        }
      ]
    },
    component: () => import("./views/Banner.vue"),
    children: [
      {
        path: "",
        name: "bannerList",
        meta: {
          title: "轮播列表"
        },
        component: () => import("./views/BannerList.vue")
      },
      {
        path: "edit",
        name: "bannerEdit",
        meta: {
          title: "轮播编辑"
        },
        component: () => import("./views/BannerEdit.vue")
      }
    ]
  },
  {
    path: "role",
    meta: {
      index: "3",
      title: "权限管理",
      role: ["admin"],
      subMenus: [
        {
          name: "添加管理员",
          link: "/home/role/new"
        },
        {
          name: "权限列表",
          link: "/home/role"
        }
      ]
    },
    component: () => import("./views/Role.vue"),
    children: [
      {
        path: "",
        name: "roleList",
        meta: {
          title: "权限列表"
        },
        component: () => import("./views/RoleList.vue")
      },
      {
        path: "new",
        name: "roleNew",
        meta: {
          title: "添加管理员"
        },
        component: () => import("./views/RoleNew.vue")
      }
    ]
  }
];

let constantRoutesMap = [
  {
    path: "/home",
    component: () => import("./views/Home.vue"),
    children: asyncRoutesMap
  },
  {
    path: "*",
    name: "notFound",
    component: () => import("./views/notFound.vue")
  }
];

export { constantRoutesMap, asyncRoutesMap };

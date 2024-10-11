import App from "./App.vue";
import { ViteSSG } from "vite-ssg";
import "./styles/_style.scss";
const routes = [
  {
    path: "/chapter-1/page-1",
    name: "chapter-1",
    component: () => import("./pages/Chapter1/Page1.vue"),
    meta: { order: 1 },
  },
  {
    path: "/chapter-1/page-2",
    name: "chapter-1-page-2",
    component: () => import("./pages/Chapter1/Page2.vue"),
    meta: { order: 2 },
  },
  {
    path: "/chapter-1/page-3",
    name: "chapter-1-page-3",
    component: () => import("./pages/SeeYouSoon.vue"),
    meta: { order: 2 },
  },
  {
    path: "/",
    name: "start",
    component: () => import("./pages/Start.vue"),
    meta: { order: 0 },
  },
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: () => import("./pages/404.vue"),
  },
];
export const createApp = ViteSSG(App, { routes }, (ctx) => {
  const modules = import.meta.glob("./modules/*.js", { eager: true });
  Object.values(modules).forEach((i) => i.install?.(ctx));
});

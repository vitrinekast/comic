import App from "./App.vue";
import { ViteSSG } from "vite-ssg";
import "./styles/_style.scss";
const routes = [
	{
		path: "/chapter-1/page-1",
		name: "chapter-1",
		component: () => import("./pages/Chapter1/Page1.vue"),
		meta: { order: 20 },
	},
	{
		path: "/chapter-1/page-2",
		name: "chapter-1-page-2",
		component: () => import("./pages/Chapter1/Page2.vue"),
		meta: { order: 30 },
	},
	{
		path: "/chapter-2/page-1",
		name: "chapter-1-page-2",
		component: () => import("./pages/Chapter2/Page1.vue"),
		meta: { order: 30 },
	},
	{
		path: "/chapter-1/page-3",
		name: "chapter-1-page-3",
		component: () => import("./pages/SeeYouSoon.vue"),
		meta: { order: 2999 },
	},
	{
		path: "/chapter-1/audio",
		name: "chapter-1-audio",
		component: () => import("./pages/Audio.vue"),
		meta: { order: 10 },
	},
	{
		path: "/garagecafe",
		name: "garagecafe",
		component: () => import("./pages/GarageCafe.vue"),
		meta: { order: 2 },
	},
	{
		path: "/",
		name: "start",
		component: () => import("./pages/index.vue"),
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

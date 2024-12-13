<script setup lang="ts">
	import photo_letter from "@assets/ch-1-p-2_menu/letter.webp";
	import photo_letter_exp from "@assets/ch-1-p-2_menu/letter_expanded.webp";
	import photo_1 from "@assets/ch-1-p-2_menu/photo_1.webp";
	import photo_2 from "@assets/ch-1-p-2_menu/photo_2.webp";
	import { bus } from "@/helpers/eventBus";
	import { onMounted, reactive, ref } from "vue";
	import Lightbox from "./Lightbox.vue";
	import { colors, setThemeColor } from "../helpers/utils";

	const images = [
		{
			src: photo_1,
			lightbox: photo_1,
			sample: "plants-move",
		},
		{
			src: photo_letter,
			lightbox: photo_letter_exp,
			sample: "page-flip",
		},
		{
			src: photo_2,
			lightbox: photo_2,
			sample: "car-start",
		},
	];

	const cursor = ref();
	const progress = ref([]);
	const topElement = ref(3);
	const menuModel = defineModel<boolean>(false);

	const mousePos = reactive({
		top: 0,
		left: 0,
		startX: 0,
		startY: 0,
	});

	const closeMenu = () => {
		menuModel.value = false;
		bus.emit("closePrikbord");
	};

	bus.on("lightboxclose", (name) => {
		setThemeColor(colors.prikbord);

		if (progress.value.indexOf(name.value) == -1) {
			progress.value.push(name.value);
		}

		if (progress.value.length === 3) {
			setTimeout(() => {
				progress.value.push("emptyness");
			}, 250);
		}
	});

	onMounted(() => {
		setCursorPos(cursor.value);
	});

	const setCursorPos = (el) => {
		if (el) {
			const c = el.getBoundingClientRect();
			mousePos.w = c.width;
			mousePos.startX = c.left;
			mousePos.startY = c.top;
		}
	};

	const onClick = (item, index) => {
		bus.emit("playSample", item.sample);
		
		bus.emit("showLightbox", {
			src: item.lightbox,
			id: item.src,
		});

		topElement.value = index;
	};

	const onMouseMove = (e) => {
		mousePos.transform = `translate(${e.clientX - mousePos.startX - mousePos.w / 2}px, ${e.clientY - mousePos.startY - mousePos.w / 2}px)`;
	};
</script>

<template>
	<div
		v-if="menuModel"
		ref="cursor"
		class="menu__cursor"
		:style="mousePos"></div>

	<Lightbox @mousemove="onMouseMove" />

	<Transition name="fade">
		<div
			v-if="menuModel"
			class="menu__backdrop"></div>
	</Transition>

	<Transition
		name="prikbord"
		:duration="15500">
		<div v-if="menuModel">
			<nav
				class="menu menu--prikbord"
				@mousemove="onMouseMove">
				<div class="menu__border"></div>

				<div
					v-for="(item, index) in images"
					:key="index"
					:class="`menu__frame ${progress.indexOf(item.src) != -1 ? 'seen' : ''}`"
					:style="{ 'z-index': topElement === index ? 10 : 2 }">
					<img
						class="frame__asset--contain"
						:src="item.src"
						alt=""
						@click="onClick(item, index)" />

					<Nudge
						v-if="index == 0 && progress.indexOf(item.src) != -1"
						:nudge="'photo'" />
				</div>

				<div class="menu__frame static">
					<img
						class="frame__asset--contain"
						src="@assets/ch-1-p-2_menu/sticker.webp"
						alt="" />
				</div>

				<div class="menu__frame static">
					<img
						class="frame__asset--contain"
						src="@assets/ch-1-p-2_menu/todolist.webp"
						alt="" />
				</div>
			</nav>

			<Transition
				name="fade"
				:duration="15000">
				<div
					v-if="progress.length < 4"
					class="menu__meter progress">
					<li
						class="progress__inner"
						:step="progress.length"></li>
				</div>
			</Transition>

			<Transition
				name="fade"
				:duration="15000">
				<div
					v-if="progress.length > 3"
					class="menu__meter">
					<button
						class="ic--arrow down light"
						@click="closeMenu"></button>
				</div>
			</Transition>
		</div>
	</Transition>
</template>

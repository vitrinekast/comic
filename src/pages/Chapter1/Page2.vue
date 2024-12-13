<script setup>
	import Page from "@/components/Page.vue";
	import Prikbord from "@/components/Prikbord.vue";
	import NextPage from "@/components/nextPage.vue";
	import { bus } from "@/helpers/eventBus";
	import { swiperParam } from "@/helpers/utils";
	import "swiper/css";
	import { register } from "swiper/element/bundle";
	import { onMounted, ref } from "vue";
	
	import { colors, setThemeColor } from "@/helpers/utils";

	register();

	const pageC = ref(null);
	const activeIndex = ref(0);
	const prikbordOpen = ref(false);
	const coordVideo = ref(null);
	const showLast = ref(false);
	const showNextPage = ref(false);
	const showNudge = ref(true);

	bus.on("turnedHead", () => {
		setTimeout(() => {
			showLast.value = true;
		}, 1000);

		setTimeout(() => {
			showNextPage.value = true;
		}, 6000);
	});

	onMounted(() => {
		bus.emit("playBackground", "bg__cold");

		prikbordOpen.value = true;

		setThemeColor(colors.Prikbord);

		Object.assign(pageC.value, {
			...swiperParam,
			speed: 1200,
			centeredSlides: true,
		});

		pageC.value.initialize();

		pageC.value.addEventListener("swiperslidechangetransitionend", (event) => {
			activeIndex.value = event.detail[0].activeIndex;

			if (activeIndex.value > 1) {
				setThemeColor(colors.body);
			}

			if (activeIndex.value == 1) {
				bus.emit("playSample", "steps");
			}
		});

		pageC.value.addEventListener("swiperslidechange", (event) => {
			// hide the nudge on slide 3
			showNudge.value = event.detail[0].activeIndex < 4;

			// showNudge.value = event.detail[0].activeIndex != 3;
			bus.emit("extendNudge");
		});

		pageC.value.addEventListener("swipersliderfirstmove", () => {
			showNudge.value = false;
		});

		pageC.value.addEventListener("touchend", () => {
			showNudge.value = true;
		});

		if (!prikbordOpen.value && coordVideo.value) {
			coordVideo.value.play();
		}
	});

	bus.on("closePrikbord", () => {
		setThemeColor(colors.body);

		window.setTimeout(function () {
			coordVideo.value.play();
		}, 1000);
	});
</script>

<template>
	<main
		class="background--base"
		:class="activeIndex > 0 ? 'background--base' : 'background--lightblue'">
		<Prikbord v-model="prikbordOpen" />

		<div class="sideburn">
			<swiper-container
				ref="pageC"
				class="swiper-container sideburn__container"
				init="false">
				<swiper-slide
					v-if="!prikbordOpen"
					class="slide--100"
					:data-swiper-seen="activeIndex > 0">
					<Page class="page--fullwidth">
						<img
							class="frame__asset"
							src="@assets/ch-1-p-2_frame_1/part1.webp"
							alt="" />
						<video
							ref="coordVideo"
							class="frame__video"
							disablePictureInPicture
							playsinline
							muted
							style="height: 90px">
							<source
								src="@assets/ch-1-p-2_frame_1/animation.mov"
								type='video/mp4; codecs="hvc1"' />
							<source
								src="@assets/ch-1-p-2_frame_1/animation-vp9-chrome.webm"
								type="video/webm" />
						</video>
					</Page>
				</swiper-slide>
				<swiper-slide
					v-if="!prikbordOpen"
					class="slide--auto"
					data-swiper-parallax
					:data-swiper-seen="activeIndex > 1">
					<Page class="page--fullwidth">
						<img
							class="frame__overlay"
							src="@assets/ch-1-p-2_frame_1/part2--feet.webp"
							alt=""
							swiper-parallax-item
							slow
							opacity />
						<img
							class="frame__asset--contain"
							src="@assets/ch-1-p-2_frame_1/part2.webp"
							alt="" />
					</Page>
				</swiper-slide>
				<swiper-slide
					v-if="!prikbordOpen"
					data-swiper-parallax
					class="slide--auto background--base"
					style="--delay: 0.5s; duration: 0.2s"
					:data-swiper-seen="activeIndex > 2">
					<Page class="page--fullwidth">
						<Frame
							class="frame--1"
							swiper-parallax-item>
							<img
								src="@assets/ch-1-p-2_frame_1/frame1.webp"
								alt=""
								class="frame__asset--contain" />
						</Frame>
						<img
							class="frame__asset text--1"
							src="@assets/ch-1-p-2_frame_1/tekst1.webp"
							alt=""
							swiper-parallax-item />
						<img
							class="frame__asset"
							src="@assets/ch-1-p-2_frame_1/part3.webp"
							alt="" />
					</Page>
				</swiper-slide>

				<swiper-slide
					data-swiper-parallax
					class="slide--auto flex--center background--base"
					style="--delay: 1.5s; duration: 1.2s"
					:data-swiper-seen="activeIndex > 3">
					<Page size="sm">
						<div class="grid">
							<Frame
								class="cell cell--w-3"
								swiper-parallax-item>
								<img
									class="frame__asset--contain"
									src="@assets/ch-1-p-2_frame_1/frame2.webp"
									alt="" />
							</Frame>

							<Frame
								class="cell cell--w-3"
								swiper-parallax-item>
								<img
									class="frame__asset--contain"
									src="@assets/ch-1-p-2_frame_1/frame3.webp"
									alt="" />
							</Frame>
						</div>
					</Page>
				</swiper-slide>
				<swiper-slide
					class="slide--xs background--base"
					data-swiper-parallax
					:data-swiper-seen="activeIndex > 4"
					style="--delay: 1.5s; duration: 1.2s">
					<Page size="sm">
						<div class="grid grid--center">
							<HeadTurn />

							<Frame
								class="cell cell--w-2 t--opacity"
								:style="{ opacity: showLast ? 1 : 0 }">
								<img
									src="@assets/ch-1-p-3_frame_3/frame_asset.webp"
									alt=""
									class="frame__asset--contain stretch" />
							</Frame>
							<Frame
								class="cell cell--w-4 t--opacity"
								:style="{
									opacity: showLast ? 1 : 0,
									'transition-delay': '.5s',
								}">
								<img
									src="@assets/ch-1-p-3_frame_4/frame_asset.webp"
									alt=""
									class="frame__asset--contain stretch" />
							</Frame>

							<Frame
								class="cell cell--w-6 t--opacity"
								:style="{
									opacity: showLast ? 1 : 0,
									'transition-delay': '3s',
								}">
								<img
									src="@assets/ch-1-p-3_frame_5/frame_asset.webp"
									alt=""
									class="frame__asset--contain stretch" />
							</Frame>

							<Transition
								name="fade"
								:duration="2000">
								<nextPage
									v-if="showNextPage"
									to="/chapter-1/page-3"
									:push="true" />
							</Transition>
						</div>
					</Page>
				</swiper-slide>
			</swiper-container>
			<Nudge
				v-if="showNudge && !prikbordOpen"
				nudge="slide" />
		</div>
	</main>
</template>

<style scoped>
	.frame--1,
	.text--1 {
		position: absolute;
		left: 1rem;
		top: 0%;
		height: 50%;
	}

	.frame--1 img {
		object-position: left;
	}

	.text--1 {
		top: 55%;
		width: 100%;
		max-width: 50%;
		left: 0rem;
		object-fit: contain;
		height: 50px;
	}

	@media screen and (max-width: 800px) {
		.text--1 {
			left: 2rem;
		}
	}

	.frame__video {
		top: 25%;
	}
</style>

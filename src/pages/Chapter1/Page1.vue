<script setup>
	import Frame from "@/components/Frame.vue";
	import Nudge from "@/components/Nudge.vue";
	import Page from "@/components/Page.vue";
	import Page3A from "@/components/frames/Chapter1/Page3A.vue";
	import Page3B from "@/components/frames/Chapter1/Page3B.vue";
	import { bus } from "@/helpers/eventBus";
	import { swiperParam } from "@/helpers/utils";
	import { useMediaQuery } from "@vueuse/core";
	import "swiper/css";
	import { register } from "swiper/element/bundle";
	import { onMounted, ref } from "vue";
	import { colors, setThemeColor } from "../../helpers/utils";

	register();

	const isMobile = useMediaQuery("(max-width: 900px)");
	const pageC = ref(null);
	const spreadC = ref(null);
	const brokenIces = ref([]);
	const showNudge = ref(true);

	onMounted(() => {
		bus.emit("playBackground", "bg__intro");

		setThemeColor(colors.body);

		Object.assign(pageC.value, {
			...swiperParam,
			speed: 1200,
			touchStartPreventDefault: false,
			draggable: false,
			cssMode: false,
			hashNavigation: {
				replaceState: true,
			},
			breakpoints: {
				768: {
					freeMode: true,
				},
			},
		});
		if (spreadC.value) {
			Object.assign(spreadC.value, {
				...swiperParam,
				speed: 800,
				direction: "horizontal",
				navigation: true,
				touchStartPreventDefault: false,
			});
			spreadC.value.initialize();
		}
		pageC.value.initialize();

		pageC.value.addEventListener("swiperslidechange", (event) => {
			// hide the nudge on slide 3
			showNudge.value = event.detail[0].activeIndex != 3;
			bus.emit("extendNudge");
		});

		pageC.value.addEventListener("swipersliderfirstmove", () => {
			showNudge.value = false;
		});
	});

	bus.on("brokenIce", (e) => {
		brokenIces.value.push(e.id);
	});
</script>
<template>
	<main :allow-slide-next="brokenIces.length > 1">
		<swiper-container
			ref="pageC"
			init="false">
			<swiper-slide data-hash="1">
				<Page>
					<img
						class="f-s-snow__text"
						src="@assets/ch-1-p-1_frame_2/frame_text.svg" />
					<Frame
						type="lg f-s-snow"
						mask="ch-1-p-1_frame_2"
						outline="ch-1-p-1_frame_2">
						<div class="f-s-snow__snow-wrapper">
							<img
								class="f-s-snow__snow"
								src="@assets/ch-1-p-1_frame_2/frame_snow.webp"
								alt="" />
						</div>
						<img
							class="f-s-snow__person"
							src="@assets/ch-1-p-1_frame_2/frame_person.webp"
							alt="" />
						<img
							class="frame__background"
							src="@assets/ch-1-p-1_frame_2/frame_background-mobile.webp"
							alt="" />
					</Frame>
				</Page>
			</swiper-slide>
			<swiper-slide
				data-hash="2"
				data-swiper-parallax>
				<Page size="sm">
					<h2 swiper-parallax-item>I've always found great</h2>
					<Frame
						size="sm"
						swiper-parallax-item>
						<img
							class="frame__asset--contain"
							src="@assets/ch-1-p-1_frame_3/asset--trimmed.webp"
							alt="" />
					</Frame>
					<h2 swiper-parallax-item>comfort in the cold</h2>
				</Page>
			</swiper-slide>
			<swiper-slide
				data-hash="3"
				data-swiper-parallax>
				<Page type="fit-fill">
					<div
						class="frame"
						swiper-parallax-item>
						<img
							class="frame__asset--contain"
							src="@assets/ch-1-p-1_frame_4/asset.webp"
							alt="" />
						<video
							class="frame__video"
							disablePictureInPicture
							autoplay
							playsinline
							loop
							muted>
							<source
								src="@assets/ch-1-p-1_frame_4/animation--water.mov"
								type='video/mp4; codecs="hvc1"' />
							<source
								src="@assets/ch-1-p-1_frame_4/animation--water-vp9-chrome.webm"
								type="video/webm" />
						</video>
					</div>
				</Page>
			</swiper-slide>
			<swiper-slide
				data-hash="4"
				data-swiper-parallax>
				<template v-if="!isMobile">
					<section class="page--spread">
						<Page3A />
						<Page3B />
					</section>
				</template>
				<template v-if="isMobile">
					<swiper-container
						ref="spreadC"
						init="false">
						<swiper-slide data-hash="5">
							<Page3A />
						</swiper-slide>
						<swiper-slide data-hash="6">
							<Page3B />
						</swiper-slide>
					</swiper-container>
				</template>
			</swiper-slide>
		</swiper-container>
		<Nudge
			v-if="showNudge"
			nudge="slide" />
		<nextPage
			v-if="brokenIces.length > 2"
			to="/chapter-1/page-2" />
	</main>
</template>

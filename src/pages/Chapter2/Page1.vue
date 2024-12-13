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

	onMounted(() => {
		Object.assign(pageC.value, {
			...swiperParam,
			speed: 1200,
			centeredSlides: true,
			slidesPerView: "auto",
			spaceBetween: 30,
		});

		pageC.value.initialize();
	});
</script>

<template>
	<main class="background--base">
		<swiper-container
			ref="pageC"
			class="swiper-container sideburn__container"
			init="false">
			<swiper-slide
				data-swiper-parallax
				class="slide--min-auto article"
				:data-swiper-seen="activeIndex > 0">
				<Page>
					<p swiper-parallax-item>
						We discussed Eefje's synaesthesia, my fascination with the cold, and
						the pictures on the walls of her van.
					</p>
					<p swiper-parallax-item>
						I imagined it would be so peaceful to be a part of nature, entirely
						engulfed by it. <span class="font--italic">Frozen in time</span>. I
						thought of an ice-cold dive in the glacier lake and how it would
						immediatly sort out everyhing in my life I was confused about.
					</p>
				</Page>
			</swiper-slide>

			<swiper-slide
				data-swiper-parallax
				class="slide--min-auto"
				:data-swiper-seen="true">
				<Page class="page--fullwidth">
					<Frame
						size="md"
						swiper-parallax-item>
						<img
							class="frame__asset--contain"
							src="@assets/ch-2/p-1/switzerland-image.webp"
							alt="" />
					</Frame>
					<h3 swiper-parallax-item>Switzerland</h3>
					<img
						swiper-parallax-item
						class="frame__asset--contain"
						style="max-width: 11ch"
						src="@assets/ch-2/p-1/switzerland-text.webp"
						alt="" />
				</Page>
			</swiper-slide>

			<swiper-slide
				data-swiper-parallax
				class="slide--min-auto"
				:data-swiper-seen="true">
				<Page class="page--fullwidth">
					<Frame
						size="md"
						swiper-parallax-item>
						<img
							class="frame__asset--contain"
							src="@assets/ch-2/p-1/switzerland-image.webp"
							alt="" />
					</Frame>
					<p>
						I woke up early the next day, as usual, hoping to see the sunrise
						over the gacier. It was still quite dark and incredibly misty.
					</p>

					<Frame size="md">
						<img
							swiper-parallax-item
							class="frame__asset--contain"
							src="@assets/ch-2/p-1/koe.webp"
							alt="" />
						<h2>ding</h2>
					</Frame>
				</Page>
			</swiper-slide>
			<swiper-slide
				data-swiper-parallax
				class="slide--min-auto"
				:data-swiper-seen="activeIndex > 0">
				<Page class="page--fullwidth">
					<p swiper-parallax-item>Hier komen dan nog twee blokken</p>
				</Page>
			</swiper-slide>
		</swiper-container>
	</main>
</template>

<style scoped>
	Page,
	.page {
	}
</style>

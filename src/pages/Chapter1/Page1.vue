<script setup>
import Frame from "@/components/Frame.vue";
import Page from "@/components/Page.vue";
import Page3A from "@/components/frames/Chapter1/Page3A.vue";
import Page3B from "@/components/frames/Chapter1/Page3B.vue";
import { useMediaQuery } from '@vueuse/core';
import 'swiper/css';
import 'swiper/element/css/mousewheel';
import 'swiper/element/css/thumbs';     
import 'swiper/element/css/pagination';
import { register } from 'swiper/element/bundle';
import { onMounted, ref } from 'vue';
import { audioBus, bus } from "../../helpers/eventBus";
import { swiperParam } from '../../helpers/utils';

register();

const isMobile = useMediaQuery('(max-width: 900px)');
const pageC = ref(null);
const spreadC = ref(null);
const brokenIces = ref([]);

onMounted(() => {
    // audioBus.emit("playBackground", "bg__intro");

    Object.assign(pageC.value, {
        ...swiperParam,
        speed: 1200,
        touchStartPreventDefault: false,
        pagination: true,
        draggable: true,
        cssMode: false,
        hashNavigation: {
            replaceState: true,
        },
        breakpoints: {
            768: {
                freeMode: true,
            },
        }
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
});

bus.on('brokenIce', (e) => {
    console.log("got some broken ice", brokenIces)
    brokenIces.value.push(e.id);
})

</script>
<template>
    <main :allow-slide-next="brokenIces.length > 1">
        <swiper-container ref="pageC" init="false" parallax>
            <swiper-slide data-hash="1">
                <Page>
                    <img class="f-s-snow__text" src="@assets/ch-1-p-1_frame_2/frame_text.svg">
                    <Frame type="lg f-s-snow" mask="ch-1-p-1_frame_2" outline="ch-1-p-1_frame_2">
                        <div class="f-s-snow__snow-wrapper">
                            <img class="f-s-snow__snow" src="@assets/ch-1-p-1_frame_2/frame_snow.webp" alt="">
                        </div>
                        <img class="f-s-snow__person" src="@assets/ch-1-p-1_frame_2/frame_person.webp" alt="">
                        <img class="frame__background" src="@assets/ch-1-p-1_frame_2/frame_background.webp" alt="">
                    </Frame>
                </Page>
            </swiper-slide>
            <swiper-slide data-hash="2" data-swiper-parallax>
                <Page size="sm">
                    <h2>I've always found great</h2>
                    <Frame size="sm" data-swiper-parallax>
                        <img class="frame__asset--contain" src="@assets/ch-1-p-1_frame_3/asset--trimmed.webp" alt="">
                    </Frame>
                    <h2 data-swiper-parallax>comfort in the cold</h2>
                </Page>
            </swiper-slide>
            <swiper-slide data-hash="3" data-swiper-parallax>
                <Page type="fit-fill">
                    <div class="frame">
                        <img class="frame__asset--contain" src="@assets/ch-1-p-1_frame_4/asset.webp" alt="">
                        <video class="frame__video" autoplay playsinline loop muted>
                            <source src="@assets/ch-1-p-1_frame_4/animation--water.mov" type='video/mp4; codecs="hvc1"'>
                            <source src="@assets/ch-1-p-1_frame_4/animation--water-vp9-chrome.webm" type="video/webm">
                        </video>
                    </div>
                </Page>
            </swiper-slide>
            <swiper-slide data-hash="4" data-swiper-parallax>
                <template v-if="!isMobile">
                    <section class="page--spread">
                        <Page3A />
                        <Page3B />
                    </section>
                </template>
                <template v-if="isMobile">
                    <swiper-container ref="spreadC" init="false" >
                        <swiper-slide data-hash="5" lazy="true">
                            <Page3A />
                        </swiper-slide>
                        <swiper-slide data-hash="6" lazy="true">
                            <Page3B />
                        </swiper-slide>
                    </swiper-container>
                </template>
            </swiper-slide>
        </swiper-container>
        <nextPage to="/chapter-1/page-2" v-if="brokenIces.length > 2" />
    </main>
</template>
<script setup lang="ts">
import { Transition, ref } from 'vue';
import AudioPlayer from './AudioPlayer.vue';

const lightboximage = ref();
const showMenu = ref(true);
const showClose = ref(false);
const sample = ref();

setTimeout(() => {
    showClose.value = true;
}, 3000)

const showLightbox = (src) => {
    lightboximage.value = src;
}

const hideLightbox = () => {
    lightboximage.value = false;
}

</script>

<template>

    <Transition>
        <div class="lightbox" v-if="lightboximage">
            <img :src="lightboximage" class="lightbox__img fn-lightbox-img" alt="">
            <a class="button lightbox__close" @click="hideLightbox">
                sluit
            </a>
        </div>
    </Transition>

    <AudioPlayer :sample="sample" />

    <a class="button" @click="showMenu = true">
        open prikbord
    </a>


    <Transition name="fade">
        <div class="menu__backdrop" v-if="showMenu"></div>
    </Transition>

    <Transition name="fade">
        <a class="button menu__close" v-if="showMenu && showClose" @click="showMenu = false">back</a>
    </Transition>

    <Transition name="down">
        <nav class="menu menu--prikbord" v-if="showMenu">
            <div class="grid">
                <div class="frame cell cell--w-3 cell--h-2 menu__frame">
                    <img class="frame__asset fn-lightbox" src="/src/assets/images/chapter_2/menu/photo_1.png" alt=""
                        @mouseover="sample = 'audio__plants-move'"
                        @click="showLightbox('/src/assets/images/chapter_2/menu/photo_1.png')">
                </div>
                <div class="frame cell cell--w-3 menu__frame">
                    <img class="frame__asset fn-lightbox"
                        lightbox-src="/src/assets/images/chapter_2/menu/letter_expanded.png"
                        src="/src/assets/images/chapter_2/menu/letter.png" alt=""
                        @mouseover="sample = 'audio__page-flip'"
                        @click="showLightbox('/src/assets/images/chapter_2/menu/letter_expanded.png')">
                </div>
                <div class="frame cell cell--w-3 menu__frame">
                    <img class="frame__asset fn-lightbox" src="/src/assets/images/chapter_2/menu/photo_2.png" alt=""
                        @mouseover="sample = 'audio__car-start'"
                        @click="showLightbox('/src/assets/images/chapter_2/menu/photo_2.png')">
                </div>
            </div>
        </nav>
    </Transition>
    <Transition>
        <div class="lightbox" v-if="src && shown" @click="shown = false">
            <img :src="src" class="lightbox__img fn-lightbox-img" alt="">
        </div>
    </Transition>
</template>

<style scoped></style>
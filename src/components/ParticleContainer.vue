<script setup>
	import { bus } from "@/helpers/eventBus";
	import { ref } from "vue";

	const container = ref(null);
	const el = ref(null);

	bus.on("particles", (e) => {
		options.emitters.position.x = Math.round((e.x * 100) / window.innerWidth);
		options.emitters.position.y = Math.round((e.y * 100) / window.innerHeight);

		if (container.value) {
			container.value.init();
			container.value.play();
		}
	});

	const particlesLoaded = (c) => {
		container.value = c;
		c.pause();
	};

	const options = {
		fullScreen: {
			enable: true,
			zIndex: 100,
		},
		fpsLimit: 120,
		particles: {
			stroke: {
				color: "#00686A.5",
				width: 0.2,
			},

			shape: {
				type: "circle",
			},

			opacity: {
				value: { min: 0, max: 0.5 },
				animation: {
					enable: true,
					speed: 10,
					startValue: "max",
					destroy: "min",
				},
			},
			size: {
				value: 5,
			},
			move: {
				angle: {
					value: 45,
					offset: 0,
				},
				drift: 0,
				enable: true,
				gravity: {
					enable: true,
					acceleration: 50,
					maxSpeed: 50,
				},
				speed: 50,
				decay: 0.1,
				direction: -90,
				random: true,
				straight: false,
				outModes: {
					default: "none",
					bottom: "destroy",
				},
			},

			tilt: {
				direction: "random",
				enable: true,
				value: {
					min: 0,
					max: 20,
				},
				animation: {
					enable: true,
					speed: 60,
				},
			},

			wobble: {
				distance: 30,
				enable: true,
				speed: {
					min: -15,
					max: 15,
				},
			},
		},
		detectRetina: true,
		motion: {
			disable: true,
		},
		emitters: {
			name: "confetti",
			startCount: 50,
			position: {
				x: 0,
				y: 0,
			},
			size: {
				width: 0,
				height: 0,
			},
			rate: {
				delay: 2,
				quantity: 0,
			},
			life: {
				duration: 0.1,
				count: 1,
			},
		},
	};
</script>

<template>
	<vue-particles
		id="tsparticles"
		ref="el"
		:options="options"
		@particles-loaded="particlesLoaded" />
</template>

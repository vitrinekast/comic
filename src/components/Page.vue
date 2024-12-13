<script setup lang="ts">
	import { BEM } from "@/helpers/utils";

	const props = defineProps({
		type: { type: String, required: false, default: null },
		size: { type: String, required: false, default: null },
	});
</script>

<template>
	<section :class="`page ${BEM('page', props.type)} `">
		<div :class="`container ${BEM('container', props.size)} `">
			<slot></slot>
		</div>
	</section>
</template>

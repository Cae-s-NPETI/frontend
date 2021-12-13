<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Register from "$lib/Register.svelte";
</script>

<svelte:head>
	<title>SledAway</title>
</svelte:head>

<section>
	<Register />
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}
</style>

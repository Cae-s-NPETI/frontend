<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import Login from "$lib/Login.svelte";
	import { goto } from "$app/navigation";
	import Status from "$lib/Status.svelte";
</script>

<svelte:head>
	<title>SledAway | Passenger</title>
</svelte:head>

<section>
	sssssssssss

	<Status />
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

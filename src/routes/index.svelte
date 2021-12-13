<script context="module" lang="ts">
	import Login from "$lib/Login.svelte";
	import Status from "$lib/Status.svelte";
	import { login } from "$lib/stores";
	import type { LoginStore } from "$lib/structures";
	import type { LoadOutput } from "@sveltejs/kit";

	export const prerender = true;

	export async function load({
		page,
		fetch,
		session,
		stuff,
	}): Promise<LoadOutput> {
		// TOOD: i should move this somewhere better?
		let lInfo: LoginStore;
		login.subscribe((val) => {
			lInfo = val;
		})(); // subscribe once

		if (lInfo.loggedIn) {
			return {
				redirect: lInfo.userType,
				status: 302,
			};
		}

		return {};
	}
</script>

<svelte:head>
	<title>SledAway</title>
</svelte:head>

<section>
	<Login />
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

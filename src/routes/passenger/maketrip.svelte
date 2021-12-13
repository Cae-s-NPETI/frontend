<script context="module" lang="ts">
	export async function load({
		page,
		fetch,
		session,
		stuff,
	}): Promise<LoadOutput> {
		let lInfo: LoginStore;
		login.subscribe((val) => {
			lInfo = val;
		})(); // subscribe once

		if (!lInfo.loggedIn || lInfo.userType != "passenger") {
			return {
				redirect: "/",
				status: 302,
			};
		}

		return {
			props: {
				lInfo,
			},
		};
	}
</script>

<script lang="ts">
	import Status from "$lib/Status.svelte";
	import type { LoadOutput } from "@sveltejs/kit";
	import { login } from "$lib/stores";
	import type { LoginStore, LoginStoreAssert } from "$lib/structures";
	import TripRequest from "$lib/passenger/TripRequest.svelte";

	export let lInfo: LoginStoreAssert;
</script>

<svelte:head>
	<title>SledAway | Passenger | Request Trip</title>
</svelte:head>

<section>
	<TripRequest {lInfo} />

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

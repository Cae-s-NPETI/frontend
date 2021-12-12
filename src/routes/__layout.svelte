<script lang="ts">
	import Header from "$lib/header/Header.svelte";
	import HeaderDriver from "$lib/header/HeaderDriver.svelte";
	import HeaderPassenger from "$lib/header/HeaderPassenger.svelte";
	import { login } from "$lib/stores";
	import type { LoginStore } from "$lib/structures";
	import "../app.css";

	let l: LoginStore;
	login.subscribe((value) => {
		l = value;
	});
</script>

{#if !l.loggedIn}
	<Header />
{:else if l.userType == "passenger"}
	<HeaderPassenger />
{:else if l.userType == "driver"}
	<HeaderDriver />
{/if}

<main>
	<slot />
</main>

<footer>
	<p>your personal ride-sharing sled – <a href=".">SledAway</a></p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>

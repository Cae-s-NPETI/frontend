<script context="module">
	import { browser, dev } from "$app/env";

	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;

	// ...but if the client-side router is already loaded
	// (i.e. we came here from elsewhere in the app), use it
	export const router = browser;

	// since there's no dynamic data here, we can prerender
	// it so that it gets served as a static asset in prod
	export const prerender = true;
</script>

<svelte:head>
	<title>About</title>
</svelte:head>

<div class="content">
	<h1>About this app</h1>

	<p>
		The frontend application for SledAway – a simulated ride-sharing
		application.
	</p>

	<p>
		<b>DISCLAIMER:</b><br />
		SledAway is in no way a registered trademark or an official application.
		It is used for educational purposes to implement a ride-sharing application
		with modern practices, e.g. microservices. Author bears no responsibility
		for any injuries caused, cats killed in the using of any portion the app.
	</p>

	<p>
		Click <a href="https://github.com/Cae-s-NPETI/frontend">here</a> for the
		source code of this website.
	</p>
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
</style>

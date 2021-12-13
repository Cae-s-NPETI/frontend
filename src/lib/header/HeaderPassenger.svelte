<script lang="ts">
	import { page } from "$app/stores";
	import { login } from "$lib/stores";

	function logout() {
		login.set({
			loggedIn: false,
		});
	}
</script>

<header>
	<div class="corner">
		<a class="logo" href="/passenger">
			SledAway <span class="small">Passenger</span>
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li class:active={$page.path === "/passenger"}>
				<a sveltekit:prefetch href="/passenger">Passenger Profile</a>
			</li>
			<li class:active={$page.path === "/passenger/maketrip"}>
				<a sveltekit:prefetch href="/passenger/maketrip">Request Trip</a
				>
			</li>
			<li class:active={$page.path === "/passenger/trips"}>
				<a sveltekit:prefetch href="/passenger/trips">Trip History</a>
			</li>
			<li><a on:click={logout} href="/">Log Out</a></li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>

	<div class="corner">
		<!-- TODO put something else here? github link? -->
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		/*justify-content: center;*/
		font-family: "Segoe UI";
		font-weight: bold;
		font-size: 1.5em;
		padding: 0.5em 1em;
		width: 100%;
		height: 100%;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li.active::before {
		--size: 6px;
		content: "";
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--accent-color);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--accent-color);
	}

	.small {
		font-size: 14px;
	}

	.logo {
		text-decoration: none;
	}
</style>

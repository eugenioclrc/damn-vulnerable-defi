<script context="module">
	import { browser, dev } from '$app/env';

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
	<title>Que es esto?</title>
</svelte:head>

<div class="content">
	<h1>Que es esto?</h1>

	<p>
		Este es un blog de uso personal, y enfocado a aquellos que necesitan una mano para resolver algun reto.
	</p>

	<p>
		Dado que hay poco contenido de solidity en español decidi crear este modesto blog con el objetivo personal de fijar conocimientos y compartir experiencias a los que estan comenzando.
	</p>

	
</div>

<style>
	.content {
		width: 100%;
		max-width: var(--column-width);
		margin: var(--column-margin-top) auto 0 auto;
	}
</style>

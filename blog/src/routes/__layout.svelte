<script>
	import Header from '$lib/header/Header.svelte';
	import '../app.css';
</script>

<svelte:head>
  <link rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.7.1/styles/github.min.css">
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Overpass">
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Fira+Mono">
</svelte:head>


<div class="g-app-wrapper">
	<Header />

	<main>
		<slot />
	</main>
</div>

<style>
  .g-app-wrapper {
    max-width: 800px;
    margin: 0 auto;
    padding: 10px;
  }

</style>
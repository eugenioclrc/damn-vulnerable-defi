<script context="module">
	import { browser, dev } from '$app/env';

	import fs from 'fs';
	// import dayjs from 'dayjs';


	// we don't need any JS on this page, though we'll load
	// it in dev so that we get hot module replacement...
	export const hydrate = dev;
	export const prerender = true;
	export const router = browser;

	export async function load({ fetch }) {
		const posts = await fetch(`${base}/index.json`)
        .then((r) => r.json());
    return {
      props: { posts }
    }
  }
</script>
<script>
	import { base } from '$app/paths';

	export let posts = [];

	
  import { onMount } from 'svelte';
  onMount(() => {
    console.log(posts);
    })
</script>
<svelte:head>
	<title>DAMN vulnerable defi blog (Soluciones y spoilers)</title>
</svelte:head>

<section>
	<h1>Soluciones a Damn Vulnerable Defi</h1>
  <p class="info">{posts.length} posts.</p>
  {#each posts as post}
    <a href={`${base}/${post.slug}`}>
      <h2 class="title">{post.metadata && post.metadata.title}</h2>
      <p>{post.metadata && post.metadata.excerpt}</p>
    </a>
  {/each}
</section>

<script context="module">
	import { browser, dev } from '$app/env';

	//import dayjs from 'dayjs';


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

</script>
<svelte:head>
	<title>DAMN vulnerable defi blog (Soluciones y spoilers)</title>
</svelte:head>

<section>
	<h1>Soluciones a Damn Vulnerable Defi</h1>
  <p class="info">{posts.length} posts.</p>
  {#each posts as post}
		<hr style=" border: 0;
    height: 1px;
    background: #ff3e00;
    background: linear-gradient(to right,  #ff3e00 50%, #ff0000 50%);" />
    <a href={`${base}/${post.slug}`}>
      <h2 class="title">{post.metadata && post.metadata.title}</h2>
      <p>{post.metadata && post.metadata.excerpt}</p>
    </a>
  {/each}
</section>

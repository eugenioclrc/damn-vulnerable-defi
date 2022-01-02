<script context="module">
  import { base } from '$app/paths';

	import { browser, dev } from '$app/env';

  export const hydrate = dev;
	export const prerender = true;
	export const router = browser;

  export async function load({ url, params, fetch }) {
    const slug = params.slug;
    const post = await fetch(`${base}/${slug}.json`)
        .then((r) => r.json());
    return {
      props: { post }
    };
  }
  
</script>

<script>
  export let post;
  let date = post.metadata.date.toUpperCase();
</script>

<svelte:head>
  <title>{post.metadata.title}</title>
</svelte:head>


<h1 class="title">{post.metadata.title}</h1>
<p class="info"><a href="https://github.com/eugenioclrc" target="_blank">eugenioclrc</a> {date}<br/>
<a href={base+'/'}>&larr; Ver todos los challenges</a></p>

{@html post.content}

<style>
  h1.title {
    margin-bottom: 0;
  }
</style>
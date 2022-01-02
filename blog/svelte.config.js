// svelte.config.js
import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

export default {
	kit: {
		adapter: adapter({
			// default options are shown
			pages: 'docs',
			assets: 'docs',
			fallback: null,
		}),
    paths: {
      base: dev ? '' : '/damn-vulnerable-defi',
    },
    // If you are not using a .nojekyll file, change your appDir to something not starting with an underscore.
    // For example, instead of '_app', use 'app_', 'internal', etc.
    // appDir: 'internal',
    target: "#svelte",
	},
};

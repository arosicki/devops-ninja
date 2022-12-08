<script lang="ts">
  import Agro from './pages/Agro.svelte';
  import Home from './pages/Home.svelte';
  import NotFound from './pages/404.svelte';
  import { ROUTES, Router, attach } from './router/router';

  const RouteConfig = {
    [ROUTES.HOME]: Home,
    [ROUTES.AGRO]: Agro,
    default: NotFound,
  };

  // attach to router state
  $attach;

  const router = new Router(RouteConfig);
</script>

<main>
  <svelte:component this={router.component} />
</main>

<style lang="scss">
  main {
    height: 100vh;
    width: 100%;
    background-color: var(--color-200);
    color: var(--color-1000);
  }

  :root {
    // colors
    --color-0: #fff;
    --color-50: #fafafa;
    --color-100: #f5f5f5;
    --color-200: #e5e5e5;
    --color-300: #d4d4d4;
    --color-400: #a3a3a3;
    --color-500: #737373;
    --color-600: #525252;
    --color-700: #404040;
    --color-800: #262626;
    --color-900: #171717;
    --color-1000: #000;

    // fonts
    --font-12: 0.75rem;
    --font-14: 0.875rem;
    --font-16: 1rem;
    --font-18: 1.125rem;
    --font-24: 1.5rem;

    // focus
    --focus: inset 0 0 0 3px var(--color-1000);
  }
</style>

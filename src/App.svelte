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
    min-height: 100vh;
    width: 100%;
    padding-bottom: 2rem;
    background-color: var(--background);
    color: var(--color-100);
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

    --background: #111827;

    --tabs: #374151;
    --tabs-background: #1f2937;
    --tabs--hover: #303c49;

    --color-link: #1d4ed8;
    --color-link--hover: #2563eb;

    --button-primary: #312e81;
    --button-primary--hover: #3730a3;
    --button-primary__border: #1e3a8a;

    --button-secondary: transparent;
    --button-secondary--hover: rgba(255, 255, 255, 0.1);

    --input-background: #4b5563;
    --select--hover: #374151;

    --color-error: #e11d48;

    // fonts
    --font-12: 0.75rem;
    --font-14: 0.875rem;
    --font-16: 1rem;
    --font-18: 1.125rem;
    --font-24: 1.5rem;

    // focus
    --focus: inset 0 0 0 3px var(--color-100);
    --error-focus: inset 0 0 0 2px var(--color-error);
  }
</style>

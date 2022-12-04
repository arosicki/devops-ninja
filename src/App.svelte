<script lang="ts">
  import { router, ROUTES } from './router/router';
  import Tabs from './components/Tabs.svelte';
  const tabItems = [
    {
      label: 'Kredyt Inwestycyjny',
      content: 'test23',
      href: ROUTES.HOME,
    },
    {
      label: 'Pożyczka AGRO',
      content: 'test223',
      href: ROUTES.AGRO,
    },
  ];
</script>

<main>
  {#if router.is404()}
    <h1>404</h1>
  {:else}
    <h1>Kalkulator Kredytowy</h1>
    <Tabs {tabItems} />
  {/if}
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    width: 100%;
    h1 {
      font-size: 2rem;
      margin: 2rem 0;
    }
  }
</style>

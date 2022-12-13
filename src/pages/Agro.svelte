<script>
  import Divider from '../components/Divider.svelte';
  import Tabs from '../components/Tabs.svelte';
  import { tabConfig } from '../views/tabConfig';

  document.title = 'Pożyczka AGRO - Kalkulator Kredytowy';
</script>

<div class="container">
  <div>
    <h1>Kalkulator Kredytowy</h1>
    <Divider class="page-divider" />
  </div>

  <Tabs tabItems={tabConfig} />
</div>

<style lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    > div {
      margin: 2rem 0;

      h1 {
        font-size: 1.75rem;
        font-weight: 500;
      }

      :global(.page-divider) {
        margin: 0.5rem 1rem;
      }
    }
  }
</style>

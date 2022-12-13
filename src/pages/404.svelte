<script>
  import Divider from '../components/Divider.svelte';

  document.title = 'Nie Znaleziono - Kalkulator Kredytowy';
</script>

<div class="container">
  <div>
    <h1>404</h1>
    <Divider class="divider-404" />
    <p>Nie znaleziono strony</p>
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    > div {
      h1 {
        font-size: 1.75rem;
        font-weight: 500;
      }
      p {
        font-size: 1.125rem;
      }
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      :global(.divider-404) {
        margin: 0.5rem 1rem;
      }
    }
  }
</style>

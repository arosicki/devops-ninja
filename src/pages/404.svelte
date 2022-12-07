<script>
  import Divider from '../components/Divider.svelte';
</script>

<div class="container">
  <div>
    <h1>404</h1>
    <Divider />
    <p>Page not found</p>
  </div>
</div>

<style lang="scss">
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
  }
</style>

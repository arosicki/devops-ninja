<script lang="ts">
  let className: string = undefined;

  export { className as class };
</script>

<hr class={className} />

<style lang="scss">
  hr {
    height: 0px;
    width: calc(100% - 2rem);
    margin: 0 1rem;
    border: none;
    border-bottom: 2px solid var(--color-300);
  }
</style>

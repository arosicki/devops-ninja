<script lang="ts">
  export let disabled: boolean = false;
  export let type: 'button' | 'submit' | 'reset' = 'button';
</script>

<button on:click {type} {disabled} on:click><slot /></button>

<style lang="scss">
  button {
    padding: 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    background-color: var(--button-primary);
    color: var(--color-100);
    border: 2px solid var(--button-primary__border);
    min-width: 15rem;
    min-height: 3rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    &:hover {
      background-color: var(--button-primary--hover);
    }

    &:focus {
      outline: none;
      box-shadow: var(--focus);
      transition: all 0.2s ease-in-out;
    }

    &:disabled {
      background-color: var(--color-500);
      cursor: not-allowed;
    }
  }
</style>

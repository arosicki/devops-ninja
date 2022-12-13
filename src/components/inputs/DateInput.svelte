<script lang="ts">
  export let label: string;
  export let name: string;
  export let placeholder: string;
  export let from: Date = new Date();
  export let error = false;

  const minDate = new Date(from).toISOString().split('T')[0];
</script>

<fieldset>
  <label for={name}>{label}</label>
  <input
    type="date"
    class={error ? 'error' : ''}
    {name}
    {placeholder}
    min={minDate}
  />
</fieldset>

<style lang="scss">
  fieldset {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 1rem;
    line-height: 1.5;
    min-height: 4.25rem;
    justify-content: center;

    > label {
      font-size: 0.875rem;
      font-weight: 400;
      margin-left: 0.25rem;
      margin-bottom: 0.25rem;
    }

    // css specificity to override the default input styles
    input[type='date'] {
      font-size: 1rem;
      width: calc(100% - 2rem);
      border: none;
      background-color: var(--input-background);
      border-bottom: 2px solid var(--color-400);
      color: var(--color-100);
      min-height: 1.5rem;
      font-weight: 400;
      padding: 0.5rem;
      font-family: inherit;
      color-scheme: dark;

      &::placeholder {
        color: var(--color-400);
      }

      &.error {
        border: 2px solid var(--color-error);
        &:focus {
          box-shadow: var(--error-focus);
        }
      }

      &:focus {
        outline: none;
        transition: all 0.2s ease-in-out;
        &:not(.error) {
          border-bottom: none;
          box-shadow: var(--focus);
        }
      }
    }
  }
</style>

<script lang="ts">
  export let label: string;
  export let name: string;
  export let placeholder: string;
  export let min: number = undefined;
  export let max: number = undefined;
  export let step: number = undefined;
  export let error = false;
</script>

<fieldset>
  <label for={name}>{label}</label>
  <input
    type="number"
    class={error ? 'error' : ''}
    {step}
    {min}
    {max}
    {name}
    {placeholder}
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

    input {
      font-size: 1rem;
      width: calc(100% - 2rem);
      border: none;
      background-color: var(--input-background);
      border-bottom: 2px solid var(--color-400);
      color: var(--color-100);
      min-height: 1.5rem;
      font-weight: 500;
      padding: 0.5rem;
      line-height: 1.5;
      text-align: baseline;
      color-scheme: dark;

      &.error {
        border: 2px solid var(--color-error);
        &:focus {
          box-shadow: var(--error-focus);
        }
      }

      &::placeholder {
        color: var(--color-400);
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

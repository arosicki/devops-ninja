<script lang="ts">
  export let label: string;
  export let name: string;
  export let placeholder: string;
  export let from: Date = new Date();

  const minDate = new Date(from).toISOString().split('T')[0];
</script>

<fieldset>
  <label for={name}>{label}</label>
  <input type="date" {name} {placeholder} min={minDate} />
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

    input[type='date'] {
      font-size: 1rem;
      width: calc(100% - 2rem);
      border: none;
      border-bottom: 2px solid var(--color-800);
      min-height: 1.5rem;
      font-weight: 500;
      padding: 0.5rem;
      font-family: inherit;
      &:focus {
        outline: none;
        border-bottom: none;
        box-shadow: var(--focus);
        transition: all 0.2s ease-in-out;
      }
    }
  }
</style>

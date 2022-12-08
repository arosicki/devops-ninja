<script lang="ts">
  export let label: string;
  export let name: string;
  export let placeholder: string;
</script>

<fieldset>
  <label for={name}>{label}</label>
  <input type="text" {name} {placeholder} />
</fieldset>

<style lang="scss">
  fieldset {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    margin: 1rem;
    line-height: 1.5;
    min-height: 4.5rem;

    > label {
      font-size: 0.875rem;
      font-weight: 400;
      margin-left: 0.25rem;
      margin-bottom: 0.25rem;
    }

    input {
      font-size: 1rem;
      border: none;
      width: calc(100% - 2rem);
      border-bottom: 2px solid var(--color-700);
      min-height: 1.5rem;
      font-weight: 500;
      padding: 0.5rem;
      &:focus {
        outline: none;
        border-bottom: none;
        box-shadow: var(--focus);
        transition: all 0.2s ease-in-out;
      }
    }
  }
</style>

<script lang="ts">
  import { onMount } from 'svelte';
  import ButtonPrimary from '../components/ButtonPrimary.svelte';
  import ButtonSecondary from '../components/ButtonSecondary.svelte';
  import Divider from '../components/Divider.svelte';
  import DateInput from '../components/inputs/DateInput.svelte';
  import NumberInput from '../components/inputs/NumberInput.svelte';
  import Select from '../components/inputs/Select.svelte';
  import TextInput from '../components/inputs/TextInput.svelte';
  import { getFormData } from '../functions/getFormData';
  import { validateLoanData } from '../functions/validateLoanData';
  import type { Loan } from '../types/form.types';

  const selectItems = [
    {
      value: 'monthly',
      label: 'Miesięczny',
    },
    {
      value: 'quarterly',
      label: 'Kwartalny',
    },
  ];

  $: isMobile = window.matchMedia('(max-width: 968px)').matches;

  onMount(() => {
    const onResize = () => {
      isMobile = window.matchMedia('(max-width: 968px)').matches;
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  });

  $: errors = [];

  const onSubmit = (e: SubmitEvent) => {
    const data = getFormData<Loan>(e.target as HTMLFormElement);
    errors = validateLoanData(data);

    if (errors.length === 0) {
      console.log(data);
    }
  };
</script>

<form on:submit|preventDefault={onSubmit}>
  <div>
    <TextInput
      label="Imię i Nazwisko / Nazwa firmy"
      name="name"
      placeholder="Jan Kowalski / Firma Sp. z o.o."
      error={errors.includes('name')}
    />
    <div class="group">
      <DateInput
        label="Data zawarcia umowy"
        placeholder="22.04.2023"
        name="start"
        error={errors.includes('start')}
      />
      <NumberInput
        label="Okres Finansowania [miesiące]"
        name="financing"
        placeholder="60 miesięcy"
        min={1}
        error={errors.includes('financing')}
      />
    </div>

    <Select label="Harmonogram spłat" name="schedule" items={selectItems} />
    <NumberInput
      label="Wartość Inwestycji [PLN]"
      name="investment"
      placeholder="100 000 000,00 PLN"
      min={1}
      error={errors.includes('investment')}
    />
    <NumberInput
      label="Wkład własny [PLN]"
      name="initial"
      placeholder="100 000 000,00 PLN"
      min={1}
      error={errors.includes('initial')}
    />
    <NumberInput
      label="Kwota kredytu [PLN]"
      name="amount"
      placeholder="100 000 000,00 PLN"
      min={1}
      error={errors.includes('amount')}
    />
    <div class="group">
      <NumberInput
        label="Prowizja [%]"
        name="commission"
        placeholder="6,75 %"
        min={0}
        step={0.01}
        max={100}
        error={errors.includes('commission')}
      />
      <NumberInput
        label="Oprocentowanie kredytu [%]"
        name="interest"
        placeholder="5,25 %"
        min={0}
        step={0.01}
        max={100}
        error={errors.includes('interest')}
      />
    </div>
  </div>
  <div class="left-side">
    {#if !isMobile}
      <div class="title">
        <h2>Wygeneruj harmonogram</h2>
        <Divider class="left-divider" />
      </div>
    {/if}
    <div class="buttons">
      <ButtonPrimary type="submit">Wyślij</ButtonPrimary>
      <ButtonSecondary type="reset">Wyczyść</ButtonSecondary>
    </div>
  </div>
</form>

<style lang="scss">
  form {
    display: grid;
    grid-template-columns: 2fr 1fr;
    @media screen and (max-width: 968px) {
      grid-template-columns: 1fr;
    }

    width: 100%;

    > div {
      width: 100%;

      > .group {
        display: flex;
        flex-direction: row;
        justify-content: center;
        width: calc(100% - 2rem);
        margin: 1rem;
        :global(fieldset) {
          margin: 0;
          width: 100%;
        }
        @media screen and (max-width: 968px) {
          flex-direction: column;
          :global(fieldset:not(:first-child)) {
            margin: 1rem 0 0;
          }
        }
      }
      &.left-side {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        > .buttons {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;

          @media screen and (max-width: 968px) {
            flex-direction: row-reverse;
            width: calc(100% - 2rem);
            padding: 1rem 1rem 0;
            :global(button) {
              width: 100%;
            }
          }
        }
        > .title {
          width: fit-content;
          :global(.left-divider) {
            margin: 1rem 1rem 0;
          }

          > h2 {
            margin: 1rem 0;
            font-size: 1.25rem;
            font-weight: 500;
          }
        }
      }
    }
  }
</style>

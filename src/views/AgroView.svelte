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
  import { validateAgroData } from '../functions/validateAgroData';
  import type { Agro } from '../types/form.types';

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
    const data = getFormData<Agro>(e.target as HTMLFormElement);
    errors = validateAgroData(data);

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
    <Select label="Harmonogram spłat" name="schedule" items={selectItems} />
    <NumberInput
      label="Kwota kredytu [PLN]"
      name="amount"
      placeholder="100 000 000,00 PLN"
      min={1}
      error={errors.includes('amount')}
    />
    <NumberInput
      label="Oprocentowanie kredytu [%]"
      name="interest"
      placeholder="5,25 %"
      min={0}
      step={0.01}
      error={errors.includes('interest')}
    />
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

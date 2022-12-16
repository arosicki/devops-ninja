<script lang="ts">
  import { onMount } from 'svelte';
  import ButtonPrimary from '../components/ButtonPrimary.svelte';
  import ButtonSecondary from '../components/ButtonSecondary.svelte';
  import DateInput from '../components/inputs/DateInput.svelte';
  import NumberInput from '../components/inputs/NumberInput.svelte';
  import Select from '../components/inputs/Select.svelte';
  import TextInput from '../components/inputs/TextInput.svelte';
  import { getFormData } from '../functions/getFormData';
  import { generateLoanPDF } from '../functions/pdfGenerators/generateLoanPDF';
  import { validateLoanData } from '../functions/validators/validateLoanData';
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

  $: formData = undefined;

  const onSubmit = (e: SubmitEvent) => {
    const data = getFormData<Loan>(e.target as HTMLFormElement);
    errors = validateLoanData(data);

    if (errors.length !== 0) {
      return;
    }

    const { firstInstallmentData, savePDF } = generateLoanPDF(data);

    formData = { ...firstInstallmentData, savePDF };
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
      min={0}
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
    {#if formData}
      <div class="result">
        <p>Kwota raty: {formData?.installment?.toFixed(2)} PLN</p>
        <p>Termin płatności: {formData?.date}</p>
        <p>Część kapitałowa raty: {formData?.capital?.toFixed(2)} PLN</p>
        <p>Część odsetkowa raty: {formData?.interest?.toFixed(2)} PLN</p>
        <ButtonSecondary on:click={formData?.savePDF}
          >Pobierz pdf</ButtonSecondary
        >
      </div>
    {/if}
    <div class="actions">
      <div class="buttons">
        <ButtonSecondary type="reset">Wyczyść</ButtonSecondary>
        <ButtonPrimary type="submit">Wyślij</ButtonPrimary>
      </div>
    </div>
  </div>
</form>

<style lang="scss">
  form {
    display: flex;
    flex-direction: column;

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
        justify-content: center;
        gap: 2rem;

        @media screen and (max-width: 968px) {
          flex-direction: column-reverse;
        }
        > .actions {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          width: calc(100% - 2rem);

          > .buttons {
            display: flex;
            flex-direction: row;
            width: 100%;
            :global(button) {
              width: 100%;
              margin: 0 0.5rem;
            }
          }
        }
        > .result {
          display: flex;
          flex-direction: column;
          width: calc(100% - 4rem);
          background-color: var(--color-background);
          border-radius: 0.5rem;
          box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.25);
          > p {
            margin: 0.25rem 0;
            &:last-of-type {
              margin-bottom: 0.5rem;
            }
          }
          width: calc(100% - 5rem);
          margin: 0 1rem;
          padding: 1rem 1rem 0;
        }
      }
    }
  }
</style>

<script>
  import DateInput from '../components/inputs/DateInput.svelte';
  import NumberInput from '../components/inputs/NumberInput.svelte';
  import TextInput from '../components/inputs/TextInput.svelte';
</script>

<form>
  <div>
    <TextInput
      label="Imię i Nazwisko / Nazwa firmy"
      name="name"
      placeholder="Jan Kowalski / Firma Sp. z o.o."
    />
    <DateInput
      label="Data zawarcia umowy"
      placeholder="22.04.2023"
      name="start"
    />
    <NumberInput
      label="Okres Finansowania [miesiące]"
      name="financing"
      placeholder="60 miesięcy"
      min={1}
    />
    <NumberInput
      label="Wartość Inwestycji [PLN]"
      name="investment"
      placeholder="100 000 000,00 PLN"
      min={1}
      step={100}
    />
    <NumberInput
      label="Wkład własny [PLN]"
      name="initial"
      placeholder="100 000 000,00 PLN"
      min={0}
      step={100}
    />
    <NumberInput
      label="Prowizja [%]"
      name="initial"
      placeholder="6,75 %"
      min={0}
      step={0.01}
      max={100}
    />
    <TextInput
      label="Typ harmonogramu spłat"
      name="initial"
      placeholder="100 000 000,00 PLN"
    />
  </div>
  <div>
    <TextInput label="test" name="test" placeholder="test" />
    <TextInput label="test" name="test" placeholder="test" />
    <TextInput label="test" name="test" placeholder="test" />
    <TextInput label="test" name="test" placeholder="test" />
    <TextInput label="test" name="test" placeholder="test" />
    <TextInput label="test" name="test" placeholder="test" />
  </div>
</form>

<style lang="scss">
  form {
    display: flex;
    flex-direction: row;
    width: 100%;
    > div {
      width: 100%;
    }
  }
</style>

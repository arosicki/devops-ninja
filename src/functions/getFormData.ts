export const getFormData = <T>(form: HTMLFormElement): T => {
  let data = {};
  form
    .querySelectorAll('input, select')
    .forEach((input: HTMLInputElement | HTMLSelectElement) => {
      data[input.name] = input.value;
    });

  return data as T;
};

import type { Agro } from '../../types/form.types';

type AgroValidators = [keyof Agro, (value: Agro[keyof Agro]) => boolean][];

const AgroValidators: AgroValidators = [
  ['name', value => value !== ''],
  ['start', value => new Date(value) >= new Date()],
  ['financing', value => +value > 0],
  ['amount', value => +value > 0],
  ['interest', value => +value > 0 && +value <= 100],
  ['schedule', value => ['monthly', 'quarterly'].includes(value)],
];

export const validateAgroData = (data: Agro): (keyof Agro)[] => {
  const entries = Object.entries(data);
  const errors: (keyof Agro)[] = [];
  entries.forEach(([key, value]) => {
    const validator = AgroValidators.find(([k]) => k === key);
    if (validator && !validator[1](value)) {
      errors.push(key as keyof Agro);
    }
  });

  return errors;
};

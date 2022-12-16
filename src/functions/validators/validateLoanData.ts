import type { Loan } from '../../types/form.types';

type LoanValidators = [keyof Loan, (value: Loan[keyof Loan]) => boolean][];

const loanValidators: LoanValidators = [
  ['name', value => value !== ''],
  ['start', value => new Date(value) >= new Date()],
  ['financing', value => +value >= 0],
  ['investment', value => +value > 0],
  ['initial', value => +value > 0],
  ['amount', value => +value > 0],
  ['commission', value => +value >= 0 && +value <= 100],
  ['interest', value => +value >= 0 && +value <= 100],
  ['schedule', value => ['monthly', 'quarterly'].includes(value)],
];

export const validateLoanData = (data: Loan): (keyof Loan)[] => {
  const entries = Object.entries(data);
  const errors: (keyof Loan)[] = [];
  entries.forEach(([key, value]) => {
    const validator = loanValidators.find(([k]) => k === key);
    if (validator && !validator[1](value)) {
      errors.push(key as keyof Loan);
    }
  });

  return errors;
};

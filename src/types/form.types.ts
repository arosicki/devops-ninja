export interface Loan {
  name: string;
  start: string;
  financing: string;
  investment: string;
  initial: string;
  amount: string;
  commission: string;
  interest: string;
  schedule: 'monthly' | 'quarterly';
}

export interface Agro {
  name: string;
  start: string;
  financing: string;
  amount: string;
  interest: string;
  schedule: 'monthly' | 'quarterly';
}

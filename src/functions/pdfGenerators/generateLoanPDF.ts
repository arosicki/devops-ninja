import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import type { Loan } from '../../types/form.types';
import { calcBaseInstallment } from './helpers/calcBaseInstallment';

const HEADERS = [
  '#',
  'Termin Platnosci',
  'Wartosc Raty [PLN]',
  'Czesc kapitalowa raty [PLN]',
  'Czesc odsetkowa raty [PLN]',
];

interface FirstInstallmentData {
  date: string;
  installment: number;
  capital: number;
  interest: number;
}

interface returnValues {
  firstInstallment: FirstInstallmentData;
  savePDF: () => void;
}

export const generateLoanPDF = ({
  start,
  financing,
  schedule,
  amount,
  interest,
  commission = '0',
}: // Lazy programming here
Omit<Loan, 'investment' | 'initial' | 'commission'> & {
  commission?: string;
}) => {
  const doc = new jsPDF();

  const body = [];

  const date = new Date(start);

  const interestPercentage = +interest / 100;
  const installmentInterval = schedule === 'monthly' ? 1 : 3;
  // TODO: What if financing % installmentInterval !== 0?
  // Assuming that never happens (╯°□°）╯︵ ┻━┻
  const installmentCount = +financing / installmentInterval;

  // At this point i have to guess that it is constant part of installment
  const totalCommission = (+commission / 100) * +amount;

  const installmentCommission = totalCommission / installmentCount;

  const baseInstallment = calcBaseInstallment(
    +amount,
    installmentCount,
    installmentInterval,
    interestPercentage,
    installmentCommission,
  );

  let leftToPay = +amount + totalCommission;

  let firstInstallmentData: FirstInstallmentData;

  for (let i = 0, n = installmentCount; i < n; i++) {
    const row = [];

    const monthsElapsed = date.getMonth() + i;
    const currentMonth = (i * installmentInterval) % 12;
    let currentDay = date.getDate();
    const currentYear = Math.floor(monthsElapsed / 12) + date.getFullYear();

    if (currentMonth === 1 && currentDay > 28) {
      currentDay = currentYear % 4 === 0 ? 29 : 28;
    }
    if (![0, 2, 4, 6, 7, 9, 11].includes(currentMonth) && currentDay > 30) {
      currentDay = 30;
    }

    const installmentDateObj = new Date(currentYear, currentMonth, currentDay);

    const interestAmount =
      (leftToPay * interestPercentage + installmentCommission) /
      (12 / installmentInterval);

    const capitalAmount = baseInstallment - interestAmount;

    if (i === 0) {
      firstInstallmentData = {
        date: installmentDateObj.toLocaleDateString(),
        installment: baseInstallment,
        capital: capitalAmount,
        interest: interestAmount,
      };
    }

    leftToPay -= capitalAmount;

    row.push(i + 1);
    row.push(installmentDateObj.toLocaleDateString());
    row.push(baseInstallment.toFixed(2));
    row.push(capitalAmount.toFixed(2));
    row.push(interestAmount.toFixed(2));
    body.push(row);
  }

  autoTable(doc, {
    headStyles: {
      font: 'helvetica',
    },
    head: [HEADERS],
    body,
  });
  const savePDF = () => doc.save(commission ? 'loan.pdf' : 'agro.pdf');

  return { savePDF, firstInstallmentData };
};

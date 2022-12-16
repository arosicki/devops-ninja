export const calcBaseInstallment = (
  amount: number,
  installments: number,
  installmentInterval: 1 | 3,
  interestPercentage: number,
  installmentCommission: number,
) => {
  if (interestPercentage === 0) {
    return amount / installments;
  }

  const yearlyInstallments = 12 / installmentInterval;

  const numerator = amount * interestPercentage;

  const growingInterest = Math.pow(
    yearlyInstallments / (yearlyInstallments + interestPercentage),
    installments,
  );

  const divider = yearlyInstallments * (1 - growingInterest);

  return numerator / divider + installmentCommission;
};

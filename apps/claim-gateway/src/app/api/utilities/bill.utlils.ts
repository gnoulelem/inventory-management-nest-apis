export const getCurrentBillPeriod = (): string => new Date().toLocaleDateString('en-US', {month: 'long', year: 'numeric'});

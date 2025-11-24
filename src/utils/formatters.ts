export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatCurrencyWithDecimals = (value: number | undefined): string => {
  if (value === undefined || value === null || value === 0) return '';
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatCurrencyInput = (value: string): string => {
  if (!value) return '';
  
  const digitsOnly = value.replace(/\D/g, '');
  
  if (!digitsOnly) return '';
  
  const numericValue = parseFloat(digitsOnly) / 100;
  
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numericValue);
};

export const parseNumber = (value: string): number => {
  if (!value) return 0;
  
  const digitsOnly = value.replace(/\D/g, '');
  
  if (!digitsOnly) return 0;
  
  const numericValue = parseFloat(digitsOnly) / 100;
  
  return isNaN(numericValue) ? 0 : numericValue;
};


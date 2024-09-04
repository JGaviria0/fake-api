export function transformDate(value: string | null): Date | null {
  if (value === '' || value === null || value === '0000-00-00 00:00:00') {
    return null;
  }
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(value)) {
    return new Date(value);
  }

  const [day, month, year] = value.split('/');
  return new Date(+year, +month - 1, +day);
}

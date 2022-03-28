export const currency = (raw?: number) => {
  return new Intl.NumberFormat('ko-KR', {
    currency: 'KRW',
    minimumFractionDigits: 0,
  }).format(raw ?? 0)
}

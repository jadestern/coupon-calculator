export const getMinAmount: number = (amount: unknown) => {
  return Math.min.apply(this, Object.values(amount).filter(Boolean))
}

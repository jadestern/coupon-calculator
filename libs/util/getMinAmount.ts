export const getMinAmount = (amount: unknown) => {
  return Math.min.apply(this, Object.values(amount).filter(Boolean))
}

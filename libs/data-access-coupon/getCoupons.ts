export const getCoupons = () => {
  return fetch('/api/coupons').then((res) => res.json())
}

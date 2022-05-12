import { Coupon, RawCoupon } from '~/libs/data-access-coupon/model'

export const mapCoupons = (coupons?: RawCoupon[]): Coupon[] => {
  if (!coupons) return []

  return coupons.map((coupon) => {
    return {
      id: coupon.productId,
      label: coupon.displayName,
      price: coupon.discountedPrice,
    }
  })
}

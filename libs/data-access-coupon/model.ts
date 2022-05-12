export interface RawCoupon {
  productId: number
  displayName: string
  discountedPrice: number
}

export interface Coupon {
  id: number
  label: string
  price: number
}

import COUPONS from './coupons.json'
import { mapCoupons } from '~/libs/util'

export const getCoupons = () => {
  return mapCoupons(COUPONS.data)
}

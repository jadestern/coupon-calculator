import { filter, flow, isNumber, min } from 'lodash/fp'
import { Amount } from '~/libs/feature-menu/model'

export const getMinAmount = (amount: Amount) => {
  return flow(filter(isNumber), min)(amount)
}

import create from 'zustand'
import { Amount } from '~/libs/feature-menu/model'

interface Values {
  // 쿠폰 금액
  couponAmount: number
  // 사용 금액
  usedAmount: number
  // 남은 금액
  remainingAmount: number
  // 선택된 메뉴 금액
  selectedMenuAmount: Amount
}

interface State extends Values {
  setCouponAmount: (price: number) => void
  setUsedAmount: (price: number) => void
  setSelectedMenuAmount: (amount: Amount) => void
}

type KeyOfValue = keyof Values

const setPredicate =
  <T>(set, key: KeyOfValue) =>
  (value: T) =>
    set((state: State) => ({
      ...state,
      [key]: value,
    }))

export const useStore = create((set: Function, get: Function) => ({
  couponAmount: 0,
  setCouponAmount: setPredicate<number>(set, 'couponAmount'),
  usedAmount: 0,
  setUsedAmount: setPredicate<number>(set, 'usedAmount'),
  remainingAmount: () => get().couponAmount - get().usedAmount,
  selectedMenuAmount: {
    solo: null,
    doppio: null,
    short: null,
    tall: null,
    grande: null,
    venti: null,
  },
  setSelectedMenuAmount: setPredicate<Amount>(set, 'selectedMenuAmount'),
}))

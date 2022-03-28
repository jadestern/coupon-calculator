import create from 'zustand'

interface Values {
  // 쿠폰 금액
  couponAmount: number
  // 사용 금액
  usedAmount: number
  // 남은 금액
  remainingAmount: number
  // 선택된 상품 id
  selectedProductId: number
}

interface State extends Values {
  setCouponAmount: (price: number) => void
  setUsedAmount: (price: number) => void
}

type KeyOfValue = keyof Values

const setPredicate = (set, key: KeyOfValue) => (price: number) =>
  set((state: State) => ({
    ...state,
    [key]: price,
  }))

export const useStore = create((set: Function, get: Function) => ({
  couponAmount: 0,
  setCouponAmount: setPredicate(set, 'couponAmount'),
  usedAmount: 0,
  setUsedAmount: setPredicate(set, 'usedAmount'),
  remainingAmount: () => get().couponAmount - get().usedAmount,
}))

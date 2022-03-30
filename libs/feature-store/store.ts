import create from 'zustand'
import { Amount, Menu, Size, Temperature } from '~/libs/feature-menu/model'
import { find, flow, get as lodashGet } from 'lodash/fp'

const MENUS: {
  data: Menu[]
} = require('../../libs/data-access-menu/menus.json')

interface CartItem {
  id: number
  temperature: Temperature
  size: Size
  count: number
}

interface Values {
  // 쿠폰 금액
  couponAmount: number
  // 사용 금액
  usedAmount: number
  // 남은 금액
  remainingAmount: number
  // 선택된 메뉴 금액
  selectedMenuAmount: Amount
  // 장바구니에 담은 상품들
  cart: CartItem[]
}

interface State extends Values {
  setCouponAmount: (price: number) => void
  setUsedAmount: (price: number) => void
  setSelectedMenuAmount: (amount: Amount) => void
  addCart: (props: CartItem) => void
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
  usedAmount: () => {
    if (get().cart.length === 0) {
      return 0
    }

    return get()
      .cart.map((item) => {
        return (
          MENUS.data.find((menu) => menu.id === item.id).amount[item.size] *
          item.count
        )
      })
      .reduce((acc, cur) => acc + cur, 0)
  },
  setUsedAmount: setPredicate<number>(set, 'usedAmount'),
  remainingAmount: () => get().couponAmount - get().usedAmount(),
  selectedMenuAmount: {
    solo: null,
    doppio: null,
    short: null,
    tall: null,
    grande: null,
    venti: null,
  },
  setSelectedMenuAmount: setPredicate<Amount>(set, 'selectedMenuAmount'),
  cart: [],
  addCart: ({ id, temperature, size, count }: CartItem) => {
    const already = flow(
      lodashGet('cart'),
      find({
        id,
        temperature,
        size,
      })
    )(get())

    if (already) {
      const result = get().cart.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            count: item.count + count,
          }
        } else {
          return item
        }
      })
      set((state: State) => ({
        ...state,
        cart: result,
      }))
    } else {
      set((state: State) => ({
        ...state,
        cart: [
          ...state.cart,
          {
            id,
            temperature,
            size,
            count,
          },
        ],
      }))
    }
  },
}))

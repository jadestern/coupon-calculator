import create from 'zustand'
import { Amount, Menu, Size, Temperature } from '~/libs/feature-menu/model'
import { find, flow, get as lodashGet } from 'lodash/fp'
import { v4 as uuidv4 } from 'uuid'

interface UpdateCartProps {
  menuId: number
  temperature: Temperature
  size: Size
  count: number
}

interface CartItem extends UpdateCartProps {
  id: number
}

interface Values {
  menus: Menu[]
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
  setMenus: (menus: Menu[]) => void
  setCouponAmount: (price: number) => void
  setUsedAmount: (price: number) => void
  setSelectedMenuAmount: (amount: Amount) => void
  addCart: (props: CartItem) => void
  updateCart: (props: CartItem) => void
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
  menus: [] as Menu[],
  setMenus: setPredicate(set, 'menus'),
  couponAmount: 0,
  setCouponAmount: setPredicate<number>(set, 'couponAmount'),
  usedAmount: () => {
    if (get().cart.length === 0) {
      return 0
    }

    return get()
      .cart.map((item: CartItem) => {
        return (
          get().menus.find((menu) => menu.id === item.menuId).amount[
            item.size
          ] * item.count
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
  } as Amount,
  setSelectedMenuAmount: setPredicate<Amount>(set, 'selectedMenuAmount'),
  cart: [] as CartItem[],
  addCart: ({ menuId, temperature, size, count }: UpdateCartProps) => {
    const already: CartItem = flow(
      lodashGet('cart'),
      find({
        menuId,
        temperature,
        size,
      })
    )(get())

    if (already) {
      const result = get().cart.map((item) => {
        if (item.id === already.id) {
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
            id: uuidv4(),
            menuId,
            temperature,
            size,
            count,
          },
        ],
      }))
    }
  },
  removeCart: (id: number) => {
    set((state: State) => ({
      ...state,
      cart: state.cart.filter((item) => item.id !== id),
    }))
  },
  resetCart: () => {
    set((state: State) => ({
      ...state,
      cart: [],
    }))
  },
  updateCart: (props) => {
    set((state: State) => ({
      ...state,
      cart: get().cart.map((item) => {
        if (item.id === props.id) {
          return {
            ...item,
            ...props,
          }
        } else {
          return item
        }
      }),
    }))
  },
}))

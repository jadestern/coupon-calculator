export interface Amount {
  solo: number | null
  doppio: number | null
  short: number | null
  tall: number | null
  grande: number | null
  venti: number | null
}

export type Size = keyof Amount

export type Temperature = 'hot' | 'cold'

export interface Menu {
  id: number
  type: string
  image: string
  name: string
  category: string
  amount: Amount
}

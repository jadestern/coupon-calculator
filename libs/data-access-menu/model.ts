import { Amount } from '~/libs/feature-menu/model'

export interface RawDataItem {
  name: string
  image: string
  type?: string
  category?: string
  amount?: Partial<Amount>
}

export interface formattedDataItem {
  id: number
  type: string
  image: string
  name: string
  category: string
  amount: Partial<Amount>
}

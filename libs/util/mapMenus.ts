import {
  formattedDataItem, RawDataItem,
} from '~/libs/data-access-menu/model'
import sum from 'lodash/sum'

export const mapMenus = (data: RawDataItem[]): formattedDataItem[] => {
  return data.map((item, index: number) => {
    return {
      ...item,
      id: index,
      type: item.type ?? '',
      category: item.category ?? '',
      amount: item.amount ?? {
        solo: 0,
        doppio: 0,
        short: 0,
        tall: 0,
        grande: 0,
        venti: 0,
      },
    }
  }).filter((item) => sum(Object.values(item.amount)) > 0) // TODO 데이터 모두 채워지면 제거
}

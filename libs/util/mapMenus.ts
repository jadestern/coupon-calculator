import { formattedDataItem, RawDataItem } from '~/libs/data-access-menu/model'

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
  })
}

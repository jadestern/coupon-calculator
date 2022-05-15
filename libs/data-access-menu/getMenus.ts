import { mapMenus } from '~/libs/util'

const MENUS = require('./menus.json')

export const getMenus = () => {
  return mapMenus(MENUS.data)
}

import { useMemo, useState } from 'react'
import { Menu } from '~/libs/feature-menu'
import { debounce } from 'lodash'

export const useSearch = (menus: Menu[]) => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  const filteredMenus = useMemo(() => {
    if (!searchQuery) return menus

    return menus.filter((menu) => menu.name.includes(searchQuery))
  }, [searchQuery, menus])

  const handleChange = (value: string) => {
    setSearchQuery(value)
  }

  const debouncedHandleChange = debounce(handleChange, 500)

  return {
    filteredMenus,
    debouncedHandleChange,
  }
}

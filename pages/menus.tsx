import { Layout } from '~/libs/ui-layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Grid, List } from '@mui/material'
import { getMinAmount } from '~/libs/util'
import { MenuItem } from '~/libs/ui-menu-item'
import { SearchWrapper } from '~/libs/ui-search-wrapper'
import { Billboard } from '~/libs/feature-billboard'
import { Drawer } from '~/libs/feature-drawer'
import { Search } from '~/libs/ui-search'
import { useStore } from '~/libs/feature-store'
import { Amount } from '~/libs/feature-menu/model'
import { Floating } from '~/libs/ui-floating'
import { useSearch } from '~/libs/feature-search'
import Link from 'next/link'

export default function Menus() {
  const {
    menus, couponAmount, setSelectedMenuAmount, addCart,
  } = useStore()
  const [ selectedMenuId, setSelectedMenuId ] = useState<number | undefined>()
  const {
    filteredMenus, debouncedHandleChange,
  } = useSearch(menus)

  let router = useRouter()
  useEffect(() => {
    if (couponAmount === 0) {
      router.replace('/')
    }
  }, [ couponAmount, router ])

  const [ drawerOpen, setDrawerOpen ] = useState(false)

  const handleListItemClick = (id: number,
    amount: Amount) => {
    setSelectedMenuId(id)
    setSelectedMenuAmount(amount)
    setDrawerOpen(true)
  }

  return (
    <Layout loading={ !couponAmount }>
      <Floating>
        <Link href={ '/cart' } passHref>
          <a>
            <Billboard />
          </a>
        </Link>
      </Floating>
      <Grid container mt={ 2 }>
        <SearchWrapper>
          <Search onChange={ debouncedHandleChange } />
        </SearchWrapper>
        <Grid item xs={ 12 }>
          <List>
            { filteredMenus.map((menu) => (
              <MenuItem
                key={ menu.id }
                image={ menu.image }
                name={ menu.name }
                amount={ getMinAmount(menu.amount) }
                onClick={ () => handleListItemClick(menu.id, menu.amount) }
              />
            )) }
          </List>
        </Grid>
      </Grid>
      <Drawer
        open={ drawerOpen }
        buttonLabelLeft={ '담고 메뉴 더 보기' }
        buttonLabelRight={ '담고 장바구니 가기' }
        onClickLeft={ (props) => {
          addCart({
            menuId: selectedMenuId,
            ...props,
          })
        } }
        onClickRight={ (props) => {
          addCart({
            menuId: selectedMenuId,
            ...props,
          })
          router.push('/cart')
        } }
        onClose={ () => setDrawerOpen(false) }
        onOpen={ () => setDrawerOpen(true) }
      />
    </Layout>
  )
}

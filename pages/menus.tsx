import { Layout } from '~/libs/ui-layout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { Grid, List, Paper } from '@mui/material'
import { getMinAmount } from '~/libs/util'
import { MenuItem } from '~/libs/ui-menu-item'
import { SearchWrapper } from '~/libs/ui-search-wrapper'
import { Billboard } from '~/libs/feature-billboard'
import { Drawer } from '~/libs/feature-drawer'
import { Search } from '~/libs/feature-search'
import { useStore } from '~/libs/feature-store'
import { Amount } from '~/libs/feature-menu/model'

const MENUS = require('../libs/data-access-menu/menus.json')

export default function Menus() {
  const menus = MENUS.data
  const { couponAmount, setSelectedMenuAmount } = useStore()

  let router = useRouter()
  useEffect(() => {
    if (couponAmount === 0) {
      router.replace('/')
    }
  }, [couponAmount, router])

  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleListItemClick = (amount: Amount) => {
    setSelectedMenuAmount(amount)
    setDrawerOpen(true)
  }

  return (
    <Layout loading={!couponAmount}>
      <Paper
        elevation={2}
        sx={{
          position: 'fixed',
          bottom: '8px',
          left: '8px',
          right: '8px',
          zIndex: 1,
          padding: 1,
        }}
      >
        <Billboard />
      </Paper>
      <Grid container mt={2}>
        <SearchWrapper>
          <Search />
        </SearchWrapper>
        <Grid item xs={12}>
          <List>
            {menus.map((menu) => (
              <MenuItem
                key={menu.id}
                image={menu.image}
                name={menu.name}
                amount={getMinAmount(menu.amount)}
                onClick={() => handleListItemClick(menu.amount)}
              />
            ))}
          </List>
        </Grid>
      </Grid>
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onOpen={() => setDrawerOpen(true)}
      />
    </Layout>
  )
}

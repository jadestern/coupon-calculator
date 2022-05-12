import { useRouter } from 'next/router'
import { Autocomplete, Grid, TextField, Typography } from '@mui/material'
import { Layout } from '~/libs/ui-layout'
import { useStore } from '~/libs/feature-store'
import { useEffect } from 'react'
import { useGetMenus } from '~/libs/data-access-menu'
import { useQuery } from 'react-query'
import { getCoupons } from '~/libs/data-access-coupon/getCoupons'
import { mapCoupons } from '~/libs/util'
import { Coupon } from '~/libs/data-access-coupon'

export default function Home() {
  let router = useRouter()
  const { data, isLoading } = useQuery('coupons', getCoupons)
  const menus = useGetMenus()
  const { setMenus, setCouponAmount } = useStore()

  const handleChange = (_: never, value: Coupon | null) => {
    if (!value) return

    setCouponAmount(value.price)
    router.push('/menus')
  }

  useEffect(() => {
    setMenus(menus)
  }, [menus, setMenus])

  return (
    <Layout>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        sx={{ height: '100vh' }}
      >
        <Grid mb={3}>
          <Typography variant={'h6'}>
            기프티콘의 상품명을 입력하세요.
          </Typography>
        </Grid>
        <Grid>
          <Autocomplete
            disablePortal
            options={mapCoupons(data)}
            sx={{ width: 300 }}
            loading={isLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="상품명"
                placeholder="아이스 카페 아메리카노 T"
              />
            )}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Layout>
  )
}

import { useRouter } from 'next/router'
import { Autocomplete, Grid, TextField, Typography } from '@mui/material'
import { Coupon } from '~/libs/feature-coupon'
import { Layout } from '~/libs/ui-layout'
import { useStore } from '~/store'

const COUPONS = require('../libs/data-access-coupon/coupons.json')

export default function Home() {
  const { setCouponAmount } = useStore()
  const router = useRouter()
  const coupons = COUPONS.data

  const handleChange = (_: never, value: Coupon | null) => {
    if (!value) return

    setCouponAmount(value.price)
    router.push('/menus')
  }

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
            options={coupons}
            sx={{ width: 300 }}
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

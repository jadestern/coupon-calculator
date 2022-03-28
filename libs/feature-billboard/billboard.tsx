import Grid from '@mui/material/Grid'
import { Divider, Typography } from '@mui/material'
import { useStore } from '~/store'
import { useMemo } from 'react'
import { currency } from '~/libs/util'

export const Billboard = () => {
  const { couponAmount, usedAmount } = useStore()
  const remainingAmount = useStore((state) => state.remainingAmount())
  const isRemaining = useMemo(() => remainingAmount > 0, [remainingAmount])

  return (
    <Grid container justifyContent="space-evenly">
      <Grid item xs={3} textAlign="center">
        <Typography variant="subtitle1">선물금액</Typography>
        <Typography variant="button">{currency(couponAmount)} 원</Typography>
      </Grid>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Grid item xs={3} textAlign="center">
        <Typography variant="subtitle1">사용금액</Typography>
        <Typography variant="button">{currency(usedAmount)} 원</Typography>
      </Grid>
      <Divider orientation="vertical" variant="middle" flexItem />
      <Grid item xs={3} textAlign="center">
        <Typography variant="subtitle1">남은금액</Typography>
        <Typography variant="button" color={isRemaining ? 'red' : 'blue'}>
          {isRemaining ? '+' : '-'}
          {currency(remainingAmount)} 원
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Billboard

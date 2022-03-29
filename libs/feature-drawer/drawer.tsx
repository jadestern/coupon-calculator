import {
  Button,
  Container,
  Divider,
  IconButton,
  Stack,
  SwipeableDrawer,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material'
import Grid from '@mui/material/Grid'
import { AddCircle, RemoveCircle } from '@mui/icons-material'
import { useMemo, useState } from 'react'
import { Billboard } from '~/libs/feature-billboard'
import Link from 'next/link'
import { useStore } from '~/libs/feature-store'
import { Size, Temperature } from '~/libs/feature-menu/model'
import { currency } from '~/libs/util'

interface DrawerProps {
  open: boolean
  onOpen: () => void
  onClose: () => void
}

export const Drawer = ({ open, onOpen, onClose }: DrawerProps) => {
  const { selectedMenuAmount } = useStore()
  const [temperature, setTemperature] = useState<Temperature>('hot')
  const [size, setSize] = useState<Size | ''>('')
  const [count, setCount] = useState<number>(1)

  const selectableSizes: string[] = useMemo(() => {
    return Object.keys(selectedMenuAmount).filter(
      (size) => selectedMenuAmount[size] > 0
    )
  }, [selectedMenuAmount])

  const resultAmount = useMemo(() => {
    if (size === '') {
      return 0
    }
    return selectedMenuAmount[size] * count
  }, [size, selectedMenuAmount, count])

  const handleTemperatureChange = (_, value) => {
    setTemperature(value)
  }

  const handleSizeChange = (_, value) => {
    if (value) setSize(value)
  }

  const handleClose = () => {
    setTemperature('hot')
    setSize('')

    onClose()
  }

  const subtractCount = () => {
    setCount(count - 1)
  }

  const addCount = () => {
    setCount(count + 1)
  }

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      onClose={handleClose}
      onOpen={onOpen}
    >
      <Container sx={{ padding: 2 }}>
        <Billboard />
        <Divider
          sx={{
            margin: 1,
            borderStyle: 'dashed',
          }}
        />
        <Stack spacing={2}>
          <ToggleButtonGroup
            color="primary"
            value={temperature}
            exclusive
            fullWidth
            sx={{
              width: '50%',
              margin: '0 auto',
            }}
            onChange={handleTemperatureChange}
          >
            <ToggleButton value="hot" color="error">
              HOT
            </ToggleButton>
            <ToggleButton value="ice">ICE</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Typography variant="subtitle1" mt={1}>
          사이즈
        </Typography>
        <Stack mt={1} spacing={2}>
          <ToggleButtonGroup
            color="standard"
            value={size}
            exclusive
            fullWidth
            onChange={handleSizeChange}
          >
            {selectableSizes.map((size) => (
              <ToggleButton key={size} value={size}>
                {size}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          mt={2}
          alignItems="center"
        >
          <Grid
            item
            sx={{
              width: '35%',
            }}
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <IconButton
                aria-label="minus"
                component="span"
                disabled={count === 1}
                sx={{
                  color: 'black',
                }}
                onClick={subtractCount}
              >
                <RemoveCircle />
              </IconButton>
              <Typography variant="h6">{count}</Typography>
              <IconButton
                aria-label="plus"
                component="span"
                sx={{
                  color: 'black',
                }}
                onClick={addCount}
              >
                <AddCircle />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h6">{currency(resultAmount)} 원</Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-evenly" mt={2}>
          <Grid item>
            <Button disabled={size === ''} variant="contained">
              담고 메뉴 더 보기
            </Button>
          </Grid>
          <Grid item>
            <Button disabled={size === ''} variant="outlined">
              <Link href="/cart">
                <a>담고 장바구니 가기</a>
              </Link>
            </Button>
          </Grid>
        </Grid>
      </Container>
    </SwipeableDrawer>
  )
}

export default Drawer

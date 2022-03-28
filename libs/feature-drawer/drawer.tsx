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
import { useState } from 'react'
import { Billboard } from '~/libs/feature-billboard'
import Link from 'next/link'

interface DrawerProps {
  open: boolean
  onOpen: () => void
  onClose: () => void
}

export const Drawer = ({ open, onOpen, onClose }: DrawerProps) => {
  const [value, setValue] = useState('')

  const handleChange = (_, value) => {
    setValue(value)
  }

  return (
    <SwipeableDrawer
      anchor="bottom"
      open={open}
      ModalProps={{
        keepMounted: true,
      }}
      onClose={onClose}
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
            value={value}
            exclusive
            fullWidth
            onChange={handleChange}
            sx={{
              width: '50%',
              margin: '0 auto',
            }}
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
            color="primary"
            value={value}
            exclusive
            fullWidth
            onChange={() => {}}
          >
            <ToggleButton value="short">Short</ToggleButton>
            <ToggleButton value="tall">Tall</ToggleButton>
            <ToggleButton value="grande">Grande</ToggleButton>
            <ToggleButton value="venti">Venti</ToggleButton>
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
                sx={{
                  color: 'gray',
                }}
              >
                <RemoveCircle />
              </IconButton>
              <Typography variant="h6">9</Typography>
              <IconButton
                aria-label="plus"
                component="span"
                sx={{
                  color: 'black',
                }}
              >
                <AddCircle />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h6">5,000 원</Typography>
          </Grid>
        </Grid>
        <Grid container justifyContent="space-evenly" mt={2}>
          <Grid item>
            <Button variant="outlined">담고 메뉴 더 보기</Button>
          </Grid>
          <Grid item>
            <Link href="/cart">
              <a>
                <Button variant="outlined">담고 장바구니 가기</Button>
              </a>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </SwipeableDrawer>
  )
}

export default Drawer

import {
  Alert,
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem as MuiListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import { HighlightOff } from '@mui/icons-material'
import { styled } from '@mui/system'
import { Layout } from '~/libs/ui-layout'
import { Floating } from '~/libs/ui-floating'
import { Billboard } from '~/libs/feature-billboard'
import { useStore } from '~/libs/feature-store'
import { currency } from '~/libs/util'
import NextLink from 'next/link'

const ListItem = styled(MuiListItem)`
  .MuiListItemSecondaryAction-root {
    top: 17%;
  }
`

export default function Cart() {
  const { menus, cart, removeCart } = useStore()

  const handleChangeOption = () => {
    console.log('11')
  }

  const handleRemove = (id: number) => () => {
    removeCart(id)
  }

  return (
    <Layout>
      <Floating>
        <Billboard />
      </Floating>
      <Typography variant="h5" mt={2}>
        주문 메뉴
      </Typography>
      <Divider />
      {cart.length === 0 && (
        <Grid mt={2}>
          <Alert mt={2} severity={'warning'}>
            장바구니에 상품이 없습니다.&nbsp;
            <NextLink href="/menus" passHref>
              <Link>메뉴로 돌아가기</Link>
            </NextLink>
          </Alert>
        </Grid>
      )}
      <List>
        {cart.map((cartItem) => {
          const menu = menus.find((menu) => menu.id === cartItem.id)
          return (
            <ListItem
              key={cartItem.id}
              sx={{ paddingLeft: 0 }}
              alignItems="flex-start"
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="remove"
                  onClick={handleRemove(cartItem.id)}
                >
                  <HighlightOff />
                </IconButton>
              }
            >
              <ListItemAvatar>
                <Avatar
                  alt=""
                  src={menu.image}
                  sx={{
                    width: 48,
                    height: 48,
                    marginRight: 2,
                  }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={menu.name}
                secondary={
                  <>
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <span>{cartItem.temperature.toLocaleUpperCase()}</span>
                        &nbsp;|&nbsp;
                        <span>{cartItem.size.toLocaleUpperCase()}</span>
                        &nbsp;|&nbsp;
                        <span>{cartItem.count} 개</span>
                      </Grid>
                      <Grid item>
                        <Typography component="span" variant="body2">
                          {currency(menu.amount[cartItem.size])} 원
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid
                      mt={2}
                      container
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Button onClick={handleChangeOption}>옵션 변경</Button>
                      </Grid>
                      <Grid item>
                        <Typography component="span" variant="h6" color="black">
                          {currency(
                            cartItem.count * menu.amount[cartItem.size]
                          )}{' '}
                          원
                        </Typography>
                      </Grid>
                    </Grid>
                  </>
                }
              />
            </ListItem>
          )
        })}
      </List>
    </Layout>
  )
}

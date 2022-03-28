import {
  Avatar,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem as MuiListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import { AddCircle, HighlightOff, RemoveCircle } from '@mui/icons-material'
import { styled } from '@mui/system'
import { Layout } from '~/libs/ui-layout'

const ListItem = styled(MuiListItem)`
  .MuiListItemSecondaryAction-root {
    top: 17%;
  }
`

export default function Cart() {
  return (
    <Layout>
      <Typography variant="h5" mt={2}>
        주문 메뉴
      </Typography>
      <Divider />
      <List>
        <ListItem
          sx={{
            paddingLeft: 0,
          }}
          alignItems="flex-start"
          secondaryAction={
            <IconButton edge="end" aria-label="remove">
              <HighlightOff />
            </IconButton>
          }
        >
          <ListItemAvatar>
            <Avatar
              alt="딸기 주스"
              src="https://www.starbucks.co.kr/upload/store/skuimg/2019/06/[5210008070]_20190627152902132.jpg"
              sx={{
                width: 48,
                height: 48,
                marginRight: 2,
              }}
            />
          </ListItemAvatar>
          <ListItemText
            primary="딸기주스"
            secondary={
              <>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <span>HOT</span>&nbsp;|&nbsp;
                    <span>Tall</span>
                  </Grid>
                  <Grid item>
                    <Typography component="span" variant="body2">
                      4,500 원
                    </Typography>
                  </Grid>
                </Grid>
                <Button>옵션 변경</Button>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
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
                          padding: 0,
                        }}
                      >
                        <RemoveCircle fontSize="small" />
                      </IconButton>
                      <Typography component="span" variant="caption" mx={1}>
                        9
                      </Typography>
                      <IconButton
                        aria-label="plus"
                        component="span"
                        sx={{
                          color: 'black',
                          padding: 0,
                          fontSize: 'smaller',
                        }}
                      >
                        <AddCircle fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography component="span" variant="h6" color="black">
                      5,000 원
                    </Typography>
                  </Grid>
                </Grid>
              </>
            }
          />
        </ListItem>
      </List>
    </Layout>
  )
}

import {
  Avatar,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { currency } from '~/libs/util'

interface MenuItemProps {
  image: string
  name: string
  amount: number
  onClick: () => void
}

export const MenuItem = ({ image, name, amount, onClick }: MenuItemProps) => {
  return (
    <ListItem component="div" disablePadding>
      <ListItemButton sx={{ pl: 4 }} onClick={onClick}>
        <ListItemIcon>
          <Avatar
            alt=""
            src={image}
            sx={{
              width: 48,
              height: 48,
              marginRight: 2,
            }}
          />
        </ListItemIcon>
        <ListItemText primary={name} secondary={`${currency(amount)} 원 ~`} />
      </ListItemButton>
    </ListItem>
  )
}

import { ReactNode } from 'react'
import Grid from '@mui/material/Grid'

interface SearchWrapperProps {
  children: ReactNode
}

export const SearchWrapper = ({ children }: SearchWrapperProps) => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        position: 'sticky',
        top: '16px',
        zIndex: 1,
      }}
    >
      {children}
    </Grid>
  )
}

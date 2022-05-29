import { ReactNode } from 'react'
import { Paper } from '@mui/material'

interface FloatingProps {
  children: ReactNode
}

export const Floating = ({ children }: FloatingProps) => {
  return (
    <Paper
      elevation={ 2 }
      sx={ {
        position: 'fixed',
        bottom: 'calc(env(safe-area-inset-bottom) + 8px)',
        left: '8px',
        right: '8px',
        zIndex: 1,
        padding: 1,
      } }
    >
      { children }
    </Paper>
  )
}

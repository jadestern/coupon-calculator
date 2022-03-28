import { ReactNode } from 'react'
import { Container, LinearProgress } from '@mui/material'

interface LayoutProps {
  children: ReactNode
  loading?: boolean
}

export const Layout = ({ children, loading }: LayoutProps) => {
  if (loading) return <LinearProgress />

  return <Container maxWidth="sm">{children}</Container>
}

import { ReactNode } from 'react'

export interface Route {
  path: string
  title: string
  icon: ReactNode
}

export type AppRoutes = Route[]

export interface HeaderProps {
  backgroundColor?: string
  tabColor?: string
  repoHref?: string
  selectedKeys?: string[]
  routes?: AppRoutes
  badgeCount?: number
  badgeIcon?: ReactNode
  avatarImageSrc?: string
}

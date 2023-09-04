import { ReactNode } from 'react'

export type IDashboardComponent = {
  [key: string]: {component: ReactNode, showBorder?: boolean}
}

export type ILayoutKey = 'lg' | 'md' | 'sm' | 'xs' | 'xxs';
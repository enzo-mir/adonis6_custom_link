import type { Theme } from '../stores/theme.store'

export type LinkType = [
  {
    id: number
    name: string
    path: string
  },
]

export type HeaderProps = {
  title: string
  description: string
}

export type PropsType = {
  user?: {
    email: string
    username: string
    id: string
  }
  header_content?: HeaderProps
  links?: { id: number; urls: LinkType }
  images?: Array<string>
  style?: Theme
  errors?: string
  success?: string
}

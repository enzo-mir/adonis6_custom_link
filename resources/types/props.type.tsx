import type { Theme } from '../stores/theme.store'

export type LinkType = [
  {
    id: number
    link: string
    name: string
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
  links?: LinkType
  images?: Array<string>
  style?: Theme
  errors?: string
  success?: string
}

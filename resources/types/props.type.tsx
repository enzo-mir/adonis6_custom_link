import type { Theme } from '../stores/theme.store'

export type LinkType = [
  {
    id: number
    link: string
    name: string
  },
]

export type PropsType = {
  user?: {
    email: string
    username: string
  }
  header_content?: {
    title: string
    description: string
  }
  links?: LinkType
  images?: Array<string>
  style?: Theme
  errors?: string
}

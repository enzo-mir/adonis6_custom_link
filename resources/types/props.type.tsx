import type { Theme } from '../stores/theme.store'

export type PropsType = {
  user?: {
    email: string
    username: string
  }
  header_content?: {
    title: string
    description: string
  }
  links?: {
    urls: string[]
    names: string[]
  }
  images?: Array<string>
  style?: Theme
  errors?: string
}

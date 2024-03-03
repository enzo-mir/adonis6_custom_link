import type { Theme } from '../stores/theme.store'

export type PropsType = {
  user?: {
    email: string
    username: string
  }
  names?: string[]
  links?: string[]
  header_content?: {
    title: string
    description: string
  }
  images?: Array<string>
  style?: Theme
  errors?: string
}

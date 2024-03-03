import { create } from 'zustand'
export type Theme = {
  body: string
  text: string
  bg_links: string
  border_radius: string
  header_color: string
}
type ThemeStoreType = {
  theme: Theme
  setTheme(vale: Theme): void
}

export const themeStore = create<ThemeStoreType>((set) => ({
  theme: {
    body: '',
    text: '',
    bg_links: '',
    border_radius: '',
    header_color: '',
  },
  setTheme: (val) => set(() => ({ theme: val })),
}))

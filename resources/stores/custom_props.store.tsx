import { create } from 'zustand'

export type PropsType = {
  links: {
    names: string[]
    urls: string[]
  }
  header_content: {
    title: string
    description: string
  }
  images: Array<string>
}
type PropsStoreType = {
  props: PropsType
  setProps(val: PropsType): void
}

export const customProps = create<PropsStoreType>((set) => ({
  props: {
    header_content: {
      title: '',
      description: '',
    },
    images: [],
    links: {
      names: [],
      urls: [],
    },
  },
  setProps: (val) => set(() => ({ props: val })),
}))

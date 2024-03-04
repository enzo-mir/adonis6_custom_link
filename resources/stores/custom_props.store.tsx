import { create } from 'zustand'

export type PropsType = {
  links: [
    {
      id: number
      name: string
      link: string
    },
  ]
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
    links: [{ id: 0, name: '', link: '' }],
  },
  setProps: (val) => set(() => ({ props: val })),
}))

import { create } from 'zustand'
import type { LinkType } from '../types/props.type'

export type PropsType = {
  links: {
    id: number
    urls: LinkType
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
      id: 0,
      urls: [
        {
          id: 0,
          name: '',
          path: '',
        },
      ],
    },
  },
  setProps: (val) => set(() => ({ props: val })),
}))

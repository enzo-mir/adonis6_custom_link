import { create } from 'zustand'
export type UserType = {
  email: string
  username: string
  id: string
}
type UserStoreType = {
  user: UserType
  setUser(vale: UserType): void
}

export const userDatas = create<UserStoreType>((set) => ({
  user: {
    email: '',
    username: '',
    id: '',
  },
  setUser: (val) => set(() => ({ user: val })),
}))

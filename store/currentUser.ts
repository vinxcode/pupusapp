import { create } from 'zustand'

type CurrentUserStore = {
    idUser: string
}

type Action = {
    updateIdUser: (id_user: CurrentUserStore['idUser']) => void
  }
  

const useCurrentUserStore = create<CurrentUserStore & Action>((set) => ({
    idUser: "",
    updateIdUser: (idUser) => set(() => ({ idUser: idUser }))
}))

export default useCurrentUserStore
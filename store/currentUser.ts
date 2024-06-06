import { create } from 'zustand'

type CurrentUserStore = {
    idUser: string,
    hasNameAndAddress: boolean,
    hasEspecialidades: boolean
}

type Action = {
    updateIdUser: (idUser: CurrentUserStore['idUser']) => void,
    updateHasNameAndAddress: (hasNameAndAddress: CurrentUserStore['hasNameAndAddress']) => void,
    updateHasEspecialidades: (hasEspecialidades: CurrentUserStore['hasEspecialidades']) => void,
}


const useCurrentUserStore = create<CurrentUserStore & Action>((set) => ({
    idUser: "",
    hasNameAndAddress: false,
    hasEspecialidades: false,
    updateIdUser: (idUser) => set(() => ({ idUser: idUser })),
    updateHasEspecialidades: (hasEspecialidades) => set(() => ({ hasEspecialidades: hasEspecialidades })),
    updateHasNameAndAddress: (hasNameAndAddress) => set(() => ({ hasNameAndAddress: hasNameAndAddress }))
}))

export default useCurrentUserStore
import { create } from 'zustand'

import { createClient } from '@/utils/supabase/client'
const supabase = createClient()

type Especialidad = {
    id_especialidad: number,
    nombre_especialidad: string
}
type EspecialidadPupuseria = {
    id_pupuseria: number,
    id_especialidad: number,
    precio_especialidad: number
}

type EspecialidadStore = {
    especialidades: Especialidad[],
    especialidadesPupuseria: EspecialidadPupuseria[],
    updatedEspecialidades: Especialidad[],
    fetchEspecialidades: () => Promise<void>
    fetchEspecialidadesPupuseria: () => Promise<void>
    updateEspecialidades: (updatedEspecialidades: EspecialidadStore['updatedEspecialidades']) => void
}

const useEspecialidadStore = create<EspecialidadStore>((set) => ({
    especialidades: [],
    especialidadesPupuseria: [],
    updatedEspecialidades: [],
    fetchEspecialidades: async () => {
        const { data, error } = await supabase
            .from<Especialidad>('especialidades')
            .select();

        if (error) {
            console.error("Error fetching data: ", error);
        } else {
            set({ especialidades: data });
        }
    },
    
    fetchEspecialidadesPupuseria: async () => {
        const { data, error } = await supabase
            .from<EspecialidadPupuseria>('pupuserias_especialidades')
            .select();

        if (error) {
            console.error("Error fetching data: ", error);
        } else {
            set({ especialidadesPupuseria: data });
        }
    },
    updateEspecialidades: (updatedEspecialidades) => set(() => ({ updatedEspecialidades: updatedEspecialidades })),
}))

export default useEspecialidadStore
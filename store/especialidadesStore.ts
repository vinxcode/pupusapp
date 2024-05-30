import { create } from 'zustand'

import { createClient } from '@/utils/supabase/client'
const supabase = createClient()

type Especialidad = {
    id_especialidad: number,
    nombre_especialidad: string
}

type EspecialidadStore = {
    especialidades: Especialidad[],
    fetchEspecialidades: () => Promise<void>
}

export const useEspecialidadStore = create<EspecialidadStore>((set) => ({
    especialidades: [],
    fetchEspecialidades: async () => {
        const { data, error } = await supabase
            .from<Especialidad>('especialidades')
            .select();

        if (error) {
            console.error("Error fetching data: ", error);
        } else {
            set({ especialidades: data });
        }
    }
}))
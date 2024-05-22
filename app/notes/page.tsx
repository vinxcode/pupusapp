'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Notes() {
    const [especialidades, setEspecialidades] = useState<any[] | null>(null)
    const supabase = createClient()
    
    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from('especialidades').select()
            setEspecialidades(data)
        }
        getData()
    }, [])

    return (
        <>
        {
            especialidades?.map(especialidad => (
                <div>
                    <p>ID: {especialidad.id_especialidad}</p>
                    <p>Especialidad: {especialidad.nombre_especialidad}</p>
                    <p>Precio: ${especialidad.precio_especialidad}</p>
                </div>
            )
            )
        }
        </>
    )
}
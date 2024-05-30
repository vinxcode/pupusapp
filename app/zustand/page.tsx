'use client'

import React from 'react'
import { useEffect } from 'react'
import { useEspecialidadStore } from '@/store/especialidadesStore'
import { useProfileStore } from '@/store/profilesStore'


const Zustand = () => {

    const fetchEspecialidades = useEspecialidadStore((state) => state.fetchEspecialidades )
    const especialidades = useEspecialidadStore((state) => state.especialidades)
    const fetchProfiles = useProfileStore((state) => state.fetchProfiles )
    const profiles = useProfileStore((state) => state.profiles)

useEffect(() => {
    fetchEspecialidades()
    fetchProfiles()
}, [fetchEspecialidades, fetchProfiles])

  return (
    <div>
        {
            especialidades?.map(especialidad => (
                <div>{ especialidad.nombre_especialidad }</div>
            ))
        }
        <h2>PROFILE</h2>
        {
            profiles?.map(profile => (
                <div>{ profile.nombre_pupuseria }</div>
            ))
        }
    </div>
  )
}

export default Zustand
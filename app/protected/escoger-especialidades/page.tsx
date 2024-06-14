'use client'

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from 'react'
import NuevaEspecialidad from "@/components/NuevaEspecialidad";
import { useEspecialidadStore } from "@/store";

const EscogerEspecialidad = () => {

  const supabase = createClient()

  const [allowAdd, setAllowAdd] = useState(false)
  const [allowErrorMessage, setAllowErrorMessage] = useState(false)
  const [numeroEspecialidades, setNumeroEspecialidades] = useState([{ value: "" }])
  const especialidades = useEspecialidadStore((state) => state.especialidades)
  const fetchEspecialidades = useEspecialidadStore((state) => state.fetchEspecialidades)

  useEffect(() => {
    fetchEspecialidades()
  }, [supabase])

  const handleAddEspecialidad = (e: any) => {
    e.preventDefault()
    if (allowAdd) {
      const nuevosNumeros = [...numeroEspecialidades]
      nuevosNumeros[nuevosNumeros.length] = { value: "" }
      setNumeroEspecialidades(nuevosNumeros)
      setAllowAdd(false)
    } else{
      setAllowErrorMessage(true)
    }
    // console.log(numeroEspecialidades)
  }

  return (
    <section className="flex flex-col items-center animate-in bg-slate-50 rounded-2xl px-14 py-7 shadow-2xl mt-20">
      <h1 className='font-leagueSpartan text-3xl font-bold mt-10'>Escoge las especialidades que ofreces</h1>
      <div className='bg-green h-2 rounded-full w-4/5 '></div>

      {
        allowErrorMessage && 
        (
          <div className="bg-red mt-3 w-4/5 px-10 py-2 text-white rounded-full animate-in">Debes escoger las especialidades anteriores antes de agregar una mas</div>
        ) 
        
      }

      <form className="flex flex-col font-leagueSpartan p-10 text-black gap-4  w-[500px]" >

        {
          especialidades && (
            <div>
              {
                numeroEspecialidades.map(especialidad => (
                  <NuevaEspecialidad especialidades={especialidades} allowAdd={allowAdd} setAllowAdd={setAllowAdd} />
                ))
              }
            </div>
          )
        }

        <button className="flex text-black items-center bg-green px-5 py-2 rounded-lg gap-2 w-2/3 font-semibold
        hover:opacity-85 transition duration-200 ease-in-out"
          onClick={(e) => handleAddEspecialidad(e)}>
          <span className="icon-[material-symbols--add] text-xl mb-[4px]"></span>
          Agregar nueva especialidad</button>

        <input type="submit" value="Finalizar"
          className="bg-green font-semibold py-3 px-10 rounded-lg cursor-pointer hover:opacity-85 transition duration-200 ease-in-out"
        />
      </form>
    </section>
  )
}

export default EscogerEspecialidad
'use client'

import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from 'react'

const EscogerEspecialidad = () => {

  const supabase = createClient()

  const [especialidades, setEspecialidades] = useState<any[] | null>(null)

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('especialidades').select()
      setEspecialidades(data)
    }

    getData()
  }, [supabase])


  return (
    <section className="flex flex-col items-center animate-in bg-slate-50 rounded-2xl px-14 py-7 shadow-2xl mt-20">
      <h1 className='font-leagueSpartan text-3xl font-bold mt-10'>Escoge las especialidades que ofreces</h1>
      <div className='bg-green h-2 rounded-full w-4/5 '></div>

      <form className="flex flex-col font-leagueSpartan p-10 text-black gap-2  w-[500px]" >
        <div className="flex gap-4 justify-center">
          <div className="flex flex-col w-full">
            <label htmlFor="especialidades">Especialidad</label>
            <select className="h-9 px-3 py-1 bg-white border-2 border-black rounded-lg"
              id="especialidades"
              name="especialidades"
            // value={formData.selectedOption}
            // onChange={handleChange}
            >
              <option value="">Seleccione una especialidad</option>
              {
                especialidades && (
                  especialidades?.map((especialidad, index) => (
                    <option className="h-9 px-3 py-1 hover:bg-green"
                      value={especialidad?.nombre_especialidad}>{especialidad?.nombre_especialidad}</option>
                  ))
                )
              }
            </select>
          </div>
          <div className="flex flex-col">
          <label htmlFor="precio">Asigne un precio</label>
          <input placeholder="$ 0.75" type="text" name="precio" id="precio" className="h-9 px-3 py-1 bg-white border-2 border-black rounded-lg w-[140px]"/>
          </div>
        </div>

        <input
          type="submit"
          value="Finalizar"
          className="bg-green font-semibold py-3 px-10 rounded-lg cursor-pointer hover:opacity-85 transition duration-200 ease-in-out mt-2"
        />
      </form>
    </section>
  )
}

export default EscogerEspecialidad
import React from 'react'
import { useState, } from 'react'
import { useEspecialidadStore } from '@/store'

type Especialidad = {
    id_especialidad: number,
    nombre_especialidad: string
}

type NuevaEspecialidadProps = {
    especialidades: Especialidad[]
}

const NuevaEspecialidad: React.FC<NuevaEspecialidadProps & any> = ({ especialidades, allowAdd, setAllowAdd }) => {

    const [selectedEspecialidad, setSelectedEspecialidad] = useState<string>("")
    const updatedEspecialidades = useEspecialidadStore((state) => state.updatedEspecialidades)
    const updateEspecialidades = useEspecialidadStore((state) => state.updateEspecialidades)

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {

        setSelectedEspecialidad(event.target.value)


        /* especialidades.forEach(especialidad => {
            if(especialidad.nombre_especialidad === event.target.value){
                setSelectedEspecialidad(especialidad.nombre_especialidad)
                const newEspecialidades = updatedEspecialidades.filter(e => e.nombre_especialidad !== especialidad.nombre_especialidad)
                updateEspecialidades(newEspecialidades)
                console.log(updatedEspecialidades)
            }
        }) */
    }

    return (
        <div className="flex gap-4 justify-center mb-3 animate-in">


            { /* SELECT WITH ITS LABEL */}
            <div className="flex flex-col w-full">
                <label htmlFor="especialidades">Especialidad</label>
                <select className="h-9 px-3 py-1 bg-white border-2 border-black rounded-lg"
                    id="especialidades"
                    name="especialidades"
                    value={selectedEspecialidad}
                    onChange={handleSelectChange}
                >
                    <option value="">Seleccione una especialidad</option>
                    {
                        updatedEspecialidades && (
                            updatedEspecialidades?.map((especialidad, index) => (
                                <option key={index} className="h-9 px-3 py-1 hover:bg-green"
                                    value={especialidad?.nombre_especialidad}>{especialidad?.nombre_especialidad}</option>
                            ))
                        )
                    }
                </select>

                <p>{/* selectedEspecialidad */}</p>

            </div>

            { /* PRECIO WITH ITS LABEL */}
            <div className="flex flex-col">
                <label htmlFor="precio">Asigne un precio</label>
                <input placeholder="$ 0.75" type="text" name="precio" id="precio" className="h-9 px-3 py-1 bg-white border-2 border-black rounded-lg w-[140px]" />
            </div>

        </div>
    )
}

export default NuevaEspecialidad
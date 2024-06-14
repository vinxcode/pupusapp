'use client';

import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCurrentUserStore, useProfileStore } from "@/store";
import { transpileModule } from "typescript";

const CreateProfile = () => {

  const router = useRouter();

  const [pupuserias, setPupuserias] = useState<any[] | null>(null)
  const [nombrePupuseria, setNombrePupuseria] = useState('');
  const [direccionPupuseria, setDireccionPupuseria] = useState('')
  const [isSending, setIsSending] = useState(false)
  const updateHasNameAndAddress = useCurrentUserStore((state) => state.updateHasNameAndAddress)
  const updateHasEspecialidades = useCurrentUserStore((state) => state.updateHasEspecialidades)
  const hasNameAndAddress = useCurrentUserStore((state) => state.hasNameAndAddress)
  const hasEspecialidades = useCurrentUserStore((state) => state.hasEspecialidades)
  const currentUser = useCurrentUserStore((state) => state.idUser)
  const updateCurrentUser = useCurrentUserStore((state) => state.updateIdUser)

  const supabase = createClient()

  useEffect(() => {

    if (hasNameAndAddress) {
      if (hasEspecialidades) {
        router.push('./pedidos')
      } else {
        router.push('./escoger-especialidades')
      }
    }

    const getData = async () => {
      const { data } = await supabase.from('profiles').select()
      setPupuserias(data)
      // Profiles are being stored in pupuserias
    }

    getData()
  }, [supabase])



  useEffect(() => {

    const verifyUser = async () => {
      
      const { data: { user } } = await supabase.auth.getUser();
      if (!currentUser) {
        updateCurrentUser(user?.id || "")
      }
    }
    verifyUser()

  }, [pupuserias])


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setIsSending(true)

    if (!pupuserias) {
      console.error('Pupuserias data is not loaded yet');
      console.log(pupuserias)
      return;
    }

    try {
      const response = await fetch('/api/createProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_profile: currentUser,
          nombre_pupuseria: nombrePupuseria,
          direccion_pupuseria: direccionPupuseria
        })
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      console.log('Datos insertados:', data);
    } catch (error) {
      console.error('Error al insertar los datos:', error);
    }

    updateHasNameAndAddress(true)
    router.push('./escoger-especialidades');
    setNombrePupuseria('')
    setDireccionPupuseria('')
  };

  return !isSending ? (
    <section className='flex flex-col items-center animate-in bg-slate-50 rounded-2xl px-14 py-7 shadow-2xl mt-20'>

      <div className="flex flex-col items-center">
        <h1 className='font-leagueSpartan text-3xl font-bold mt-10'>Es hora de crear tu pupuseria</h1>
        <div className='bg-green h-2 rounded-full w-4/5 '></div>

        <form className="flex flex-col font-leagueSpartan p-10 text-black gap-2  w-[500px]" onSubmit={handleSubmit}>
          <label htmlFor="nombre_pupuseria">Cual es el nombre de su pupuseria?</label>
          <input
            type="text"
            name="nombre_pupuseria"
            id="nombre_pupuseria"
            placeholder="Pupuseria El Rinconcito"
            className="border-black rounded-lg border-2 px-5 py-3"
            value={nombrePupuseria}
            onChange={(e) => setNombrePupuseria(e.target.value)}
          />
          <label htmlFor="direccio_pupuseria">Direccion de la pupuseria</label>
          <input
            type="text"
            name="direccion_pupuseria"
            id="direccion_pupuseria"
            placeholder="Avenida duran, casa #5, Ahuiachapan"
            className="border-black rounded-lg border-2 px-5 py-3"
            value={direccionPupuseria}
            onChange={(e) => setDireccionPupuseria(e.target.value)}
          />
          <input
            type="submit"
            value="Crear pupuseria"
            className="bg-green font-semibold py-3 px-10 rounded-lg cursor-pointer hover:opacity-85 transition duration-200 ease-in-out mt-2"
          />
        </form>

      </div></section>
  ) : (
    <div>
      <h2 className="font-leagueSpartan">Guardando datos... </h2>
    </div>
  )
};

export default CreateProfile;
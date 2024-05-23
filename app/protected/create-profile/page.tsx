'use client';

import { createClient } from "@/utils/supabase/client";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

const CreateProfile = () => {

  const router = useRouter();

  const [pupuserias, setPupuserias] = useState<any[] | null>(null)
  const [nombrePupuseria, setNombrePupuseria] = useState('');
  const [direccionPupuseria, setDireccionPupuseria] = useState('')
  const [emailSupabase, setEmailSupabase] = useState('')

  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('pupuserias').select()
      setPupuserias(data)
    }
    const getUserFromSupabase = async () => {
      const { data : { user }} = await supabase.auth.getUser()
      setEmailSupabase(user?.email || "")
    }
    getData()
    getUserFromSupabase()
  }, [supabase])
  

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!pupuserias) {
      console.error('Pupuserias data is not loaded yet');
      return;
    }

    const calculatedID = (pupuserias.length > 0 ? pupuserias[pupuserias.length - 1].id_pupuseria : 0) + 1;

    try {
      const response = await fetch('/api/createProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_pupuseria: calculatedID,
          email_pupuseria: emailSupabase,
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

    setNombrePupuseria('')
    setDireccionPupuseria('')
    // router.push('/protected/escoger-especialidad');

  };

  return (
    <main className='flex flex-col items-center animate-in'>

      <h1 className='font-leagueSpartan text-4xl font-bold mt-10'>Es hora de crear tu pupuseria</h1>
      <div className='bg-green h-2 rounded-full w-full '></div>

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

    </main>
  );
};

export default CreateProfile;
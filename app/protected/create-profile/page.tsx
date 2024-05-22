'use client';

import { useState } from 'react';

const CreateProfile = () => {
  const [nombrePupuseria, setNombrePupuseria] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/createProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_especialidad: 5,
          nombre_especialidad: 'Zanahoria guisada',
          precio_especialidad: 2
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

  };

  return (
    <form className="flex flex-col font-leagueSpartan p-10 text-black gap-2 animate-in" onSubmit={handleSubmit}>
      <label htmlFor="nombre-pupuseria">Cual es el nombre de su pupuseria?</label>
      <input
        type="text"
        name="nombre-pupuseria"
        id="nombre-pupuseria"
        placeholder="Pupuseria El Rinconcito"
        className="border-black border-solid border-1 px-5 py-3"
        value={nombrePupuseria}
        onChange={(e) => setNombrePupuseria(e.target.value)}
      />
      <input
        type="submit"
        value="Crear pupuseria"
        className="bg-green py-3 px-10 rounded-lg cursor-pointer hover:opacity-85"
      />
    </form>
  );
};

export default CreateProfile;
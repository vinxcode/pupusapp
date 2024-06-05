'use client'

import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/client";
import Header from "@/components/Header";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCurrentUserStore, useEspecialidadStore } from "@/store";

export default function Index() {

  const router = useRouter()
  const supabase = createClient()

  const [userSupabase, setUserSupabase] = useState<any>(null)
  const [profiles, setProfiles] = useState<any[] | null>(null)
  const [userIsLoading, setUserIsLoading] = useState(false)
  const [profilesIsLoading, setProfilesIsLoading] = useState(false)
  const currentUser = useCurrentUserStore((state) => state.idUser)
  const setCurrentUser = useCurrentUserStore((state) => state.updateIdUser)
  const fetchEspecialidades = useEspecialidadStore((state) => state.fetchEspecialidades)
  const fetchEspecialidadesPupuseria = useEspecialidadStore((state) => state.fetchEspecialidadesPupuseria)
  const especialidadesP = useEspecialidadStore((state) => state.especialidadesPupuseria)
  const updateHasNameAndAddress = useCurrentUserStore((state) => state.updateHasNameAndAddress)
  const updateHasEspecialidades = useCurrentUserStore((state) => state.updateHasEspecialidades)
  const hasNameAndAddress = useCurrentUserStore((state) => state.hasNameAndAddress)
  const hasEspecialidades = useCurrentUserStore((state) => state.hasEspecialidades)

  useEffect(() => {

    fetchEspecialidades()
    fetchEspecialidadesPupuseria()

    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user?.id) {
        alert(userSupabase.id)
        router.push("/login");
      } else {
        setUserSupabase(user)
        setUserIsLoading(true)
      }

    }

    const getProfiles = async () => {
      const { data } = await supabase.from('profiles').select()
      if (data) {
        setProfiles(data)
        setProfilesIsLoading(true)
      } else {
        console.log('Error catching profiles from supabase')
      }
    }

    getUser()
    getProfiles()

  }, [supabase])

  if (userIsLoading && profilesIsLoading) {
    // VERIFY IF USER HAS PROFILE

    profiles?.forEach(profile => {
      if (profile.id_profile === userSupabase.id) {
        setCurrentUser(userSupabase.id)
        updateHasNameAndAddress(true)

        // VERIFY IF USER HAS ESPECIALIDADES
        especialidadesP?.forEach(especialidad => {
          if (especialidad.id_pupuseria === profile.id_integer) {
            updateHasEspecialidades(true)
          }
        })
      } else {
        return
      }
    })
  }


  return (userIsLoading && profilesIsLoading) && (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center  h-16 bg-yellow">
        <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
          <AuthButton />
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        {
          userSupabase ?
            hasNameAndAddress ?
              hasEspecialidades ?
                <Link href="/protected/pedidos" className="bg-red text-white text-center px-10 py-3 rounded-lg mt-[-70px] 
              font-leagueSpartan font-semibold text-xl hover:opacity-85 transition duration-200 ease-in-out">Ir a pedidos</Link>
                :
                <Link href="/protected/escoger-especialidades" className="bg-red text-white text-center px-10 py-3 rounded-lg mt-[-70px] 
                font-leagueSpartan font-semibold text-xl hover:opacity-85 transition duration-200 ease-in-out">Escoger especialidades</Link>
              :
              <Link href="/protected/create-profile" className="bg-red text-white text-center px-10 py-3 rounded-lg mt-[-70px] 
                font-leagueSpartan font-semibold text-xl hover:opacity-85 transition duration-200 ease-in-out">Configurar perfil</Link>
            :
            <Link href="/login" className="bg-red text-white text-center px-10 py-3 rounded-lg mt-[-70px] font-leagueSpartan 
            font-semibold text-xl hover:opacity-85 transition duration-200 ease-in-out">Comenzar ahora</Link>
        }

        {
          <p>{currentUser}</p>
        }


      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Made with love by by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            vinxcode
          </a>
        </p>
      </footer>
    </div>
  );
}

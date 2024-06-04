'use client'

// import AuthButton from "@/components/AuthButton";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCurrentUserStore } from "@/store";
import { useEffect, useState } from 'react'

export default function ProtectedPage() {

  const supabase = createClient();
  const router = useRouter()

  const currentUser = useCurrentUserStore((state) => state.idUser)
  const setCurrentUser = useCurrentUserStore((state) => state.updateIdUser)
  const [idSupabase, setIdSupabase] = useState('')
  const [profiles, setProfiles] = useState<any[] | null>(null)

  useEffect(() => {

    const getUserFromSupabase = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user?.id) {
        alert(idSupabase)
        router.push("/login");
      } else {
        setIdSupabase(user?.id || "")
      }
    }

    const getProfiles = async () => {
      const { data } = await supabase.from('profiles').select()
      if (data) {
        setProfiles(data)
      } else {
        console.log('Error catching profiles from supabase')
      }
    }

    getUserFromSupabase()
    getProfiles()
  }, [supabase])


  profiles?.forEach(profile => {
    if (profile.id_profile === idSupabase) {
      setCurrentUser(idSupabase)
    } else {
      return
    }
  })

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="w-full">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">

          </div>
        </nav>
      </div>

      <div className="flex flex-col items-center gap-2">
        <h1 className="text-5xl font-leagueSpartan font-bold">Bienvenido a pupusapp</h1>
        <p className="font-leagueSpartan text-lg">Es hora de crear tu pupuseria y personalizarla para que tus cliente puedan reconocerla</p>
        <Link href="/protected/create-profile"
          className="bg-green text-black px-10 py-3 rounded-lg font-semibold hover:bg-opacity-85">Crear pupuseria</Link>
      </div>

      <p>{idSupabase}</p>
      {
        profiles?.map(profile => (
          <h1>{profile.nombre_pupuseria}</h1>
        ))
      }
      <p>{ currentUser }</p>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}

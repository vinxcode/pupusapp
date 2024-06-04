'use client'

import Image from "next/image";
import logo from '@/public/logo-pupusapp.png'
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

export default function Header() {

  const supabase = createClient()

  useEffect(()=> {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
    }
    getUser()
  }, [supabase])

  return (
    <div className="flex flex-col gap-2 items-center">

      <h1 className="sr-only">Supabase and Next.js Starter Template</h1>

      <Image
        src={logo}
        alt="Logo de pupusapp"
        width={400}
        height={75} />

      <p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center font-leagueSpartan text-black">
        Tus pedidos de pupusas facil
      </p>
    </div>
  )
}

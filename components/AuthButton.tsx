'use client'

import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthButton() {

  const router = useRouter()
  const supabase = createClient();

  const [userSupabase, setUserSupabase] = useState<any>(null)

useEffect(()=> {
  const getUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUserSupabase(user)
  }
  getUser()
}, [supabase])


  const signOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return userSupabase ? (
    <div className="flex items-center gap-4">
      Hey, {userSupabase.email}!
      
        <button className="py-2 px-4 rounded-md no-underline border-black border-2"
        onClick={signOut}>
          Logout
        </button>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      Login
    </Link>
  );
}

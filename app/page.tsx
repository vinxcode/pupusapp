import DeployButton from "../components/DeployButton";
import AuthButton from "../components/AuthButton";
import { createClient } from "@/utils/supabase/server";
import ConnectSupabaseSteps from "@/components/tutorial/ConnectSupabaseSteps";
import SignUpUserSteps from "@/components/tutorial/SignUpUserSteps";
import Header from "@/components/Header";
import Link from "next/link";

export default async function Index() {
  
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center  h-16 bg-yellow">
        <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm">
          <AuthButton/>
        </div>
      </nav>

      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
        <Header />
        <Link href="/login" className="bg-red text-white text-center px-10 py-3 rounded-lg mt-[-70px] font-leagueSpartan font-semibold text-xl">Comenzar ahora</Link>
        
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

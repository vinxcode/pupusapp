import { create } from 'zustand'
import { createClient } from "@/utils/supabase/client";

const supabase = createClient()

type Profile = {
    id_profile: string,
    nombre_pupuseria: string,
    direccion_pupuseria: string
}

type ProfileStore = {
    profiles: Profile[],
    fetchProfiles: () => Promise<void>
}

const useProfileStore = create<ProfileStore>((set) => ({
    profiles: [],
    fetchProfiles: async () => {
        const { data, error } = await supabase
            .from<Profile>('profiles')
            .select('*');

        if (error) {
            console.error("Error fetching data: ", error);
        } else {
            set({ profiles: data });
        }
    }
})) 

export default useProfileStore
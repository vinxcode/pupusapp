import { createClient } from '@supabase/supabase-js';

const supabaseUrl: any = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey: any = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: any) {
    const { id_especialidad, nombre_especialidad, precio_especialidad } = await request.json();

    try {
        const { data, error } = await supabase
            .from('especialidades')
            .insert([{ id_especialidad, nombre_especialidad, precio_especialidad }]);

        if (error) {
            throw error;
        }

        return new Response(JSON.stringify({ data }), { status: 200 });
    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
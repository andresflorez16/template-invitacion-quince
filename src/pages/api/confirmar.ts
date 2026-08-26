import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

// Marcar esta ruta como server-rendered
export const prerender = false;

// En las API routes de Astro, usamos process.env para variables del servidor
const supabaseUrl = process.env.SUPABASE_URL || import.meta.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || import.meta.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan variables de entorno de Supabase. Asegúrate de que SUPABASE_URL y SUPABASE_PUBLISHABLE_KEY estén definidas.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

export const POST: APIRoute = async ({ request }) => {
  try {
    // Obtener el texto raw primero
    const text = await request.text();
    
    // Validar que no esté vacío
    if (!text) {
      return new Response(
        JSON.stringify({ error: 'Body vacío' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Parsear el JSON
    const body = JSON.parse(text);
    
    const { nombre, telefono, num_acompanantes } = body;

    // Validar datos
    if (!nombre || !telefono || num_acompanantes === undefined) {
      return new Response(
        JSON.stringify({ error: 'Faltan datos requeridos' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Insertar en Supabase
    const { data, error } = await supabase
      .from('confirmaciones')
      .insert([
        {
          nombre,
          telefono,
          num_acompanantes: parseInt(num_acompanantes),
        },
      ])
      .select();

    if (error) {
      console.error('Error de Supabase:', error);
      return new Response(
        JSON.stringify({ error: 'Error al guardar la confirmación' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: 'Error interno del servidor' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

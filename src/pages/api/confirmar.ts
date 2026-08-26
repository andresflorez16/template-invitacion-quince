import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

// Marcar esta ruta como server-rendered
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    // Inicializar Supabase dentro de la función
    const supabaseUrl = process.env.SUPABASE_URL || import.meta.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || import.meta.env.SUPABASE_PUBLISHABLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Variables de Supabase no encontradas');
      return new Response(
        JSON.stringify({ error: 'Configuración de base de datos no disponible' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

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

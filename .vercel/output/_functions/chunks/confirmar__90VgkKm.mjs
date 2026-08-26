import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/api/confirmar.ts
var confirmar_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var supabaseUrl = process.env.SUPABASE_URL || "https://akqdzefglmqhotpyzdnf.supabase.co";
var supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_n7V-D1v0vNKZYbf5ImhqaQ_rAauc5Gb";
if (!supabaseUrl || !supabaseKey) throw new Error("Faltan variables de entorno de Supabase. Asegúrate de que SUPABASE_URL y SUPABASE_PUBLISHABLE_KEY estén definidas.");
var supabase = createClient(supabaseUrl, supabaseKey);
var POST = async ({ request }) => {
	try {
		const text = await request.text();
		if (!text) return new Response(JSON.stringify({ error: "Body vacío" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const { nombre, telefono, num_acompanantes } = JSON.parse(text);
		if (!nombre || !telefono || num_acompanantes === void 0) return new Response(JSON.stringify({ error: "Faltan datos requeridos" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const { data, error } = await supabase.from("confirmaciones").insert([{
			nombre,
			telefono,
			num_acompanantes: parseInt(num_acompanantes)
		}]).select();
		if (error) {
			console.error("Error de Supabase:", error);
			return new Response(JSON.stringify({ error: "Error al guardar la confirmación" }), {
				status: 500,
				headers: { "Content-Type": "application/json" }
			});
		}
		return new Response(JSON.stringify({
			success: true,
			data
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error:", error);
		return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/confirmar@_@ts
var page = () => confirmar_exports;
//#endregion
export { page };

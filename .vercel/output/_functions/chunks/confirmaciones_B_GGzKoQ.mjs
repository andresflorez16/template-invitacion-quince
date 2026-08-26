import { r as __exportAll } from "./rolldown-runtime_BMI-E3GI.mjs";
import { d as renderHead, l as renderTemplate } from "./server_CfX5a0ad.mjs";
import { t as createComponent } from "./compiler_scW6R_dq.mjs";
import { createClient } from "@supabase/supabase-js";
//#region src/pages/confirmaciones.astro
var confirmaciones_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Confirmaciones,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
var $$Confirmaciones = createComponent(async ($$result, $$props, $$slots) => {
	const supabaseUrl = process.env.SUPABASE_URL || "https://akqdzefglmqhotpyzdnf.supabase.co";
	const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY || "sb_publishable_n7V-D1v0vNKZYbf5ImhqaQ_rAauc5Gb";
	if (!supabaseUrl || !supabaseKey) throw new Error("Faltan variables de entorno de Supabase");
	const { data: confirmaciones, error } = await createClient(supabaseUrl, supabaseKey).from("confirmaciones").select("*").order("created_at", { ascending: false });
	const totalConfirmaciones = confirmaciones?.length || 0;
	const totalPersonas = confirmaciones?.reduce((sum, c) => sum + c.num_acompanantes + 1, 0) || 0;
	return renderTemplate`<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Confirmaciones - Quinceañera</title><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Lato:wght@300;400;700&display=swap" rel="stylesheet">${renderHead($$result)}</head><body><main class="confirmaciones"><div class="container"><header class="header"><h1 class="header__title">Confirmaciones de Asistencia</h1><div class="header__stats"><div class="stat"><span class="stat__number">${totalConfirmaciones}</span><span class="stat__label">Confirmaciones</span></div><div class="stat"><span class="stat__number">${totalPersonas}</span><span class="stat__label">Personas en total</span></div></div></header>${error ? renderTemplate`<div class="error"><p>Error al cargar las confirmaciones: ${error.message}</p></div>` : confirmaciones && confirmaciones.length > 0 ? renderTemplate`<div class="table-wrapper"><table class="table"><thead><tr><th>Nombre</th><th>Teléfono</th><th>Acompañantes</th><th>Total Personas</th><th>Fecha</th></tr></thead><tbody>${confirmaciones.map((confirmacion) => renderTemplate`<tr><td class="table__name">${confirmacion.nombre}</td><td class="table__phone">${confirmacion.telefono}</td><td class="table__companions">${confirmacion.num_acompanantes}</td><td class="table__total">${confirmacion.num_acompanantes + 1}</td><td class="table__date">${new Date(confirmacion.created_at).toLocaleDateString("es-ES", {
		year: "numeric",
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	})}</td></tr>`)}</tbody></table></div>` : renderTemplate`<div class="empty"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="empty__icon"><path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89317 18.7122 8.75608 18.1676 9.45768C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg><p class="empty__message">No hay confirmaciones aún</p></div>`}<div class="actions"><a href="/" class="btn-back"><svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>Volver a la invitación</a></div></div></main></body></html>`;
}, "/Users/andrew/Dev/personal/invitacion-quince/src/pages/confirmaciones.astro", void 0);
var $$file = "/Users/andrew/Dev/personal/invitacion-quince/src/pages/confirmaciones.astro";
var $$url = "/confirmaciones";
//#endregion
//#region \0virtual:astro:page:src/pages/confirmaciones@_@astro
var page = () => confirmaciones_exports;
//#endregion
export { page };

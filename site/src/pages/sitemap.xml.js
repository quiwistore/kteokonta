import stathmoi from '../data/stathmoi.json';
import { odigos } from '../data/odigos.js';
const BASE = 'https://kteokonta.com';
export function GET() {
  const rutas = ['/', '/stathmoi/', '/odigos/', '/sxetika/', '/epikoinonia/', '/aporrito/'];
  for (const g of odigos) rutas.push(`/${g.slug}/`);
  const set = { eno: new Set(), reg: new Set() };
  for (const s of stathmoi) {
    rutas.push(`/kteo/${s.slug}/`);
    set.eno.add(s.enotitaSlug); set.reg.add(s.regionSlug);
  }
  for (const e of set.eno) rutas.push(`/periochi/${e}/`);
  for (const r of set.reg) rutas.push(`/periferia/${r}/`);
  const unicas = [...new Set(rutas)];
  const hoy = new Date().toISOString().split('T')[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    unicas.map(r => `<url><loc>${BASE}${r}</loc><lastmod>${hoy}</lastmod></url>`).join('\n') + `\n</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}

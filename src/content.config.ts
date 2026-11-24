import { defineCollection } from 'astro:content';
import { file } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Colecciones editables del sitio (src/data/*.json).
 * Si algo no cumple el formato, `pnpm build` falla y dice qué campo está mal.
 */

const fuente = z.object({
  medio: z.string(),
  titulo: z.string().optional(),
  url: z.string().url(),
});

const coplas = defineCollection({
  loader: file('src/data/coplas.json'),
  schema: z.object({
    id: z.string(),
    tema: z.enum(['invitación', 'picardía', 'contrapunto', 'amor', 'despedida', 'cajamarca']),
    versos: z.array(z.string()).min(3).max(6),
    /** Cómo se canta: cada verso dos veces (lo normal) o cada par de versos. Marca el «bis». */
    repite: z.enum(['verso', 'par']).default('verso'),
    /** tradicional: recogida de una fuente; inedita: escrita para este sitio. */
    origen: z.enum(['tradicional', 'inedita']),
    fuente: fuente.optional(),
    nota: z.string().optional(),
  }),
});

const glosario = defineCollection({
  loader: file('src/data/glosario.json'),
  schema: z.object({
    id: z.string(),
    palabra: z.string(),
    significado: z.string(),
    ejemplo: z.string().optional(),
    origen: z.string().optional(),
    categoria: z.enum(['habla', 'exclamación', 'fiesta']),
  }),
});

const frases = defineCollection({
  loader: file('src/data/frases.json'),
  schema: z.object({
    id: z.string(),
    frase: z.string(),
    explicacion: z.string(),
    tipo: z.enum(['grito', 'lema de barrio', 'verso popular', 'dicho']),
  }),
});

const ediciones = defineCollection({
  loader: file('src/data/ediciones.json'),
  schema: z.object({
    id: z.string(),
    anio: z.number().int(),
    nombre: z.string().optional(),
    estado: z.enum(['realizado', 'suspendido']),
    resumen: z.string(),
    reina: z.object({ nombre: z.string(), barrio: z.string(), nota: z.string().optional() }).optional(),
    cifras: z.array(z.object({ valor: z.string(), texto: z.string() })).default([]),
    hechos: z.array(z.string()).min(1),
    fuentes: z.array(fuente).min(1),
    color: z.enum(['fucsia', 'amarillo', 'verde', 'azul', 'naranja', 'turquesa']),
  }),
});

export const collections = { coplas, glosario, frases, ediciones };

/**
 * Instalar la web como app. Una sola fuente de verdad para todos los botones
 * (el flotante de Base.astro y el de /2027/): el aviso del navegador solo llega
 * una vez por página y se puede usar una sola vez, así que se guarda aquí.
 * navigator.install() es la API nueva; beforeinstallprompt, la de Chrome y Edge.
 */

interface AvisoInstalacion extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const instalarNuevo = (navigator as Navigator & { install?: () => Promise<void> }).install;
let aviso: AvisoInstalacion | undefined;
let instalada =
  matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
const oyentes = new Set<() => void>();
const avisar = () => oyentes.forEach((f) => f());

addEventListener('beforeinstallprompt', (evento) => {
  evento.preventDefault();
  aviso = evento as AvisoInstalacion;
  avisar();
});

addEventListener('appinstalled', () => {
  instalada = true;
  aviso = undefined;
  avisar();
});

/** Verdadero si hay una forma de instalar ahora mismo. */
export const disponible = () => !instalada && (typeof instalarNuevo === 'function' || aviso !== undefined);

/** Verdadero si la web ya se abrió desde el ícono instalado. */
export const yaInstalada = () => instalada;

/** Avisa cada vez que cambia lo disponible (y una vez al registrarse). */
export function alCambiar(oyente: () => void) {
  oyentes.add(oyente);
  oyente();
}

export type Resultado = 'instalada' | 'cancelada' | 'error';

/** Debe llamarse dentro del clic: si se demora, el navegador ya no lo permite. */
export async function instalar(): Promise<Resultado> {
  try {
    if (typeof instalarNuevo === 'function') {
      await instalarNuevo.call(navigator);
      instalada = true;
    } else if (aviso) {
      // El aviso sirve una sola vez
      const este = aviso;
      aviso = undefined;
      await este.prompt();
      const { outcome } = await este.userChoice;
      if (outcome !== 'accepted') return 'cancelada';
      instalada = true;
    } else {
      return 'error';
    }
    avisar();
    return 'instalada';
  } catch (error) {
    avisar();
    if (error instanceof DOMException && error.name === 'AbortError') return 'cancelada';
    console.error(error);
    return 'error';
  }
}

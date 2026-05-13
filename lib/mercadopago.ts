import { MercadoPagoConfig } from 'mercadopago';

/**
 * Gestor de Credenciales de Mercado Pago por Unidad de Negocio
 */
export type BusinessUnit = 'BIOS' | 'EVENTOS' | 'ARTURO';

export function getMercadoPagoClient(unit: BusinessUnit = 'BIOS') {
  let accessToken = '';

  switch (unit) {
    case 'BIOS':
      accessToken = process.env.MP_BIOS_ACCESS_TOKEN || process.env.MP_ACCESS_TOKEN || '';
      break;
    case 'EVENTOS':
      accessToken = process.env.MP_EVENTOS_ACCESS_TOKEN || '';
      break;
    case 'ARTURO':
      accessToken = process.env.MP_ARTURO_ACCESS_TOKEN || '';
      break;
  }

  if (!accessToken) {
    console.warn(`⚠️ No se encontró Access Token para la unidad: ${unit}`);
  }

  return new MercadoPagoConfig({ accessToken });
}

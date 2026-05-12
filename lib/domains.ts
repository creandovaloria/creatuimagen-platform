/**
 * Librería para la gestión de dominios vía Namecheap API
 * Permite buscar, comprar y configurar DNS automáticamente.
 */

const NAMECHEAP_API_USER = process.env.NAMECHEAP_API_USER;
const NAMECHEAP_API_KEY = process.env.NAMECHEAP_API_KEY;
const NAMECHEAP_CLIENT_IP = process.env.NAMECHEAP_CLIENT_IP;
const IS_SANDBOX = process.env.NAMECHEAP_IS_SANDBOX === 'true';

const BASE_URL = IS_SANDBOX 
  ? 'https://api.sandbox.namecheap.com/xml.response'
  : 'https://api.namecheap.com/xml.response';

/**
 * Verifica si un dominio está disponible para compra
 */
export async function checkDomainAvailability(domainName: string) {
  const params = new URLSearchParams({
    ApiUser: NAMECHEAP_API_USER!,
    ApiKey: NAMECHEAP_API_KEY!,
    UserName: NAMECHEAP_API_USER!,
    ClientIp: NAMECHEAP_CLIENT_IP!,
    Command: 'namecheap.domains.check',
    DomainList: domainName,
  });

  try {
    const response = await fetch(`${BASE_URL}?${params.toString()}`);
    const xmlText = await response.text();
    // Aquí procesaremos el XML de respuesta de Namecheap
    return { xml: xmlText }; 
  } catch (error) {
    console.error('Error checking domain:', error);
    throw error;
  }
}

/**
 * Configura los DNS del dominio para apuntar a Vercel
 * IP de Vercel: 76.76.21.21
 */
export async function setupVercelDNS(domainName: string) {
  const [sld, tld] = domainName.split('.');
  const params = new URLSearchParams({
    ApiUser: NAMECHEAP_API_USER!,
    ApiKey: NAMECHEAP_API_KEY!,
    UserName: NAMECHEAP_API_USER!,
    ClientIp: NAMECHEAP_CLIENT_IP!,
    Command: 'namecheap.domains.dns.setCustom',
    SLD: sld,
    TLD: tld,
    NameServerList: 'ns1.vercel-dns.com,ns2.vercel-dns.com', // O usar registros A
  });

  try {
    const response = await fetch(`${BASE_URL}?${params.toString()}`);
    return await response.text();
  } catch (error) {
    console.error('Error setting DNS:', error);
    throw error;
  }
}

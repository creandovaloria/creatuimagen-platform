import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const domain = searchParams.get('domain')

  if (!domain) {
    return NextResponse.json({ error: 'Domain is required' }, { status: 400 })
  }

  // Credenciales de Sandbox (solo para desarrollo/pruebas)
  const API_USER = 'creandovaloria'
  const API_KEY = '55a955be472441beb0f13d47db3364fd'
  const CLIENT_IP = '189.180.123.18'
  const BASE_URL = 'https://api.sandbox.namecheap.com/xml.response'

  const params = new URLSearchParams({
    ApiUser: API_USER,
    ApiKey: API_KEY,
    UserName: API_USER,
    ClientIp: CLIENT_IP,
    Command: 'namecheap.domains.check',
    DomainList: domain,
  })

  try {
    const response = await fetch(`${BASE_URL}?${params.toString()}`)
    const xmlText = await response.text()
    
    // Parseo simple del XML de Namecheap
    const isAvailable = xmlText.includes('IsAvailable="true"')
    
    // Precios estimados para Sandbox
    const basePrice = 12.50
    const margin = 5.00

    return NextResponse.json({
      domain,
      available: isAvailable,
      price: basePrice + margin,
      currency: 'USD'
    })
  } catch (error) {
    console.error('Namecheap API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch from Namecheap' }, { status: 500 })
  }
}

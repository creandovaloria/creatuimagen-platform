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
  const CLIENT_IP = '3.87.42.13'
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
    
    console.log('--- Namecheap RAW Response ---')
    console.log(xmlText)
    console.log('------------------------------')

    // Parseo del XML de Namecheap
    const isAvailable = xmlText.includes('IsAvailable="true"')
    const hasError = xmlText.includes('<Error')
    const errorMsg = hasError ? xmlText.match(/<Error.*?>(.*?)<\/Error>/)?.[1] : null

    return NextResponse.json({
      domain,
      available: isAvailable,
      price: 17.50,
      error: errorMsg
    })
  } catch (error) {
    console.error('Namecheap API Error:', error)
    return NextResponse.json({ error: 'Failed to fetch from Namecheap' }, { status: 500 })
  }
}

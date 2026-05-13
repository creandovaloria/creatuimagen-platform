import { Preference } from 'mercadopago';
import { NextResponse } from 'next/server';
import { getMercadoPagoClient } from '@/lib/mercadopago';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const client = getMercadoPagoClient('BIOS');
    const { nombre, email, slug } = await request.json();

    const preference = new Preference(client);
    
    const result = await preference.create({
      body: {
        items: [
          {
            id: 'bio-pro-anual',
            title: 'Perfil Digital Bio Pro (1 año)',
            quantity: 1,
            unit_price: 299, // Precio en MXN
            currency_id: 'MXN',
          }
        ],
        payer: {
          name: nombre,
          email: email,
        },
        back_urls: {
          success: `${process.env.NEXT_PUBLIC_URL || 'https://bios.creatuimagen.online'}/registro/exito?slug=${slug}`,
          failure: `${process.env.NEXT_PUBLIC_URL || 'https://bios.creatuimagen.online'}/registro?error=pago-fallido`,
          pending: `${process.env.NEXT_PUBLIC_URL || 'https://bios.creatuimagen.online'}/registro/pendiente`,
        },
        auto_return: 'approved',
        metadata: {
          slug,
          email,
          nombre
        }
      }
    });

    return NextResponse.json({ id: result.id, init_point: result.init_point });
  } catch (error: any) {
    console.error('Error creando preferencia MP:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

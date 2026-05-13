import { NextResponse } from 'next/server';
import { getMercadoPagoClient } from '@/lib/mercadopago';
import { Payment } from 'mercadopago';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { sendWelcomeEmail, sendAdminNotification } from '@/lib/email';

const client = getMercadoPagoClient('BIOS');

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, data } = body;

    // Solo nos interesan los pagos
    if (type === 'payment') {
      const payment = new Payment(client);
      const paymentData = await payment.get({ id: data.id });

      // Verificamos que el pago esté aprobado
      if (paymentData.status === 'approved') {
        const { slug, email, nombre } = paymentData.metadata;

        // 1. Crear el perfil en Supabase
        const { error: dbError } = await supabaseAdmin
          .from('perfiles')
          .insert({
            nombre,
            email,
            slug,
            activo: true,
            // Valores por defecto
            rol: 'Usuario Pro',
            primary_color: '#2563eb'
          });

        if (dbError) {
          console.error('Error insertando en Supabase:', dbError);
          return NextResponse.json({ error: 'DB Error' }, { status: 500 });
        }

        // 2. Enviar Emails
        await sendWelcomeEmail({ nombre, slug, email });
        await sendAdminNotification({ nombre, slug, email });

        console.log(`✅ Perfil ${slug} activado con éxito.`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

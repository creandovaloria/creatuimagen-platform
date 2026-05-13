import { NextResponse } from 'next/server';
import { getMercadoPagoClient } from '@/lib/mercadopago';
import { Payment } from 'mercadopago';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { sendWelcomeEmail, sendAdminNotification } from '@/lib/email';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    if (!supabase) return NextResponse.json({ error: 'System not ready' }, { status: 503 });
    
    const client = getMercadoPagoClient('BIOS');
    const body = await request.json();
    const { type, data } = body;

    // Solo nos interesan los pagos
    if (type === 'payment') {
      try {
        const payment = new Payment(client);
        const paymentData = await payment.get({ id: data.id });

        // Verificamos que el pago esté aprobado
        if (paymentData && paymentData.status === 'approved') {
          const { slug, email, nombre, whatsapp } = paymentData.metadata || {};
        
        console.log('📦 Datos recibidos del pago:', { slug, email, nombre, whatsapp });

        if (!slug || !email) {
          console.error('❌ Error: El pago no contiene metadata (slug/email)');
          return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
        }

        // 1. Crear el perfil en Supabase con los nombres de columna EXACTOS
        const { error: dbError } = await supabase
          .from('perfiles')
          .insert({
            nombre: nombre || email.split('@')[0],
            email,
            slug,
            activo: true,
            rol: 'Usuario Pro',
            theme_primary: '#2563eb', // Nombre correcto de la columna
            theme_accent: '#4ade80',  // Nombre correcto de la columna
            whatsapp: whatsapp || ''
          });

        if (dbError) {
          console.error('Error insertando en Supabase:', dbError);
          return NextResponse.json({ error: 'DB Error' }, { status: 500 });
        }

        // 2. Enviar Emails
        await sendWelcomeEmail({ nombre, slug, email, unit: 'BIOS' });
        await sendAdminNotification({ nombre, slug, email, whatsapp, unit: 'BIOS' });

        console.log(`✅ Perfil ${slug} activado con éxito.`);
      }
    } catch (error) {
      console.error('⚠️ Pago no encontrado o error en MP:', data.id);
      // Respondemos 200 para que MP deje de reintentar notificaciones fallidas de prueba
      return NextResponse.json({ received: true, status: 'not_found' });
    }
  }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

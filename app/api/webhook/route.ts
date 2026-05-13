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
        const paymentId = data.id;
        let paymentData;

        // MODO PRUEBA: Si el ID es de prueba, inyectamos datos ficticios para validar el CRM
        if (paymentId.toString().startsWith('TEST_PAYMENT')) {
          const uniqueId = Math.floor(Math.random() * 1000);
          paymentData = {
            status: 'approved',
            transaction_amount: 950,
            metadata: {
              email: 'rafart.barrios@gmail.com',
              nombre: 'Arturo Barrios Test',
              whatsapp: '5512345678',
              slug: `test-crm-${uniqueId}`
            }
          };
          console.log('🧪 MODO PRUEBA ACTIVADO:', paymentData.metadata.slug);
        } else {
          const payment = new Payment(client);
          paymentData = await payment.get({ id: paymentId });
        }

        // Verificamos que el pago esté aprobado
        if (paymentData && paymentData.status === 'approved') {
          const { slug, email, nombre, whatsapp } = paymentData.metadata || {};
        
          console.log('📦 Datos recibidos del pago:', { slug, email, nombre, whatsapp });

          if (!slug || !email) {
            console.error('❌ Error: El pago no contiene metadata (slug/email)');
            return NextResponse.json({ error: 'Missing metadata' }, { status: 400 });
          }

          // 1. Identificar o Registrar al Cliente en el CRM
          const { data: cliente, error: clienteError } = await supabase
            .schema('crm')
            .from('clientes')
            .upsert(
              { email, nombre: nombre || email.split('@')[0], telefono: whatsapp || null, origen: 'creatuimagen-bio' },
              { onConflict: 'email' }
            )
            .select('id')
            .single();

          if (clienteError) {
            console.error('❌ Error gestionando cliente en CRM:', clienteError);
          }

          // 2. Crear el perfil en Supabase (VINCULADO AL CLIENTE)
          const { error: dbError } = await supabase
            .from('perfiles')
            .insert({
              nombre: nombre || email.split('@')[0],
              email,
              slug,
              whatsapp: whatsapp || null,
              activo: true,
              rol: 'cliente',
              cliente_id: cliente?.id || null
            });

          if (dbError) {
            console.error('❌ Error creando perfil:', dbError.message);
            throw new Error(`DB Error: ${dbError.message}`);
          }

          // 3. Registrar la Venta en el CRM
          const { error: ventaError } = await supabase
            .schema('crm')
            .from('ventas')
            .insert({
              cliente_id: cliente?.id,
              producto: 'Bio Profile',
              monto: paymentData.transaction_amount || 0,
              metodo_pago: 'mercadopago',
              referencia: data.id.toString(),
              vendedor: 'Sistema',
              canal_venta: 'Web',
              titulo_conceptual: `Compra Automática: ${slug}`
            });

          if (ventaError) {
            console.error('❌ Error registrando venta en CRM:', ventaError);
          }

          // 4. Enviar Emails
          await sendWelcomeEmail({ nombre, slug, email, unit: 'BIOS' });
          await sendAdminNotification({ nombre, slug, email, whatsapp, unit: 'BIOS' });

          console.log(`✅ Perfil ${slug} y Venta registrados con éxito.`);
        }
      } catch (error: any) {
        console.error('⚠️ Webhook Processing Error:', error.message);
        return NextResponse.json({ 
          received: true, 
          status: 'error',
          message: error.message 
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error('Webhook Global Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

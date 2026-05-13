import { Resend } from 'resend';

type BusinessUnit = 'BIOS' | 'EVENTOS' | 'ARTURO';

function getResendClient(unit: BusinessUnit = 'BIOS') {
  let apiKey = '';
  let fromEmail = '';

  switch (unit) {
    case 'BIOS':
      apiKey = process.env.RESEND_CREA_TU_IMAGEN_API_KEY || process.env.RESEND_API_KEY || '';
      fromEmail = 'Crea Tu Imagen - Bios <bienvenida@creatuimagen.online>'; 
      break;
    case 'EVENTOS':
      apiKey = process.env.RESEND_CREA_TU_IMAGEN_API_KEY || '';
      fromEmail = 'Crea Tu Imagen - Eventos <hola@creatuimagen.online>';
      break;
    case 'ARTURO':
      apiKey = process.env.RESEND_ARTURO_API_KEY || '';
      fromEmail = 'Arturo Barrios - IA <ia@arturobarrios.com>';
      break;
  }

  return { client: new Resend(apiKey), from: fromEmail };
}

interface WelcomeEmailProps {
  nombre: string;
  slug: string;
  email: string;
  unit?: BusinessUnit;
}

export async function sendWelcomeEmail({ nombre, slug, email, unit = 'BIOS' }: WelcomeEmailProps) {
  try {
    const { client, from } = getResendClient(unit);
    
    const data = await client.emails.send({
      from: from, 
      to: email,
      subject: '¡Tu Bio Profesional ya está lista! 🚀',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 20px; padding: 40px; color: #333;">
          <h1 style="color: #2563eb; font-size: 24px; font-weight: 900;">¡Hola ${nombre}!</h1>
          <p style="font-size: 16px; line-height: 1.6;">Gracias por confiar en <b>Crea Tu Imagen</b>. Tu tarjeta digital ya está activa y lista para que la compartas con el mundo.</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 15px; margin: 30px 0; text-align: center;">
            <p style="margin: 0 0 10px 0; font-size: 14px; color: #64748b;">Tu link personal:</p>
            <a href="https://bios.creatuimagen.online/${slug}" style="font-size: 20px; font-weight: bold; color: #2563eb; text-decoration: none;">bios.creatuimagen.online/${slug}</a>
          </div>

          <p style="font-size: 14px; color: #64748b;">Puedes entrar a editar tu perfil en cualquier momento desde nuestro panel de administración.</p>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;">
          <p style="font-size: 12px; color: #94a3b8; text-align: center;">© 2026 Creando Valor IA</p>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error enviando email:', error);
    return { success: false, error };
  }
}

export async function sendAdminNotification({ nombre, email, slug, unit = 'BIOS' }: WelcomeEmailProps) {
  try {
    const { client, from } = getResendClient(unit);
    const salesEmail = from.replace('bienvenida', 'ventas').replace('hola', 'ventas');

    await client.emails.send({
      from: salesEmail,
      to: 'creandovaloria@gmail.com',
      subject: '💰 ¡Nueva Venta! - Crea Tu Imagen',
      html: `
        <h2>¡Acabas de vender una Bio!</h2>
        <p><b>Cliente:</b> ${nombre}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Slug:</b> ${slug}</p>
        <p><b>Unidad:</b> ${unit}</p>
      `,
    });
  } catch (error) {
    console.error('Error enviando notificación admin:', error);
  }
}

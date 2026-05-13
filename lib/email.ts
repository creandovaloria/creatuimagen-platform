import { Resend } from 'resend';

/**
 * Gestor de Emails por Unidad de Negocio (Resend)
 */
export type BusinessUnit = 'BIOS' | 'EVENTOS' | 'ARTURO';

function getResendClient(unit: BusinessUnit = 'BIOS') {
  let apiKey = '';
  let fromEmail = '';

  switch (unit) {
    case 'BIOS':
    case 'EVENTOS':
      apiKey = process.env.RESEND_CREA_TU_IMAGEN_API_KEY || '';
      fromEmail = 'Crea Tu Imagen <bienvenida@creatuimagen.online>';
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
      subject: `¡Tu Bio ya está reservada, ${nombre}! 🚀`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #f1f5f9; border-radius: 24px; padding: 40px; color: #1e293b; background: white;">
          <div style="text-align: center; margin-bottom: 30px;">
            <div style="background: #2563eb; color: white; width: 60px; height: 60px; line-height: 60px; border-radius: 18px; display: inline-block; font-size: 32px; font-weight: 900; font-style: italic;">B</div>
          </div>

          <h1 style="color: #0f172a; font-size: 26px; font-weight: 900; text-align: center; margin-bottom: 10px;">¡Hola ${nombre}! 🚀</h1>
          <p style="font-size: 16px; line-height: 1.6; text-align: center; color: #64748b;">Tu pago ha sido confirmado y tu link personal ha sido reservado con éxito.</p>
          
          <div style="background: #f8fafc; padding: 24px; border-radius: 20px; margin: 30px 0; text-align: center; border: 1px dashed #e2e8f0;">
            <p style="margin: 0 0 8px 0; font-size: 12px; font-weight: bold; color: #94a3b8; text-transform: uppercase; tracking: 0.1em;">Tu link es:</p>
            <a href="https://bios.creatuimagen.online/${slug}" style="font-size: 22px; font-weight: 800; color: #2563eb; text-decoration: none;">bios.creatuimagen.online/${slug}</a>
          </div>

          <p style="font-size: 16px; font-weight: 600; color: #0f172a; margin-top: 30px;">Próximo paso: Personalización</p>
          <p style="font-size: 14px; line-height: 1.6; color: #64748b; margin-bottom: 24px;">Ahora solo falta que subas tu foto y agregues tus redes sociales para que tu Bio se vea increíble.</p>
          
          <a href="https://bios.creatuimagen.online/admin/perfiles/${slug}" 
             style="display: block; background: #2563eb; color: white; padding: 20px; border-radius: 16px; text-decoration: none; text-align: center; font-weight: bold; font-size: 16px; box-shadow: 0 10px 15px -3px rgba(37, 99, 235, 0.2);">
            Personalizar mi Perfil ahora
          </a>

          <div style="margin-top: 40px; padding-top: 30px; border-top: 1px solid #f1f5f9; text-align: center;">
            <p style="font-size: 12px; color: #94a3b8; margin: 0;">¿Alguna duda? Responde a este correo y te ayudaremos.</p>
            <p style="font-size: 12px; color: #cbd5e1; margin-top: 10px; font-weight: bold;">CREA TU IMAGEN .</p>
          </div>
        </div>
      `,
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error enviando email de bienvenida:', error);
    return { success: false, error };
  }
}

export async function sendAdminNotification({ nombre, slug, email, unit = 'BIOS' }: { nombre: string, slug: string, email: string, unit?: BusinessUnit }) {
  try {
    const { client, from } = getResendClient(unit);
    
    await client.emails.send({
      from: from,
      to: 'creandovalor.ia@gmail.com',
      subject: `💰 ¡Nueva Venta! - ${nombre}`,
      html: `
        <h2>¡Tenemos un nuevo cliente!</h2>
        <p><b>Nombre:</b> ${nombre}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>URL:</b> bios.creatuimagen.online/${slug}</p>
      `,
    });
  } catch (error) {
    console.error('Error enviando notificación admin:', error);
  }
}

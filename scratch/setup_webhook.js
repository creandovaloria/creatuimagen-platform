const fetch = require('node-fetch');

const ACCESS_TOKEN = 'APP_USR-6795360745009030-051221-146ba117193fc661a7d28a55ba16fcc5-3355880913';
const WEBHOOK_URL = 'https://bios.creatuimagen.online/api/webhook';

async function setupWebhook() {
  console.log('🚀 Configurando Webhook en Mercado Pago...');
  
  try {
    const response = await fetch('https://api.mercadopago.com/v1/notifications/test', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        url: WEBHOOK_URL
      })
    });

    const data = await response.json();
    console.log('📦 Respuesta de MP:', data);

    if (response.ok) {
      console.log('✅ Webhook configurado con éxito!');
    } else {
      console.log('❌ Error al configurar. Es posible que debas hacerlo manual en el dashboard.');
    }
  } catch (error) {
    console.error('💥 Error fatal:', error);
  }
}

setupWebhook();

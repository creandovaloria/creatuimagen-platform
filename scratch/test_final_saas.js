async function testFinalSaaS() {
  console.log('🚀 Iniciando Prueba de Fuego SaaS (CRM + Ventas + Perfiles)...');

  const testPayload = {
    type: 'payment',
    data: {
      id: 'TEST_PAYMENT_' + Date.now()
    }
  };

  // Simulamos los datos que Mercado Pago devolvería
  // NOTA: Para que esto funcione en local, el webhook debe estar preparado para IDs de prueba
  // o podemos llamar directamente a la lógica si estuviéramos en un test unitario.
  // Pero aquí llamaremos al endpoint real.
  
  const targetUrl = 'http://localhost:3000/api/webhook';
  
  console.log(`📡 Enviando notificación a: ${targetUrl}`);
  
  try {
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testPayload)
    });

    const result = await response.json();
    console.log('📥 Respuesta del servidor:', result);

    if (result.received) {
      console.log('\n✅ Notificación recibida.');
      console.log('👉 PRÓXIMO PASO: Revisa tu Supabase Dashboard:');
      console.log('1. Tabla crm.clientes -> Debe haber un registro nuevo o actualizado.');
      console.log('2. Tabla crm.ventas   -> Debe haber una venta de $950 vinculada.');
      console.log('3. Tabla public.perfiles -> El perfil debe tener el cliente_id correcto.');
    } else {
      console.log('⚠️ El servidor recibió el aviso pero algo no cuadró (quizás el ID de prueba).');
    }
  } catch (error) {
    console.error('❌ Error de conexión:', error.message);
    console.log('💡 Asegúrate de que el servidor esté corriendo con: npm run dev');
  }
}

testFinalSaaS();

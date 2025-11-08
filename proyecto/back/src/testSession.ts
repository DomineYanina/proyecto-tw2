import jwt from 'jsonwebtoken';

const SECRET_KEY = 'mi_clave_secreta';

// Simulamos el token emitido en login
const userPayload = {
  id: 1,
  email: 'alexis@mail.com',
  nombre: 'Alexis'
};

// 1️⃣ Generamos token
const token = jwt.sign(userPayload, SECRET_KEY, { expiresIn: '2h' });
console.log('🟢 Token generado:\n', token);

// 2️⃣ Esperamos un segundo y verificamos
setTimeout(() => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('✅ Token válido. Usuario decodificado:\n', decoded);
  } catch (err) {
    console.error('❌ Token inválido o expirado:\n', err);
  }
}, 1000);
//==========================================================================
//Ejecutar este comando para probar si funcion : npx tsx src/testSession.ts
//==========================================================================
/*🟢 Token generado:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

✅ Token válido. Usuario decodificado:
{ id: 1, email: 'alexis@mail.com', nombre: 'Alexis', iat: ..., exp: ... }
 */

//==========================================================================
//==========================================================================
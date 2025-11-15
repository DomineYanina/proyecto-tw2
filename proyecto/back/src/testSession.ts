import jwt from 'jsonwebtoken';

const SECRET_KEY = 'mi_clave_secreta';

const userPayload = {
  id: 1,
  email: 'alexis@mail.com',
  nombre: 'Alexis'
};

const token = jwt.sign(userPayload, SECRET_KEY, { expiresIn: '2h' });
console.log('🟢 Token generado:\n', token);

setTimeout(() => {
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    console.log('✅ Token válido. Usuario decodificado:\n', decoded);
  } catch (err) {
    console.error('❌ Token inválido o expirado:\n', err);
  }
}, 1000);
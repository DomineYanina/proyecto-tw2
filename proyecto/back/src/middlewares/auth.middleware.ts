import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET || 'mi_clave_secreta';

export interface AuthRequest extends Request {
  user?: JwtPayload | string | undefined;
}

export function verificarToken(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers['authorization'];

  if (!header) {
    return res.status(401).json({ message: 'Token faltante' });
  }

  const token = header.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido o expirado' });
    }

    if (decoded) {
      req.user = decoded;
    }

    next();
  });
}

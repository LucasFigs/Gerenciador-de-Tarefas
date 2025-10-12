import { verificarToken } from '../config/jwt.js';

export function autenticar(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.status(401).json({ 
      success: false, 
      message: 'Token de acesso necessário' 
    });
  }

  const parts = authHeader.split(' ');
  
  if (parts.length !== 2) {
    return res.status(401).json({ 
      success: false, 
      message: 'Formato de token inválido' 
    });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ 
      success: false, 
      message: 'Formato de token inválido' 
    });
  }

  try {
    const decoded = verificarToken(token);
    req.usuario = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ 
      success: false, 
      message: error.message 
    });
  }
}
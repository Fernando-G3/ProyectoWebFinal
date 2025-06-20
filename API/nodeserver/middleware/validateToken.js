const jwt = require('jsonwebtoken');

const validateUserToken = (roleType) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(roleType);

  if (!authHeader) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'DesarrolloSistemasWebTeamRocket', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }

    if (decoded.userRoleId !== roleType) {
      return res.status(403).json({ message: `El usuario con ID ${decoded.userId} no tiene permiso para acceder a este recurso` });
    }

    req.user = decoded;
    next();
  });
};

const validateGeneralUserToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, 'DesarrolloSistemasWebTeamRocket', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token no válido' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = {
  validateUserToken,
  validateGeneralUserToken
};

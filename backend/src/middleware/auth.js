const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No autorizado — token requerido' })
  }
  try {
    const payload = jwt.verify(header.slice(7), process.env.JWT_SECRET)
    req.userId = payload.id
    req.userRole = payload.role || 'user'
    next()
  } catch {
    res.status(401).json({ message: 'Token inválido o expirado' })
  }
}

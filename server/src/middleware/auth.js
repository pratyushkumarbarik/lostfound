const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
	const authHeader = req.headers.authorization || '';
	const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
	if (!token) return res.status(401).json({ message: 'Unauthorized' });
	try {
		const payload = jwt.verify(token, process.env.JWT_SECRET);
		req.admin = { id: payload.id, email: payload.email };
		return next();
	} catch (err) {
		return res.status(401).json({ message: 'Invalid token' });
	}
}

module.exports = { authMiddleware };

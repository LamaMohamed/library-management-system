import jsonwebtoken from 'jsonwebtoken';

const { verify } = jsonwebtoken;

const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided!' });

    try {
        const verified = verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token!' });
    }
};

const authorize = (roles = []) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Forbidden!' });
    }
    next();
};

export const validateRefreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(401).json({ message: 'No refresh token provided!' });
    }

    try {
        const decoded = verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Refresh token validation error:', error.message);
        res.status(401).json({ message: 'Invalid or expired refresh token!' });
    }
};

export default { authenticate, authorize, validateRefreshToken };

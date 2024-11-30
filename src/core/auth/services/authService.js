import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';


const { hash, compare } = bcryptjs;
const { sign, verify } = jwt;
/**
 * Registers a new user.
 */
export const registerUser = async ({ name, email, password, role }) => {
    const hashedPassword = await hash(password, 10);
    return User.create({ name, email, password: hashedPassword, role });
};

/**
 * Logs in a user and returns a JWT.
 */
export const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error('User not found!');

    const isMatch = await compare(password, user.password);
    if (!isMatch) throw new Error('Invalid email or password');

      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
    return { user, accessToken, refreshToken };
};

/**
 * Generate an access token (short-lived, e.g., 1 hour).
 */
export const generateAccessToken = (user) => {
    return sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

/**
 * Generate a refresh token
 */
export const generateRefreshToken = (user) => {
    return sign(
        { id: user.id, role: user.role },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: '7d' }
    );
};

/**
 * Verify a refresh token.
 */
export const verifyRefreshToken = (refreshToken) => {
    try {
        return verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired refresh token');
    }};

/**
 * Refreshes the access token using a valid refresh token.
 */
export const refreshAccessToken = async (refreshToken) => {
    const decoded = verifyRefreshToken(refreshToken);
    return generateAccessToken({ id: decoded.id, role: decoded.role });
};

/**
 * Sets the refresh token in an HTTP-only cookie.
 */
export const setRefreshTokenCookie = (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
};

export const clearRefreshTokenCookie = (res) => {
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
};

export default {
    registerUser,
    loginUser,
    refreshAccessToken,
    clearRefreshTokenCookie,
};
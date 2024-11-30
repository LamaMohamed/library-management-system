import { asyncHandler } from '../../../core/middleware/errorMiddleware.js';

import authService from '../services/authService.js';

export const register = asyncHandler(async (req, res) => {
    const user = await authService.registerUser(req.body);
    res.status(201).json({
        message: 'User registered successfully!',
        user: { id: user.id, email: user.email, role: user.role },
    });

});

export const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Authenticate the user
    const { user, accessToken, refreshToken } = await authService.loginUser({ email, password });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,                         
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict',                     
        maxAge: 7 * 24 * 60 * 60 * 1000,      
    });

    res.status(200).json({
        message: 'Login successful',
        user: { id: user.id, email: user.email, role: user.role }, 
        accessToken,
    });});

/**
 * Refreshes the access token using the refresh token from the cookie.
 */
export const refreshToken = asyncHandler(async (req, res) => {
        const refreshToken = req.cookies.refreshToken; // Get token from HTTP-only cookie

        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token not found' });
        }

        const newAccessToken = await authService.refreshAccessToken(refreshToken);

        res.status(200).json({ accessToken: newAccessToken });
});

/**
 * Logs out the user by clearing the refresh token cookie.
 */
export const logout = asyncHandler((req, res) => {
    authService.clearRefreshTokenCookie(res);
    res.status(200).json({ message: 'Logged out successfully' });
});
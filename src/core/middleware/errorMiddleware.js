import { ValidationError } from 'sequelize';

/**
 * Async error handler wrapper
 */
export const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Global error handler middleware
 */
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    if (err instanceof ValidationError) {
        return res.status(400).json({
            error: 'Validation Error',
            details: err.errors.map((error) => ({
                field: error.path,
                message: error.message,
            })),
        });
    }

    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
    });
};

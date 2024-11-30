import Joi from 'joi';
import sequelize from '../../../core/database/connection.js';
import logger from '../../../core/logger/logger.js';


/**
 * Validates book data using Joi.
 */
export const validateBookData = (data) => {
    const schema = Joi.object({
        title: Joi.string().max(255).required(),
        author: Joi.string().max(255).required(),
        isbn: Joi.string().pattern(/^\d{10}(\d{3})?$/).required(), // ISBN-10 or ISBN-13
        quantity: Joi.number().integer().min(1).required(),
        shelfLocation: Joi.string().max(100).optional(),
    });

    const { error, value } = schema.validate(data);
    if (error) {
        logger.warn('Invalid book data', { error: error.message });
        throw new Error(error.details[0].message);
    }

    return value;
};

/**
 * Sanitizes an ID to prevent SQL injection.
 */
export const sanitizeId = (id) => sequelize.escape(id);

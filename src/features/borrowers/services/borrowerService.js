import Borrower from '../models/Borrower.js';

/**
 * Registers a new borrower in the database.
 */
export const registerBorrower = async (borrowerData) => {
    return Borrower.create(borrowerData);
};

/**
 * Updates an existing borrower's details.
 */
export const updateBorrowerDetails = async (borrowerId, borrowerData) => {
    const borrower = await Borrower.findByPk(borrowerId);
    if (!borrower) throw new Error('Borrower not found');
    await borrower.update(borrowerData);
    return borrower;
};

/**
 * Deletes a borrower record from the database.
 */
export const deleteBorrowerRecord = async (borrowerId) => {
    const borrower = await Borrower.findByPk(borrowerId);
    if (!borrower) throw new Error('Borrower not found');
    await borrower.destroy();
};

/**
 * Retrieves all borrowers from the database.
 */
export const getAllBorrowers = async () => {
    return Borrower.findAll();
};

export default {
    registerBorrower,
    updateBorrowerDetails,
    deleteBorrowerRecord,
    getAllBorrowers,
};
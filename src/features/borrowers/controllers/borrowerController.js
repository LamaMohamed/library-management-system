import { asyncHandler } from '../../../core/middleware/errorMiddleware.js';
import borrowerService from '../services/borrowerService.js';


/**
 * Controller to create a new borrower.
 */
export const createBorrower = asyncHandler(async (req, res) => {
    const borrower = await borrowerService.registerBorrower({...req.body,userId: req.user.id});
    res.status(201).json({ message: 'Borrower created successfully', borrower });
});

/**
 * Controller to update borrower details.
 */
export const updateBorrower = asyncHandler(async (req, res) => {
    const borrower = await borrowerService.updateBorrowerDetails(req.params.id, {...req.body,userId: req.user.id});
    res.status(200).json({ message: 'Borrower updated successfully', borrower });
});

/**
 * Controller to delete a borrower.
 */
export const deleteBorrower = asyncHandler(async (req, res) => {
    await borrowerService.deleteBorrowerRecord(req.params.id);
    res.status(200).json({ message: 'Borrower deleted successfully' });
});


/**
 * Controller to list all borrowers.
 */
export const listBorrowers = asyncHandler(async (req, res) => {
    const borrowers = await borrowerService.getAllBorrowers();
    res.status(200).json({ borrowers });
});

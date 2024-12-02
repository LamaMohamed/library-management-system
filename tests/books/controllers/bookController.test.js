import { jest } from '@jest/globals';
import { searchBooksByQuery } from '../../../src/features/books/controllers/bookController.js'


const mockResponse = () => {

    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

const mockRequest = (body = {}, params = {}, query = {}) => ({
    body,
    params,
    query,
});

jest.mock('../../../src/features/books/services/bookService.js');

describe('Book Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('searchBooksByQuery', () => {


        it('should return 400 if query is missing', async () => {
            const req = mockRequest({}, {}, {});
            const res = mockResponse();

            await searchBooksByQuery(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.json).toHaveBeenCalledWith({
                error: 'Query parameter is required',
            });
        });
    });
});

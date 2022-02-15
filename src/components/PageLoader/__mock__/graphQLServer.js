import { rest } from 'msw';
import { setupServer } from 'msw/node';
import ApolloConnection from '../../../services/ApolloConnection';

const server = setupServer(
    rest.post(ApolloConnection.baseUrl, (_, res, ctx) => {
        return res(ctx.json({ data: { Page: { media: [] } } }));
    }),
);

export const serverCases = {
    BAD_REQUEST: { status: 400, message: 'Bad Request.' },
    NOT_FOUND: { status: 404, message: 'Not Found.' },
    SERVER_ERROR: { status: 500, message: 'Server Error.' }
};

export function getServerMocked(currentCase = 'BAD_REQUEST') {
    return setupServer(
        rest.post(ApolloConnection.baseUrl, (_, res, ctx) => {
            const { status, message } = serverCases[currentCase];
    
            return res(ctx.json({
                errors: [{ message, status }],
                data: { Media: null }
            })).status(status);
        })
    );
}

export default server;
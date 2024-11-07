// backend/tests/server.test.js
import request from "supertest";
import app from '../server'; // Make sure server.js exports app in CommonJS style

describe('GET /', () => {
    it('should respond with a message', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('API is running');
    });
});

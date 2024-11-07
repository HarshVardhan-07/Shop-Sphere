import request from "supertest";
import app from "../server.js";
import { connectDB, disconnectDB, startServer, stopServer } from '../server.js';



beforeAll(async () => {
    await connectDB();
    startServer();
});

afterAll(async () => {
    await disconnectDB();
    stopServer();
});

describe('POST /api/auth/register', () => {
  it('should register a new user or log a different message based on the response', async () => {
      const response = await request(app)
          .post('/api/auth/register')
          .send({ name: 'John Wick 1', email: 'john1@example.com', password: 'password1111' });

      console.log('Response:', response.body); // Debugging line to check response content

      if (response.statusCode === 201) {
          expect(response.body.message).toBe('User Registered');
      } else if (response.statusCode === 400) {
          expect(response.body.message).toBe('User Already Exists');
      } else {
          console.log('Unexpected status code:', response.statusCode);
          // Optionally fail the test if an unexpected status code is returned
          expect(response.statusCode).toBe(201); // Ensure the test fails if the response is unexpected
      }
  });
});

describe('POST /api/auth/login', () => {
    it('should log in an existing user and return a token', async () => {
      const response = await request(app)
            .post('/api/auth/login')
            .send({ email: 'john1@example.com', password: 'password1111' });
  
      console.log('Response:', response.body);
      expect(response.statusCode).toBe(200);
      expect(response.body.token).toBeDefined(); // Check if token is received
    },20000);
  });
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { config } from "dotenv";
import authRoutes from "./routes/authRoutes.js"

config(); //loading env variables 

const app = express();
app.use(express.json());
app.use(cors());


let server; // Reference to the server instance

// Connect to database function
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

// Disconnect from database function
export const disconnectDB = async () => {
    await mongoose.connection.close();
    console.log('Database disconnected');
};

// Start server function
export const startServer = () => {
    const PORT = process.env.PORT || 4000;
    server = app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

// Stop server function
export const stopServer = () => {
    if (server) {
        server.close();
    }
};


app.get('/',(req,res) => {
    res.send("API is running");
});

app.use('/api/auth', authRoutes);


export default app;
/* eslint-disable no-console */
import mongoose from 'mongoose';
import { Server } from 'http';
import app from './app';
import { envVars } from './app/config/env';

let server : Server;

const startServer = async () => {
    try {
        await mongoose.connect(envVars.DB_URL);

        console.log("Connected to MongoDB");

        server = app.listen(envVars.PORT, () => {
            console.log(`Server is running on port ${envVars.PORT}`);
        })
    } catch (error) {
        console.log("Error starting the server:", error);
    }
}

startServer()

process.on('unhandledRejection', (err) => {
    console.log("Unhandled Rejection Detected. Server Shutting Down...", err);
    if(server){
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
})

process.on('uncaughtException', (err) => {
    console.log("Uncaught Exception Detected. Server Shutting Down...", err);
    if(server){
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
})

process.on('SIGTERM', () => {
    console.log("SIGTERM Received. Server Shutting Down...");
    if(server){
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
})

process.on('SIGINT', () => {
    console.log("SIGINT Received. Server Shutting Down...");
    if(server){
        server.close(() => {
            process.exit(1);
        })
    }
    process.exit(1);
})
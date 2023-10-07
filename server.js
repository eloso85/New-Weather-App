// Import necessary modules using ES6 import syntax
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
config();




// Setup __dirname for ES6 module
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Use the cors middleware
app.use(cors());

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});


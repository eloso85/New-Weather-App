import { config } from "dotenv";
config({path:'./.env'});

export const testKey = console.log(process.env.API_KEY);
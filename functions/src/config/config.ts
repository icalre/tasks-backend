import * as dotenv from 'dotenv';

dotenv.config();
export const getConfig  = (key: string): string | undefined => {
    return process.env[key];
};

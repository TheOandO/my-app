import dotenv from 'dotenv';
import env from 'env-var';
import type { TEmailConfig } from '../types';

dotenv.config();

export const configs: TEmailConfig = {
    username: env.get('EMAIL_USERNAME').required().asString() || 'admin',
    password: env.get('EMAIL_PASSWORD').required().asString() || 'admin',
};

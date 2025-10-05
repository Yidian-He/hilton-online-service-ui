import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const HTTPClient = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${process.env.BASE64_CREDENTIALS}`
    }
});

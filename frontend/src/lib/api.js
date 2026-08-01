import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

// Render free-tier backend can cold-start (sleep after ~15 min idle and take
// 30-60s to wake up). A short default axios timeout would abort that first
// request before the server ever wakes up, so we give it real breathing room.
export const api = axios.create({ baseURL: API, timeout: 45000 });

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Retries a request a few times with increasing delay. This is what actually
// rides out a Render cold start: the 1st call is the one that wakes the
// server (and may time out or fail), the 2nd/3rd call hits the now-warm
// server and succeeds - instead of the caller silently falling back to
// stale/empty data after a single failed attempt.
const withRetry = async (fn, { retries = 3, baseDelay = 2000 } = {}) => {
    let lastError;
    for (let attempt = 0; attempt <= retries; attempt++) {
        try {
            return await fn();
        } catch (err) {
            lastError = err;
            if (attempt < retries) {
                await sleep(baseDelay * (attempt + 1));
            }
        }
    }
    throw lastError;
};

export const fetchProducts = (params = {}) =>
    withRetry(() => api.get("/products", { params }).then((r) => r.data));

export const fetchProduct = (slug) =>
    withRetry(() => api.get(`/products/${slug}`).then((r) => r.data));

export const fetchSettings = () =>
    withRetry(() => api.get("/settings").then((r) => r.data));

export const submitInquiry = (payload) =>
    api.post("/inquiries", payload).then((r) => r.data);

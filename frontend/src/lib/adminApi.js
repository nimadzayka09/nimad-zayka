import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const adminApi = axios.create({ baseURL: API });

const ADMIN_TOKEN_KEY = "nz_admin_token";

export const getToken = () => localStorage.getItem(ADMIN_TOKEN_KEY);
export const setToken = (t) => localStorage.setItem(ADMIN_TOKEN_KEY, t);
export const clearToken = () => localStorage.removeItem(ADMIN_TOKEN_KEY);

adminApi.interceptors.request.use((config) => {
    const token = getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

adminApi.interceptors.response.use(
    (res) => res,
    (err) => {
        if (err.response && err.response.status === 401) {
            clearToken();
            if (!window.location.pathname.startsWith("/admin/login")) {
                window.location.href = "/admin/login";
            }
        }
        return Promise.reject(err);
    },
);

import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export const fetchProducts = (params = {}) =>
    api.get("/products", { params }).then((r) => r.data);

export const fetchProduct = (slug) =>
    api.get(`/products/${slug}`).then((r) => r.data);

export const submitInquiry = (payload) =>
    api.post("/inquiries", payload).then((r) => r.data);

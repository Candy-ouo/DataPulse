import axios from "axios";
import logger from "@/logger/Logger";
const http = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || "/api", timeout: 10000 });
http.interceptors.request.use(c => { logger.info("HTTP",c.method?.toUpperCase()+" "+c.url); return c; });
http.interceptors.response.use(r=>r,e=>{ logger.error("HTTP",e.message); return Promise.reject(e); });
export default http;

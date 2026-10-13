import axios from "axios";

export function getStoredAuthToken(): string | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem("aramayus-auth");
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    const state = parsed?.state ?? parsed;
    const token =
      typeof state?.token === "string"
        ? state.token
        : typeof parsed?.token === "string"
          ? parsed.token
          : null;

    return token && token.trim() ? token : null;
  } catch {
    return null;
  }
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 60000,
});

api.interceptors.request.use((config) => {
  const token = getStoredAuthToken();

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Products
export const productsApi = {
  getAll: (params?: object) => api.get("/products", { params }),
  getById: (id: string) => api.get(`/products/${id}`),
  create: (data: FormData) => api.post("/products", data),
  update: (id: string, data: FormData) => api.put(`/products/${id}`, data),
  delete: (id: string) => api.delete(`/products/${id}`),
  getFeatured: () => api.get("/products/featured"),
};

// Orders
export const ordersApi = {
  create: (data: object) => api.post("/orders", data),
  getMyOrders: () => api.get("/orders/my"),
  getById: (id: string) => api.get(`/orders/${id}`),
  getAll: (params?: object) => api.get("/orders", { params }),
  updateStatus: (id: string, status: string) =>
    api.patch(`/orders/${id}/status`, { status }),
};

// Auth
export const authApi = {
  login: (email: string, password: string) =>
    api.post("/auth/login", { email, password }),
  register: (data: object) => api.post("/auth/register", data),
  me: () => api.get("/auth/me"),
};

export const settingsApi = {
  getNosotros: () => api.get("/settings/nosotros"),
  updateNosotros: (data: object) => api.put("/settings/nosotros", data),
};

export const uploadsApi = {
  uploadImage: (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    return api.post("/uploads/image", formData);
  }
};

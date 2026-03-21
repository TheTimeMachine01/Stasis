import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";
const GRAPHQL_URL = "http://localhost:8080/graphql";

// Create base instance with credentials enabled for secure cookies
export const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add JWT token to requests (Optional backup if header is preferred by backend)
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("stasis_token"); // Still checking for Postman/Dev compatibility
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for Silent Refresh & Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't tried refreshing yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call the new refresh endpoint (Backend needs to implement this)
        await axios.post(`${API_URL}/auth/refresh`, {}, { withCredentials: true });
        
        // If refresh successful, retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear session and redirect
        if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

// GraphQL Client optimized for cookies
export const graphqlClient = async (query: string, variables: any = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem("stasis_token") : null;
  const headers: any = {
    "Content-Type": "application/json",
  };
  
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await axios.post(
    GRAPHQL_URL,
    { query, variables },
    {
      withCredentials: true,
      headers: headers,
    }
  );
  return response.data;
};

// API Endpoints Mapping
export const api = {
  auth: {
    login: (credentials: any) => apiClient.post("/auth/login", credentials),
    signup: (data: any) => apiClient.post("/auth/signup", data),
    logout: () => apiClient.post("/auth/logout"),
    me: () => apiClient.get("/auth/me"), // To verify cookie session on load
  },
  alerts: {
    list: (variables: any) => 
      graphqlClient(`
        query ListAlerts($level: String, $read: Boolean, $limit: Int, $offset: Int) {
          listAlerts(level: $level, read: $read, limit: $limit, offset: $offset) {
            id level message source timestamp title category confidence target_ip target_port detection_method read time attack_type details
          }
        }
      `, variables),
    getStats: () => 
      graphqlClient(`
        query GetAlertStats {
          getAlertStats { total unread by_severity { severity count } timestamp }
        }
      `),
    markRead: (id: string) => graphqlClient(`mutation MarkAsRead($id: ID!) { markAsRead(id: $id) }`, { id }),
    delete: (id: string) => graphqlClient(`mutation DeleteAlert($id: ID!) { deleteAlert(id: $id) }`, { id }),
  },
  health: {
    check: () => apiClient.get("/healthz"),
  }
};

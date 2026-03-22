import axios from "axios";

// Base URL for both REST and GraphQL
let BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

// Ensure the URL has a protocol, otherwise Axios treats it as a relative path
if (BASE_URL && !BASE_URL.startsWith("http://") && !BASE_URL.startsWith("https://")) {
  // Default to https for production if protocol is missing
  BASE_URL = `https://${BASE_URL}`;
}

// Ensure we don't have double slashes if BASE_URL ends with /
const cleanBaseUrl = BASE_URL.replace(/\/+$/, "");

const API_URL = `${cleanBaseUrl}/api`;
const GRAPHQL_URL = `${cleanBaseUrl}/graphql`;

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
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("stasis_token"); 
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor for Silent Refresh & Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 and we haven't tried refreshing yet, and it's not a refresh/login request
    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      !originalRequest.url?.includes("/auth/refresh") &&
      !originalRequest.url?.includes("/auth/login")
    ) {
      const pathname = typeof window !== "undefined" ? window.location.pathname : "";
      const isAuthPage = pathname.includes("/login") || 
                         pathname.includes("/signup") || 
                         pathname === "/" || 
                         pathname === "";

      // If we are on an auth page or home page, OR the failed request was the 'me' check, 
      // don't bother refreshing or redirecting, just let the error through
      if (isAuthPage || originalRequest.url?.includes("/auth/me")) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        // Call the refresh endpoint
        await api.auth.refresh();
        
        // If refresh successful, retry the original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, clear session and redirect only if NOT on a public page
        if (typeof window !== "undefined" && !isAuthPage) {
          window.location.href = "/login";
        }
        return Promise.reject(refreshError);
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
    signup: (data: any) => apiClient.post("/auth/register", data),
    refresh: () => apiClient.post("/auth/refresh"),
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
    markAllRead: () => graphqlClient(`mutation MarkAllRead { markAllRead }`),
    delete: (id: string) => graphqlClient(`mutation DeleteAlert($id: ID!) { deleteAlert(id: $id) }`, { id }),
    createManual: (data: any) => apiClient.post("/alerts", data),
    getSystemMetrics: () => 
      graphqlClient(`
        query GetSystemMetrics {
          getSystemMetrics {
            statistics {
              total_flows
              attack_predictions
              benign_predictions
              processing_time_ms
              throughput_flows_per_sec
              average_confidence
            }
          }
        }
      `),
  },
  health: {
    check: () => apiClient.get("/healthz"),
  }
};

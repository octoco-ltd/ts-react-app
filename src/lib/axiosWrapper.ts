import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, AxiosRequestHeaders } from 'axios';

class ApiClient {
  private axiosInstance: AxiosInstance;

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({ baseURL });
    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // You can add common headers or transformations here
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // You can process successful responses here
        return response;
      },
      (error: AxiosError) => {
        // Handle and process errors here
        return Promise.reject(error);
      }
    );
  }

    /**
     * Sends a GET request.
     * @param url The URL to request.
     * @param config Optional Axios request configuration.
     * @returns A Promise that resolves with the response data.
     */
    public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.get(url, config).then((response) => response.data);
    }

    /**
     * Sends a POST request.
     * @param url The URL to request.
     * @param data The data to send in the request body.
     * @param config Optional Axios request configuration.
     * @returns A Promise that resolves with the response data.
     */
    public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.post(url, data, config).then((response) => response.data);
    }

    /**
     * Sends a PUT request.
     * @param url The URL to request.
     * @param data The data to send in the request body.
     * @param config Optional Axios request configuration.
     * @returns A Promise that resolves with the response data.
     */
    public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.put(url, data, config).then((response) => response.data);
    }

    /**
     * Sends a DELETE request.
     * @param url The URL to request.
     * @param config Optional Axios request configuration.
     * @returns A Promise that resolves with the response data.
     */
    public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        return this.axiosInstance.delete(url, config).then((response) => response.data);
    }
}

export default ApiClient;

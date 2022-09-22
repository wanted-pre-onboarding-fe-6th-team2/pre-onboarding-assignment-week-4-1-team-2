import axios from 'axios';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorage';
import { HTTP_METHODS } from '@/constants/http';

const BASE_URL = 'http://localhost:4000';

const handleRequest = config => {
  const TOKEN = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

  return TOKEN
    ? {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    : config;
};

const handleResponse = response => response.data;

const handleError = error => {
  if (error instanceof Error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        throw error;
      } else if (error.request) {
        throw new Error(error);
      }
    } else {
      throw new Error(error.message);
    }
  }
  throw new Error(error);
};

const createHttpRequest = () => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    proxy: {
      host: 'localhost',
      port: 4000,
    },
  });

  const createApiMethod = methodType => config => {
    return axiosInstance({ ...handleRequest(config), method: methodType })
      .then(handleResponse)
      .catch(handleError);
  };

  return {
    [HTTP_METHODS.GET]: createApiMethod(HTTP_METHODS.GET),
    [HTTP_METHODS.POST]: createApiMethod(HTTP_METHODS.POST),
    [HTTP_METHODS.PATCH]: createApiMethod(HTTP_METHODS.PATCH),
    [HTTP_METHODS.PUT]: createApiMethod(HTTP_METHODS.PUT),
    [HTTP_METHODS.DELETE]: createApiMethod(HTTP_METHODS.DELETE),
  };
};

const http = createHttpRequest();
export default http;

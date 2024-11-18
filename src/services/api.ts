import axios, { AxiosRequestConfig } from 'axios';

const api: AxiosRequestConfig = {
  baseURL: 'https://rickandmortyapi.com/api/',
};

export const axiosInstance = axios.create(api);
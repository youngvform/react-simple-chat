import axios, { AxiosRequestConfig } from "axios";
import { baseApiUrl } from "./config";

interface ChatParam {
  name: string;
}

export interface MessageParam {
  chatId: string;
  messageText: string;
}

export const axiosClient = axios.create({
  timeout: 5000,
  baseURL: baseApiUrl,
});

export async function apiPostByUrl(
  url: string,
  params?: ChatParam | MessageParam,
  options?: AxiosRequestConfig
) {
  return await axiosClient.post(url, params, options);
}
export async function apiGetByUrl(url: string, options?: AxiosRequestConfig) {
  return await axiosClient.get(url, options);
}

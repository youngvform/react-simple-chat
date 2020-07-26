import axios, { AxiosRequestConfig } from "axios";
import { baseApiUrl } from "./config";

interface ChatParam {
  name: string;
}
export const axiosClient = axios.create({
  timeout: 5000,
  baseURL: baseApiUrl,
});

export async function apiPostByUrl(
  url: string,
  params?: ChatParam,
  options?: AxiosRequestConfig
) {
  return await axiosClient.post(url, params, options);
}

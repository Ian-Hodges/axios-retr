import axios, { AxiosRequestConfig } from "axios";
import axiosRetry from "axios-retry";
import { saveIt } from "./somethingAsync";

interface RetryConfig extends AxiosRequestConfig {
  retryCount: number;
}

export function getAxiosClient(url: string) {
  const instance = axios.create({
    baseURL: url
  });

  axiosRetry(instance, {
    retries: 3,
    async retryCondition(error) {
      const config = error.config["axios-retry"] as RetryConfig;
      if (config.retryCount > 0) {
        return false;
      }
      await saveIt("moo");
      return error.response?.status === 401;
    },
    onRetry(retryCount, error, requestConfig) {
      const requestReference = requestConfig['headers'].requestReference;
      console.log(`Retrying ${requestConfig.url} ${retryCount} times. ${requestReference}`);
    },
    retryDelay(retryCount) {
      return retryCount * 1000;
    },
  });

  return instance;
}
import axios from "axios";
import axiosRetry from "axios-retry";
import { saveIt } from "./somethingAsync";

export function getAxiosClient(url: string) {
  const instance = axios.create({
    baseURL: url
  });

  axiosRetry(instance, {
    retries: 3,
    retryCondition(error) {
      return error.response?.status === 401;
    },
    onRetry(retryCount, error, requestConfig) {
      console.log(`Retrying ${requestConfig.url} ${retryCount} times`);
    },
    retryDelay(retryCount) {
      saveIt("moo");
      return retryCount * 1000;
    },
  });

  return instance;
}
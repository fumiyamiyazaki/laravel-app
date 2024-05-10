import axios from "axios";

// XSRF-TOKENをリクエスト時に送信するための設定
export const http = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  withXSRFToken: true,
});

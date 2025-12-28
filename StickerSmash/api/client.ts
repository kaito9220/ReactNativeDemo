// バックエンドのエンドポイントや出力確認用関数
import axios from 'axios';
// ※ React Nativeでは通常 @env などから読み込みます
// import { API_BASE_URL, API_TIMEOUT } from '@env'; 

const BASE_URL = 'https://comet-backend.modur4.com'; // 仮のハードコード（環境変数推奨）
const TIMEOUT = 30000;

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// インターセプター（ログ出力など）
apiClient.interceptors.request.use(
  (config) => {
    if (__DEV__) { // React Nativeのデバッグフラグ
      console.log('API Request:', config.method?.toUpperCase(), config.url);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => {
    if (__DEV__) {
      console.log('API Response:', response.status);
    }
    return response;
  },
  (error) => {
    if (__DEV__) {
      console.error('API Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
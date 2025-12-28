// 検索系のapi
import apiClient from './client';
import type { SearchImageResult, SearchTextResult } from './types';

const DEFAULT_THRESHOLD = 0.8;

// 画像検索(入力:画像データ、閾値　出力:絵画データオブジェクト)
export const searchImageWithDescription = async (
  imageData: string,
  threshold: number = DEFAULT_THRESHOLD
): Promise<SearchImageResult> => {
  try {
    const response = await apiClient.post('/search/image/with-description', {
      image: imageData,
      threshold,
      top_k: 5
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`画像検索エラー: ${error.response?.data?.error || error.message}`);
  }
};

// テキスト検索(入力:探している絵画の説明文、持ってくる絵画の数　出力:絵画データ、数)
export const searchText = async (
  query: string, 
  k: number = 10
): Promise<SearchTextResult> => {
  try {
    const response = await apiClient.post('/search/text', {
      query,
      k
    });
    return response.data;
  } catch (error: any) {
    throw new Error(`テキスト検索エラー: ${error.message}`);
  }
};

export const fetchPrediction = async (base64Image: string) => {
  try {
    const apiKey = process.env.EXPO_PUBLIC_ROBOFLOW_API_KEY;
    const endpoint = `https://serverless.roboflow.com/rock-paper-scissors-sxsw/14?api_key=${apiKey}`;
    
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: base64Image,
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('予測APIの呼び出しに失敗しました:', error);

    throw error;
  }
};
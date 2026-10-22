// api/roboflow.ts として別ファイルにするのがベスト
// または cameraDescription.tsx の外側に書く

export const fetchPrediction = async (base64Image: string) => {
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
    throw new Error(`API Error: ${response.status}`);
  }

  return await response.json();
};
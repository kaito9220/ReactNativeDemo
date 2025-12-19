import React, { useState, useEffect, useRef } from 'react';
import { Button, StyleSheet, Text, View, TouchableOpacity, Dimensions, ActivityIndicator, Platform } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface Detection {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

export default function CameraDescription() {
  const [facing, setFacing] = useState<'front' | 'back'>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [detections, setDetections] = useState<Detection[]>([]);// 検出結果格納用(座標・ラベル)
  const [isDetecting, setIsDetecting] = useState(false);// 通信状態管理
  const cameraRef = useRef<CameraView>(null);

  const my_api_key = process.env.MY_API_KEY || '';

  // 物体検出用外部API
  const detectObjects = async () => {
    // 通信状態になっているかcameraRefに状態が保存されている場合はapiはたたかない
    if(!cameraRef.current || isDetecting) return;

    try {
      // 通信状態に更新
      setIsDetecting(true);

      // 動画から取得する画像に関するオプション
      const options = {
        base64: true,
        quality: 0.5,
        skipProcessing: true,
      };

      // オプションを引数にするとその設定に応じた画像を取得するtakePictureAsync()を使用
      const photo = await cameraRef.current.takePictureAsync(options);

      
      // 外部APIに取得した画像をPOSTメソッドで送信
      const response = await fetch('https://serverless.roboflow.com/rock-paper-scissors-sxsw/14?api_key=' + process.env.EXPO_PUBLIC_ROBOFLOW_API_KEY, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: photo.base64,
      });
      
      // エラー用
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} ${errorText}`);
      }
      
      // APIの応答をJSON形式で取得
      const result = await response.json();
      
      let imgW = photo.width;
      let imgH = photo.height;
      let isRotated = false;

      if (Platform.OS !== 'web') {
        imgW = Math.min(photo.width, photo.height);
        imgH = Math.max(photo.width, photo.height);
        isRotated = true;
      }

      const scale = Math.max(SCREEN_WIDTH / imgW, SCREEN_HEIGHT / imgH);

      const dx = (SCREEN_WIDTH - imgW * scale) / 2;
      const dy = (SCREEN_HEIGHT - imgH * scale) / 2;
      
      if (result.predictions && result.predictions.length > 0) {
        // 座標変換処理
        const adaptedDetections = result.predictions.map((p: any) => {
          
          let finalX, finalY, finalWidth, finalHeight;
          const roboX = p.x;
          const roboY = p.y;
          const roboW = p.width;
          const roboH = p.height;

          if (isRotated) {
             // 【モバイル（縦画面）用】: 90度回転しているのでXとYを入れ替える
             // Roboflow X -> 画面 Y
             // Roboflow Y -> 画面 X
             finalY = (roboX - roboW / 2) * scale + dy;
             finalX = (roboY - roboH / 2) * scale + dx;
             finalHeight = roboW * scale;
             finalWidth = roboH * scale;
          } else {
             // 【Web / PCブラウザ用】: 回転なし。そのままマッピング
             finalX = (roboX - roboW / 2) * scale + dx;
             finalY = (roboY - roboH / 2) * scale + dy;
             finalWidth = roboW * scale;
             finalHeight = roboH * scale;
          }

          if(facing === 'front') {
            finalX = SCREEN_WIDTH -finalX -finalWidth;
          }

          return {
            ...p,
            x: finalX,
            y: finalY,
            width: finalWidth,
            height: finalHeight,
            label: p.class, // APIによっては p.class または p.label
          };
        });
        
        // 確認用
        console.log("Predictions:", adaptedDetections[0]);
        console.log("WinW:", SCREEN_WIDTH);
        console.log("WinHeight:", SCREEN_HEIGHT);
        // APIが検出した物体の座標とラベルを格納
        setDetections(adaptedDetections);
      } else {
        setDetections([]);
      }

    } catch (error) {
      console.log("Detection Error:", (error as Error).message);
    } finally {
      // 通信状態更新
      setIsDetecting(false);
    }
  };

  useEffect(() => {
    let isMounted = true; // コンポーネントがマウントされているか追跡

    const loop = async () => {
      // 権限があり、かつマウント中なら実行
      if (permission?.granted && isMounted) {
        await detectObjects();
        // 処理が終わってから次の実行まで少し待機（例: 100ms）
        if (isMounted) setTimeout(loop, 100); 
      }
    };

    if (permission?.granted) {
      loop(); // ループ開始
    }

    return () => {
      isMounted = false; // クリーンアップ
    };
  }, [permission]); // isDetectingは依存配列から外す

  // 権限の確認中
  if (!permission) {
    return (
      <View>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  // 権限がない場合
  if (!permission.granted) {
    return (
      <View style={styles.centered}>
        <Text style={styles.message}>カメラの使用許可が必要です</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>許可する</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCamera() {
    setFacing(current => (current === 'front' ? 'back' : 'front'));
  }

  return (
    <View style={styles.container}>
    {/* CameraViewを画面いっぱいに広げる */}
      <CameraView 
        ref={cameraRef} 
        style={StyleSheet.absoluteFillObject} 
        facing={facing}
      >
        <Svg style={StyleSheet.absoluteFillObject} pointerEvents="none">
          {/* svgレイヤーのテスト用 */}
          {/* <Rect x="50" y="50" width="100" height="100" stroke="red" strokeWidth="5" fill="transparent" /> */}
          {detections.map((item, index) => (
            <React.Fragment key={`box-${index}`}>
              <Rect
                x={item.x}
                y={item.y}
                width={item.width}
                height={item.height}
                stroke="#00FF00"
                strokeWidth="3"
                fill="transparent"
              />
              <SvgText
                x={item.x}
                y={item.y > 25 ? item.y - 10 : item.y + 25}
                fill="#00FF00"
                fontSize="18"
                fontWeight="bold"
              >
                {item.label}
              </SvgText>
            </React.Fragment>
          ))}
        </Svg>

        {/* カメラ映像の上にボタンなどを重ねたい場合はここに記述 */}
        <View style={styles.overlay} pointerEvents="box-none">
          <View>
            <View style={[
              styles.indicator,
              { backgroundColor: isDetecting ? '#FFA500' : '#00FF00' }
            ]} />
            <Text>
              {isDetecting ? "推論中..." : "ライブビュー"}
            </Text>
          </View>
          
          <View style={styles.controls}>
            <TouchableOpacity style={styles.flipButton} onPress={toggleCamera}>
              <Text style={styles.flipText}>カメラ切替</Text>
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    padding: 20,
  },
  container: {
    flex: 1, // 親要素を画面全体に
    backgroundColor: '#000',
  },
  message: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: 24,
    fontSize: 18,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
  },
  overlay: {
    flex: 1,
    padding: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginTop: Platform.OS === 'ios' ? 40 : 10,
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  statusText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  controls: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  flipButton: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 30,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.4)',
    backdropFilter: 'blur(10px)',
  },
  flipText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
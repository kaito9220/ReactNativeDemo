# CO・MET 🎨

美術館をもっと楽しくするための React Native (Expo) アプリです。  
カメラや自然言語で絵画を検索し、AI とインタラクティブに対話することで、新たなアート体験を提供します。

---

## 主な機能

| 機能 | 説明 |
|---|---|
| 📷 カメラ検索 | カメラ映像をリアルタイムに解析し、映っている絵画を特定します。物体検出（Roboflow）でフレーム内の絵画を枠付け表示します。 |
| 🔤 テキスト検索 | 自然言語で「こんな絵が見たい」と入力すると、ベクトル検索で類似絵画を一覧表示します。 |
| 🤖 AI チャット | 検索でヒットした絵画について AI（バックエンド LLM）と自由に会話できます。 |

---

## 技術スタック

- **フレームワーク**: React Native (Expo SDK 54) + Expo Router v6
- **言語**: TypeScript
- **UI ライブラリ**: `@expo/vector-icons`, `react-native-svg`, `react-native-reanimated`
- **カメラ**: `expo-camera`, `react-native-vision-camera`
- **物体検出**: [Roboflow Serverless API](https://roboflow.com/)
- **バックエンド通信**: axios (`https://comet-backend.modur4.com`)
- **ナビゲーション**: `@react-navigation/bottom-tabs` + Expo Router ファイルベースルーティング

---

## ディレクトリ構成

```
ReactNativeDemo/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx        # タブナビゲーション設定
│   │   ├── index.tsx          # ホーム画面
│   │   ├── cameraSearch.tsx   # カメラ検索画面
│   │   ├── textSearch.tsx     # テキスト検索画面
│   │   └── about.tsx          # アプリ概要画面
│   ├── _layout.tsx
│   └── +not-found.tsx
├── api/
│   ├── client.ts              # axios クライアント設定
│   ├── search.ts              # 画像・テキスト検索 API
│   ├── chat.ts                # AI チャット API
│   ├── fetchPrediction.tsx    # Roboflow 物体検出 API
│   └── types.ts               # 型定義
├── components/
│   ├── cameraDescription.tsx  # カメラ + 物体検出 UI コンポーネント
│   ├── chatWithAI.tsx         # AI チャット UI コンポーネント
│   ├── chatWithAIScreen.tsx   # チャット画面コンポーネント
│   ├── iconButton.tsx         # 汎用アイコンボタン
│   └── textSearch.tsx         # テキスト検索コンポーネント
├── assets/                    # 画像・フォント等
├── app.json                   # Expo アプリ設定
├── package.json
└── README.md
```

---

## セットアップ

### 前提条件

- Node.js 18 以上
- [Expo Go](https://expo.dev/go) アプリ（実機確認用）または Android / iOS エミュレータ

### インストール

```bash
npm install
```

### 環境変数

プロジェクトルートの `.env` に以下を設定してください。

```env
EXPO_PUBLIC_ROBOFLOW_API_KEY=your_roboflow_api_key
```

> `.env` ファイルはリポジトリに含まれていません。Roboflow のダッシュボードからキーを取得してください。

### 起動

```bash
npx expo start
```

起動後、以下のいずれかで動作確認できます。

- **Expo Go（実機）**: QR コードをスキャン
- **Android エミュレータ**: `a` キーを押す
- **iOS シミュレータ**: `i` キーを押す（macOS のみ）
- **Web ブラウザ**: `w` キーを押す

---

## API エンドポイント

バックエンド URL: `https://comet-backend.modur4.com`

| メソッド | パス | 説明 |
|---|---|---|
| POST | `/search/image/with-description` | Base64 画像で絵画を検索 |
| POST | `/search/text` | テキストクエリで絵画を検索 |
| POST | `/chat/start` | AI チャットセッションを開始 |
| POST | `/chat/message` | AI チャットにメッセージを送信 |

---

## スクリプト

| コマンド | 説明 |
|---|---|
| `npm start` | 開発サーバーを起動 |
| `npm run android` | Android エミュレータで起動 |
| `npm run ios` | iOS シミュレータで起動（macOS のみ） |
| `npm run web` | ブラウザで起動 |
| `npm run lint` | ESLint を実行 |
| `npm run reset-project` | スターターコードを `app-example` に移動し、`app` をリセット |

---

## ライセンス

このリポジトリはデモ・学習目的のプロジェクトです。

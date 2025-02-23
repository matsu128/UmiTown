# イベント参加登録フォーム

## 概要
イベント参加登録を管理するためのWebアプリケーションです。参加者は名前と参加状況を入力すると、LINE通知で管理者に通知されます。

## カスタマイズ方法
`App.jsx`の`eventDetails`オブジェクトで、イベントの詳細を変更できます：
```
const eventDetails = {
  name: "イベント名",
  date: "開催日",
  time: "開催時間"
}
```

## 送信データ
送信されるデータは以下の形式でLINEに通知されます：
```
【イベント参加登録】
名前: [入力された名前]
参加状況: [選択された参加状況]
イベント: [eventDetailsのname]
日時: [eventDetailsのdate] [eventDetailsのtime]
```

## LINE通知
- 送信されたデータはLINE公式アカウントに通知されます
- LINE Developersで連携設定済みのアカウントで受信できます

## デプロイ方法
1. Vercelにプロジェクトをデプロイ
2. Vercelの環境変数に以下を設定：
   - `VITE_LINE_CHANNEL_ACCESS_TOKEN`
   - `VITE_LINE_USER_ID`

## 技術スタック
- React + Vite
- Tailwind CSS
- Framer Motion
- LINE Messaging API
- Vercel Serverless Functions

## ライセンス
MIT

## 作者
matsu128
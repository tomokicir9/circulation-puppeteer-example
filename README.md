# RPA 講座 by Logical Fabrics

## 必要なもの

- Github クライアント
  - https://desktop.github.com/ からダウンロードしてインストール
- VSCode（エディタ）
  - https://code.visualstudio.com/download からダウンロードしてインストール
- NodeJS (nvm)
  - 下記のインストール方法を参照

## NodeJS のインストール方法(Mac)

- 「ターミナル」アプリを起動する
- 下記のコマンドをターミナルにコピペ

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
nvm install --lts
nvm use node
nvm alias default node
```

その後 `node -v` と入力して enter を押し `v14.xx.x` のように表示されれば完了

## セットアップ

わからなくても大丈夫です。 当日解説します。

1. Github クライアントで、このリポジトリをクローン
1. Cmd + Shift + A で VSCode を開く
1. Ctrl + ~ で VSCode 下部にターミナルを開く
1. `npm i` と打ち込み、Enter
1. `node example1.js` と打ち込み、Enter
1. Yahoo ファイナンスのページが表示されて消えれば完了

# Puppeteer

Chrome を操作するツール。 Nodejs(Javascript)で記述する。

## よく使う構文

```js
// Chrome を立ち上げる
const browser = await puppeteer.launch({
  headless: false, // 画面を隠すかどうか
  defaultViewport: {
    width: 1024, // 横幅
    height: 768, // 縦幅
  },
})
const page = await browser.newPage() // 新しいタブを開く
```

```js
await page.goto(行き先のURL)
```

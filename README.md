# ブラウザ RPA 講座 by Logical Fabrics

## 必要なもの

- Github クライアント
  - https://desktop.github.com/ からダウンロードしてインストール
- Nodejs（≒ Javascript）実行環境
  - https://nodejs.org/ja/ から `推奨版` をダウンロードしてインストール
- VSCode（エディタ）
  - https://code.visualstudio.com/download からダウンロードしてインストール

## Nodejs without Admin

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
nvm install --lts
```

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

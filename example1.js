const puppeteer = require('puppeteer')
const sleep = require('await-sleep')

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1024,
      height: 768,
    },
  })
  const page = await browser.newPage()

  // Yahooファイナンスのページを開く
  console.log('Yahooファイナンスをページを開きます')
  await page.goto('https://finance.yahoo.co.jp/')
  console.log('Yahooファイナンスをページを開きました')

  // 3秒待つ
  console.log('いまから３秒待ちます')
  await sleep(3000)

  // スクリーンショットを撮る
  console.log('スクショを取ります')
  await page.screenshot({ path: './image.png' })

  // ブラウザを閉じる
  console.log('ブラウザを閉じます')
  await browser.close()
})()

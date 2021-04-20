const puppeteer = require('puppeteer')
const sleep = require('await-sleep')

;(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
      width: 1024,
      height: 768,
    },
    slowMo: 100,
  })
  const page = await browser.newPage()

  // 現在価格を示す要素のセレクタ
  const CURRENT_PRICE_SELECTOR =
    '#root > main > div > div > div.XuqDlHPN > div:nth-child(2) > section._1zZriTjI._2l2sDX5w > div._1nb3c4wQ > header > div.nOmR5zWz > span > span > span'

  console.log('トヨタのページの処理開始')
  await page.goto('https://finance.yahoo.co.jp/quote/7203.T') // トヨタのページへの直リンク
  await page.waitForSelector(CURRENT_PRICE_SELECTOR) // 対象の要素が表示されるまで待つ
  const toyotaCurrentPrice = await page.$eval(
    // 対象の要素を抜き出す
    CURRENT_PRICE_SELECTOR,
    (e) => e.textContent
  )

  console.log('ホンダのページの処理開始')
  await page.goto('https://finance.yahoo.co.jp/quote/7267.T') // ホンダのページへの直リンク
  await page.waitForSelector(CURRENT_PRICE_SELECTOR) // 対象の要素が表示されるまで待つ
  const hondaCurrentPrice = await page.$eval(
    // 対象の要素を抜き出す
    CURRENT_PRICE_SELECTOR,
    (e) => e.textContent
  )

  // 各々の現在価格を表示
  console.log('処理完了\n')
  console.log(`トヨタ: ${toyotaCurrentPrice}`)
  console.log(`ホンダ: ${hondaCurrentPrice}`)

  // ブラウザを閉じる
  await browser.close()
})()

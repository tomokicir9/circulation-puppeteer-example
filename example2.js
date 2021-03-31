const puppeteer = require('puppeteer')

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

  await page.goto('https://finance.yahoo.co.jp/') // Yahooファイナンスのページを開く

  await page.type('#searchText', '7203') // 7203 = トヨタのコード を検索ボックスに入力
  await page.click('#searchButton') // 検索ボタンを押す

  // 現在価格を示す要素のセレクタ
  const CURRENT_PRICE_SELECTOR =
    '#root > main > div > div > div.XuqDlHPN > div:nth-child(2) > section._1zZriTjI._2l2sDX5w > div._1nb3c4wQ > header > div.nOmR5zWz > span > span > span'

  await page.waitForSelector(CURRENT_PRICE_SELECTOR) // 対象の要素が表示されるまで待つ

  // 対象の要素を抜き出す
  const currentPrice = await page.$eval(
    CURRENT_PRICE_SELECTOR,
    (e) => e.textContent
  )

  // 対象の数字を表示
  console.log(currentPrice)

  // ブラウザを閉じる
  await browser.close()
})()

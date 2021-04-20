const puppeteer = require('puppeteer')
const sleep = require('await-sleep')

const TOYOTA_SYMBOL = 7203
const HONDA_SYMBOL = 7267

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

  const CURRENT_PRICE_SELECTOR =
    '#root > main > div > div > div.XuqDlHPN > div:nth-child(2) > section._1zZriTjI._2l2sDX5w > div._1nb3c4wQ > header > div.nOmR5zWz > span > span > span'

  // これが "関数"
  const getCurrentPrice = async (tickerSymbol) => {
    console.log(`${tickerSymbol} の処理を開始`)

    await page.goto(`https://finance.yahoo.co.jp/quote/${tickerSymbol}.T`)
    await page.waitForSelector(CURRENT_PRICE_SELECTOR)
    const currentPrice = await page.$eval(
      CURRENT_PRICE_SELECTOR,
      (e) => e.textContent
    )
    return currentPrice
  }

  // 各々の現在価格を取得
  const toyotaPrice = await getCurrentPrice(TOYOTA_SYMBOL)
  const hondaPrice = await getCurrentPrice(HONDA_SYMBOL)
  console.log('取得処理完了\n')

  console.log(`トヨタ: ${toyotaPrice}`)
  console.log(`ホンダ: ${hondaPrice}`)

  // ブラウザを閉じる
  await browser.close()
})()

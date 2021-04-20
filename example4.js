const puppeteer = require('puppeteer')

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
    await page.goto(`https://finance.yahoo.co.jp/quote/${tickerSymbol}.T`)
    await page.waitForSelector(CURRENT_PRICE_SELECTOR)
    const currentPrice = await page.$eval(
      CURRENT_PRICE_SELECTOR,
      (e) => e.textContent
    )
    return currentPrice
  }

  // 対象の数字を表示
  console.log(`トヨタ: ${await getCurrentPrice(TOYOTA_SYMBOL)}`)
  console.log(`ホンダ: ${await getCurrentPrice(HONDA_SYMBOL)}`)

  // ブラウザを閉じる
  await browser.close()
})()

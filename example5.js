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

  // 各種セレクタ
  const SEL_CURRENT =
    '#root > main > div > div > div.XuqDlHPN > div:nth-child(2) > section._1zZriTjI._2l2sDX5w > div._1nb3c4wQ > header > div.nOmR5zWz > span > span > span'
  const SEL_CLOSE =
    '#detail > section._2Yx3YP9V._3v4W38Hq > div > ul > li:nth-child(1) > dl > dd > span._1fofaCjs._2aohzPlv._1DMRub9m > span > span'
  const SEL_OPEN =
    '#detail > section._2Yx3YP9V._3v4W38Hq > div > ul > li:nth-child(2) > dl > dd > span._1fofaCjs._2aohzPlv._1DMRub9m > span > span'
  const SEL_HIGH =
    '#detail > section._2Yx3YP9V._3v4W38Hq > div > ul > li:nth-child(3) > dl > dd > span._1fofaCjs._2aohzPlv._1DMRub9m > span > span'
  const SEL_LOW =
    '#detail > section._2Yx3YP9V._3v4W38Hq > div > ul > li:nth-child(4) > dl > dd > span._1fofaCjs._2aohzPlv._1DMRub9m > span > span'

  const getPrice = async (tickerSymbol) => {
    await page.goto(`https://finance.yahoo.co.jp/quote/${tickerSymbol}.T`)
    await page.waitForSelector(SEL_CURRENT)

    const current = await page.$eval(SEL_CURRENT, (e) => e.textContent)
    const close = await page.$eval(SEL_CLOSE, (e) => e.textContent)
    const open = await page.$eval(SEL_OPEN, (e) => e.textContent)
    const high = await page.$eval(SEL_HIGH, (e) => e.textContent)
    const low = await page.$eval(SEL_LOW, (e) => e.textContent)

    return { current, close, open, high, low }
  }

  // 各種価格をまとめて取得
  const toyotaPrice = await getPrice(TOYOTA_SYMBOL)
  const hondaPrice = await getPrice(HONDA_SYMBOL)

  // 各種価格を表示する関数
  const printPrice = (price, companyName) => {
    console.log('-----------------')
    console.log(`${companyName}:`)
    console.log(`現在価格：${price.current}`)
    console.log(`前日終値：${price.close}`)
    console.log(`始値：${price.open}`)
    console.log(`高値：${price.high}`)
    console.log(`安値：${price.low}`)
  }

  // 対象の数字を表示
  printPrice(toyotaPrice, 'トヨタ')
  printPrice(hondaPrice, 'ホンダ')

  // ブラウザを閉じる
  await browser.close()
})()

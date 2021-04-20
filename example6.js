const puppeteer = require('puppeteer')
const fs = require('fs')

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

  // 要素を取得して、内容を数値として（カンマを取り除いて）返す関数
  const getTextContentAsNumber = async (page, selector) => {
    const content = await page.$eval(selector, (e) => e.textContent)
    return Number(content.replace(/,/g, ''))
  }

  const getPrice = async (tickerSymbol) => {
    await page.goto(`https://finance.yahoo.co.jp/quote/${tickerSymbol}.T`)
    await page.waitForSelector(SEL_CURRENT)

    const current = await getTextContentAsNumber(page, SEL_CURRENT)
    const close = await getTextContentAsNumber(page, SEL_CLOSE)
    const open = await getTextContentAsNumber(page, SEL_OPEN)
    const high = await getTextContentAsNumber(page, SEL_HIGH)
    const low = await getTextContentAsNumber(page, SEL_LOW)
    const diff = current - close

    return { current, close, open, high, low, diff }
  }

  // 各種価格をまとめて取得
  const toyotaPrice = await getPrice(TOYOTA_SYMBOL)
  const hondaPrice = await getPrice(HONDA_SYMBOL)

  // CSV ファイルのヘッダを作る
  fs.writeFileSync(
    './data.csv',
    '\uFEFF銘柄,現在価格,前日終値,始値,高値,安値,本日の変動\n' // \uFEFF は Excel で開けるようにするおまじない
  )

  // ファイルに CSV として書き込む関数
  const appendToFile = (price, companyName) => {
    const line = `${companyName},${price.current},${price.close},${price.open},${price.high},${price.low},${price.diff}\n`
    fs.appendFileSync('./data.csv', line, 'utf8')
  }

  // CSV でファイルに書き込み
  appendToFile(toyotaPrice, 'トヨタ')
  appendToFile(hondaPrice, 'ホンダ')

  console.log('CSVファイル書き込み完了！')

  // ブラウザを閉じる
  await browser.close()
})()

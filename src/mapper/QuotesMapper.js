import { isEmpty } from 'lodash'

const keysMapper = {

  // основные показатели
  pe: 'trailingPE', // отношение цены актива к чистой прибыли актива (за какой период?)
  peg: 'pegRatio', //?
  pb: 'priceToBook', // отношение цены к расчетной стоймости актива (за какой период?)
  bookValue: 'bookValue', // расчетная стоймость актива

  //описание актива
  name: 'shortName',
  ticker: 'symbol',
  type: 'quoteType', // тип инструмента
  currency: 'currency', //валюта инструмента

  // изменение цены
  dayChange: 'regularMarketChange', //изменение за день в валюте инструмента
  percentDayChange: 'regularMarketChangePercent', //изменение за день в процентах
  price: 'regularMarketPrice',
  low52Week: 'fiftyTwoWeekLow',
  high52Week: 'fiftyTwoWeekHigh',
  highDay: 'dayHigh',
  lowDay: 'dayLow',

  //дивиденды
  dividend: 'dividendRate',
  dividendPercent: 'dividendYield',

}

const switchedKeysMapper = Object.entries(keysMapper)
  .reduce((acc, [key, value]) => ({ ...acc, [value]: key }), {})

function yahooQuoteMapper (yahooResponseObject) {
  const yahooQuoteObject = yahooResponseObject.quoteSummary.result[0]
  return getMergedObject(yahooQuoteObject)
}

function getMergedObject (object) {
  return Object.entries(object)
    .reduce((acc, [key, value]) => ({ ...acc, ...value }), {})
}

function filterAndMapKeys (object) {
  return Object.entries(object)
    .filter(([key, value]) => switchedKeysMapper.hasOwnProperty(key))
    .reduce((acc, [key, value]) => ({ ...acc, [switchedKeysMapper[key]]: value }), {})
}

export function mapQuote (quote, raw) {
  if (isEmpty(quote)) {
    return null
  }
  const prettyQuote = yahooQuoteMapper(quote)
  const filteredKeysQuote = filterAndMapKeys(prettyQuote)
  return raw ? prettyQuote : filteredKeysQuote
}


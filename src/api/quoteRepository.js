import axios from 'axios'

const host = '/api'


// 'https://query1.finance.yahoo.com/v1/finance/search?q=T&quotesCount=6&newsCount=0'
// https://query2.finance.yahoo.com/v10/finance/quoteSummary/T?modules=price,summaryDetail,defaultKeyStatistics
const api = {
  urls:{
    singleQuote: (ticker) => `/v10/finance/quoteSummary/${ticker}`,
    search: '/v1/finance/search'
  },
  host: host
}


export const getQuote = (ticker) => {
  return axios.get(api.host + api.urls.singleQuote(ticker),
    { params: { modules: 'price,summaryDetail,defaultKeyStatistics' } })
}

export const search = (searchString, amount) => {
  return axios.get(api.host + api.urls.search,
    { params: { q: searchString, quotesCount: amount, newsCount: 0 } }
  )
}

import { actionEnum, actionNames, getCommitName } from './storeHelper'
import { getQuote } from '../api/quoteRepository'
import { mapQuote } from '../mapper/QuotesMapper'
import Vue from 'vue'

const QUOTE_DATA_LOADING = getCommitName(actionNames.QUOTES_DATA, actionEnum.LOADING)
const QUOTE_DATA_SUCCESS = getCommitName(actionNames.QUOTES_DATA, actionEnum.SUCCESS)
const QUOTE_DATA_ERROR = getCommitName(actionNames.QUOTES_DATA, actionEnum.ERROR)
const QUOTE_DATA_REMOVE = getCommitName(actionNames.QUOTES_DATA, actionEnum.REMOVE)

const ADD_USER_QUOTE = getCommitName(actionNames.USER_QUOTE, actionEnum.SUCCESS)
const REMOVE_USER_QUOTE = getCommitName(actionNames.USER_QUOTE, actionEnum.REMOVE)

const quoteStore = {
  state: {
    quotesData: {},
    userQuotes: new Set(),
  },
  mutations: {
    [ADD_USER_QUOTE]: (state, ticker) => {
      const userQuotesCopy = new Set([...state.userQuotes])
      userQuotesCopy.add(ticker)
      Vue.set(state, 'userQuotes', userQuotesCopy)
    },
    [REMOVE_USER_QUOTE]: (state, ticker) => {
      const userQuotesCopy = new Set([...state.userQuotes])
      userQuotesCopy.delete(ticker)
      Vue.set(state, 'userQuotes', userQuotesCopy)
    },

    [QUOTE_DATA_LOADING]: (state, ticker) => {
      const quotesDataCopy = { ...state.quotesData }
      quotesDataCopy[ticker] = { isLoading: true }
      Vue.set(state, 'quotesData', quotesDataCopy)
    },
    [QUOTE_DATA_SUCCESS]: (state, { quote, ticker }) => {
      const quotesDataCopy = { ...state.quotesData }
      quotesDataCopy[ticker] = { data: quote, mapped: mapQuote(quote, true), filtered: mapQuote(quote, false) }
      Vue.set(state, 'quotesData', quotesDataCopy)
    },
    [QUOTE_DATA_ERROR]: (state, { error, ticker }) => {
      const quotesDataCopy = { ...state.quotesData }
      quotesDataCopy[ticker] = { isError: true, error: error }
      Vue.set(state, 'quotesData', quotesDataCopy)
    },
    [QUOTE_DATA_REMOVE]: (state, ticker) => {
      const quotesDataCopy = { ...state.quotesData }
      delete quotesDataCopy[ticker]
      Vue.set(state, 'quotesData', quotesDataCopy)
    },
  },
  actions: {
    addQuote: (context, ticker) => addQuote(context, ticker),
    removeQuote: ({commit}, ticker) => {
      commit(REMOVE_USER_QUOTE, ticker);
      commit(QUOTE_DATA_REMOVE, ticker);
    }
  },
  getters: {
    getQuotes: ({ quotesData }) => quotesData,
    getUserQuotes: ({ userQuotes }) => userQuotes,
  }
}

const addQuote = ({ commit }, ticker) => {

  commit(ADD_USER_QUOTE, ticker)
  commit(QUOTE_DATA_LOADING, ticker)

  const quotePromise = getQuote(ticker)

  console.log('Promise reponse: ', quotePromise)
  quotePromise
    .then(response => commit(QUOTE_DATA_SUCCESS, { quote: response.data, ticker }))
    .catch(error => commit(QUOTE_DATA_ERROR, { error, ticker }))
}

export default quoteStore

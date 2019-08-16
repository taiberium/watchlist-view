import { actionEnum, actionNames, getCommitName } from './storeHelper'
import { getQuote } from '../api/quoteRepository'
import { mapQuote } from '../mapper/QuotesMapper'

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
    [ADD_USER_QUOTE]: (state, ticker) => state.userQuotes.add(ticker),
    [REMOVE_USER_QUOTE]: (state, ticker) => state.userQuotes.delete(ticker),

    [QUOTE_DATA_LOADING]: (state, ticker) => state.quotesData[ticker] = { isLoading: true },
    [QUOTE_DATA_SUCCESS]: (state, { quote, ticker }) => state.quotesData[ticker] = {
      data: quote,
      mapped: mapQuote(quote, true),
      filtered: mapQuote(quote, false)
    },
    [QUOTE_DATA_ERROR]: (state, { error, ticker }) => state.quotesData[ticker] = ({
      isError: true,
      error: error
    }),
    [QUOTE_DATA_REMOVE]: (state, ticker) => delete state.quotesData[ticker],

  },
  actions: {
    addQuote: (context, ticker) => addQuote(context, ticker),
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

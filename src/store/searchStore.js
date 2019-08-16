import { actionEnum, actionNames, getCommitName } from './storeHelper'
import { search } from '../api/quoteRepository'


const SEARCH_LOADING = getCommitName(actionNames.SEARCH, actionEnum.LOADING)
const SEARCH_SUCCESS = getCommitName(actionNames.SEARCH, actionEnum.SUCCESS)
const SEARCH_ERROR = getCommitName(actionNames.SEARCH, actionEnum.ERROR)

const searchStore = {
  state: {
    search: {},
  },
  mutations: {
    [SEARCH_LOADING]: (state) => state.search = { isLoading: true },
    [SEARCH_SUCCESS]: (state, data) => state.search = { data: data },
    [SEARCH_ERROR]: (state, errorString) => state.search = { isError: true, error: errorString },
  },
  actions: {
    searchQuotesData: (context, searchString) => searchQuotesData(context, searchString),
  },
  getters: {
    getSearchQuote: (state) => state.search,
  }
}

const searchQuotesData = ({ commit }, searchString) => {

  commit(SEARCH_LOADING)

  search(searchString, 6)
    .then(data => commit(SEARCH_SUCCESS, data))
    .catch(errorInfo => commit(SEARCH_ERROR, errorInfo))
}

export default searchStore

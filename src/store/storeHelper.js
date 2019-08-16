
const SEPARATOR = '_'

export const actionEnum = {
  ERROR: 'ERROR',
  LOADING: 'LOADING',
  SUCCESS: 'SUCCESS',
  REMOVE: 'REMOVE'
}

export const actionNames = {
  SEARCH: 'searchStore.js',
  QUOTES_DATA: 'quotesData',
  USER_QUOTE: 'userQuote',

}

export const getCommitName = (actionName, actionEnum) => actionName + SEPARATOR + actionEnum

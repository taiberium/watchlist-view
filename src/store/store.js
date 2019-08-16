import Vue from 'vue'
import Vuex from 'vuex'
import quoteStore from './quoteStore'
import searchStore from './searchStore'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { quoteStore, searchStore, }
})



import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import HelloWorld from '@/components/HelloWorld.vue'
import { mapQuote } from '../../src/mapper/QuotesMapper'
import jsonResponse from './quote.response'

/*describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })6
    expect(wrapper.text()).to.include(msg)
  })
})*/

describe('Mapping test', () => {
  it('Should map to raw from quote reponse', () => {

    const quoteReponse = mapQuote(jsonResponse, true)
    console.log('Response : ', quoteReponse)

    expect(quoteReponse).to.include('test')
  })
})

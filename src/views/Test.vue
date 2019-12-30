<template>
  <div class="test">
    <label>
      Input some text bro:
      <input v-model="message">
    </label>
<!--    <p>Message is: {{ message }}</p>-->
    <button v-on:click="addQuote">Нажми для консоли</button>

<!--    <ul>
      <li v-for="quoteName in userQuotes">
        {{ quoteName }}
      </li>
    </ul>-->



  </div>
</template>

<script>


  export default {
    name: 'test',
    data: () => ({ message: 'Input some value' }),
    computed: {
      quotes () {
        return this.$store.getters.getQuotes
      },
      userQuotes () {
        return this.$store.getters.getUserQuotes
      }
    },
    methods: {
      addQuote () {
        this.$store.dispatch('addQuote', this.message)
      }
    }
  }
</script>

<template>
  <div class="test">
    <label>
      Input some text bro:
      <input v-model="message">
    </label>
    <p>Message is: {{ message }}</p>
    <button v-on:click="addQuote">Нажми для консоли</button>
  </div>
</template>

<script>


  export default {
    name: 'test',
    data: () => ({ message: 'Input some value' }),
    methods: {
      addQuote () {
        this.$store.dispatch('addQuote', this.message)
      }
    }
  }
</script>

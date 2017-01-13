<template>
  <div id="app">
    <kvk-input limit="5" v-on:kvkClicked="onKvkSelect"></kvk-input>
    <kvk-input limit="10" v-on:kvkClicked="onKvkSelect"></kvk-input>
  </div>
</template>

<script>
import KvkInput from './components/KvkInput'

export default {
  name: 'app',
  components: {
    KvkInput
  },
  data() {
    return {
      contactList: [
        { handelsnaam: 'Pietje Puk' },
        { handelsnaam: 'Jannick Berkhout' }
      ]
    }
  },
  methods: {
    onKvkSelect(result) {
      console.log(result.handelsnaam);
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

#app {
  display: flex;
}
</style>

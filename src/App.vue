<template>
  <div id="app">
    <kvk-input limit="5" v-on:kvkClicked="onKvkSelect"></kvk-input>
  </div>
</template>

<script>
import KvkInput from './components/KvkInput'

export default {
  name: 'app',
  components: {
    KvkInput
  },
  methods: {
    onKvkSelect(result) {
      console.log(result);
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
  width: 50%;
}
</style>

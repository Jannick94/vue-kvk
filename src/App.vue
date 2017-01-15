<template>
  <div id="app">
    <kvk-input limit="5" @kvkClicked="onKvkSelect"></kvk-input>
  </div>
</template>

<script>
export default {
  name: 'app',
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

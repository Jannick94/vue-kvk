<template>
  <div class="kvk-input-container">
    <input type="text"
           v-model="kvkInput"
           v-on:keyup="fetchResults()"
           v-on:focus="kvkShown = true"
    >

    <div class="kvk-input-results" v-if="kvkResults.length && kvkShown">
      <ul>
        <li v-for="optional in optionalData" v-if="optionalData.length && kvkShown">
          {{ optional.handelsnaam }}
        </li>
        <li v-for="result in kvkResults" @click="selectResult(result)">
          {{ result.handelsnaam }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'kvk-input',
  props: {
    limit: {
      default: 5
    },
    optionalData: {
      type: Array
    }
  },
  data () {
    return {
      api: 'https://zoeken.kvk.nl/Address.ashx?site=handelsregister&partialfields=&q=',
      kvkShown: false,
      kvkInput: '',
      kvkResults: [],
    }
  },
  methods: {
    fetchResults() {
      axios.get(`${this.api}${this.kvkInput}`)
        .then((result) => {
          this.kvkShown   = true;
          this.kvkResults = result.data.resultatenHR.slice(0, this.limit);
        });
    },
    selectResult(result) {
      this.$emit('kvkClicked', result);
      this.kvkShown = false;
    }
  }
}
</script>

<style lang="scss" scoped>
  .kvk-input-container {
    position: relative;

    input {
      padding: 5px;
      font-size: 13px;
      width: 100%;
    }

    .kvk-input-results {
      width: 100%;
      position: absolute;
      border: 1px solid #eee;
      box-shadow: 0px 5px 12px 0px rgba(0,0,0,0.2);

      ul {
        list-style: none;
        padding-left: 0px;
        margin: 0;

        li {
          padding: 10px;
          background-color: #fff;
          transition: background-color .15s ease-in-out;
          cursor: pointer;

          &:hover {
            background-color: #ddd;
          }

          &:nth-child(even) {
            background-color: #eee;
          }
        }
      }
    }
  }
</style>
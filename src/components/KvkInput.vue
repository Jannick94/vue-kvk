<template>
  <div class="kvk-input-container">
    <input type="text"
           v-model="kvkInput"
           @keyup="fetchResults($event);
                   handleListNavigation($event)
                   handleListSelection($event)"
           @focus="kvkShown = true"
    >

    <div class="kvk-input-results" v-if="kvkResults.length && kvkShown">
      <ul>
        <li v-for="(result, index) in kvkResults"
            @click="selectResult(result)"
            :class="{ selected: (kvkSelected == index) }"
        >
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
      keycodes: [40,38,37,39,9,17,18,16,93,91,13],
      kvkShown: false,
      kvkInput: '',
      kvkResults: [],
      kvkSelected: 0
    }
  },
  watch: {
    kvkSelected() {
      if (this.kvkSelected > (this.limit - 1)) this.kvkSelected = 0;
      if (this.kvkSelected < 0) this.kvkSelected = (this.limit - 1);
    }
  },
  methods: {
    fetchResults(event) {
      if (!this.keycodes.includes(event.keyCode)) {
        axios.get(`${this.api}${this.kvkInput}`)
          .then((result) => {
            this.kvkShown   = true;
            this.kvkResults = result.data.resultatenHR.slice(0, this.limit);
          });
      }
    },
    handleListNavigation(event) {
      if (event.keyCode == 40) this.kvkSelected++;
      if (event.keyCode == 38) this.kvkSelected--;
    },
    handleListSelection(event) {
      if (event.keyCode == 13) {
        this.$emit('kvkClicked', this.kvkResults[this.kvkSelected]);

        this.kvkInput     = this.kvkResults[this.kvkSelected].handelsnaam;
        this.kvkShown     = false;
        this.kvkSelected  = 0;
      }
    },
    selectResult(result) {
      this.$emit('kvkClicked', result);
      this.kvkInput     = result.handelsnaam;
      this.kvkShown     = false;
      this.kvkSelected  = 0;
    }
  }
}
</script>

<style lang="scss" scoped>
  .kvk-input-container {
    position: relative;
    width: 100%;

    input {
      padding: 5px;
      font-size: 13px;
      width: 100%;
    }

    .kvk-input-results {
      width: 100%;
      position: absolute;
      box-shadow: 0px 5px 12px 0px rgba(0,0,0,0.2);

      ul {
        list-style: none;
        padding-left: 0px;
        margin: 0;

        li {
          padding: 10px;
          background-color: #fff;
          transition: all .15s ease-in-out;
          cursor: pointer;

          &:nth-child(even) {
            background-color: #EEE;
          }

          &:hover {
            background-color: #DDD;
          }

          &.selected {
            background-color: #1BBC9B;
            color: #FFF;

            &:hover {
              background-color: #1BBC9B;
            }
          }
        }
      }
    }
  }
</style>
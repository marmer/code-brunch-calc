<template>
  <b-container>
    <b-form-input type="text" v-model="fancyValue"></b-form-input>
    <b-button @click="addSomethingToTheValue()">Add something to the fancyValue</b-button>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CodeBrunchCalculator extends Vue {
  private fancyValue = '42'

  addSomethingToTheValue (): void {
    this.fancyValue = this.fancyValue + 'noch was'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

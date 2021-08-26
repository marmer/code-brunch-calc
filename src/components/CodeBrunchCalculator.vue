<template>
<!--  todo inner data range picker component-->
  <b-container>
    <b-row>
      <b-col>
        <b-form-group label="start">
          <b-form-datepicker
            v-model="startDate"
            locale="de" start-weekday="0"/>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="end">
          <b-form-datepicker
            v-model="endDate"
            locale="de" start-weekday="0"/>
        </b-form-group>
      </b-col>
    </b-row>
    <b-form-input v-model="fancyValue" type="text"></b-form-input>
    <b-button @click="addSomethingToTheValue()">Add something to the fancyValue</b-button>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CodeBrunchCalculator extends Vue {
  private fancyValue = '42'
  private startDate = '2021-01-01' // TODO: marmer 26.08.2021 First day of current year
  private endDate = '2021-12-31' // TODO: marmer 26.08.2021 Last day of current year

  addSomethingToTheValue (): void {
    this.fancyValue = this.fancyValue + 'noch was'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

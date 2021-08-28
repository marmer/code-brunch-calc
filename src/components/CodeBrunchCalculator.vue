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
    <b-form-input :value="fancyValue" type="text"></b-form-input>
    <div>
      Value: {{ fancyValue }}
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CodeBrunchCalculator extends Vue {
  private startDate = '2021-01-01' // TODO: marmer 26.08.2021 First day of current year
  private endDate = '2021-12-31' // TODO: marmer 26.08.2021 Last day of current year

  get fancyValue (): string {
    return `${this.startDate} - ${this.endDate}`
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

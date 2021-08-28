<template>
  <b-container>
    <DateRange v-model="range"/>
    <b-form-input :value="fancyValue" type="text"></b-form-input>
    <div>
      Value: {{ fancyValue }}
    </div>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DateRange from '@/components/DateRange.vue'

@Component({
  components: {
    DateRange
  }
})
export default class CodeBrunchCalculator extends Vue {
  private range = {
    startDate: '2021-01-01', // TODO: marmer 26.08.2021 First day of current year
    endDate: '2021-12-31' // TODO: marmer 26.08.2021 Last day of current year
  }

  get fancyValue (): string {
    return `${this.range.startDate} - ${this.range.endDate}`
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

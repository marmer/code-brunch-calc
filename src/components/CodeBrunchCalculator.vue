<template>
  <b-container>
    <DateRange v-model="range"/>
    <CompanyEventTable :range="range"/>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import DateRange from '@/components/DateRange.vue'
import CompanyEventTable from '@/components/CompanyEventTable.vue'

@Component({
  components: {
    DateRange,
    CompanyEventTable
  }
})
export default class CodeBrunchCalculator extends Vue {
  private range = {
    startDate: new Date(2021, 0, 1),
    endDate: new Date(2021, 11, 31)
  }

  get fancyValue (): string {
    return `${this.range.startDate} - ${this.range.endDate}`
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

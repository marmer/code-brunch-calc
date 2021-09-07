<template>
    <b-card title="Company Events">
      <DateRange v-model="range"/>
      <b-card-body>
        <CompanyEventTable :range="range"/>
      </b-card-body>
    </b-card>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import DateRange from '@/components/DateRange.vue'
import CompanyEventTable from '@/components/CompanyEventTable.vue'
import { Route } from 'vue-router'
import formatISO from 'date-fns/formatISO'
import { parseISO } from 'date-fns'
import { DateRange as Range } from '@/use-cases/CompanyEventsProvider'

const currentYear = new Date().getFullYear()

@Component({
  components: {
    DateRange,
    CompanyEventTable
  }
})
export default class CodeBrunchCalculator extends Vue {
  get defaultStartDate (): Date {
    return new Date(currentYear, 0, 1)
  }

  get defaultEndDate (): Date {
    return new Date(currentYear, 11, 31)
  }

  private range = {
    startDate: this.defaultStartDate,
    endDate: this.defaultEndDate
  }

  @Watch('$route', {
    immediate: true,
    deep: true
  })
  onUrlChange ({
    query: {
      startDate,
      endDate
    }
  }: Route): void {
    this.range = {
      startDate: typeof startDate === 'string' ? parseISO(startDate) : this.defaultStartDate,
      endDate: typeof endDate === 'string' ? parseISO(endDate) : this.defaultEndDate
    }
  }

  @Watch('range', {
    deep: true
  })
  onRangeChange ({
    startDate,
    endDate
  }: Range): void {
    const oldQuery = this.$route.query
    const newQuery = {
      ...this.$route.query,
      startDate: formatISO(startDate, { representation: 'date' }),
      endDate: formatISO(endDate, { representation: 'date' })
    }
    if (JSON.stringify(oldQuery) !== JSON.stringify(newQuery)) {
      this.$router.push({
        query: newQuery
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>

<template>
  <b-table striped hover :items="companyEvents"/>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { DateRange, getEvents, updateLegalHolidays } from '@/use-cases/CompanyEventsProvider'
import formatISO from 'date-fns/formatISO'
import { CompanyEventType } from '@/use-cases/domain/CodeBrunchCalc'

@Component
export default class CompanyEventTable extends Vue {
  @Prop() private range!: {
    startDate: Date,
    endDate: Date
  }

  private companyEvents: Array<{ date: string, eventType: string }> = []

  async mounted (): Promise<void> {
    await this.updateContent()
  }

  @Watch('range', { deep: true })
  async onRangeChange (newValue: DateRange, oldValue: DateRange) {
    if (newValue !== oldValue) {
      await this.updateContent()
    }
  }

  private async updateContent () {
    await this.updateEventTable()
    try {
      await this.tryUpdateLocalHolidays()
      await this.updateEventTable()
    } catch (e) {
      console.error(e)
    }
  }

  private tryUpdateLocalHolidays () {
    return updateLegalHolidays(this.range.startDate.getFullYear(), this.range.endDate.getFullYear())
  }

  private updateEventTable () {
    return getEvents(this.range)
      .then(companyEvents => {
        this.companyEvents = companyEvents.map((it) => ({
          date: formatISO(it.date, { representation: 'date' }),
          eventType: toTypeDisplayValue(it.type)
        }))
      })
  }
}

function toTypeDisplayValue (type: CompanyEventType) {
  switch (type) {
    case 'CodeBrunch':
      return 'Code Brunch'
    case 'InnovationFriday':
      return 'Innovation Friday'
    default:
      return type
  }
}
</script>

<style scoped>

</style>

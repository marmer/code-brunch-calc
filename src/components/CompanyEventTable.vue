<template>
  <b-container>
    <b-alert
      title="Errormessage"
      :show="errorMessage ? 5:0"
      variant="danger"
      fade
      @dismissed="clearErrorMessage"
    >
      {{ errorMessage }}
    </b-alert>
    <b-checkbox v-model="includeAllEventTypes">
      Include all event types
    </b-checkbox>
    <b-table striped hover :items="includeAllEventTypes ? companyEvents : codeBrunchOnlyEvents "/>
  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { getEvents, updateLegalHolidays } from '@/use-cases/CompanyEventsProvider'
import { CompanyEvent, CompanyEventType } from '@/use-cases/domain/CodeBrunchCalc'
import { format } from 'date-fns'

@Component
export default class CompanyEventTable extends Vue {
  @Prop() private range!: {
    startDate: Date,
    endDate: Date
  }

  private errorMessage: string | null = null

  private includeAllEventTypes = true

  private companyEvents: Array<{ date: string, eventType: string }> = []
  private codeBrunchOnlyEvents: Array<{ date: string, eventType: string }> = []

  async mounted (): Promise<void> {
    await this.updateContent()
  }

  private clearErrorMessage () {
    this.errorMessage = null
  }

  @Watch('range', { deep: true })
  async onRangeChange (): Promise<void> {
    await this.updateContent()
  }

  private async updateContent () {
    await this.updateEventTable()
    try {
      await this.tryUpdateLocalHolidays()
      await this.updateEventTable()
    } catch (e) {
      this.errorMessage = `${e}`
    }
  }

  private async tryUpdateLocalHolidays () {
    return updateLegalHolidays(this.range.startDate.getFullYear(), this.range.endDate.getFullYear())
  }

  private async updateEventTable () {
    const companyEvents = await getEvents(this.range)
    this.companyEvents = companyEvents.map(CompanyEventTable.toTableRow)
    this.codeBrunchOnlyEvents = companyEvents.filter(it => it.type === 'CodeBrunch')
      .map(CompanyEventTable.toTableRow)
  }

  private static toTableRow (it: CompanyEvent) {
    return {
      date: format(it.date, 'dd.MM.yyyy'),
      eventType: toTypeDisplayValue(it.type)
    }
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

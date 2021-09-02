<template>
  <b-container>
    <b-form-group label="Company Events">
      <b-table striped hover :items="companyEvents"/>
    </b-form-group>

  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { getEvents } from '@/use-cases/CompanyEventsProvider'
import formatISO from 'date-fns/formatISO'
import { CompanyEventType } from '@/use-cases/domain/CodeBrunchCalc'

@Component
export default class CompanyEventTable extends Vue {
  @Prop() private range!: {
    startDate: Date,
    endDate: Date
  }

  private companyEvents: Array<{ date: string, eventType: string }> = []

  mounted () {
    getEvents(this.range)
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

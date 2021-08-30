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

@Component
export default class CompanyEventTable extends Vue {
  @Prop() private range!: {
    startDate: string,
    endDate: string
  }

  get companyEvents () {
    return getEvents(this.range).map(it => ({
      date: formatISO(it.date, { representation: 'date' }),
      eventType: it.type
    }))
  }
}
</script>

<style scoped>

</style>

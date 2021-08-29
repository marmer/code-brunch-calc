<template>
  <b-container>
    <b-form-group label="Company Events">
      <b-table>
        go on here!!!!!!!!!!<<!!!---
      </b-table>
    </b-form-group>

  </b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class CompanyEventTable extends Vue {
  @Prop() private range!: {
    startDate: string,
    endDate: string
  }
}
</script>

<style scoped>

</style>

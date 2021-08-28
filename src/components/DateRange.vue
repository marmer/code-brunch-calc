<template>
<span>
      <b-row>
      <b-col>
        <b-form-group label="start">
          <b-form-datepicker
            v-model="value.startDate"
            locale="de" start-weekday="0"/>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="end">
          <b-form-datepicker
            v-model="value.endDate"
            locale="de" start-weekday="0"/>
        </b-form-group>
      </b-col>
    </b-row>
    </span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DateRange extends Vue {
  @Prop() private value!: {
    startDate: string,
    endDate: string
  }
}
</script>

<style scoped>

</style>

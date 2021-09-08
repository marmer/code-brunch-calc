<template>
<span>
      <b-row>
      <b-col>
        <b-form-group label="Start Date" label-for="startDate">
          <b-form-datepicker
            id="startDate"
            v-model="value.startDate"
            start-weekday="0"
            title="Start Date"
            value-as-date/>
        </b-form-group>
      </b-col>
      <b-col>
        <b-form-group label="End Date" label-for="endDate">
          <b-form-datepicker
            id="endDate"
            v-model="value.endDate"
            start-weekday="0"
            title="End Date"
            value-as-date/>
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

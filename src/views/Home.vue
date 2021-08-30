<template>
  <b-container>
    <b-button @click="changeRoute">Query Param Value: {{ this.query }}</b-button>
    <CodeBrunchCalculator/>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import CodeBrunchCalculator from '@/components/CodeBrunchCalculator.vue'
import { Route } from 'vue-router'

@Component({
  components: {
    CodeBrunchCalculator
  }
})
export default class Home extends Vue {
  private query: string = this.$route.query.query

  mounted () {
    console.log('Mounted: ' + this.query)
  }

  updated () {
    console.log('Updated: ' + this.query)
  }

  @Watch('$route', {
    immediate: true,
    deep: true
  })
  onUrlChange (newVal: Route) {
    this.query = newVal.query.query
    console.log('onUrlChange: ' + this.query)
  }

  changeRoute () {
    this.$router.push({
      path: 'blubba',
      query: {
        query: 'wurst'
      }
    })
  }
}
</script>

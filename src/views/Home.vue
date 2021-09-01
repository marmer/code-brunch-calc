<template>
  <b-container>
    <CodeBrunchCalculator/>
  </b-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import CodeBrunchCalculator from '@/components/CodeBrunchCalculator.vue'

@Component({
  components: {
    CodeBrunchCalculator
  }
})
export default class Home extends Vue {
}
</script>

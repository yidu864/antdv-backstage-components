<template>
  <div class="edit-label-example">edit-label-example</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

/**
 * example for core-component edit-label
 */
@Component({ name: 'edit-label-example' })
export default class EditLabelExample extends Vue {
  created() {}
  mounted() {}
}
</script>

<style lang="scss" scoped>
.edit-label-example {
  width: 100%;
  height: 100%;
}
</style>

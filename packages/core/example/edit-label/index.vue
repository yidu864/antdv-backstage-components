<template>
  <div class="edit-label-example">
    <edit-label class="edit-label-example-comp" :value.sync="value"></edit-label>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditLabel from '~/core/components/edit-label/index.vue'

/**
 * example for core-component edit-label
 */
@Component({ name: 'edit-label-example', components: { EditLabel } })
export default class EditLabelExample extends Vue {
  value = 'init'
}
</script>

<style lang="scss" scoped>
.edit-label-example {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &-comp {
    width: 100px;
    border: 1px solid #00000010;
  }
}
</style>

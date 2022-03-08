<template>
  <div class="enum-example">
    <enum></enum>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Enum from '~/core/components/enum/index'

/**
 * example for core-component enum
 */
@Component({ name: 'enum-example', components: { Enum } })
export default class EnumExample extends Vue {}
</script>

<style lang="scss" scoped>
.enum-example {
  width: 100%;
  height: 100%;
}
</style>

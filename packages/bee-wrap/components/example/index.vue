<template>
  <!--
    none
  -->
  <div class="example"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

/**
 * ceshi
 * @author xyt
 *
 * @input none
 * @output none
 */
@Component({ name: 'example' })
export default class Example extends Vue {}
</script>

<style lang="scss" scoped>
.example {
  width: 100%;
  height: 100%;
}
</style>

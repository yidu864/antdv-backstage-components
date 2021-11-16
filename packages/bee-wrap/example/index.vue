<template>
  <!--
    测试用
  -->
  <div class="test">test</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

/**
 * 测试
 * @author xyt
 *
 * @input none
 * @output none
 */
@Component({ name: 'test' })
export default class Test extends Vue {}
</script>

<style lang="scss" scoped>
.test {
  width: 100%;
  height: 100%;
}
</style>

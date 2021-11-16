<template>
  <!--
    CORE-TEST
  -->
  <div class="core-test">core-test</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

/**
 * core 库测试环境
 * @author xyt
 *
 * @input none
 * @output none
 */
@Component({ name: 'core-test' })
export default class CoreTest extends Vue {
  // created() {}
  // mounted() {}
}
</script>

<style lang="scss" scoped>
.core-test {
  width: 100%;
  height: 100%;
}
</style>

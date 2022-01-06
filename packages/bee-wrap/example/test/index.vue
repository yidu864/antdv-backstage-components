<template>
  <!--
    test
  -->
  <div class="test">test</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

/**
 * test
 * @author xyt
 *
 * @input none
 * @output none
 */
@Component({ name: 'test' })
export default class Test extends Vue {
  created() {}
  mounted() {}
}
</script>

<style lang="scss" scoped>
.test {
  width: 100%;
  height: 100%;
}
</style>

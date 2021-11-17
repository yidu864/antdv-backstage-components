<template>
  <!--
    CORE-TEST
  -->
  <div class="core-test">
    <div class="core-test-wrap">
      <edit-label v-model="value"></edit-label>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EditLabel from '../components/edit-label/index.vue'

/**
 * core 库测试环境
 * @author xyt
 *
 * @input none
 * @output none
 */
@Component({ name: 'core-test', components: { EditLabel } })
export default class CoreTest extends Vue {
  value = 'test'
}
</script>

<style lang="scss" scoped>
.core-test {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &-wrap {
    width: 300px;
  }
}
</style>

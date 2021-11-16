<template>
  <!--
    页面切换
  -->
  <div class="page-sw">
    <div class="page-sw-title">please select your target package</div>
    <a class="page-sw-item" @click="() => $router.push('/core-example')">core</a>
    <a class="page-sw-item" @click="() => $router.push('/wrap-example')">bee-acm-wrap</a>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

/**
 * 页面切换
 * @author xyt
 *
 * @input none
 * @output none
 */
@Component({ name: 'page-sw' })
export default class PageSw extends Vue {
  // created() {}
  // mounted() {}
}
</script>

<style lang="scss" scoped>
.page-sw {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  &-title {
    width: 100%;
    font-size: 40px;
    line-height: 1;
    text-align: center;
  }
  &-item {
    margin-right: 10px;
    font-size: 20px;
    color: lightcoral;
    text-decoration: underline;
    cursor: pointer;
  }
}
</style>

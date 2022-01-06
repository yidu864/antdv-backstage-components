<template>
  <!--
    测试用
  -->
  <div class="test">
    <div class="test-btn">
      <span class="test-btn-text">我是一个按钮</span>
    </div>
  </div>
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
@keyframes test {
  0% {
    clip-path: circle(0 at 0 0);
  }
  100% {
    clip-path: circle(150% at 0 0);
  }
}

.test {
  width: 100%;
  height: 100%;
  background-color: #00000080;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  &-btn {
    display: inline-block;
    position: relative;
    line-height: 1.8;
    font-size: 18px;
    padding: 0 20px;
    background-color: #f5f5f5;
    color: #555;
    border-radius: 10px;
    cursor: pointer;
    overflow: hidden;
    &-text {
      z-index: 1;
    }
    &::after {
      content: '';
      position: absolute;
      display: block;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      z-index: 0;
      background-color: #cdcdcd;
      animation: test 3s infinite linear;
      // background-color: #000;
    }
  }
}
</style>

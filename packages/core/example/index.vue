<template>
  <!--
    CORE-TEST
  -->
  <a-layout class="core-example">
    <a-layout-header class="core-example-header">
      <div class="logo">component</div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['2']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1"> core </a-menu-item>
        <a-menu-item key="2"> wrap </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content class="core-example-wrap">
      <div class="left-section">
        <div
          v-for="item in compList"
          :key="item.value"
          :class="['section-item', { 'section-item__active': item.value === checkComp }]"
          @click="checkComp = item.value"
        >
          {{ item.label }}
        </div>
      </div>
      <div class="right-content">
        <component v-if="comp" :is="comp" />
        <span v-else>暂无组件</span>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import compMap from './config'

/**
 * core 库测试环境
 * @author xyt
 *
 * @input none
 * @output none
 */
@Component({ name: 'core-test' })
export default class CoreTest extends Vue {
  // checked = 'test'

  get compList() {
    return Object.keys(compMap).map(v => ({ label: v, value: v }))
  }

  checkComp = this.compList[0].value

  get comp() {
    return compMap[this.checkComp]
  }
}
</script>

<style lang="scss" scoped>
.core-example {
  height: 100%;
  .logo {
    width: 120px;
    height: 31px;
    background: rgba(255, 255, 255, 0.2);
    margin: 16px 24px 16px 0;
    float: left;
    color: #fff;
    line-height: 31px;
    text-align: center;
  }
  &-header {
    position: fixed;
    z-index: 1;
    width: 100%;
  }
  &-wrap {
    padding: 74px 10px 10px 0;
    height: 100%;
    display: flex;
    .left-section {
      width: 250px;
      height: 100%;
      background-color: #fff;
      border-right: 1px solid #e8e8e8;
    }
    .right-content {
      flex: 1;
      box-sizing: border-box;
      padding: 10px;
    }
    .section-item {
      height: 40px;
      line-height: 40px;
      font-size: 14px;
      padding: 0 16px 0 40px;
      cursor: pointer;
      position: relative;
      &::before {
        content: '';
        display: block;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        transition: height 0.3s linear;
        height: 0%;
        background-color: #1890ff;
        visibility: hidden;
      }
      &__active {
        background-color: #e6f7ff;
        &:before {
          height: 100%;
          visibility: visible;
        }
      }
    }
  }
}
</style>

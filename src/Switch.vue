<template>
  <!--
    CORE-TEST
  -->
  <a-layout class="example">
    <a-layout-header class="example-header">
      <div class="logo">component</div>
      <a-menu v-model="packageKey" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item v-for="item in menus" :key="item" @click="onChangePackge(item)">
          {{ item }}
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content class="example-wrap">
      <div class="left-section">
        <div
          v-for="item in targetMenu"
          :key="item.path"
          :class="['section-item', { 'section-item__active': item.path === $route.path }]"
        >
          <!-- @click="checkComp = item.value" -->
          {{ item.label }}
        </div>
      </div>
      <div class="right-content">
        <router-view />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import menus from './menu'

@Component({ name: 'example' })
export default class ExampleWrap extends Vue {
  // checked = 'test'

  get menus() {
    return Object.keys(menus)
  }

  packageKey = [Object.keys(menus)[0]]

  get targetMenu() {
    return menus[this.packageKey[0]]
  }

  onChangePackge(key: string) {
    this.$router.push(menus[key][0].path)
  }
}
</script>

<style lang="scss" scoped>
.example {
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
      padding: 0 10px;
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

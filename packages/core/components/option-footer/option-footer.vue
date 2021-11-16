<template>
  <a-row class="option-footer-warapper">
    <a-button
      type="info"
      style="margin-right: 8px;"
      @click="$emit('cancel')"
      :loading="loading"
    >取消</a-button>
    <a-button
      type="primary"
      @click="$emit('ok')"
      :loading="loading"
    >确定</a-button>
  </a-row>
</template>
<script>
export default {
  // eslint-disable-next-line vue/name-property-casing
  name: 'option-footer',
  props: {
    /** 按钮加载状态 */
    loading: {
      type: Boolean,
      required: false,
      default: false
    }
  }
}
</script>
<style scoped>
.option-footer-warapper {
  padding: 10px 16px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgb(232, 232, 232);
}
</style>

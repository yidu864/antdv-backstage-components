<template>
  <div class="modal-head" @dblclick="$emit('fullScreen')">
    <div class="modal-head-label">
      {{ title }}
    </div>
    <div class="modal-head-options">
      <a-icon type="close" class="hover-blue" @click="() => $emit('close')" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'modal-head',
  props: { title: { default: '数据维护' } }
}
</script>
<style lang="scss" scoped>
.modal-head {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  font-size: 16px;
  color: #000;
  // border-bottom: 1px solid #e8e8e8;
}
.hover-blue {
  transition: color 0.3s linear;
  &:hover {
    color: rgb(64, 169, 255);
  }
}
</style>

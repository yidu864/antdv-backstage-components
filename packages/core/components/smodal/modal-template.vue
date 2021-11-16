<template>
  <a-modal
    :maskClosable="false"
    :class="['cus-modal', fscClass]"
    v-bind="$attrs"
    v-on="$listeners"
    :closable="false"
  >
    <div
      class="cus-modal-head"
      slot="title"
      v-if="!!title"
      @dblclick="$emit('fullScreen')"
    >
      <div class="cmh-label">
        {{ title }}
      </div>
      <div class="cmh-options">
        <a-icon
          :type="fullScreen ? 'fullscreen-exit' : 'fullscreen'"
          class="hover-blue"
          style="margin-right:10px;"
          v-if="fullScreen !== null"
          @click="() => $emit('fullScreen')"
        />
        <a-icon
          type="close"
          class="hover-blue"
          @click="() => $emit('close')"
        />
      </div>
    </div>
    <slot></slot>
  </a-modal>
</template>

<script>
import { Modal, Icon } from 'ant-design-vue'
export default {
  name: 'cus-modal',
  // eslint-disable-next-line vue/no-unused-components
  components: { AModal: Modal, AIcon: Icon },
  props: {
    /** 全屏, 如果为null则不显示全屏按钮 */
    fullScreen: {
      type: Boolean,
      required: false,
      default: false
    },
    /** 显示右上角关闭按钮 */
    closable: {
      type: Boolean,
      require: false
    },
    /** 标题 */
    title: {
      type: String,
      require: false,
      default: null
    }
  },
  computed: {
    fscClass: function() {
      // modal-height-limit
      return this.fullScreen ? 'cus-modal-fullsc' : 'cus-modal-content-limit'
    },
    fscIconName: function() {
      return this.fullScreen ? 'fullscreen' : 'fullscreen-exit'
    }
  }
}
</script>
<style lang="scss" scoped>
.cus-modal-head {
  display: flex;
  justify-content: space-between;
}
.hover-blue {
  transition: color 0.1s linear;
  &:hover {
    color: rgb(64, 169, 255);
  }
}
</style>

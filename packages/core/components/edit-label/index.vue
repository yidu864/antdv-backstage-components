<template>
  <div class="edit-label">
    <input
      v-show="isEdit"
      v-model="tempVal"
      type="text"
      class="edit-label-input"
      ref="edit-label-input"
      @keydown.enter="onUpdate"
      @blur="onUpdate"
    />
    <div v-show="!isEdit" class="edit-label-text" @dblclick="toggleEdit">{{ value }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Model, Vue, Watch } from 'vue-property-decorator'

/**
 * 可编辑的Label
 * @author xyt
 */
@Component({
  name: 'edit-label'
})
export default class EditLabel extends Vue {
  @Model('update:value', { required: true }) value!: string

  isEdit = false
  tempVal = ''

  @Watch('isEdit')
  onIsEditChange(nv: boolean) {
    if (!nv) return
    this.tempVal = this.value
    // @ts-ignore
    const ipt: HTMLInputElement = this.$refs['edit-label-input']
    ipt && this.$nextTick(() => ipt.focus())
  }

  mounted() {
    this.tempVal = this.value
  }

  /**
   * 切换edit 状态
   */
  toggleEdit() {
    this.isEdit = !this.isEdit
  }
  /** 更新value */
  onUpdate() {
    if (!this.isEdit) return
    this.isEdit = false
    this.$emit('update:value', this.tempVal)
  }
}
</script>

<style lang="scss" scoped>
.edit-label {
  position: relative;
  height: 1.5em;
  line-height: 1.5em;
  font-size: var(--edit-label-fz, 14px);
  &-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    height: 100%;
  }
  &-text::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
    width: 100%;
    height: 100%;
    background-color: #00000010;
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  &-text:hover:before {
    z-index: 1;
    opacity: 1;
  }
  &-input {
    font-size: var(--edit-label-fz, 14px);
    width: 100%;
    height: 100%;
    background-color: transparent;
    padding: 0;
    line-height: 1;
    border-image-width: 0;
    border: none;
    outline: none;
    box-sizing: border-box;
    transform: translateX(1px);
  }
}
</style>

<template>
  <div class="s-editlabel">
    <input
      v-show="isEdit"
      v-model="pval"
      type="text"
      class="s-editlabel-input"
      ref="s-editlabel-input"
      @keydown.enter="onUpdate"
      @blur="onUpdate"
    />
    <div v-show="!isEdit" class="s-editlabel-text" @dblclick="toggleEdit">{{ value }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Model, Ref, Vue, Watch } from 'vue-property-decorator'

/**
 * editable label
 *
 * @author yidu864
 */
@Component({ name: 's-editlabel' })
export default class SEditLabel extends Vue {
  @Model('update:value', { required: true }) value!: string
  @Ref('s-editlabel-input') sinput!: HTMLInputElement

  isEdit = false

  /**
   * proxy value
   */
  pval = ''

  @Watch('isEdit')
  editChange(nv: boolean) {
    if (!nv) return
    const { sinput, value } = this
    this.pval = value
    sinput && this.$nextTick(() => sinput.focus())
  }

  mounted() {
    this.pval = this.value
  }

  toggleEdit() {
    this.isEdit = !this.isEdit
  }

  onUpdate() {
    if (!this.isEdit) return
    this.isEdit = false
    this.$emit('update:value', this.pval)
  }
}
</script>

<style lang="scss" scoped>
@import '~/core/components/style/mixin.scss';

.s-editlabel {
  position: relative;
  box-sizing: border-box;
  font-size: var(--s-editlabel-fz, 14px);
  height: 1.5em;
  line-height: 1.5em;
  &-text {
    height: 100%;
    box-sizing: border-box;
    @include line;
    &::before {
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
    &:hover:before {
      z-index: 1;
      opacity: 1;
    }
    &:hover {
      user-select: none;
    }
  }
  &-input {
    width: 100%;
    height: 100%;
    font-size: var(--s-editlabel-fz, 14px);
    padding: 0;
    line-height: 1;
    border-image-width: 0;
    border: none;
    outline: none;
    box-sizing: border-box;
    background-color: transparent;
  }
}
</style>

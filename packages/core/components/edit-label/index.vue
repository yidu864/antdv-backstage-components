<template>
  <div class="s-editlabel">
    <input
      v-show="isEdit"
      v-model="pval"
      type="text"
      class="s-editlabel-input"
      ref="siptref"
      @keydown.enter="onUpdate"
      @blur="onUpdate"
    />
    <div v-show="!isEdit" class="s-editlabel-text" @dblclick="toggleEdit">{{ value }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, nextTick, onMounted } from '@vue/composition-api'

/**
 * edit-label
 * @author yidu864
 */
export default defineComponent({
  props: {
    value: { required: true, type: String }
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    const siptref = ref<HTMLInputElement>()

    const isEdit = ref(false)

    /**
     * proxy value
     */
    const pval = ref('')

    watch(isEdit, (nv: boolean) => {
      if (!nv) return
      pval.value = props.value
      siptref.value && nextTick(() => siptref.value?.focus())
    })

    onMounted(() => {
      pval.value = props.value
    })

    const toggleEdit = () => {
      isEdit.value = !isEdit.value
    }

    const onUpdate = (e: any) => {
      if (!isEdit.value) return
      isEdit.value = false
      emit('update:value', e.target.value)
    }

    return {
      isEdit,
      pval,
      siptref,
      onUpdate,
      toggleEdit
    }
  }
})
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

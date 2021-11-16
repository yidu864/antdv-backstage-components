<script>
export default {
  name: 'upload-button',
  props: {
    // 接受的类型
    accept: { type: Array, defalut: () => [] },
    /** 文件 */
    value: {}
  },
  data() {
    return { loading: false }
  },
  methods: {
    triggerBtn() {
      this.$refs['file-btn'].click()
    },
    reset() {
      this.$refs['file-btn'].value = ''
    },
    async onChange(element) {
      const file = element.target.files
      this.$emit('change', file)
      this.reset()
    },
    onNormalBtnClick() {
      this.triggerBtn()
      this.$listeners.click && this.$listeners.click()
    }
  },
  render(h) {
    const file = h('input', {
      attrs: { type: 'file', accept: this.accept.length ? `.${this.accept.join(',.')}` : '' },
      on: { change: this.onChange },
      style: 'display:none;flex:1;',
      ref: 'file-btn'
    })
    const normalBtn = h(
      'a-button',
      {
        attrs: { ...this.$attrs, loading: this.loading, type: this.value ? 'primary' : 'danger' },
        on: { ...this.$listeners, click: this.onNormalBtnClick }
      },
      '上传文件'
    )
    return h('div', { class: 'upload-btn' }, [normalBtn, file])
  }
}
</script>
<style scoped>
.upload-btn {
  display: inline-flex;
  align-items: center;
}
</style>

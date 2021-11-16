<script>
import upload from './upload.js'
export default {
  name: 'upload-button',
  props: {
    uploadConfig: { type: Object, required: true }
  },
  data() {
    return { btnLoading: false }
  },
  computed: {
    mergedUploadConfig() {
      return {
        method: 'post',
        action: 'http://118.31.12.30:1233/bus/api/v1/oss/upload',
        data: {},
        fileName: 'multipartFile',
        withCredentials: false,
        headers: {},
        hooks: {},
        alert,
        ...this.uploadConfig,
        _this: this
      }
    }
  },
  methods: {
    triggerBtn() {
      this.$refs['file-btn'].click()
    },
    async onChange(element) {
      const file = element.target.files
      if (!file.length) return
      try {
        this.btnLoading = true
        const res = await upload({
          ...this.mergedUploadConfig,
          file
        })
        this.$emit('upload', { ok: true, data: res, names: Array.from(file).map(v => v.name) })
      } catch (error) {
        this.$emit('upload', { ok: false, data: null, names: [] })
        console.error('[upload-button] upload failed due to ', error)
      } finally {
        this.btnLoading = false
      }
    },
    onNormalBtnClick() {
      this.triggerBtn()
      this.$listeners.click && this.$listeners.click()
    }
  },

  render(h) {
    const file = h('input', {
      attrs: { type: 'file' },
      on: { change: this.onChange },
      style: 'display:none;flex:1;',
      ref: 'file-btn'
    })
    const normalBtn = h(
      'a-button',
      {
        attrs: { ...this.$attrs, loading: this.btnLoading },
        on: { ...this.$listeners, click: this.onNormalBtnClick }
      },
      this.$slots.default
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

<script>
import UploadBtn from '../upload-button'
export default {
  name: 'input-ipload',
  components: { UploadBtn },
  props: {
    /** 按钮组配置 */
    // btnConfig: { type: Object, default: () => ([]) },
    /** 上传配置 */
    uploadConfig: { type: Object, default: () => ({}) },
    /** 输入框的 文字 */
    value: { type: String },
    /** 获取 value 的函数 */
    getValue: { type: Function, default: res => (res.data ? res.data.url : undefined) },
    /** 禁止 */
    disabled: { type: Boolean, default: false }
  },
  model: {
    prop: 'value',
    event: 'update:value'
  },
  computed: {
    /** 按钮配置 */
    btnsConfig() {
      return [
        { type: 'info', label: null, key: 'upload', icon: 'upload', title: '上传' },
        { type: 'info', label: null, key: 'download', icon: 'download', title: '下载' },
        { type: 'info', label: null, key: 'preview', icon: 'search', title: '预览' }
      ]
    }
  },
  methods: {
    /**
     * 根据 key 分配 按钮点击事件
     */
    onBtnClick(key) {
      this.$emit(`click:${key}`)
    },
    handleUpload({ ok, data: res }) {
      // 成功?
      if (!ok) return
      // 成功则更新 value , this.getValue(res)
      this.$emit('update:value', this.getValue(res))
    },
    // triggerUpload() {
    //   const comp = this.$refs['upload-btn']
    //   comp && comp.triggerBtn()
    // },
    clear() {
      this.$emit('update:value', '')
    }
  },
  render(h) {
    const { btnsConfig } = this
    // 清空按钮
    const clearBtn = h('a-button', {
      attrs: { icon: 'delete', type: 'info', title: '清空' },
      on: { click: this.clear }
    })
    // 上传按钮
    const btn1 = h(
      'upload-btn',
      {
        attrs: { ...btnsConfig[0], 'upload-config': this.uploadConfig },
        on: { upload: this.handleUpload },
        ref: 'upload-btn',
        class: 'upload-btn'
      },
      btnsConfig[0].label || ''
    )
    // 除上传按钮外的按钮
    const btns = btnsConfig.slice(1).map(v =>
      h(
        'a-button',
        {
          attrs: { key: v.key, ...v },
          on: { click: () => this.onBtnClick(v.key) }
        },
        v.label
      )
    )
    // 输入框
    const input = h('a-input', {
      props: {
        placeholder: 'file-url',
        value: this.value,
        disabled: this.disabled
      },
      // on: { click: this.triggerUpload },
      class: 'input-upload-input'
    })
    // 外层
    const wrapper = h('div', { class: 'input-upload' }, [
      input,
      clearBtn,
      btn1,
      ...(btns || Object.key(this.$slots).map(k => this.$slots[k]))
    ])
    return wrapper
  }
}
</script>
<style scoped>
.input-upload {
  display: inline-flex;
  align-items: center;
  box-sizing: border-box;
  /* height: 100%; */
}
.input-upload-input {
  /* width: auto; */
  flex: 1;
}
::v-deep .ant-input {
  border-right-color: transparent;
  border-radius: 0;
}
::v-deep .ant-btn {
  border-radius: 0;
}
::v-deep > .ant-btn:not(:nth-last-of-type(1)) {
  border-right-color: transparent;
}
::v-deep .upload-btn .ant-btn {
  border-right-color: transparent;
}
::v-deep .ant-btn-info:hover,
::v-deep .ant-btn-info:focus,
::v-deep .ant-btn-info:active,
::v-deep .ant-btn-dashed:hover,
::v-deep .ant-btn-dashed:focus,
::v-deep .ant-btn-dashed:active {
  border-color: #40a9ff;
  border-right-color: #40a9ff !important;
}
</style>

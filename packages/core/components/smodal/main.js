import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import ModalTemplate from './modal-template.vue'

export default {
  name: 's-modal',
  data() {
    return {
      visible: true, // 是否显示
      fullScreen: false // 全屏标识
    }
  },
  components: { ModalTemplate },
  mounted() {
    const { modalAttrs = {} } = this.$options
    const { fullScreen } = modalAttrs
    this.fullScreen = fullScreen
  },
  methods: {
    onFsc() {
      this.fullScreen = !this.fullScreen
    },
    // 给外部调用的
    _close() {
      this.listenerProxy('close')()
    },
    listenerProxy(key) {
      return () => {
        const { onComp } = this.$options
        onComp[key] && onComp[key]()
        this.visible = false
      }
    },
    _destroy() {
      this.removeIndex(this.id)
      this.$destroy()
    }
  },
  render(h) {
    const modalProps = {
      ...this.$options.modalAttrs,
      visible: this.visible,
      fullScreen: this.fullScreen,
      afterClose: this._destroy
    }
    const compProps = {
      ...this.$options.compAttrs
    }
    const onModal = {
      ...this.$options.onModal,
      close: this.listenerProxy('close'),
      ok: this.listenerProxy('ok'),
      cancel: this.listenerProxy('cancel')
    }
    const onComp = {
      ...this.$options.onComp,
      fullScreen: this.onFsc,
      close: this.listenerProxy('close'),
      ok: this.listenerProxy('ok'),
      cancel: this.listenerProxy('cancel')
    }
    // 弹窗内容
    const content = h('modal-content', { attrs: compProps, on: onComp })
    // 弹窗
    const modal = h(ModalTemplate, { attrs: modalProps, on: onModal }, [content])
    return h('a-config-provider', { attrs: { locale: zhCN } }, [modal])
  }
}

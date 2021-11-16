<script>
export default {
  name: 'enum-label',
  props: {
    /**
     * 加载数据
     * @returns {{value: any, label: string}[]} 数据
     */
    load: {
      type: Promise,
      required: true
    },
    // 值
    value: {
      required: true,
      type: [String, Number],
      default: ''
    },
    /**
     * 多值
     */
    multi: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      enumData: []
    }
  },
  computed: {
    enumMap() {
      return this.enumData.reduce((p, c) => {
        p.set(c.value, c.label)
        return p
      }, new Map())
    }
  },
  watch: {
    load: {
      handler(n) {
        if (!n) return
        this.init()
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 初始化
     */
    async init() {
      this.enumData = await this.load
    }
  },
  render(h) {
    const { value, enumMap } = this
    return h('span', { class: 'enum-label' }, enumMap.get(value) || '-')
  }
}
</script>

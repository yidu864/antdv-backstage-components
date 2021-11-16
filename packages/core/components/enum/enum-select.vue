<template>
  <a-select
    v-bind="$attrs"
    :value="proxyValue"
    :labelInValue="labelInValue"
    :disabled="isDetail"
    style="width: 100%"
    :mode="multipart ? 'multiple' : 'default'"
    :maxTagTextLength="2"
    @change="selectValueChange"
    @select="v => handleSelect('select', v)"
    @deselect="v => handleSelect('deselect', v)"
    allowClear
  >
    <a-select-option
      v-for="(item, index) in enumData"
      :key="index"
      :value="item.enumValue"
      :title="item.enumName"
      :disabled="optionDisabled(item.enumValue)"
    >
      {{ item.enumName }}
    </a-select-option>
  </a-select>
</template>

<script>
export default {
  name: 'enum-select',
  props: {
    // 字典项名称
    signName: {
      type: String,
      default: ''
    },
    // 值
    value: {
      type: [String, Object, Array],
      default: ''
    },
    // 是否返回标签内容
    labelInValue: {
      type: Boolean,
      default: false
    },
    optionDisabled: {
      type: Function,
      default: () => false
    },
    // 是否禁用
    isDetail: {
      type: Boolean,
      default: false
    },
    /** 标签模式, 多选 */
    multipart: {
      required: false,
      default: false,
      type: Boolean
    },
    /** 获取数据 */
    loadEnumData: {
      type: Function,
      required: true
    },
    /** 是否输出数组 */
    ouputArray: {
      type: Boolean,
      default: false
    },
    options: {}
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      enumData: []
    }
  },
  mounted() {
    this.loadData()
  },
  computed: {
    /** 代理值, 用于做多选值归一化 */
    proxyValue: function() {
      // 只处理多选情况, 其他情况直接返回原值
      if (!this.multipart) return this.value
      // 多选 空
      if (!this.value) return []
      // 多选 字符串
      if (typeof this.value === 'string') return this.value.split(',')
      // 多选 数组
      return this.value
    }
  },
  methods: {
    async loadData() {
      this.enumData = await this.loadEnumData(this.signName)
    },
    update(value) {
      this.$emit('change', value)
    },
    /**
     * 更新 enum-select-value
     */
    selectValueChange(value) {
      const rvalue = this.multipart ? (this.ouputArray ? value : value.join(',')) : value
      this.update(rvalue)
    },
    /**
     * 根据key获取选项的label
     * @note 给外部组件使用
     * @param {string|number} key 选项的值
     * @returns {null|string} 有对应的label则返回，没有则返回空
     */
    getEnumLabelByKey(key) {
      const temp = this.enumData.filter(val => key === val.enumValue)
      if (temp) return temp[0].enumName
      return null
    },
    /**
     * 提交 选择/反选事件
     * @param {String} type 类型, select/deselect
     * @param {Any} val 被选中或反选的项的val
     */
    handleSelect(type, val) {
      // 找出val 对应的label
      const label = this.enumData.find(v => v.enumValue === val)
      this.$emit(type, { label: label.enumName, val })
    }
  }
}
</script>

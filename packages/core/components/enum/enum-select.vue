<template>
  <a-select
    v-bind="$attrs"
    style="width: 100%"
    :value="proxyValue"
    :mode="multi ? 'multiple' : 'default'"
    :options="enumData"
    :disabled="disabled"
    :label-in-value="false"
    @change="onValueChange"
    @select="onSelect('select', $event)"
    @deselect="onSelect('deselect', $event)"
    allowClear
  />
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive } from '@vue/composition-api'
import { Option } from '../utils/types'

type Props = {
  signName: string
  modelValue: string | Record<string, string> | string[]
  disabled: boolean
  multi: boolean
  dataSource: (arg1?: string) => Promise<Option[]>
  output: 'string' | 'array'
}

export default defineComponent({
  name: 'enum-select',
  props: {
    /**
     * 字典项名称
     */
    signName: {
      type: String,
      default: ''
    },
    /**
     * 值
     */
    modelValue: {
      type: [String, Object, Array],
      default: ''
    },
    /**
     * 是否禁用
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 标签模式, 多选
     */
    multi: {
      default: false,
      type: Boolean
    },
    /**
     * 获取数据
     */
    dataSource: {
      type: Function,
      required: true
    },
    /**
     * 是否输出数组
     */
    output: {
      type: String,
      default: 'string'
    }
  },
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },
  emits: ['update:modelValue', 'select', 'deselect'],
  setup(props: Props, { emit }) {
    const enumData = reactive<Option[]>([])

    const proxyValue = computed(() => {
      // 只处理多选情况, 其他情况直接返回原值
      if (!props.multi) return props.modelValue
      // 多选 空
      if (!props.modelValue) return []
      // 多选 字符串
      if (typeof props.modelValue === 'string') return props.modelValue.split(',')
      // 多选 数组
      return props.modelValue
    })

    const onValueChange = (value: string | string[]) =>
      emit('update:modelValue', Array.isArray(value) ? value.join(',') : value)

    /**
     * 提交 选择/反选事件
     * @param  type 类型, select/deselect
     * @param val 被选中或反选的项的val
     */
    const onSelect = (type: string, value: any) => {
      const tar = enumData.find(v => v.value === value)
      tar && emit(type, { label: tar.label, value })
    }

    onMounted(() => {
      props.dataSource(props.signName).then(v => enumData.push(...v))
    })

    return {
      enumData,
      proxyValue,
      onValueChange,
      onSelect
    }
  },
  methods: {
    /**
     * 根据key获取选项的label
     * @note 给外部组件使用
     * @param key 选项的值
     * @returns 有对应的label则返回，没有则返回空
     */
    getEnumLabelByKey(key: string | number) {
      const filtered = this.enumData.filter(val => key === val.value)
      return filtered.length ? filtered[0] : undefined
    }
  }
})
</script>

<template>
  <a-auto-complete
    style="width:100%;"
    v-bind="config"
    :value="fieldValue"
    :data-source="dataSource"
    @change="update"
    @search="debSearch"
  />
</template>

<script>
import mixins from '@idev0/bee-business/src/components/form-model/components/mixins.js'
const methodPrefix = 'protozoa'

export default {
  name: 'input-search',
  mixins: [mixins],
  props: {
    fieldKey: String,
    options: {
      default: () => ({
        // 搜索参数
        searchParams: {},
        // 其他参数
        getParentKey: v => v,
        nameKey: 'name'
      })
    }
  },
  data() {
    return {
      value: null,
      dataSource: []
    }
  },
  beforeDestroy() {
    clearTimeout(this.debid)
  },
  methods: {
    onChange(v) {
      this.$emit('model-change', {
        key: this.fieldKey,
        value: v
      })
    },
    update(v) {
      console.log(v)
      this.onChange(v)
    },
    debSearch(v) {
      clearTimeout(this.debid)
      // if (!v.length) return
      this.debid = setTimeout(() => {
        this.search(v)
      }, 600)
    },
    async search(v) {
      try {
        const { searchParams, getParentKey } = this.config
        const pk = getParentKey(this.fieldKey)
        const { data: res } = await window.$http[`${methodPrefix}Search`]({
          params: {
            ...searchParams,
            [this.config.nameKey]: v,
            parentName: pk && this.$parent.data[pk]
          }
        })
        this.dataSource = res.data.map(v => v[this.config.nameKey])
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.InputSearch {
  width: 100%;
  height: 100%;
}
</style>

<script>
import Comp from './index.vue'
export default {
  name: 'comp-wrap',
  props: {
    config: { type: Object, default: () => ({}) },
    fieldKey: String,
    fieldValue: {}
  },
  render(h) {
    return h(Comp, {
      attrs: { ...this.$attrs, ...this.config, value: this.fieldValue },
      on: {
        ...this.$listeners,
        change: value =>
          this.$emit('model-change', {
            key: this.fieldKey,
            value
          })
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.enum-wrap {
  width: 100%;
  height: 100%;
}
</style>

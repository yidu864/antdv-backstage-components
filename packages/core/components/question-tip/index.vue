<script>
/**
 * 问号提示组件
 * @author xyt
 */
export default {
  name: 'question-tip',
  props: {
    /**
     * 提示文本
     */
    text: { default: '' },
    /**
     * 图标配置
     */
    iconConfig: { default: () => ({}) },
    /**
     * 提示的朝向
     */
    placement: { default: 'top' }
  },
  render(h) {
    const icon = h('a-icon', {
      attrs: { type: 'question-circle', ...this.iconConfig },
      class: 'question-tip',
      slot: 'default'
    })
    const attrs = {
      placement: this.placement,
      ...this.$attrs
    }
    return h(
      'a-tooltip',
      {
        attrs
      },
      [h('span', { slot: 'title' }, this.text), icon]
    )
  }
}
</script>
<style lang="scss" scoped>
.question-tip {
  // width: 100%;
  // height: 100%;
  display: flex;
  align-items: center;
}
</style>

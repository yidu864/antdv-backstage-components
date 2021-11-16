import Vue from 'vue'
import SImage from './image.vue'

// 父节点
let pnode = null

function getCnode() {
  if (!pnode) {
    pnode = document.createElement('div')
    pnode.style = 'position:absolute;width:0;height:0;'
    pnode.dataset.type = 's-preview-img'
    document.body.appendChild(pnode)
  }
  const cnode = document.createElement('div')
  pnode.appendChild(cnode)
  return cnode
}

/**
 * api式图片预览
 * @param {{ attrs: Record<string, any> }} options 参数
 */
const imagePreview = function (options) {
  // const instance = new SimagConstrucetor({
  //   attrs: options.attrs
  // })
  const instance = new Vue({
    render(h) {
      const comp = h(SImage, { attrs: options.attrs })
      return comp
    }
  })
  // 获取挂载的父元素
  instance.vm = instance.$mount(getCnode())
  instance.dom = instance.vm.$el
  return instance.vm
}

export default imagePreview

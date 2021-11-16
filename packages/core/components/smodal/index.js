import Vue from 'vue'
import Main from './main.js'

// 继承
const ModalConstructor = Vue.extend(Main)

let instance // 当前实例
const instances = [] // 数组维护
let seed = 1 // 编号
let pnode = null // 父节点

function getPnode() {
  if (pnode) return pnode
  pnode = document.createElement('div')
  // pnode.setAttribute('data-type', 'mparent')
  document.body.appendChild(pnode)
}

/**
 * 显示模态框
 * @param {{component: Object, store: Object, modalAttrs: Record<String, any>, compAttrs: Record<String, any>, onModal: Recorord<String, Function>, onComp: Recorord<String, Function> }} options 模态框配置项
 * @note 监听器 参数中key不需要加上on
 */
const Modal = function(options) {
  const { compAttrs = {}, modalAttrs = {}, component, onModal = {}, onComp = {}, store } = options
  // id
  const id = 'modal_' + seed++
  // 实例化
  instance = new ModalConstructor({
    components: { ModalContent: component },
    store,
    compAttrs,
    modalAttrs,
    onModal,
    onComp
  })
  instance.id = id
  // 父节点 -- 直接挂载在body节点
  getPnode()
  // 挂载
  instance.vm = instance.$mount(pnode)
  // 将对应 id 的实例从维护数组中移除
  instance.removeIndex = removeIndex
  // dom
  instance.dom = instance.vm.$el
  // zIndex - 如果与 antdv 原生的 modal 混用则不需要设置层级
  // instance.zIndex = options.zIndex || 1000
  // 加入维护数组
  instances.push(instance)
  return instance.vm
}

/**
 * 将id对应实例从维护数组中移除
 * @param {number} id 实例对应id
 */
function removeIndex(id) {
  for (let i = 0, len = instances.length; i < len; i++) {
    if (id !== instances[i].id) continue
    instances.splice(i, 1)
    break
  }
}

Modal.close = function() {
  // 不能直接销毁, 要有关闭动画，关闭动画后再销毁
  // 关闭后会自动销毁，故调用关闭函数就行
  instance._close()
}

const _closeAll = () => {
  for (let i = instances.length - 1; i >= 0; i--) {
    instances[i]._close()
  }
  instances.splice(0)
}

Modal.closeAll = _closeAll

export default Modal
export const closeAll = _closeAll

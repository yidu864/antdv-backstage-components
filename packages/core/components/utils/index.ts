// 'getElementById' => 'get-element-by-id'
export const cacemlToKebab = (str: string) => {
  return str.replace(/[A-Z]/g, i => `-${i.toLowerCase()}`)
}

// 'get-element-by-id' => 'getElementById'
export const kebabToCaceml = (str: string) => {
  return str.replace(/-([a-z])/g, (_, i) => i.toUpperCase())
}

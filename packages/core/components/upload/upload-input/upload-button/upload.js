function getBody(xhr) {
  const text = xhr.responseText || xhr.response
  if (!text) {
    return text
  }

  try {
    return JSON.parse(text)
  } catch (e) {
    return text
  }
}
function getError(option, xhr, tip) {
  const msg =
    'cannot ' + option.method + ' ' + option.action + ' ' + xhr.status + `${tip ? ' ' + tip : ''}`
  const err = new Error(msg)
  err.status = xhr.status
  err.method = option.method
  err.url = option.action
  return err
}

// option {
//  method: string,
//  action: string,
//  data: record<string, any>,
//  fileName: string,
//  file: File[],
//  withCredentials: boolean,
//  headers: record<string, string>,
//  timeout: number, // ms
//  hooks: { before?: (xhr) => {}, success?: (xhr) => {}, error?: xhr => {}, timeout?: xhr => {} }
//  alert: (message: string, type: string) => void
//  _this: context
// }
export default function upload(option) {
  const {
    method,
    action,
    data,
    fileName,
    file,
    withCredentials,
    headers,
    timeout,
    alert,
    _this
  } = option
  // hooks
  const { before: onBefore, success: onSuccess, error: onError, timeout: onTimeout } = option.hooks
  const xhr = new window.XMLHttpRequest()
  const formData = new window.FormData()
  xhr.open(method, action, true)
  // data
  Object.keys(data).forEach(k => {
    formData.append(k, data[k])
  })
  // file
  file.forEach(v => {
    formData.append(fileName, v)
  })
  // header
  Object.keys(headers).forEach(k => {
    xhr.setRequestHeader(k, headers[k])
  })
  // withCredentials
  xhr.withCredentials = withCredentials

  // before
  if (onBefore) {
    const beforeReturn = onBefore(xhr)
    if (beforeReturn && beforeReturn.prevent) {
      beforeReturn.msg && alert(beforeReturn.msg, 'info')
      return
    }
  }

  return new Promise((resolve, reject) => {
    // 错误
    xhr.onerror = function() {
      ;(
        onError ||
        (() => {
          alert('上传失败', 'error')
        })
      ).apply(_this, [xhr, getBody(xhr)])
      reject(getError(option, xhr, 'error'))
    }

    // 超时
    if (timeout) {
      xhr.timeout = timeout
      xhr.ontimeout = function() {
        ;(
          onTimeout ||
          (() => {
            alert('上传超时', 'error')
          })
        ).apply(_this, [xhr, getBody(xhr)])
        // e.message = '[wangEditor-Error] upload-timout'
        reject(getError(option, xhr, 'timeout'))
      }
    }

    xhr.onload = function onload() {
      if (xhr.status < 200 || xhr.status >= 300) {
        ;(
          onError ||
          (() => {
            alert('上传失败', 'error')
          })
        ).apply(_this, [xhr, getBody(xhr)])
        reject(getError(option, xhr, 'error'))
      } else {
        onSuccess && onSuccess.apply(_this, [xhr])
        resolve(getBody(xhr))
      }
    }

    xhr.send(formData)
  })
}

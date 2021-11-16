<template>
  <b-upload
    :file-list.sync="fileList"
    :max-count="maxCount"
    name="file"
    :action="action"
    list-type="picture-card"
    :headers="configHeader"
    :getUrl="getUrl"
    accept="image/*"
    @preview="preview"
    @outOfMaxCount="onOutofMaxcount"
    @change="onChange"
    with-credentials
    multiple
  >
    <a-icon type="plus" />
  </b-upload>
</template>
<script>
import BUpload from '@idev0/bee-business/src/components/upload'
import { showMsg } from '@/utils/index'

export default {
  name: 's-upload',
  components: { BUpload },
  props: {
    value: {},
    action: {},
    maxCount: { default: 10 }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      fileList: []
    }
  },
  computed: {
    configHeader() {
      return {
        Authorization: this.$store.getters['core/token'].get()
      }
    },
    valArr() {
      return this.value ? JSON.parse(this.value) : []
    }
  },
  watch: {
    // 同步(首次, 或者清空) props.value => fileList
    // @note value: JSON.stringify(string[])
    value: {
      immediate: true,
      handler: function(nVal, oldVal) {
        // 清空
        if (!nVal) return (this.fileList = [])
        // 首次
        if (oldVal) return
        const nv = !nVal ? [] : JSON.parse(nVal)
        if (!nv.length) return
        if (this.compareArray(nv, this.fileList)) return
        this.fileList = nv.map(url => ({
          uid: url,
          status: 'done',
          name: 'default.png',
          response: { data: url },
          thumbUrl: url
        }))
      }
    }
  },
  methods: {
    onChange({ file, fileList: nv }) {
      // nv 可能是空数组 => null
      // nv 非空且状态为 done => 更新
      // 比较当前fileList中done与value的长度差
      if (!nv.length) return this.update('')
      const doneLength = nv.filter(v => ['done'].includes(v.status)).length
      if (doneLength === this.valArr.length) return
      // @note 当存在uploading选项时, 不更新, 否则value同步更新会使得uploading的图片被移除
      if (nv.length - doneLength) return
      this.update(
        JSON.stringify(
          nv.filter(v => ['done'].includes(v.status)).map(v => this.getUrl(v.response))
        )
      )
    },
    compareArray(na, oa) {
      return na.length === oa.length
    },
    onOutofMaxcount() {
      showMsg(`最多可以上传${this.maxCount}个文件`, 'warn')
    },
    update(val) {
      this.$emit('change', val)
    },
    preview({ file, url }) {
      window.open(this.getUrl(file.response))
    },
    getUrl: v => (v ? v.data : '')
  }
}
</script>

<template>
  <div class="popular-science-form">
    <a-spin :spinning="loading" wrapperClassName="popular-science-form-content-wrapper">
      <a-icon slot="indicator" type="loading" />
      <a-form :form="form">
        <a-row :span="24">
          <a-col :span="12">
            <a-form-item label="标题" :labelCol="twoInRow.label" :wrapperCol="twoInRow.wrapper">
              <a-input :disabled="readOnly" v-decorator="formDataValidator.title" allowClear />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :span="24">
          <a-col :span="8">
            <a-form-item
              label="预警类型"
              :labelCol="threeInRow.label"
              :wrapperCol="threeInRow.wrapper"
            >
              <a-select v-decorator="formDataValidator.alarmType" :disabled="readOnly">
                <a-select-option v-for="item in alarmTypeConst" :key="item.key" :value="item.key">
                  {{ item.label }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="是否启用"
              :labelCol="threeInRow.label"
              :wrapperCol="threeInRow.wrapper"
            >
              <a-radio-group v-decorator="formDataValidator.enabled" :disabled="readOnly">
                <a-radio-button :value="0">
                  否
                </a-radio-button>
                <a-radio-button :value="1">
                  是
                </a-radio-button>
              </a-radio-group>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :span="24">
          <a-col :span="8">
            <a-form-item
              label="台风编号"
              :labelCol="threeInRow.label"
              :wrapperCol="threeInRow.wrapper"
            >
              <a-input v-decorator="formDataValidator.typhoonCode" />
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item
              label="发布时间"
              :labelCol="threeInRow.label"
              :wrapperCol="threeInRow.wrapper"
            >
              <a-date-picker
                show-time
                format="YYYY-MM-DD HH:mm"
                :disabled="readOnly"
                v-decorator="formDataValidator.publishTime"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :span="24">
          <a-col :span="12">
            <a-form-item label="文件" :labelCol="twoInRow.label" :wrapperCol="twoInRow.wrapper">
              <s-upload :value.sync="file" />
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-spin>
    <option-footer
      :loading="loading"
      @ok="onConfirm"
      @cancel="onCancel"
      class="form-footer"
    ></option-footer>
  </div>
</template>

<script>
import OptionFooter from '@/components/option-footer'
import SUpload from '@/components/upload'
import { operationTypeConst as operationConst, alarmTypeConst } from '@/config/const.js'
import { setFormDataOption, timeFormat, showMsg } from '@/utils'

const contentNullTip = '文件不能为空'
const apiMethodPrefix = 'disala-'

const formDataValidator = {
  // 标题
  title: ['title', { rules: [{ required: true, message: '标题' }] }],
  // 类型
  alarmType: ['alarmType', { rules: [{ required: true, message: '类型' }] }],
  // 文件
  wordUrl: ['wordUrl', { rules: [{ required: true, message: '文件' }] }],
  // 是否启用
  enabled: ['enabled', { rules: [{ required: true, message: '是否启用' }], initialValue: 0 }],
  // 发布时间
  publishTime: ['publishTime', { rules: [{ required: true, message: '发布时间' }] }],
  // 台风编号
  typhoonCode: ['typhoonCode', { rules: [] }]
}

export default {
  name: 'popular-science-form',
  components: { OptionFooter, SUpload },
  props: {
    /**
     * 操作类型
     * @property config.operationConst
     */
    operationType: {
      type: String,
      require: true,
      default: operationConst.readOnly
    },
    /**
     * 模态框可见性
     */
    visible: {
      type: Boolean,
      default: false,
      require: true
    },
    /**
     * 附加参数
     * @description 类似 unid 这种参数都会通过该prop传入
     */
    params: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      // 布局相关
      threeInRow: {
        label: { span: 12 },
        wrapper: { span: 12 }
      },
      twoInRow: {
        label: { span: 8 },
        wrapper: { span: 16 }
      },
      oneInRow: {
        label: { span: 4 },
        wrapper: { span: 20 }
      },
      /** 页面加载状态 */
      loading: false,
      /** 模态框全屏 */
      fullScreen: false,
      // 表单对象
      form: null,
      // 表单被修改过吗？
      formModified: false,
      /** 表单初始化时的合同名 - 做唯一性检测要用 */
      initialContractName: '',
      /** 附带的文件 */
      file: { title: null, url: null }
    }
  },
  computed: {
    /** 表单只读 */
    readOnly: function() {
      return this.operationType === operationConst.preview
    },
    /** 富文本文件上传配置 */
    fileUploadConfig() {
      const customInsert = (insertImgFn, { data }) => insertImgFn(data.url)
      const config = {
        server: '/bus/api/v1/oss/upload',
        headers: { Authorization: this.$store.getters['core/token'].get() },
        fileName: 'multipartFile',
        withCredentials: true,
        hooks: {
          customInsert
        }
      }
      return {
        height: 400,
        uploadImgServer: config.server,
        uploadImgHeaders: config.headers,
        uploadFileName: config.fileName,
        withCredentials: config.withCredentials,
        uploadImgHooks: config.hooks,
        uploadVideoServer: config.server,
        uploadVideoHeaders: config.headers,
        uploadVideoName: config.fileName,
        withVideoCredentials: config.withCredentials,
        uploadVideoHooks: config.hooks
      }
    },
    // 表单数据验证
    formDataValidator() {
      return formDataValidator
    },
    alarmTypeConst() {
      return Object.keys(alarmTypeConst).map(k => ({
        label: alarmTypeConst[k],
        key: k
      }))
    }
  },
  async mounted() {
    this.init()
  },
  methods: {
    showMsg,
    init() {
      this.operationType === operationConst.add ? this.initAdd() : this.initEdit()
    },
    /** 初始化 - 编辑 */
    async initEdit() {
      const { params, showMsg } = this
      // 取出 id
      const { id } = params
      try {
        this.loading = true
        // 获取数据
        const { data: res } = await $http[`${apiMethodPrefix}detail`]({
          // TODO: id记得加回去
          // dynamicRoute: id
          id
        })
        const { data } = res
        // 处理数据
        data.publishTime = timeFormat(data.publishTime, 'YYYY-MM-DD HH:mm')
        // 一些需要单独存储的数据
        this.file = { url: data.wordUrl, title: data.title }
        // 渲染到表单
        const initOptions = {
          mapPropsToFields: () => setFormDataOption(this.$form, data)
        }
        // 绑定表单修改监听
        // initOptions.onValuesChange = this.onFormValuesChange
        this.form = this.$form.createForm(this, initOptions)
        this.loading = false
      } catch (error) {
        this.loading = false
        showMsg('网络错误', 'error')
        console.error(error)
      }
    },
    /** 初始化 - 添加 */
    async initAdd() {
      const initOptions = {}
      // 一些需要初始化的数据
      this.richEditorContent = ''
      // 绑定表单修改监听
      // initOptions.onValuesChange = this.onFormValuesChange
      this.form = this.$form.createForm(this, initOptions)
    },
    /**
     * 校验并获取表单数据
     */
    async validateForm() {
      try {
        const { validateFields } = this.form
        // 自动校验
        const formData = await validateFields()
        // 特殊数据校验
        if (!this.file.url) {
          this.showMsg(contentNullTip, 'error')
          throw new Error(`[disaster-warning Form] ${contentNullTip}`)
        }
        // 如果是编辑则手动添加id
        if (this.operationType === operationConst.edit) formData.id = this.params.id
        return formData
      } catch (error) {
        console.error(error)
        return undefined
      }
    },
    /**
     * 提交表单
     * @param data 需要提交的数据
     */
    async submitForm(data) {
      const { operationType, file } = this
      try {
        this.loading = true
        const params = { ...data }
        // 拼装参数
        params.wordUrl = file.url
        // 发送请求
        const submitFunc =
          $http[apiMethodPrefix + (operationType === operationConst.edit ? 'update' : 'add')]
        // 提交
        const { data: res } = await submitFunc({
          data: params
        })
        if (!res.success) throw new Error()
        // 处理返回
        this.showMsg('操作成功', 'success')
        return true
      } catch (error) {
        console.error(error)
        this.showMsg('网络错误, 请稍后再试', 'error')
        return false
      } finally {
        this.loading = false
      }
    },
    /** 提交流程 */
    async onSubmitProcess() {
      // 验证参数
      const data = await this.validateForm()
      // 成功则下一步, 失败则终止
      if (data === undefined) return
      // 确定提交函数
      const submitRes = await this.submitForm(data)
      // 反馈提交结果
      if (!submitRes) return
      // 返回/关闭?
      this.$emit('close')
    },
    onConfirm() {
      this.onSubmitProcess()
    },
    onCancel() {
      this.$emit('close')
    }
  }
}
</script>
<style scoped>
.popular-science-form {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.popular-science-form-content-wrapper {
  padding: 24px;
  box-sizing: border-box;
  flex: 1;
  overflow: auto;
}
.inline-radio-group {
  display: flex;
  justify-content: right;
  padding-top: 8px;
}
.form-title {
  font-size: 20px;
}
.rich-editor-wrapper {
  padding-left: 100px;
}
</style>

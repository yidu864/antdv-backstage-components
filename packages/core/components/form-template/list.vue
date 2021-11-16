<template>
  <div class="disaster-warning">
    <div class="disaster-warning-conditions">
      <div class="disaster-warning-conditions-left-group">
        <a-button type="primary" icon="plus" class="mr-10" @click="openForm(optTypes.add)"
          >新增</a-button
        >
        <a-popconfirm
          :title="comfirmDelTip"
          :disabled="!selectedRowIds.length"
          ok-text="确认"
          cancel-text="取消"
          @confirm="delRecords(selectedRowIds)"
        >
          <a-button class="mr-10" icon="delete" type="danger" :disabled="!selectedRowIds.length"
            >删除</a-button
          >
        </a-popconfirm>
      </div>
      <div class="disaster-warning-conditions-right-group">
        <a-input-search
          v-model="conditions.title"
          placeholder="标题"
          @search="onSearch"
          enter-button
          allowClear
        />
      </div>
    </div>
    <s-table
      ref="stable"
      class="new-cms-table"
      rowKey="id"
      :row-selection="rowSelection"
      :columns="columns"
      :data="loadData"
      :scroll="{ x: true }"
    >
      <span slot="serial" slot-scope="r, r2, index">{{ index + 1 }}</span>
      <img slot="imgUrl" slot-scope="field" :src="field[0]" class="thumbnail" />
      <span slot="alarmType" slot-scope="field">{{ alarmTypes[field] }}</span>
      <span slot="enabled" slot-scope="field">{{ field ? '未启用' : '启用' }}</span>
      <div slot="action" slot-scope="record">
        <a-button type="primary" size="small" @click="previewPdf(record.pdfUrl)" ghost
          >预览</a-button
        >
        <a-divider type="vertical" />
        <a-button type="primary" size="small" ghost>下载</a-button>
        <a-divider type="vertical" />
        <a @click="openForm(optTypes.edit, { id: record.id })">编辑</a>
        <a-divider type="vertical" />
        <a-popconfirm
          :title="comfirmDelTip"
          ok-text="确认"
          cancel-text="取消"
          @confirm="delRecords(record.id)"
        >
          <a style="color:#FF4D4F;">删除</a>
        </a-popconfirm>
      </div>
    </s-table>
  </div>
</template>
<script>
import { computed, defineComponent, onUnmounted, reactive, ref } from '@vue/composition-api'
import STable from '@/components/table'
import openModal from '@/components/modal'
import Form from './form.vue'
import { operationTypeConst, alarmTypeConst } from '@/config/const.js'
import { showMsg, timeFormat } from '@/utils'

// 提示语
const errTip = '网络开小差了, 请稍后再试'
const delErrTip = '删除失败, 请稍后再试'
const comfirmDelTip = '确认删除?'
const loadingTip = 'loading..'
const execOk = '操作成功'
const apiMethodPrefix = 'disala-'

const columns = [
  {
    title: '#',
    key: 'serial',
    scopedSlots: { customRender: 'serial' }
  },
  {
    title: '标题',
    dataIndex: 'title'
  },
  {
    title: '缩略图',
    dataIndex: 'imgUrl',
    scopedSlots: { customRender: 'imgUrl' }
  },
  {
    title: '灾害类型',
    dataIndex: 'alarmType',
    scopedSlots: { customRender: 'alarmType' }
  },
  {
    title: '发布时间',
    dataIndex: 'publishTime'
  },
  {
    title: '是否启用',
    dataIndex: 'enabled',
    scopedSlots: { customRender: 'enabled' }
  },
  {
    title: '操作',
    // fixed: 'right',
    scopedSlots: { customRender: 'action' }
  }
]

export default defineComponent({
  name: 'disaster-warning-list',
  components: { STable },
  setup(props) {
    // ===== Ref ====
    const stable = ref(null)
    let formIns // 表单模态框-实例
    // ===== data =====
    /** 被选中的行 */
    const selectedRowIds = reactive([])
    /** 搜索条件 */
    const conditions = reactive({ title: '' })
    // ===== computed =====
    /** 表单操作类型 */
    const optTypes = computed(() => operationTypeConst)
    /** 文件类型 */
    const alarmTypes = computed(() => alarmTypeConst)
    // ===== methods ====
    /**
     * 处理数据
     */
    const processData = data => {
      return data.map(v => ({
        ...v,
        publishTime: timeFormat(v.publishTime),
        imgUrl: JSON.parse(v.imgUrl)
      }))
    }
    /**
     * 加载数据
     */
    const loadData = async params => {
      const ps = { ...params, request: { ...conditions } }
      try {
        const { data: res } = await $http[`${apiMethodPrefix}paging`]({
          data: ps
        })
        // 数据处理
        res.data = processData(res.data)
        return res
      } catch (error) {
        showMsg(errTip, 'error')
        return { pageing: { pageIndex: 1, totalRecord: 1 }, data: [] }
      } finally {
        // @note 切换数据的时候需要把已选择的清空
        selectedRowIds.splice(0)
      }
    }
    /** 列表行选择 */
    const rowSelection = {
      selectedRowKeys: selectedRowIds,
      onSelect: (_r, _s, selectedRows) => {
        // selectedRowIds.value = selectedRows.map(v => v.id)
        selectedRowIds.splice(0, selectedRowIds.length, ...selectedRows.map(v => v.id))
      },
      onSelectAll: (_selected, selectedRows) => {
        selectedRowIds.splice(0, selectedRowIds.length, ...selectedRows.map(v => v.id))
      }
    }
    /** 删除 */
    const delRecords = async ids => {
      try {
        showMsg(loadingTip, 'loading')
        const isMulti = Array.isArray(ids)
        await $http[`${apiMethodPrefix}del`]({
          params: { ids: (!isMulti ? [ids] : ids).join(',') }
        })
        // 如果是一次删多个则把选中行清空
        if (isMulti) selectedRowIds.splice(0)
        stable.value && stable.value.refresh(isMulti)
        showMsg(execOk, 'success')
      } catch (error) {
        showMsg(delErrTip, 'error')
        console.error(error)
      }
    }
    /**
     * 打开表单
     * @param {string} type 表单类型
     * @param {Object} params 参数
     */
    const openForm = async (type, params = {}) => {
      openModal({
        component: Form,
        props: { params, operationType: type, width: 1000, title: '灾害预警管理', footer: null },
        listeners: { close: () => stable.value.refresh(false) }
      })
    }
    /** 搜索 */
    const onSearch = () => {
      stable.value.refresh(true)
    }
    /** 预览 */
    const previewPdf = url => {
      window.open(url)
    }

    // =====LIFTCIRCLE=====
    onUnmounted(() => {
      // 关闭模态框
      formIns && formIns.close()
    })
    return {
      // ===== ref
      stable,
      // ===== data
      columns,
      rowSelection,
      comfirmDelTip,
      selectedRowIds,
      conditions,
      alarmTypes,
      // ===== coputed
      optTypes,
      // ===== methods
      loadData,
      delRecords,
      openForm,
      onSearch,
      previewPdf
    }
  }
})
</script>
<style lang="scss" scoped>
.disaster-warning {
  padding: 15px 20px 20px;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  &-conditions {
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
  }
  &-img {
    width: 30px;
    height: 30px;
  }
  & ::v-deep .new-cms-table td {
    white-space: nowrap;
  }
}
.mr-10 {
  margin-right: 10px;
}
.thumbnail {
  height: 50px;
  width: auto;
}
</style>

<script setup>
import { addPost, delPost, getPost, listPost, updatePost } from '@/api/system/post'

defineOptions({
  name: 'Post',
})
const TITLE = '岗位'

const { sys_normal_disable } = useDict('sys_normal_disable')

const {
  data: postList,
  loading,
  queryRef,
  queryParams,
  showSearch,
  total,
  handleQuery,
  resetQuery,
  getList,
  onExport,
} = usePageFormQuery(
  'queryRef',
  listPost,
  {
    initial: {
      postCode: undefined,
      postName: undefined,
      status: undefined,
    },
    downloadUrl: '/system/post/export',
  },
)
const {
  onSelectionChange,
  onDelete,
  ids,
  single,
  multiple,
} = useTableSelection(TITLE, (row) => {
  const postIds = row.postId || ids.value
  return delPost(postIds)
}, getList)

const rules = {
  postName: [{ required: true, message: '岗位名称不能为空', trigger: 'blur' }],
  postCode: [{ required: true, message: '岗位编码不能为空', trigger: 'blur' }],
  postSort: [{ required: true, message: '岗位顺序不能为空', trigger: 'blur' }],
}

const {
  formRef,
  formData,
  submit,
  cancel,
  onAdd,
  onUpdate,
  title,
  open,
} = useModalForm(
  'formRef',
  async () => {
    formRef.value.validate((valid) => {
      if (valid) {
        if (formData.value.postId !== undefined) {
          updatePost(formData.value).then(() => {
            $modal.msgSuccess('修改成功')
            getList()
          })
        }
        else {
          addPost(formData.value).then(() => {
            $modal.msgSuccess('新增成功')
            getList()
          })
        }
      }
    })
  },
  {
    title: TITLE,
    initial: {
      postId: undefined,
      postCode: undefined,
      postName: undefined,
      postSort: 0,
      status: '0',
      remark: undefined,
    },
    async beforeUpdate(row) {
      const postId = row.postId || ids.value
      const response = await getPost(postId)
      formData.value = response.data
    },
  },
)
</script>

<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryRef" :model="queryParams" :inline="true">
      <el-form-item label="岗位编码" prop="postCode">
        <el-input
          v-model="queryParams.postCode"
          placeholder="请输入岗位编码"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="岗位名称" prop="postName">
        <el-input
          v-model="queryParams.postName"
          placeholder="请输入岗位名称"
          clearable
          style="width: 200px"
          @keyup.enter="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="岗位状态" clearable style="width: 200px">
          <el-option
            v-for="dict in sys_normal_disable"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="Search"
          :loading="loading"
          @click="handleQuery"
        >
          搜索
        </el-button>
        <el-button icon="Refresh" :loading="loading" @click="resetQuery">
          重置
        </el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb-2">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:post:add']"
          type="primary"
          plain
          icon="Plus"
          @click="onAdd"
        >
          新增
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:post:edit']"
          type="success"
          plain
          icon="Edit"
          :disabled="single"
          @click="onUpdate"
        >
          修改
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:post:remove']"
          type="danger"
          plain
          icon="Delete"
          :disabled="multiple"
          @click="onDelete"
        >
          删除
        </el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['system:post:export']"
          type="warning"
          plain
          icon="Download"
          @click="onExport"
        >
          导出
        </el-button>
      </el-col>
      <right-toolbar v-model:show-search="showSearch" @query-table="getList" />
    </el-row>

    <el-table v-loading="loading" :data="postList" @selection-change="onSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="岗位编号" align="center" prop="postId" />
      <el-table-column label="岗位编码" align="center" prop="postCode" />
      <el-table-column label="岗位名称" align="center" prop="postName" />
      <el-table-column label="岗位排序" align="center" prop="postSort" />
      <el-table-column label="状态" align="center" prop="status">
        <template #default="scope">
          <dict-tag :options="sys_normal_disable" :value="scope.row.status" />
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center" prop="createTime" width="180">
        <template #default="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180" align="center" fixed="right">
        <template #default="scope">
          <el-button v-hasPermi="['system:post:edit']" link type="primary" icon="Edit" @click="onUpdate(scope.row)">
            修改
          </el-button>
          <el-button v-hasPermi="['system:post:remove']" link type="primary" icon="Delete" @click="onDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      v-model:page="queryParams.pageNum"
      v-model:limit="queryParams.pageSize"
      :total="total"
      @pagination="getList"
    />

    <!-- 添加或修改岗位对话框 -->
    <el-dialog v-model="open" :title="title" width="500px" append-to-body>
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
        <el-form-item label="岗位名称" prop="postName">
          <el-input v-model="formData.postName" placeholder="请输入岗位名称" />
        </el-form-item>
        <el-form-item label="岗位编码" prop="postCode">
          <el-input v-model="formData.postCode" placeholder="请输入编码名称" />
        </el-form-item>
        <el-form-item label="岗位顺序" prop="postSort">
          <el-input-number v-model="formData.postSort" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="岗位状态" prop="status">
          <el-radio-group v-model="formData.status">
            <el-radio
              v-for="dict in sys_normal_disable"
              :key="dict.value"
              :value="dict.value"
            >
              {{ dict.label }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="formData.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="submit">
            确 定
          </el-button>
          <el-button @click="cancel">
            取 消
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

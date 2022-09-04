<template>
  <div class="title">给未来的自己留个言</div>
  <el-form
    class="form"
    :model="form"
    :rules="rules"
    ref="formRef"
    label-width="120px"
  >
    <el-form-item prop="textarea" label="留言内容">
      <el-input
        v-model="form.textarea"
        :rows="6"
        type="textarea"
        placeholder="请填写留言"
      />
    </el-form-item>
    <el-form-item prop="dateTime" label="提醒时间">
      <el-date-picker
        v-model="form.dateTime"
        type="datetime"
        placeholder="请选择时间"
        style="width: 100%"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(formRef)">确定留言</el-button>
      <el-button @click="resetForm(formRef)">重置留言</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessageBox } from 'element-plus'

const form = reactive({
  textarea: '',
  dateTime: ''
})

const formRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  textarea: [
    { required: true, message: '留言内容不能为空', trigger: 'blur' }
  ],
  dateTime: [
    { required: true, message: '触发时间不能为空', trigger: 'blur' }
  ]
})

const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      ElMessageBox.alert(`您填写的留言是${form.textarea}`, '提示', {
        confirmButtonText: '确定',
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.title {
  font-weight: bold;
  font-size: 22px;
}

.form {
  margin: 30px auto 0;
  width: 600px;
}
</style>

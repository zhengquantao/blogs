<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <div>
    <page-header-wrapper :title="false" content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
      <a-card :body-style="{padding: '24px 32px'}" :bordered="false">
        <a-form @submit="handleSubmit" :form="form">
          <a-form-item
            label="标题"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
            <a-input
              v-decorator="[
                'name',
                {rules: [{ required: true, message: '请输入标题' }]}
              ]"
              name="name"
              placeholder="给目标起个名字" />
          </a-form-item>
          <a-form-item
            label="起止日期"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
            <a-range-picker
              name="buildTime"
              style="width: 100%"
              v-decorator="[
                'buildTime',
                {rules: [{ required: true, message: '请选择起止日期' }]}
              ]" />
          </a-form-item>
          <a-form-item
            label="目标描述"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
            <a-textarea
              rows="4"
              placeholder="请输入你阶段性工作目标"
              v-decorator="[
                'description',
                {rules: [{ required: true, message: '请输入目标描述' }]}
              ]" />
          </a-form-item>
          <a-form-item
            label="衡量标准"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
            <a-textarea
              rows="4"
              placeholder="请输入衡量标准"
              v-decorator="[
                'type',
                {rules: [{ required: true, message: '请输入衡量标准' }]}
              ]" />
          </a-form-item>
          <a-form-item
            label="客户"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
            <a-input
              placeholder="请描述你服务的客户，内部客户直接 @姓名／工号"
              v-decorator="[
                'customer',
                {rules: [{ required: true, message: '请描述你服务的客户' }]}
              ]" />
          </a-form-item>
          <a-form-item
            label="邀评人"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
            :required="false"
          >
            <a-input placeholder="请直接 @姓名／工号，最多可邀请 5 人" />
          </a-form-item>
          <a-form-item
            label="权重"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
            :required="false"
          >
            <a-input-number :min="0" :max="100" />
            <span> %</span>
          </a-form-item>
          <a-form-item
            label="目标公开"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }"
            :required="false"
            help="客户、邀评人默认被分享"
          >
            <a-radio-group v-decorator="['target', { initialValue: 1 }]">
              <a-radio :value="1">公开</a-radio>
              <a-radio :value="2">部分公开</a-radio>
              <a-radio :value="3">不公开</a-radio>
            </a-radio-group>
            <a-form-item v-show="form.getFieldValue('target') === 2">
              <a-select mode="multiple">
                <a-select-option value="4">同事一</a-select-option>
                <a-select-option value="5">同事二</a-select-option>
                <a-select-option value="6">同事三</a-select-option>
              </a-select>
            </a-form-item>
          </a-form-item>
          <a-form-item
            :wrapperCol="{ span: 24 }"
            style="text-align: center"
          >
            <a-button htmlType="submit" type="primary">提交</a-button>
            <a-button style="margin-left: 8px">保存</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </page-header-wrapper>
    <div :class="prefixCls">
      <quill-editor
        v-model="content"
        ref="myQuillEditor"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
        @change="onEditorChange($event)">
      </quill-editor>
    </div>
  </div>
</template>

<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'BaseForm',
  components: {
    quillEditor
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-editor-quill'
    },
    // 表单校验用字段
    // eslint-disable-next-line
    value: {
      type: String
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      content: null,
      editorOption: {
        // some quill options
      }
    }
  },
  methods: {
    // handler
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    },
    onEditorChange ({ quill, html, text }) {
      console.log('editor change!', quill, html, text)
      this.$emit('change', html)
    }
  },
  watch: {
    value (val) {
      this.content = val
    }
  }
}
</script>

<style lang="less" scoped>

/* 覆盖 quill 默认边框圆角为 ant 默认圆角，用于统一 ant 组件风格 */
.ant-editor-quill {
  line-height: initial;
  /deep/ .ql-toolbar.ql-snow {
    border-radius: @border-radius-base @border-radius-base 0 0;
  }
  /deep/ .ql-container.ql-snow {
    border-radius: 0 0 @border-radius-base @border-radius-base;
  }
}
</style>

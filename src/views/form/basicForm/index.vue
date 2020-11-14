<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <div>
    <page-header-wrapper :title="false" content="表单页用于增加文章。">
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
              placeholder="文章标题" />
          </a-form-item>
          <a-form-item
            label="图片"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
            <a-upload
              name="avatar"
              list-type="picture-card"
              class="avatar-uploader"
              :show-upload-list="false"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              :before-upload="beforeUpload"
              @change="handleChange"
            >
              <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
              <div v-else>
                <a-icon :type="loading ? 'loading' : 'plus'" />
                <div class="ant-upload-text">
                  Upload
                </div>
              </div>
            </a-upload>
          </a-form-item>
          <a-form-item
            label="文章描述"
            :labelCol="{lg: {span: 7}, sm: {span: 7}}"
            :wrapperCol="{lg: {span: 10}, sm: {span: 17} }">
            <a-textarea
              rows="4"
              placeholder="请输入你的描述"
              v-decorator="[
                'description',
                {rules: [{ required: true, message: '请输入目标描述' }]}
              ]" />
          </a-form-item>
          <div>内容</div>
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
  </div>
</template>
<script>
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import { quillEditor } from 'vue-quill-editor'
  // import {axios} from "../../../utils/request";
  function getBase64 (img, callback) {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }
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
      loading: false,
      imageUrl: '',
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
            values.image = this.imageUrl
            values.content = this.content
            // axios.post({})
          console.log('Received values of form: ', values)
        }
      })
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload (file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
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

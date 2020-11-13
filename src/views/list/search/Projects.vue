<template>
    <div>
      <a-card :bordered="false" class="ant-pro-components-tag-select">
        <div class="ant-pro-pages-list-projects-cardList">
        <a-list :loading="loading" :data-source="data" :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }">
            <a-list-item slot="renderItem" slot-scope="item">
              <router-link :to="`/profile?id=${item.id}`">
                <a-card class="ant-pro-pages-list-projects-card" hoverable>
                <img slot="cover" :src="item.cover" :alt="item.title" />
                <a-card-meta :title="item.title">
                  <template slot="description">
                    <ellipsis :length="50">{{ item.description }}</ellipsis>
                  </template>
                </a-card-meta>
                <div class="cardItemContent">
                  <span>{{ item.updatedAt | fromNow }}</span>
                  <div class="avatarList">
                    <avatar-list size="small" :max-length="2">
                      <avatar-list-item
                        v-for="(member, i) in item.members"
                        :key="`${item.id}-avatar-${i}`"
                        :src="member.avatar"
                        :tips="member.name"
                      />
                    </avatar-list>
                  </div>
                </div>
              </a-card>
              </router-link>
            </a-list-item>
        </a-list>
      </div>
      </a-card>
    </div>
</template>

<script>
import moment from 'moment'
import { TagSelect, StandardFormRow, Ellipsis, AvatarList } from '@/components'
const TagSelectOption = TagSelect.Option
const AvatarListItem = AvatarList.Item

export default {
  components: {
    AvatarList,
    AvatarListItem,
    Ellipsis,
    TagSelect,
    TagSelectOption,
    StandardFormRow
  },
  data () {
    return {
      data: [],
      form: this.$form.createForm(this),
      loading: true
    }
  },
  filters: {
    fromNow (date) {
      return moment(date).fromNow()
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    handleChange (value) {
      console.log(`selected ${value}`)
    },
    getList () {
      this.$http.get('/list/article', { params: { count: 8 } }).then(res => {
        console.log('res', res)
        this.data = res.result
        this.loading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-pro-components-tag-select {
  /deep/ .ant-pro-tag-select .ant-tag {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}
.ant-pro-pages-list-projects-cardList {
  margin-top: 24px;

  /deep/ .ant-card-meta-title {
    margin-bottom: 4px;
  }

  /deep/ .ant-card-meta-description {
    height: 44px;
    overflow: hidden;
    line-height: 22px;
  }

  .cardItemContent {
    display: flex;
    height: 20px;
    margin-top: 16px;
    margin-bottom: -4px;
    line-height: 20px;

    > span {
      flex: 1 1;
      color: rgba(0,0,0,.45);
      font-size: 12px;
    }

    /deep/ .ant-pro-avatar-list {
      flex: 0 1 auto;
    }
  }
}
</style>

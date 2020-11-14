<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="https://www.cnblogs.com/taozhengquan/" target="_blank">cnblogs</a>
      <a href="https://www.github.com/zhengquantao/" target="_blank">Github</a>
      <a href="https://sourcerer.io/zhengquantao" target="_blank">sourcerer</a>
    </template>
    <template v-slot:copyright>
      <a href="https://github.com/vueComponent" target="_blank"></a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>

import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'moment/locale/zh-cn'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN
}

const locale = {
  'message': '-',
  'menu.home': '主页',
  'menu.dashboard': '工作台',
  'menu.dashboard.analysis': '分析页',
  'menu.dashboard.monitor': 'Github',
  'menu.dashboard.workplace': '工作台'
}

export default {
  ...components,
  ...locale
}

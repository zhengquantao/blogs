// eslint-disable-next-line
import { UserLayout, BasicLayout, BlankLayout } from '@/layouts'
// import { bxAnaalyse } from '@/core/icons'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view')
}

export const asyncRouterMap = [

  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: 'menu.home' },
    redirect: '/dashboard/workplace',
    children: [
      // dashboard
      {
        path: '/dashboard/workplace',
        name: 'SearchProjects',
        component: () => import('../views/list/search/Projects'),
        meta: { title: '文章列表', permission: [ 'table' ] }
      },
      // profile
      {
        path: '/profile',
        name: 'profile',
        component: () => import('../views/profile/basic'),
        meta: { title: '文章详情', permission: [ 'profile' ] }
      },
      // account
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        meta: { title: '关于作者', icon: 'user', keepAlive: true, permission: [ 'user' ] },
        children: [
          {
            path: '/account/center',
            name: 'center',
            component: () => import('@/views/account/center'),
            meta: { title: '个人信息', keepAlive: true, permission: [ 'user' ] }
          },
           // 外部链接
          {
            path: 'https://www.github.com/zhengquantao/',
            name: 'Monitor',
            meta: { title: 'menu.dashboard.monitor', target: '_blank' }
          },
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('@/views/account/settings/Index'),
            meta: { title: '增加文章', hideHeader: true, permission: [ 'user' ] },
            redirect: '/form/base-form',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/form/base-form',
                component: () => import('@/views/form/basicForm'),
                meta: { title: '增加文章', keepAlive: true, permission: [ 'form' ] }
              }
              // ,
              // {
              //   path: '/account/settings/security',
              //   name: 'SecuritySettings',
              //   component: () => import('@/views/account/settings/Security'),
              //   meta: { title: '安全设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              // }
              // {
              //   path: '/account/settings/custom',
              //   name: 'CustomSettings',
              //   component: () => import('@/views/account/settings/Custom'),
              //   meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: [ 'user' ] }
              // },
              // {
              //   path: '/account/settings/binding',
              //   name: 'BindingSettings',
              //   component: () => import('@/views/account/settings/Binding'),
              //   meta: { title: '账户绑定', hidden: true, keepAlive: true, permission: [ 'user' ] }
              // },
              // {
              //   path: '/account/settings/notification',
              //   name: 'NotificationSettings',
              //   component: () => import('@/views/account/settings/Notification'),
              //   meta: { title: '新消息通知', hidden: true, keepAlive: true, permission: [ 'user' ] }
              // }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/RegisterResult')
      },
      {
        path: 'recover',
        name: 'recover',
        component: undefined
      }
    ]
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/exception/404')
  }
]

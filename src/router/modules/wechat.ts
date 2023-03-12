import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/wechat',
    component: Layout,
    redirect: '/wechat/menu',
    meta: { title: 'message.menu.wechat.name', icon: 'ChatRound' },
    alwayShow: true,
    children: [
      {
        path: 'menu',
        component: createNameComponent(() => import('@/views/wechat/menu.vue')),
        meta: { title: 'message.menu.wechat.menu', icon: 'Menu',cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'source',
        component: createNameComponent(() => import('@/views/wechat/source.vue')),
        meta: { title: 'message.menu.wechat.source', icon: 'files',cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'reply',
        component: createNameComponent(() => import('@/views/wechat/reply.vue')),
        meta: { title: 'message.menu.wechat.reply', icon: 'ChatLineRound',cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'template',
        component: createNameComponent(() => import('@/views/wechat/template.vue')),
        meta: { title: 'message.menu.wechat.template', icon: 'ChatDotRound',cache: true, roles: ['admin'] }
      },
      {
        path: 'qrcode',
        component: createNameComponent(() => import('@/views/wechat/qrcode.vue')),
        meta: { title: 'message.menu.wechat.qrcode', icon: 'Camera',cache: true, roles: ['admin'] }
      },
      {
        path: 'fans',
        component: createNameComponent(() => import('@/views/wechat/fans.vue')),
        meta: { title: 'message.menu.wechat.fans', icon: 'User',cache: true, roles: ['admin'] }
      },
      {
        path: 'message',
        component: createNameComponent(() => import('@/views/wechat/message.vue')),
        meta: { title: 'message.menu.wechat.message', icon: 'Message',cache: true, roles: ['admin'] }
      },
      {
        path: 'account',
        component: createNameComponent(() => import('@/views/wechat/account.vue')),
        meta: { title: 'message.menu.wechat.account', icon: 'User',cache: true, roles: ['admin'] }
      },
      {
        path: 'news',
        component: createNameComponent(() => import('@/views/wechat/news.vue')),
        meta: { title: 'message.menu.wechat.news', icon: 'Calendar',cache: true, roles: ['admin'] }
      },
    ]
  }
]

export default route
import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/cms',
    component: Layout,
    redirect: '/cms/news',
    meta: { title: 'message.menu.cms.name', icon: 'Collection' },
    alwayShow: true,
    children: [
      {
        path: 'column',
        component: createNameComponent(() => import('@/views/cms/column.vue')),
        meta: { title: 'message.menu.cms.column', icon: 'Collection',cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'page',
        component: createNameComponent(() => import('@/views/cms/page.vue')),
        meta: { title: 'message.menu.cms.page', icon: 'Tickets',ache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'tag',
        component: createNameComponent(() => import('@/views/cms/tag.vue')),
        meta: { title: 'message.menu.cms.tag', icon: 'PriceTag',cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'news',
        component: createNameComponent(() => import('@/views/cms/news.vue')),
        meta: { title: 'message.menu.cms.news', icon: 'Document',cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'gather',
        component: createNameComponent(() => import('@/views/cms/gather.vue')),
        meta: { title: 'message.menu.cms.gather', icon: 'Position',cache: true, roles: ['admin'] }
      },
      {
        path: 'setting',
        component: createNameComponent(() => import('@/views/cms/setting.vue')),
        meta: { title: 'message.menu.cms.setting', icon: 'Setting',cache: true, roles: ['admin'] }
      },
    ]
  }
]

export default route
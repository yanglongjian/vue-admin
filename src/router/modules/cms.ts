import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/cms',
    component: Layout,
    redirect: '/cms/news',
    meta: { title: 'message.menu.cms.name', icon: 'sfont system-page' },
    alwayShow: true,
    children: [
      {
        path: 'news',
        component: createNameComponent(() => import('@/views/cms/news.vue')),
        meta: { title: 'message.menu.cms.news', cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'gather',
        component: createNameComponent(() => import('@/views/cms/gather.vue')),
        meta: { title: 'message.menu.cms.gather', cache: true, roles: ['admin'] }
      },
    ]
  }
]

export default route
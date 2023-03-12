import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    meta: { title: '', icon: 'HomeFilled' },
    children: [
      {
        path: 'dashboard',
        component: createNameComponent(() => import('@/views/dashboard/index.vue')),
        meta: { title: 'message.menu.dashboard.index', icon: 'HomeFilled', hideClose: true }
      }
    ]
  }
]

export default route
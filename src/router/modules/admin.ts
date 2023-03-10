import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/admin',
    component: Layout,
    redirect: '/admin/user',
    meta: { title: 'message.menu.admin.name', icon: 'sfont system-page' },
    alwayShow: true,
    children: [
      {
        path: 'user',
        component: createNameComponent(() => import('@/views/admin/user.vue')),
        meta: { title: 'message.menu.admin.user',icon:'sfont system-page', cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'role',
        component: createNameComponent(() => import('@/views/admin/role.vue')),
        meta: { title: 'message.menu.admin.role', icon:'sfont system-page',cache: true, roles: ['admin'] }
      },
      {
        path: 'module',
        component: createNameComponent(() => import('@/views/admin/module.vue')),
        meta: { title: 'message.menu.admin.module', icon:'sfont system-page',cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'dict',
        component: createNameComponent(() => import('@/views/admin/dict.vue')),
        meta: { title: 'message.menu.admin.dict', icon:'sfont system-page',cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'server',
        component: createNameComponent(() => import('@/views/admin/server.vue')),
        meta: { title: 'message.menu.admin.server', icon:'sfont system-page',cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'config',
        component: createNameComponent(() => import('@/views/admin/config.vue')),
        meta: { title: 'message.menu.admin.config', icon:'sfont system-page',cache: true, roles: ['admin'] }
      },
    ]
  }
]

export default route
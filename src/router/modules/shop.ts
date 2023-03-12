import type { Route } from '../index.type'
import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
const route: Route[] = [
  {
    path: '/shop',
    component: Layout,
    redirect: '/shop/workplace',
    meta: { title: 'message.menu.shop.name', icon: 'Shop' },
    alwayShow: true,
    children: [
      {
        path: 'workplace',
        component: createNameComponent(() => import('@/views/shop/workplace.vue')),
        meta: { title: 'message.menu.shop.workplace', icon: 'Eleme',cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'index',
        component: createNameComponent(() => import('@/views/shop/index.vue')),
        meta: { title: 'message.menu.shop.index', icon: 'ElementPlus',cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'category',
        component: createNameComponent(() => import('@/views/shop/category.vue')),
        meta: { title: 'message.menu.shop.category', icon: 'Box',cache: false, roles: ['admin', 'editor'] }
      },
      {
        path: 'goods',
        component: createNameComponent(() => import('@/views/shop/goods.vue')),
        meta: { title: 'message.menu.shop.goods', icon: 'Goods',cache: true, roles: ['admin'] }
      },
      {
        path: 'goodsedit',
        component: createNameComponent(() => import('@/views/shop/goods-edit.vue')),
        meta: { title: 'message.menu.shop.goodsedit', icon: 'Goods',cache: true, roles: ['admin'] }
      },
      {
        path: 'order',
        component: createNameComponent(() => import('@/views/shop/order.vue')),
        meta: { title: 'message.menu.shop.order', icon: 'Wallet',cache: true, roles: ['admin'] }
      },
      {
        path: 'config',
        component: createNameComponent(() => import('@/views/shop/config.vue')),
        meta: { title: 'message.menu.shop.config', icon: 'Setting',cache: true, roles: ['admin'] }
      },
    ]
  }
]

export default route
/*
 * @Date: 2022-05-22 20:44:25
 * @Description: 
 */
export default {
  menu: {
    dashboard: {
      name: 'dashboard',
      index: '首页'
    },
    system: {
      name: '系统目录',
      redirect: '重定向页面',
      '404': '404',
      '401': '401'
    },
    admin:{
      name: '系统管理',
      user:'用户管理',
      role:'角色管理',
      module:'模块信息',
      dict:'数据字典',
      server:'服务器',
      config:'系统配置'
    },
    cms:{
      name: 'CMS',
      cate:'栏目管理',
      tag:'标签管理',
      news:'内容管理',
      gather:'采集插件',
      config:'系统配置'
    }
  },
}
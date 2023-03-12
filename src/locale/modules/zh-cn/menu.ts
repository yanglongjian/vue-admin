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
      name: '博客',
      column:'导航栏目',
      page:'页面列表',
      tag:'栏目分类',
      news:'内容管理',
      gather:'采集插件',
      setting:'博客配置'
    },
    shop:{
      name: '店铺',
      workplace:'工作台',
      index:'店铺装修',
      category:'商品分类',
      goods:'商品管理',
      goodsedit:'商品编辑',
      order:'订单管理',
      config:'设置'
    },
    wechat:{
      name: '公众号管理',
      menu:'公众号菜单',
      source:'素材管理',
      reply:'自动回复规则',
      template:'消息模板',
      qrcode:'带参二维码',
      fans:'粉丝管理',
      message:'公众号消息',
      account:'公众号账号',
      news:'文章公告'
    },
  },
}
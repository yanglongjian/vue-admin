<template>
  <div class="tabs">
    <el-scrollbar
      class="scroll-container tags-view-container"
      ref="scrollbarDom"
      @wheel.passive="handleWhellScroll"
      @scroll="handleScroll"
    >
      <Item
        v-for="menu in menuList"
        :key="menu.meta.title"
        :menu="menu"
        :active="activeMenu.path === menu.path"
        @close="delMenu(menu)"
        @reload="pageReload"
      />
    </el-scrollbar>
    <div class="handle">
      <div id="vueAdminBoxTabRefresh" @click="pageReload"></div>
      <div id="vueAdminBoxTabCloseSelf" @click="closeCurrentRoute"></div>
      <div id="vueAdminBoxTabCloseOther" @click="closeOtherRoute"></div>
      <div id="vueAdminBoxTabCloseAll" @click="closeAllRoute"></div>
      <el-dropdown placement="bottom" size="default">
        <div class="el-dropdown-link">
          <el-icon><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item class="tab-ddropdown-item" :icon="RefreshLeft" @click="pageReload">{{ $t('message.system.tab.reload') }}</el-dropdown-item>
            <el-dropdown-item class="tab-ddropdown-item" :icon="CircleClose" :disabled="currentDisabled" @click="closeCurrentRoute">{{ $t('message.system.tab.closeCurrent') }}</el-dropdown-item>
            <el-dropdown-item class="tab-ddropdown-item" :icon="CircleClose" :disabled="menuList.length < 3" @click="closeOtherRoute">{{ $t('message.system.tab.closeOther') }}</el-dropdown-item>
            <el-dropdown-item class="tab-ddropdown-item" :icon="CircleClose" :disabled="menuList.length <= 1" @click="closeAllRoute">{{ $t('message.system.tab.closeAll') }}</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-tooltip class="item" effect="dark" :content="contentFullScreen ? $t('message.system.fullScreenBack'):$t('message.system.fullScreen')" placement="bottom">
        <el-icon @click="onFullscreen"><FullScreen /></el-icon>
      </el-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
/** ???????????? */
import type { Ref } from 'vue'
import type { ElScrollbar } from 'element-plus'

/** ??????vue???????????? */
import { defineComponent, computed, unref, watch, reactive, ref, nextTick } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'

/** ???????????? */
import { ArrowDown, RefreshLeft, CircleClose, FullScreen } from '@element-plus/icons'

import Item from './item.vue'
import tabsHook from './tabsHook'

export default defineComponent({
  components: {
    Item, ArrowDown, FullScreen
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const scrollbarDom: Ref<typeof ElScrollbar|null> = ref(null)
    const scrollLeft = ref(0)
    const defaultMenu = {
      path: '/dashboard',
      meta: { title: 'message.menu.dashboard.index', hideClose: true }
    }
    const contentFullScreen = computed(() => store.state.app.contentFullScreen)
    const currentDisabled = computed(() => route.path === defaultMenu.path)

    let activeMenu: any = reactive({ path: '' })
    let menuList = ref(tabsHook.getItem())
    if (menuList.value.length === 0) { // ??????????????????????????????
      addMenu(defaultMenu)
    }
    watch(menuList.value, (newVal: []) => {
      tabsHook.setItem(newVal)
    })
    watch(menuList, (newVal: []) => {
      tabsHook.setItem(newVal)
    })
    router.afterEach(() => {
      addMenu(route)
      initMenu(route)
    })

    // ??????
    function onFullscreen() {
      store.commit('app/contentFullScreenChange', !contentFullScreen.value)
    }
    // ??????????????????????????????
    function pageReload() {
      const self: any = route.matched[route.matched.length-1].instances.default

      self.handleReload();
    }

    // ????????????????????????????????????
    function closeCurrentRoute() {
      if (route.path !== defaultMenu.path) {
        const tab = document.getElementById('vueAdminBoxTabCloseSelf')
        const nextPath = tab?.getAttribute('nextPath')
        delMenu(route, nextPath)
      }
    }
    // ?????????????????????????????????????????????
    function closeOtherRoute() {
      menuList.value = [defaultMenu]
      if (route.path !== defaultMenu.path) {
        addMenu(route)
      }
      setKeepAliveData()
    }

    // ????????????????????????????????????
    function closeAllRoute() {
      menuList.value = [defaultMenu]
      setKeepAliveData()
      router.push(defaultMenu.path)
    }

    // ?????????????????????
    function addMenu(menu: any) {
      let { path, meta, name } = menu
      if (meta.hideTabs) {
        return
      }
      let hasMenu = menuList.value.some((obj: any) => {
        return obj.path === path
      })
      if (!hasMenu) {
        menuList.value.push({
          path,
          meta,
          name
        })
      }
    }

    // ???????????????
    function delMenu(menu: any, nextPath?: string) {
      let index = 0
      if (!menu.meta.hideClose) {
        if (menu.meta.cache && menu.name) {
          store.commit('keepAlive/delKeepAliveComponentsName', menu.name)
        }
        index = menuList.value.findIndex((item: any) => item.path === menu.path)
        menuList.value.splice(index, 1)
      }
      if (nextPath) {
        router.push(nextPath)
        return
      }
      if (menu.path === activeMenu.path) {
        index - 1 > 0 ? router.push(menuList.value[index - 1].path) : router.push(defaultMenu.path)
      }
    }

    // ?????????activeMenu
    function initMenu(menu: object) {
      activeMenu = menu
      nextTick(() => {
        setPosition()
      })
    }
    /** ??????????????????????????????????????? */
    function setPosition() {
      if (scrollbarDom.value) {
        const domBox = {
          scrollbar: scrollbarDom.value.scrollbar$.querySelector('.el-scrollbar__wrap ') as HTMLDivElement,
          activeDom: scrollbarDom.value.scrollbar$.querySelector('.active') as HTMLDivElement,
          activeFather: scrollbarDom.value.scrollbar$.querySelector('.el-scrollbar__view') as HTMLDivElement
        }
        let hasDoms = true
        Object.keys(domBox).forEach((dom) => {
          if (!dom) {
            hasDoms = false
          }
        })
        if (!hasDoms) {
          return
        }
        const domData = {
          scrollbar: domBox.scrollbar.getBoundingClientRect(),
          activeDom: domBox.activeDom.getBoundingClientRect(),
          activeFather: domBox.activeFather.getBoundingClientRect()
        }
        const num = domData.activeDom.x - domData.activeFather.x + 1/2 * domData.activeDom.width - 1/2 * domData.scrollbar.width
        domBox.scrollbar.scrollLeft = num
      }
    }

    // ???????????????????????????
    function setKeepAliveData() {
      let keepAliveNames: any[] = []
      menuList.value.forEach((menu: any) => {
        menu.meta && menu.meta.cache && menu.name && keepAliveNames.push(menu.name)
      })
      store.commit('keepAlive/setKeepAliveComponentsName', keepAliveNames)
    }

    /** ???????????????????????? */
    function handleWhellScroll(e: any) {
      let distance = 0
      let speed = 5
      if (e.wheelDelta > 30) {
        distance = -10
      } else if (e.wheelDelta < -30) {
        distance = 10
      }
      // console.log(scrollLeft.value + eventDelta / 4)
      scrollbarDom.value?.setScrollLeft(scrollLeft.value + distance * speed)
    }

    /** ?????????????????? */
    function handleScroll({ scrollLeft: left }: { scrollLeft: number }) {
      scrollLeft.value = left
    }

    // ?????????????????????1. ???????????? 2. ?????????activeMenu
    addMenu(route)
    initMenu(route)
    return {
      RefreshLeft, CircleClose,
      contentFullScreen,
      scrollbarDom,
      // ????????????
      menuList,
      activeMenu,
      currentDisabled,
      onFullscreen,
      pageReload,
      delMenu,
      closeCurrentRoute,
      closeOtherRoute,
      closeAllRoute,
      handleScroll,
      handleWhellScroll
    }
  }
})
</script>

<style lang="scss" scoped>
  .tabs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    background: var(--system-header-background);
    border-bottom: 1px solid var(--system-header-border-color);
    border-top: 1px solid var(--system-header-border-color);
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, .1);
    .handle {
      min-width: 95px;
      height: 100%;
      display: flex;
      align-items: center;
      .el-dropdown-link {
        margin-top: 5px;
        border-left: 1px solid var(--system-header-border-color);
        height: 25px;
        width: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      i {
        color: var(--system-header-text-color);
      }
    }
  }
  .scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    width: 100%;
    :deep(.el-scrollbar__bar) {
      bottom: 0px;
    }
    :deep(.el-scrollbar__wrap) {
      height: 49px;
    }
  }
  .tags-view-container {
    height: 34px;
    flex: 1;
    width: 100%;
    display: flex;
  }
  .el-icon-full-screen {
    cursor: pointer;
    &:hover {
      background: rgba(0,0,0,.025);
    }
    &:focus {
      outline: none;
    }
  }
  .tab-ddropdown-item {
    display: flex;
    align-items: center;
  }
</style>

<template>
  <header>
    <div class="left-box">
      <!-- 收缩按钮 -->
      <div class="menu-icon" @click="opendStateChange">
        <el-icon v-if="isCollapse"><Expand /></el-icon>
        <el-icon v-else><Fold /></el-icon>
      </div>
      <Breadcrumb />
    </div>
    <div class="right-box">
      <!-- 快捷功能按钮 -->
      <div class="function-list">
        <div class="function-list-item hidden-sm-and-down"><Full-screen /></div>
        <div class="function-list-item">
          <Word />
        </div>
        <div class="function-list-item">
          <SizeChange />
        </div>
        <div class="function-list-item hidden-sm-and-down">
          <Theme />
        </div>
        <div class="function-list-item hidden-sm-and-down">
          <Github />
        </div>
      </div>
      <!-- 用户信息 -->
      <div class="user-info">
        <el-dropdown size="default">
          <span class="el-dropdown-link">
            <!-- <el-avatar :size="24"
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />  -->
            {{ $t('message.system.user') }}

            <el-icon>
              <ArrowDown />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="showPasswordLayer"><el-icon>
                  <Unlock />
                </el-icon>{{ $t('message.system.changePassword') }}</el-dropdown-item>
              <el-dropdown-item @click="loginOut"><el-icon>
                  <SwitchButton />
                </el-icon>{{ $t('message.system.loginOut') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <password-layer :layer="layer" v-if="layer.show" />
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import FullScreen from './functionList/fullscreen.vue'
import Word from './functionList/word.vue'
import SizeChange from './functionList/sizeChange.vue'
import Github from './functionList/github.vue'
import Theme from './functionList/theme.vue'
import Breadcrumb from './Breadcrumb.vue'
import PasswordLayer from './passwordLayer.vue'
export default defineComponent({
  components: {
    FullScreen,
    Breadcrumb,
    Word,
    SizeChange,
    Github,
    Theme,
    PasswordLayer
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const layer = reactive({
      show: false,
      showButton: true
    })
    const isCollapse = computed(() => store.state.app.isCollapse)
    // isCollapse change to hide/show the sidebar
    const opendStateChange = () => {
      store.commit('app/isCollapseChange', !isCollapse.value)
    }

    // login out the system
    const loginOut = () => {
      store.dispatch('user/loginOut')
    }

    const showPasswordLayer = () => {
      layer.show = true
    }
    return {
      isCollapse,
      layer,
      opendStateChange,
      loginOut,
      showPasswordLayer
    }
  }
})
</script>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: var(--system-header-background);
  padding-right: 22px;
}

.left-box {
  height: 100%;
  display: flex;
  align-items: center;

  .menu-icon {
    width: 60px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: 100;
    cursor: pointer;
    margin-right: 10px;

    &:hover {
      background-color: var(--system-header-item-hover-color);
    }

    i {
      color: var(--system-header-text-color);
    }
  }
}

.right-box {
  display: flex;
  justify-content: center;
  align-items: center;

  .function-list {
    display: flex;

    .function-list-item {
      width: 30px;
      display: flex;
      justify-content: center;
      align-items: center;

      :deep(i) {
        color: var(--system-header-text-color);
      }
    }
  }

  .user-info {
    margin-left: 20px;

    .el-dropdown-link {
      color: var(--system-header-breadcrumb-text-color);
    }
  }
}

.head-fold {
  font-size: 20px;
}</style>
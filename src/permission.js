import usePermissionStore from '@/store/modules/permission'
import useUserStore from '@/store/modules/user'
import { getToken } from '@/utils/auth'
import { isReLogin } from '@/utils/request'
import { isHttp, isPathMatch } from '@/utils/validate'
import { ElMessage } from 'element-plus'
import NProgress from 'nprogress'
import router from './router'
import useSettingsStore from './store/modules/settings'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login', '/register']

function isWhiteList(path) {
  return whiteList.some(pattern => isPathMatch(pattern, path))
}

router.beforeEach((to, from, next) => {
  const { setTitle } = useSettingsStore()
  const userStore = useUserStore()
  NProgress.start()
  if (getToken()) {
    to.meta.title && setTitle(to.meta.title)
    /* has token */
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    }
    else if (isWhiteList(to.path)) {
      next()
    }
    else {
      if (userStore.roles.length === 0) {
        isReLogin.show = true
        // 判断当前用户是否已拉取完user_info信息
        userStore.getInfo().then(() => {
          isReLogin.show = false
          usePermissionStore().generateRoutes().then((accessRoutes) => {
            // 根据roles权限生成可访问的路由表
            accessRoutes.forEach((route) => {
              if (!isHttp(route.path)) {
                router.addRoute(route) // 动态添加可访问路由表
              }
            })
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
          })
        }).catch(async () => {
          await userStore.logOut()
          next({ path: '/' })
        })
      }
      else {
        next()
      }
    }
  }
  else {
    // 没有token
    if (isWhiteList(to.path)) {
      // 在免登录白名单，直接进入
      next()
    }
    else {
      next(`/login?redirect=${to.fullPath}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})

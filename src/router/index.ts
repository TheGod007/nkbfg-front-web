import { Router, createRouter, createWebHashHistory } from 'vue-router'
import other from './other'

const router: Router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/main/Main.vue'),
      children: other
    },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login/Login.vue')
    },
    {
      name: 'register',
      path: '/register',
      component: () => import('@/views/register/Register.vue')
    },
    {
      name: 'forgetPass',
      path: '/forgetPass',
      component: () => import('@/views/forgetPass/ForgetPass.vue')
    },
    {
      name: 'moviedetail',
      path: '/moviedetail',
      props: true,
      component: () => import('@/views/detail/MovieDetail.vue')
    },
    {
      name: 'picturedetail',
      path: '/picturedetail',
      props: true,
      component: () => import('@/views/detail/PictureDetail.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notfound',
      component: () => import('@/views/notfount/NotFound.vue')
    },
    {
      name: 'usercenter',
      path: '/usercenter',
      component: () => import('@/views/usercenter/Usercenter.vue'),
      children: [
        {
          name: 'picture2',
          path: 'picture',
          component: () => import('@/views/usercenter/picture/Picture.vue')
        },
        {
          name: 'movie2',
          path: 'movie',
          component: () => import('@/views/usercenter/movie/Movie.vue')
        },
        {
          name: 'group2',
          path: 'group',
          component: () => import('@/views/usercenter/group/Group.vue')
        },
        {
          name: 'activity2',
          path: 'activity',
          component: () => import('@/views/usercenter/activity/Activity.vue')
        },
        {
          name: 'crowdfunding2',
          path: 'crowdfunding',
          component: () => import('@/views/usercenter/crowdfunding//Crowdfunding.vue')
        },
        {
          name: 'notice2',
          path: 'notice',
          component: () => import('@/views/usercenter/notice/Notice.vue')
        }
      ]
    },
    {
      name: 'admincenter',
      path: '/admincenter',
      component: () => import('@/views/admincenter/Admincenter.vue'),
      children: [
        {
          name: 'picture1',
          path: 'picture',
          component: () => import('@/views/admincenter/picture/Picture.vue')
        },
        {
          name: 'movie1',
          path: 'movie',
          component: () => import('@/views/admincenter/movie/Movie.vue')
        },
        {
          name: 'group1',
          path: 'group',
          component: () => import('@/views/admincenter/group/Group.vue')
        },
        {
          name: 'activity1',
          path: 'activity',
          component: () => import('@/views/admincenter/activity/Activity.vue')
        },
        {
          name: 'crowdfunding1',
          path: 'crowdfunding',
          component: () => import('@/views/admincenter/crowdfunding//Crowdfunding.vue')
        },
        {
          name: 'notice1',
          path: 'notice',
          component: () => import('@/views/admincenter/notice/Notice.vue')
        },
        {
          name: 'usermanage',
          path: 'usermanage',
          component: () => import('@/views/admincenter/usermanage/UserManage.vue')
        },
        {
          name: 'rolemanage',
          path: 'rolemanage',
          component: () => import('@/views/admincenter/rolemanage/RoleManage.vue')
        },
        {
          name: 'promissionmanage',
          path: 'promissionmanage',
          component: () => import('@/views/admincenter/promissionmanage/PromissionManage.vue')
        }
      ]
    },
    {
      name: 'acountseting',
      path: '/acountseting',
      component: () => import('@/views/acountseting/Acountseting.vue'),
      children: [
        {
          name: 'userinf',
          path: 'userinf',
          component: () => import('@/views/acountseting/userinf/Userinf.vue')
        },
        {
          name: 'restpass',
          path: 'restpass',
          component: () => import('@/views/acountseting/restpass/Restpass.vue')
        },
        {
          name: 'verify',
          path: 'verify',
          component: () => import('@/views/acountseting/verify/Verify.vue')
        },
        {
          name: 'upavatar',
          path: 'upavatar',
          component: () => import('@/views/acountseting/upavatar/UpAvatar.vue')
        }
      ]
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})
router.beforeEach((to, _from, next) => {
  if (to.path === '/') {
    return next('/home')
  }
  if (!localStorage.getItem('token')) {
    if (to.path.startsWith('/acountseting') || to.path.startsWith('/usercenter') || to.path.startsWith('/admincenter')) {
      return next('/home')
    }
  }

  next()
})
export default router

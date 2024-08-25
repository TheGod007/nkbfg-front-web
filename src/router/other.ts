export default [
  {
    name: 'home',
    path: 'home',
    component: () => import('@/views/home/Home.vue')
  },
  {
    name: 'counter',
    path: 'counter',
    component: () => import('@/views/counter/Counter.vue')
  },
  {
    name: 'friendsget',
    path: 'friendsget',
    component: () => import('@/views/friendsget/Friendsget.vue')
  },
  {
    name: 'picture',
    path: 'picture',
    component: () => import('@/views/picture/Picture.vue')
  },
  {
    name: 'movie',
    path: 'movie',
    component: () => import('@/views/movie/Movie.vue')
  },
  {
    name: 'group',
    path: 'group',
    component: () => import('@/views/group/Group.vue')
  },
  {
    name: 'activity',
    path: 'activity',
    component: () => import('@/views/activity/Activity.vue')
  },
  {
    name: 'crowdfunding',
    path: 'crowdfunding',
    component: () => import('@/views/crowdfunding//Crowdfunding.vue')
  },
  {
    name: 'notice',
    path: 'notice',
    component: () => import('@/views/notice/Notice.vue')
  },
  {
    name: 'donate',
    path: 'donate',
    component: () => import('@/views/donate/Donate.vue')
  }
]

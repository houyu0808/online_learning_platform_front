import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/loginAndRegister')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/main/index'),
      meta: {requireAuth: true},
      redirect: '/learning-platform/',
      children: [
        {
          path: '/learning-platform/',
          name: '首页',
          component: () => import('../views/main/homePage/index'),
          meta: {requireAuth: true}
        },
        {
          path: '/learning-platform/broadcast-center',
          name: '直播中心',
          component: () => import('../views/main/broadcastCenter/index'),
          meta: {requireAuth: true}
        },
        {
          path: '/learning-platform/task-list',
          name: '任务清单',
          component: () => import('../views/main/taskList/index'),
          meta: {requireAuth: true}
        }
      ]
    },
    {
      path: '/admin',
      name: '/admin',
      component: () => import('../views/adminPage/admin'),
      meta: {requireAuth: false}
    },
    {
      path: '/back-stage',
      name: '首页',
      component: () => import('../views/adminPage/back-stage/index'),
      meta: {requireAuth: true},
      children: [
        {
          path: '/student-manage',
          name: '学生管理',
          component: () => import('../views/adminPage/back-stage/student-manage/index'),
          meta: {requireAuth: true}
        },
        {
          path: '/student-manage-detail',
          name: '编辑学生',
          component: () => import('../views/adminPage/back-stage/student-manage/detail/index'),
          meta: {requireAuth: true},
          props: (router) => {
            return {id: router.query.id};
          }
        },
        {
          path: '/teacher-manage',
          name: '教师管理',
          component: () => import('../views/adminPage/back-stage/teacher-manage/index'),
          meta: {requireAuth: true}
        },
        {
          path: '/teacher-manage-detail',
          name: '编辑教师',
          component: () => import('../views/adminPage/back-stage/teacher-manage/detail/index'),
          meta: {requireAuth: true},
          props: (router) => {
            return {id: router.query.id};
          }
        },
        {
          path: '/college-manage',
          name: '学院管理',
          component: () => import('../views/adminPage/back-stage/college-manage/index'),
          meta: {requireAuth: true}
        },
        {
          path: '/college-manage-detail',
          name: '编辑学院',
          component: () => import('../views/adminPage/back-stage/college-manage/detail/index'),
          meta: {requireAuth: true},
          props: (router) => {
            return {id: router.query.id};
          }
        },
        {
          path: '/major-manage',
          name: '专业管理',
          component: () => import('../views/adminPage/back-stage/major-manage/index'),
          meta: {requireAuth: true}
        },
        {
          path: '/major-manage-detail',
          name: '编辑专业',
          component: () => import('../views/adminPage/back-stage/major-manage/detail/index'),
          meta: {requireAuth: true},
          props: (router) => {
            return {id: router.query.id};
          }
        },
        {
          path: '/course-manage',
          name: '课程管理',
          component: () => import('../views/adminPage/back-stage/course-manage/index'),
          meta: {requireAuth: true}
        },
        {
          path: '/course-manage-detail',
          name: '编辑课程',
          component: () => import('../views/adminPage/back-stage/course-manage/detail/index'),
          meta: {requireAuth: true},
          props: (router) => {
            return {id: router.query.id};
          }
        },
        {
          path: '/class-manage',
          name: '班级管理',
          component: () => import('../views/adminPage/back-stage/class-manage/index'),
          meta: {requireAuth: true}
        },
        {
          path: '/class-manage-detail',
          name: '编辑课程',
          component: () => import('../views/adminPage/back-stage/class-manage/detail/index'),
          meta: {requireAuth: true},
          props: (router) => {
            return {id: router.query.id};
          }
        },
        {
          path: '/video-manage',
          name: '视频管理',
          component: () => import('../views/adminPage/back-stage/video-manage/index'),
          meta: {requireAuth: true}
        },
        {
          path: '/video-manage-detail',
          name: '编辑课程',
          component: () => import('../views/adminPage/back-stage/video-manage/detail/index'),
          meta: {requireAuth: true},
          props: (router) => {
            return {id: router.query.id};
          }
        }
      ]
    }
  ]
});

router.beforeEach(function(to, from, next) {
  if (!localStorage.getItem("token")) {
    if (to.path !== '/' && to.meta.requireAuth) {
      return next('/');
    }
  }
  next();
});

export default router;
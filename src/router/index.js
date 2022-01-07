import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
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
      component: () => import('../views/homePage/index')
    },
    {
      path: '/admin',
      name: '/admin',
      component: () => import('../views/adminPage/admin')
    },
    {
      path: '/back-stage',
      name: '首页',
      component: () => import('../views/adminPage/back-stage/index'),
      children: [
        {
          path: '/student-manage',
          name: '学生管理',
          component: () => import('../views/adminPage/back-stage/student-manage/index')
        },
        {
          path: '/student-manage-detail',
          name: '编辑学生',
          component: () => import('../views/adminPage/back-stage/student-manage/detail/index'),
          props: (router) => {
            return {id: router.query.id};
          }
        },
        {
          path: '/teacher-manage',
          name: '教师管理',
          component: () => import('../views/adminPage/back-stage/teacher-manage/index')
        },
        {
          path: '/teacher-manage-detail',
          name: '编辑教师',
          component: () => import('../views/adminPage/back-stage/teacher-manage/detail/index'),
          props: (router) => {
            return {id: router.query.id};
          }
        },
        {
          path: '/college-manage',
          name: '学院管理',
          component: () => import('../views/adminPage/back-stage/college-manage/index')
        },
        {
          path: '/college-manage-detail',
          name: '编辑学院',
          component: () => import('../views/adminPage/back-stage/college-manage/detail/index'),
          props: (router) => {
            return {id: router.query.id};
          }
        },
        {
          path: '/major-manage',
          name: '专业管理',
          component: () => import('../views/adminPage/back-stage/major-manage/index')
        },
        {
          path: '/major-manage-detail',
          name: '编辑专业',
          component: () => import('../views/adminPage/back-stage/major-manage/detail/index'),
          props: (router) => {
            return {id: router.query.id};
          }
        },
        {
          path: '/course-manage',
          name: '课程管理',
          component: () => import('../views/adminPage/back-stage/course-manage/index')
        },
        {
          path: '/course-manage-detail',
          name: '编辑课程',
          component: () => import('../views/adminPage/back-stage/course-manage/detail/index'),
          props: (router) => {
            return {id: router.query.id};
          }
        },
        {
          path: '/class-manage',
          name: '班级管理',
          component: () => import('../views/adminPage/back-stage/class-manage/index')
        },
        {
          path: '/class-manage-detail',
          name: '编辑课程',
          component: () => import('../views/adminPage/back-stage/class-manage/detail/index'),
          props: (router) => {
            return {id: router.query.id};
          }
        },
        {
          path: '/video-manage',
          name: '视频管理',
          component: () => import('../views/adminPage/back-stage/video-manage/index')
        },
        {
          path: '/video-manage-detail',
          name: '编辑课程',
          component: () => import('../views/adminPage/back-stage/video-manage/detail/index'),
          props: (router) => {
            return {id: router.query.id};
          }
        }
      ]
    }
  ]
});

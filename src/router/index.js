import Vue from 'vue'
import Router from 'vue-router'

import Layout from 'layout'

Vue.use(Router)

export const constantRoutes =[
  // 登录界面路由
  {
    path: '/login',
    redirect: '/login/student-login',
    component: () => import('@/views/login/login'),
    hidden: true,
    children: [
      {
        path: '/login/student-login',
        component: () => import('@/views/login/student'),
        name: 'student-login'
      },
      {
        path: '/login/teacher-login',
        component: () => import('@/views/login/teacher'),
        name: 'teacher-login'
      },
      {
        path: '/login/admin-login',
        component: () => import('@/views/login/admin'),
        name: 'admin-login'
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/ErrorPage'),
    hidden: true
  }
]

export const studentRoutes = [
  {
    path: '/',
    redirect: '/notice'
  },
  {
    path: '/notice',
    component: Layout,
    redirect: '/notice/received',
    // alwaysShow: true,
    name: 'notice',
    meta: {
      title: '通知',
      icon: 'tongzhi',
    },
    children: [
      // {
      //   path: '/notice/edit',
      //   component: () => import('@/views/student/notice/NoticeEdit'),
      //   name: '发送通知',
      //   meta: {
      //     title: '发送通知',
      //     icon: 'sendNotice',
      //   }
      // },
      // {
      //   path: '/notice/sent',
      //   component: () => import('@/views/student/notice/Sent'),
      //   name: '我发出的',
      //   meta: {
      //     title: '我发出的',
      //     icon: 'wofachude'
      //   }
      // },
      {
        path: '/notice/received',
        component: () => import('@/views/student/notice/Received'),
        name: '我收到的',
        meta: {
          title: '我收到的',
          icon: 'woshoudaode'
        }
      },
    ]
  },
  {
    path: '/exam',
    component: Layout,
    redirect: '/exam/my-exam',
    alwaysShow: true,
    name: '考试',
    meta: {
      title: '考试',
      icon: 'kaoshi',
    },
    children: [
      {
        path: '/exam/my-exam',
        component: () => import('@/views/student/exam/MyExam'),
        name: '我的考试',
        meta: {
          title: '我的考试',
          icon: 'kaoshi_2'
        }
      },
      {
        path: '/exam/exam-data',
        component: () => import('@/views/student/exam/ExamData'),
        name: '考试数据',
        meta: {
          title: '考试数据',
          icon: 'shujukanban'
        }
      },
      {
        path: 'exam/mistakes',
        component: () => import('@/views/student/exam/Mistakes'),
        name: '错题本',
        meta: {
          title: '错题本',
          icon: 'cuotiben'
        }
      }
    ]
  },
  {
    path: '/exam/do',
    component: () => import('views/student/exam/myexam/do'),
    hidden: true,
    name: '进行考试',
  },
  {
    path: '/exam/read',
    component: () => import('views/student/exam/myexam/read'),
    hidden: true,
    name: '查看试卷'
  },
  {
    path: '/help',
    component: Layout,
    name: '帮助',
    meta: {
      title: '帮助',
      icon: 'bangzhu'
    },
    children: [
      {
        path: '/help/index',
        component: () => import('@/views/student/help/Help'),
        meta: {
          title: '帮助',
          icon: 'bangzhu',
          breadcrumb: false
        },
      }
    ]
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/index',
    name: '个人资料',
    meta: {
      title: '个人资料',
      icon: 'profile'
    },
    children: [
      {
        path: '/profile/index',
        component: () => import('@/views/student/profile/Profile'),
        meta: {
          title: '个人资料',
          icon: 'profile',
          breadcrumb: false
        },
      },
      {
        path: '/profile/faceInfo',
        component: () => import('@/views/student/profile/faceInfo'),
        meta: {
          title: '人脸信息',
          icon: 'profile',
          breadcrumb: false
        },
      }
    ]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export const teacherRoutes = [
  {
    path: '/',
    redirect: '/exam'
  },
  {
    path: '/exam',
    component: Layout,
    redirect: '/exam/exam-edit',
    alwaysShow: true,
    name: '考试',
    meta: {
      title: '考试',
      icon: 'kaoshi',
    },
    children: [
      {
        path: '/exam/exam-spot',
        component: () => import('@/views/teacher/examSpot'),
        name: '考试现场',
        meta: {
          title: '考试现场',
          icon: 'shujukanban'
        }
      },
      {
        path: '/exam/exam-edit',
        component: () => import('@/views/teacher/examEdit'),
        name: '试卷创编及发布',
        meta: {
          title: '试卷创编及发布',
          icon: 'kaoshi_2'
        }
      },
      {
        path: 'exam/question-edit',
        component: () => import('@/views/teacher/questionEdit'),
        name: '试题创编',
        meta: {
          title: '试题创编',
          icon: 'shitichuangbian'
        }
      },
      {
        path: 'exam/grading-paper',
        component: () => import('@/views/teacher/gradingPaper'),
        name: '试卷批阅',
        meta: {
          title: '试卷批阅',
          icon: 'piyue'
        }
      },
      {
        path: 'exam/exam-data',
        component: () => import('@/views/teacher/examData'),
        name: '考试数据',
        meta: {
          title: '考试数据',
          icon: 'cuotiben'
        }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

export const adminRoutes = []

// 解决路由相同跳转报错
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) {
    return originalPush.call(this, location, onResolve, onReject)
  }
  return originalPush.call(this, location).catch((err) => err)
}

const createRouter = () => new Router({
  mode: 'hash', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

export const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

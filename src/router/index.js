import Login from '@/pages/Login/index'
import NotFound from '../pages/NotFound'
import BasicLayout from '@/layouts'
export const constantRoutes = [
  {
    path: '/login',
    name: 'login',
    exact: true,
    component: Login,
  },
  {
    path: '/',
    component: BasicLayout,
    wrappers: ['Login'],
    routes: [
      {
        path: '/',
        exact: true,
        redirect: '/dashboard',
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        title: '首页',
        icon: '',
        component: 'Dashboard',
      },
      {
        path: '/article',
        name: 'Article',
        title: '文章',
        icon: '',
        routes: [
          {
            path: '/article/list',
            name: 'Article',
            title: '文章列表',
            component: 'Article',
          },
          {
            path: '/article/:id',
            name: 'ArticleDetail',
            title: '文章详情',
            component: 'Article/Detail',
          },
          // {
          //   path: '/article',
          //   redirect: '/article/list',
          // },
        ],
      },
      // {
      //   path: '/form',
      //   name: 'Form',
      //   title: '表单页',
      //   icon: '',
      //   routes: [
      //     {
      //       path: '/form/basic-form',
      //       name: 'BasicForm',
      //       title: '基础表单',
      //       component: 'Form/Basic',
      //     },
      //     {
      //       path: '/form/step-form',
      //       name: 'StepForm',
      //       title: '分步表单',
      //       component: 'Form/Step',
      //     },
      //     {
      //       path: '/form/advanced-form',
      //       name: 'AdvancedForm',
      //       title: '高级表单',
      //       component: 'Form/Advanced',
      //     },
      //     // {
      //     //   path: '/form',
      //     //   redirect: '/form/basic-form',
      //     // },
      //   ],
      // },
    ],
  },
  {
    path: '*',
    name: 'notFound',
    component: NotFound,
  },
]


const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('pages/Login')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('pages/Register')
  },

  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue"),
        name: 'home'
      },
      {
        path: 'quiz-overview',
        component: () => import('pages/Quiz/QuizStart'),
        name: 'QuizStart'
      },
      {
        path: 'quiz',
        component: () => import('pages/Quiz/QuizFrame'),
        name: 'quiz',
        children: [
        ]
      },
      {
        path: 'quiz-result',
        component: () => import('pages/Quiz/Finished'),
        name: 'Finished'
      },
      {
        path: 'faq',
        component: () => import('pages/Faq'),
        name: 'Faq'
      },
      {
        path: 'contact',
        component: () => import('pages/Contact'),
        name: 'Contact'
      },
      {
        path: 'imprint',
        component: () => import('pages/Imprint'),
        name: 'Imprint'
      },
      {
        path: 'settings',
        component: () => import('pages/Settings'),
        name: 'Settings'
      }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

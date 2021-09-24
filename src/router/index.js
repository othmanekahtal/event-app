import { createRouter, createWebHistory } from 'vue-router'
import EventList from '../views/EventList.vue'
import EventDetails from '../views/Event/Details.vue'
import EventRegister from '../views/Event/Register.vue'
import EventEdit from '../views/Event/Edit.vue'
import About from '../views/About.vue'
import EventLayout from '../views/Event/Layout.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '../views/NetworkError.vue'
import nProgress from 'nprogress'
import GBstore from '@/store/GBstore.js'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: route => ({ page: parseInt(route.query.page) || 1 })
  },
  {
    path: '/events/:id/',
    component: EventLayout,
    props: true,
    beforeEnter: (to, from, next) => {
      EventService.getEvent(to.params.id)
        .then((response) => {
          GBstore.event = response.data;
        })
        .catch((error) => {
          console.log(error);
          if (error?.response.status === 404) {
            return {
              name: "404Resource",
              params: { resource: "event" },
            };
          } else {
            return {
              name: "NetworkError",
            };
          }
        });
    },
    children: [
      {
        // '' empty path means: this component will be loaded at the root path of the parent
        path: '',
        name: 'EventDetails',
        component: EventDetails,

      }
      , {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
      }
      , {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister,
      },
    ]
  }, {
    /**
     *Math on /event/,and capture everything else in afterEvent using (.*) so that it will include / in the match (by default it doesn't).
     */
    path: '/event/:afterEvent(.*)',
    redirect: to => {
      return { path: '/events/' + to.params.afterEvent }
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    alias: '/about-us'
    // you can use '/about' or '/About-us' : load some component
    /**
     *but if you care about SEO,you might not want to use alias cause then you have the same content in two places and google might penalize you.
     */
  },
  {
    path: '/:catchAll(.*)',
    component: NotFound,
    name: 'NotFound'
  },
  {
    path: '/404/:resource',
    component: NotFound,
    name: '404Resource',
    props: true,
  },
  {
    path: '/network-error',
    component: NetworkError,
    name: 'NetworkError',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(() => {
  nProgress.start();
})
router.afterEach(() => {
  nProgress.done();
})
export default router

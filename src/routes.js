import VueRouter from 'vue-router'

// Import components
import Regions from './routes/Regions.vue'
import News from './routes/News.vue'
import Results from './routes/Results.vue'

//import data from './dataRoot'

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Regions
    },
    {
      path: '/news',
      component: News
    },
    {
      path: '/results',
      component: Results
    }
  ],

  mode: 'history'
})
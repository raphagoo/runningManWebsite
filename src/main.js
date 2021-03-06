import Vue from 'vue'
import logger from 'logger'

import App from './App.vue'
import config from 'config'
import { router } from './router'
import { store } from './store/index.js'
import api from './interfaces/apiInterface'
import VueMaterial from 'vue-material'
import Chart from 'chart.js'
import Chartkick from 'vue-chartkick'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css' // This line here
import VueParticles from 'vue-particles'



Vue.use(VueParticles)
Vue.use(VueMaterial)
Vue.use(Chartkick.use(Chart))
// prevents from display notice about running in dev mode
Vue.config.productionTip = false

// make api and log available everywhere
Vue.prototype.$api = api
Vue.prototype.$log = logger

logger.info('config:', config);
logger.info('main.js VERSION', VERSION); // eslint-disable-line no-undef

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

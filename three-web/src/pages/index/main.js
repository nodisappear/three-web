import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import Global from '@/js/Global.js'

Vue.use(ElementUI)

new Vue({
    render: h => h(App)
}).$mount('#app')



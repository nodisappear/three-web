import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
	mode:'hash',
    routes: [
        {
            path: '/',
            name: '魔方',
            component: () => import('./views/PersonLoader.vue')
        },           
    ]
})

export default router
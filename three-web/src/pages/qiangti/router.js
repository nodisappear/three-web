import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
	mode:'hash',
    routes: [
        {
            path: '/',
            name: '墙体',
            component: () => import('./views/SkyLoader.vue')
        },           
    ]
})

export default router
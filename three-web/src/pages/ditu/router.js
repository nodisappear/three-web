import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router =  new Router({
	mode:'hash',
    routes: [
        {
            path: '/',
            name: '地图',
            component: () => import('./views/MapLoader.vue')
        },           
    ]
})

export default router
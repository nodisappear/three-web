import Vue from 'vue'
import vuex from 'vuex'

Vue.use(vuex)
const debug = process.env.NODE_ENV !== 'production' //只在生产环境下开启严格模式

export default new vuex.Store({
    namespaced:true,
})

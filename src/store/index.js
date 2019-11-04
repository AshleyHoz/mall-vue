import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// 引入各模块
import Menu from './modules/Menu/index.js'
import Admin from './modules/Admin/index.js'

Vue.use(Vuex)


export default new Vuex.Store({
	state: {

	},
	mutations: {

	},
	actions: {

	},
	getters: {

	},
	modules: {
		Menu,
		Admin
	},
	plugins: [createPersistedState()], //持久化保存数据
}) 

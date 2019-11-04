import Vue from 'vue'
import Router from 'vue-router'
import Element from 'element-ui';
import Home from './views/Home.vue'
import LayOut from './components/LayOut.vue'

Vue.use(Router)
Vue.use(Element, { size: 'small' });

let router = new Router({
	routes: [{
			path: '/',
			name: 'home',
			redirect: '/login',
			component: Home
		},
		{
			path: '/login',
			name: 'Login',
			component: () => import('./views/Admin/Login.vue')
		},
		{
			path: '/register',
			name: 'Register',
			component: () => import('./views/Admin/Register.vue')
		},
		// 管理员模块
		{
			path: '/admin/',
			name: 'Admin',
			component: LayOut,
			children: [{
				path: 'list',
				name: 'AdminList',
				component: () => import('./views/Admin/List.vue')
			},
			{
				path: 'info',
				name: 'AdminInfo',
				component: () => import('./views/Admin/Info.vue')
			},
			]
		},
		// 商品模块
		{
			path: '/goods/',
			name: 'Goods',
			component: LayOut,
			children: [
				{
				path: 'list',
				name: 'GoodsList',
				component: () => import('./views/Goods/List.vue')
			},{
				path: 'edit/:id',
				name: 'GoodsEdit',
				component: () => import('./views/Goods/Edit.vue')
			},{
				path: 'category',
				name: 'GoodsCategory',
				component: () => import('./views/Goods/Category.vue')
			},{
				path: 'release',
				name: 'GoodsRelease',
				component: () => import('./views/Goods/Release.vue')
			}
			]
		},
		// 订单模块
		{
			path: '/order/',
			name: 'Order',
			component: LayOut,
			children: [
				{
				path: 'list',
				name: 'OrderList',
				component: () => import('./views/Order/List.vue')
			},
			]
		},
		// 账户模块
		{
			path: '/user/',
			name: 'User',
			component: LayOut,
			children: [
				
			]
		},
		// 权限模块
		{
			path: '/limit/',
			name: 'Limit',
			component: LayOut,
			children: [
				{
				path: 'list',
				name: 'LimitList',
				component: () => import('./views/Limit/Role.vue')
			},{
				path: 'menu',
				name: 'LimitMenu',
				component: () => import('./views/Limit/Menu.vue')
			}
			]
		},
	]
})

export default router;

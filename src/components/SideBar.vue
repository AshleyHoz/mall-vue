<template>
	<div class="side-bar">
		<el-row class="tac">
			<el-col :span="12">
				<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" text-color="#fff"
				 active-text-color="#ffd04b" :collapse="isCollapse">
					<el-submenu class="item" index="1">
						<template slot="title">
							<i class="el-icon-goods"></i>
							<span>商品管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item class="" index="1-1">
								<router-link to="/goods/category" style="text-decoration: none;" class="items">商品分类</router-link>
							</el-menu-item>
							<el-menu-item index="1-2">
								<router-link to="/goods/release" style="text-decoration: none;" class="items">发布商品</router-link>
							</el-menu-item>
							<el-menu-item index="1-3">
								<router-link to="/goods/list" style="text-decoration: none;" class="items">商品列表</router-link>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu class="item" index="2">
						<template slot="title">
							<i class="el-icon-files"></i>
							<span>订单管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item class="" index="2-1">
								<router-link to="/order/list" style="text-decoration: none;" class="items">订单列表</router-link>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu class="item" index="3">
						<template slot="title">
							<i class="el-icon-setting"></i>
							<span>账户设置</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="3-1">
								<router-link to="/admin/info" style="text-decoration: none;" class="items">账户信息</router-link>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu class="item" index="4">
						<template slot="title">
							<i class="el-icon-user"></i>
							<span>用户管理</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="4-1">
								<router-link to="/admin/list" style="text-decoration: none;" class="items">用户列表</router-link>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
					<el-submenu class="item" index="5">
						<template slot="title">
							<i class="el-icon-set-up"></i>
							<span>权限设置</span>
						</template>
						<el-menu-item-group>
							<el-menu-item index="5-1">
								<router-link to="/limit/list" style="text-decoration: none;" class="items">用户角色</router-link>
							</el-menu-item>
							<el-menu-item index="5-2">
								<router-link to="/limit/menu" style="text-decoration: none;" class="items">菜单权限</router-link>
							</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		methods: {
			handleOpen(key, keyPath) {},
			handleClose(key, keyPath) {},
		},
		computed: mapState('Menu', ['isCollapse'])
	}
</script>

<style lang="scss" scoped>
	.side-bar {
		width: 230px;
		margin-right: 10px;
		display: inline-block;
		background-color: rgb(51, 78, 102);
		min-height: calc(100vh - 50px);

		.item {
			width: 230px;
			background-color: rgb(51, 78, 102);

			.el-menu-item-group {
				background-color: rgb(51, 78, 102);
			}

			.el-menu-item {
				&:hover {
					padding-left: 40px;
					background-color: rgb(51, 78, 102);
				}

				.router-link-active {
					color: rgb(255, 208, 75);
				}
			}

			.items {
				color: white;
			}

		}
	}
</style>

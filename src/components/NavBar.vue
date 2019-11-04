<template>
	<div class="nav-bar">
		<div class="logo fl">
			<img src="../assets/mall-logo.png" alt="">
			<i class="el-icon-s-fold" @click="toggle"></i>
		</div>
		<div class="account fr">
			<el-avatar :src="userInfo.avatar" :headers="header"></el-avatar>
			<el-dropdown class="self">
				<span class="el-dropdown-link" @click="">
					{{userInfo.fullname}}
					<span>▼</span>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item class="item">
						<router-link to="/admin/info" style="text-decoration: none;">账户设置</router-link>
					</el-dropdown-item>
					<el-dropdown-item>
						<router-link to="" style="text-decoration: none;">收到的评论</router-link>
					</el-dropdown-item>
					<el-dropdown-item>
						<router-link to="" style="text-decoration: none;">退出账户</router-link>
					</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
		<div class="clear"></div>
	</div>
	</div>
</template>

<script>
	import { mapState, mapMutations, mapActions } from 'vuex'

	export default {
		data() {
			return {
				header: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
			}
		},
		created() {
			this.loadInfo().then(user => {
				this.$message({
					message: `欢迎${user.role_name}: ${user.username}`,
					type: 'success',
					duration: 2000,
				})
			});
		},
		methods: {
			// toggle() {
			// 	this.$store.Menu.commit('collapseMenu');
			// },
			...mapMutations('Menu', {
				toggle: 'collapseMenu'
			}),
			...mapActions('Admin', ['loadInfo'])
		},
		computed: {
			// ...mapState('Menu',['isCollapse']),
			...mapState('Admin', ['userInfo'])
		}
	}
</script>

<style lang="scss" scoped>
	.fl {
		float: left;
	}

	.fr {
		float: right;
	}

	.clear {
		clear: both;
	}

	.nav-bar {
		height: 50px;
		background-color: black;
		color: #9d9d9d;
		font-size: 14px;
		padding: 0 10px;

		.logo {
			display: flex;
			align-items: center;

			img {
				height: 50px;
			}
		}

		.account {
			display: flex;
			align-items: center;
			margin-top: 5px;

			.self {
				font-size: 16px;
				padding-left: 10px;

				.el-dropdown-link {
					cursor: pointer;

					&:hover {
						color: white;
					}

					.el-icon-arrow-down {
						font-size: 14px;

						.el-dropdown-menu__item {
							background-color: rgb(51, 78, 102);
							color: white;

							&:hover {
								background-color: black;
							}
						}
					}
				}
			}
		}
	}
</style>

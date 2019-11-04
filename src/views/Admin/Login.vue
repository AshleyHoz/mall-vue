<template>
	<div class="login">
		<div class="login-box">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>登录</span>
				</div>
				<!-- <div class="text"> -->
				<el-form class="form-box" ref="form" :rules="rules" :model="form" :label-position="formLabelPosition" label-width="80px">
					<el-form-item label="账户" prop="username">
						<el-input placeholder="请输入账户名!" prefix-icon="el-icon-user" v-model="form.username"></el-input>
					</el-form-item>
					<el-form-item label="密码" prop="password">
						<el-input placeholder="请输入密码!" prefix-icon="el-icon-key" v-model="form.password"></el-input>
					</el-form-item>
					<el-button type="primary" class="btn" @click="loginHandle">登录</el-button>
					<router-link to="/register" class="reg">注册账户</router-link>
					<router-link to="/register" class="forget">忘记密码？</router-link>
				</el-form>
				<!-- </div> -->

			</el-card>
		</div>
	</div>
</template>

<script>
	import { Admin } from '@/api/index.js'

	export default {
		data() {
			return {
				formLabelPosition:'left',
				form: {
					username: '',
					password: ''
				},
				rules: {
					username: [{
							required: true,
							message: '请输入用户名',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 8,
							message: '长度在 3 到 8 个字符',
							trigger: 'blur'
						}
					],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}, {
						type: 'string',
						pattern: /^[0-9]{3,}$/,
						message: '密码至少三位数字',
						trigger: 'blur'
					}]
				}
			}
		},
		methods: {
			loginHandle() {
				let formData = { ...this.form };
				this.$refs.form.validate(async (valid) => {
					if (valid) {
						let { status, msg, data } = await Admin.login(formData);
						if (status) {
							sessionStorage.token = data.token;
							sessionStorage.id = data.id;
							this.$message({
								message: '登陆成功',
								type: 'success',
								duration: 2000,
								onClose: () => {
									this.$router.push('/admin/list');
								}
							})
						} else {
							this.$message.error(msg);
						}
					} else {
						return false;
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.login {
		width: 100%;
		height: 100vh;
		background: url(../../assets/login-bg.jpg) center no-repeat;
		background-size: cover;

		.login-box {
			position: absolute;
			top: 160px;
			right: 60px;
			background-color: white;
			border-radius: 5px;

			.el-input__inner {
				font-size: 14px;
			}

			.el-form-item__label {
				width: 50px;
				text-align: center;
			}

			.el-card.box-card {
				width: 400px;
			}

			.clearfix:before,
			.clearfix:after {
				display: table;
				content: "";
			}

			.clearfix:after {
				clear: both
			}

			.box-card {
				width: 480px;
			}

			.btn {
				display: block;
				margin: 0 auto;
			}

			.reg {
				float: left;
				margin-left: 20px;
				margin: 10px 0;
				text-decoration: none;
				color: #606266;
			}

			.forget {
				float: right;
				margin: 10px 0;
				color: #606266;
				text-decoration: none;
			}
		}
	}
</style>

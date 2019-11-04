<template>
	<div class="register">
		<div class="register-box">
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<span>注册</span>
				</div>
					<el-form ref="form" :rules="rules" class="form-box" :model="form" label-width="80px">
						<el-form-item label="账户" prop="username">
							<el-input placeholder="账户名长度在3到15个字符!" prefix-icon="el-icon-user" v-model="form.username"></el-input>
						</el-form-item>
						<el-form-item label="密码" prop="password">
							<el-input placeholder="密码至少3位数字!" prefix-icon="el-icon-key" v-model="form.password"></el-input>
						</el-form-item>
						<el-form-item label="姓名" prop="fullname">
							<el-input placeholder="请填写真实姓名" prefix-icon="el-icon-postcard" v-model="form.fullname"></el-input>
						</el-form-item>
						<el-form-item label="性别" prop="sex">
							<el-radio-group v-model="form.sex">
								<el-radio label="男"></el-radio>
								<el-radio label="女"></el-radio>
							</el-radio-group>
						</el-form-item>
						<el-form-item label="手机" prop="tel">
							<el-input placeholder="请填写常用手机号码!" prefix-icon="el-icon-mobile-phone" v-model="form.tel"></el-input>
						</el-form-item>
						<el-form-item prop="type">
							<el-checkbox-group v-model="form.type">
								<el-checkbox label="同意本站用户协议" name="type"></el-checkbox>
							</el-checkbox-group>
						</el-form-item>
						<el-button type="primary" class="btn" @click="registerHandle">注册</el-button>
						<router-link to="/login" class="reg">注册账户</router-link>
						<router-link to="/login" class="forget">忘记密码？</router-link>
					</el-form>
			</el-card>
		</div>
	</div>
</template>

<script>
	import {Admin} from '@/api/index.js'
	
	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',
					fullname: '',
					sex: '',
					tel: '',
					type: []
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
						pattern: /^[A-z|0-9]{2,18}$/,
						message: '长度在 2 到 18 个字符',
						trigger: 'blur'
					}],
					fullname: [{
						required: true,
						message: '请输入真实姓名',
						trigger: 'blur'
					}, {
						type: 'string',
						pattern: /^[A-z|\u4e00-\u9fa5]{2,20}$/,
						message: '长度在 2 到 20 个字符',
						trigger: 'blur'
					}],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					tel: [{
						required: true,
						message: '请输入手机号码',
						trigger: 'blur'
					}, {
						min: 11,
						type: 'string',
						pattern: /^1[3456789]\d{9}$/,
						message: '长度为 11 个字符',
						trigger: 'blur'
					}],
					type: [{
						type: 'array',
						required: true,
						message: '请同意用户协议',
						trigger: 'change'
					}],
				}
			}
		},
		methods: {
			registerHandle() {
				let formData = {...this.form};
				
				this.$refs.form.validate(async (valid)=>{
					if(valid){
						let {status,msg} = await Admin.register(formData);
						if(status){
							this.$message({
								message: '注册成功！',
								type: 'success',
								duration: 2000,
								onClose: () => {
									this.$router.push('/admin/list');
								}
							});
						}else{
							this.$message.error(msg);
						}
					}else{
						return false;
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.register {
		width: 100%;
		height: 100vh;
		background: url(../../assets/login-bg.jpg) center no-repeat;
		background-size: cover;

		.register-box {
			position: absolute;
			top: 160px;
			right: 60px;
			background-color: white;
			border-radius: 5px;

			// .el-input.el-input--small {
			// 	position: relative;
			// }

			// .el-icon-user,
			// .el-icon-key,
			// .el-icon-postcard,
			// .el-icon-mobile-phone {
			// 	position: absolute;
			// 	top: 10px;
			// 	left: 10px;
			// }
			.el-input{
				// padding-left: 10px;
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
				text-decoration: none;
				color: #606266;
			}
			
		}
	}
</style>

<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>账户信息</span>
		</div>
		<el-form ref="form" :model="form" label-width="80px">
			<el-form-item label="账户">
				<el-input disabled v-model="form.username"></el-input>
			</el-form-item>
			<el-form-item label="姓名">
				<el-input v-model="form.fullname"></el-input>
			</el-form-item>
			<el-form-item label="性别">
				<el-radio-group v-model="form.sex">
					<el-radio label="男"></el-radio>
					<el-radio label="女"></el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="手机">
				<el-input v-model="form.tel"></el-input>
			</el-form-item>
			<el-form-item label="权限">
				<el-select v-model="form.role_name" placeholder="请选择分类">
					<el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="头像" prop="avatar">
				<!-- element UI规定data 绑定其他属性 -->
				<el-upload class="avatar-uploader" action="/api/upload/avatar" :headers="headers" :data="{type:'avatar'}"
				 :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="form.avatar" :src="form.avatar" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<div class="cover" v-show="isShow">
					<i class="el-icon-delete-solid" @click="deleteHandle(form.avatar)"></i>
				</div>
			</el-form-item>

			<el-form-item>
				<el-button type="primary" @click="update">修改</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import Editor from '@/components/EditorBar.vue'
	import { Admin, Role } from '@/api/index.js'
	// import { mapState, mapMutations, mapActions } from 'vuex'
	import { createNamespacedHelpers } from 'vuex'
	let { mapState, mapMutations, mapActions } = createNamespacedHelpers('Admin')

	export default {
		data() {
			return {
				headers: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
				isShow: false,
				form: {
					avatar: '',
					email: '',
					fullname: '',
					id: '',
					role: '',
					role_name: '',
					sex: '',
					tel: '',
					username: '',
				},
				options: [],
				disabled: false,
			}
		},
		components: {
			Editor
		},
		created() {
			this.loadList(1);
			// this.loadInfo().then(user => {
			// 	this.form = { ...user };
			// })
			this.form = { ...this.userInfo };
		},
		methods: {
			// ...mapActions(['loadInfo']),
			async loadList(pId) {
				let { status, data } = await Role.list();
				if (status) {
					this.options = data;
				}
				if (this.form.avatar != null) {
					this.isShow = true;
				} else {
					this.isShow = false;
				}
			},
			async update() {
				// 解构                                  分发actions,传值form
				let { status, msg } = await this.$store.dispatch('Admin/updateInfo', { ...this.form });
				if (status) {
					this.$message.success('更新成功！')
				} else {
					this.$message.error('更新成功！')
				}
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				this.isShow = false;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			// 上传成功
			handleAvatarSuccess(res, file) {
				this.form.avatar = res.src;
				this.isShow = true;
				console.log(res, file);
			},
			async deleteHandle(src) {
				console.log(src)
				src = src.substr(1);
				let { status, msg } = await Admin.delImg({ src });
				if (status) {
					this.$message({
						message: '删除成功',
						type: 'success',
						duration: 1000,
					});
					this.form.avatar = '';
					this.isShow = false;
				} else {
					this.$message.error(msg);
					this.isShow = true;
				}
			},

		},
		computed: {
			// ...mapState('Admin',['userInfo'])
			...mapState(['userInfo'])
		}
	}
</script>

<style lang="scss" scoped>
	.text {
		font-size: 14px;
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
		width: 1250px;
		margin-top: 10px;
	}

	.items {
		width: 160px;
	}

	.el-input__inner {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		vertical-align: middle;
		display: table-cell;
		height: 32px;
		line-height: 32px;
		border-radius: 4px;
		border: 1px solid #dcdfe6;
		padding: 0 15px;
	}

	.el-form-item__label {
		width: 100px;
	}

	.title {
		width: 1200px;
		padding: 10px;
		font-size: 16px;
		background-color: #ebeef5;
		margin-bottom: 10px;
	}

	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	.cover {
		width: 178px;
		height: 178px;
		background-color: rgba(0, 0, 0, 0.2);
		position: absolute;
		bottom: 11px;
		left: 50%;
		margin-top: -50%;
		margin-left: -50%;

		i {
			width: 150px;
			height: 150px;
			position: absolute;
			top: 120px;
			bottom: 0;
			left: 80px;
			right: 0;
			margin: auto;
			color: white;
		}
	}
</style>

<template>
	<div id="app">
		<el-card class="box-card">
			<div slot="header" class="clearfix">
				<span>用户列表</span>
			</div>
			<el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
				<el-table-column prop="id" label="#" width="50">
				</el-table-column>
				<el-table-column prop="avatar" label="头像" sortable width="150">
					<template slot-scope="scope">
						<el-avatar :size="50" :src="scope.row.avatar"></el-avatar>
					</template>
				</el-table-column>
				<el-table-column prop="username" label="账号" sortable width="120">
				</el-table-column>
				<el-table-column prop="fullname" label="姓名" sortable width="120">
				</el-table-column>
				<el-table-column prop="sex" label="性别" sortable width="100">
				</el-table-column>
				<el-table-column prop="tel" label="手机" sortable width="100">
				</el-table-column>
				<el-table-column prop="role_name" label="角色" sortable width="100">
					<template slot-scope="scope">
						<el-tag :type=" scope.row.id == 1 ? 'danger' : '' ">{{scope.row.role_name}}</el-tag>
					</template>
				</el-table-column>
				<el-table-column prop="login_time" label="上次登录" sortable width="150">
				</el-table-column>
				<el-table-column prop="login_count" label="登陆次数" sortable width="150">
				</el-table-column>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button type="primary" plain @click.stop="openEditModal(scope.row)"><i class="el-icon-edit"></i></el-button>
						<el-button type="danger" plain @click.stop="openDelModal(scope.row.id)"><i class="el-icon-delete"></i></el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		<!-- 编辑 -->
		<el-dialog title="修改信息" :visible.sync="editModal">
			<el-form :model="form" ref="form" :rules="rules">
				<el-form-item label="姓名" prop="fullname">
					<el-input v-model="form.fullname" style="width: 660px;"></el-input>
				</el-form-item>
				<el-form-item label="性别" prop="sex">
					<el-radio-group v-model="form.sex">
						<el-radio label="男"></el-radio>
						<el-radio label="女"></el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="手机" prop="tel">
					<el-input v-model="form.tel" style="width: 660px;"></el-input>
				</el-form-item>
				<el-form-item label="权限" prop="role">
					<el-select v-model="form.role" placeholder="请选择权限">
						<el-option v-for="item in options" :label="item.name" :key="item.id" :value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="头像" prop="avatar">
					<el-upload class="avatar-uploader" action="/api/upload/common" :headers="header" :data="{type:'avatar',imgForm:'imgForm'}"
					 :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="form.avatar" :src="form.avatar" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<div class="cover" v-show="isShow">
						<i class="el-icon-delete-solid" @click="deleteHandle(form.avatar)"></i>
					</div>
				</el-form-item>


			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="closeEditModal">取 消</el-button>
				<el-button type="primary" @click="edit">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import { Admin, Role } from '@/api/index.js'

	export default {
		data() {
			return {
				header: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
				isShow: false,
				tableData: [],
				editModal: false,
				dialogImageUrl: '',
				dialogVisible: false,
				options: [],
				form: {
					fullname: '',
					sex: '',
					tel: '',
					role_name: '',
					role: '',
				},
				rules: {
					fullname: [{
						required: true,
						message: '请输入姓名',
						trigger: 'blur'
					}, {
						min: 1,
						max: 8,
						message: '长度在 1 到 8 个字符',
						trigger: 'blur'
					}],
					sex: [{
						required: true,
						message: '请选性别',
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
				}
			}
		},
		created() {
			this.loadList();
			this.loadInfo();
		},
		methods: {
			async loadList() {
				let { status, data } = await Admin.list();
				if (status) {
					this.tableData = data;
					this.loading = false;
				}
			},
			async loadInfo() {
				let { status, data } = await Role.list();
				if (status) {
					this.options = data;
					console.log(data)
				}
			},
			openEditModal(data) {
				this.editModal = true;
				this.form = data;
				if (this.form.avatar != null) {
					this.isShow = true;
				} else {
					this.isShow = false;
				}
				this.loadInfo(data.id);
			},
			edit() {
				let formData = { ...this.form };
				this.$refs.form.validate(async (valid) => {
					if (valid) {
						let { status, msg } = await Admin.edit(formData);
						if (status) {
							this.$message({
								message: ' 编辑成功！',
								type: 'success',
								duration: 2000,
							});
							this.loadList();
							this.editModal = false;
						} else {
							this.$message.error(msg);
						}
					} else {
						return false;
					}
				})
			},
			closeEditModal() {
				this.editModal = false;
				this.form = {};
			},
			openDelModal(id) {
				this.$confirm('此操作将永久删除该账户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let { status, msg } = await Admin.del({ id });
					if (status) {
						this.$message({
							type: 'success',
							message: '删除成功!'
						});
						this.loading = false;
						this.loadList();
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			// 图片格式
			async beforeAvatarUpload(file) {
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
				this.loadList();
				// console.log(res, file);
			},
			async deleteHandle(src) {
				src = src.substr(1);
				// 处理默认图片
				if (this.form.avatar == '/images/avatar/default.jpg') {
					this.$message({
						message: '默认图片不可删除',
						type: 'success',
						duration: 1000,
					});
					return false;
				} else {
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
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
	.text {
		font-size: 14px;
	}

	.item {
		margin-bottom: 18px;
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
		padding-bottom: 20px;
	}

	.el-table {
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
		bottom: 10px;
		left: 400px;
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

<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>商品分类</span>
		</div>
		<el-tree lazy :load="loadNode" :props="defaultProps">
			<span class="custom-tree-node" slot-scope="{ node, data }">
				<span>{{ node.label }}</span>
				<span>
					<el-button :disabled="node.level == 1" type="text" size="mini" icon="el-icon-edit" @click.stop="() => openEditModal(data)">
						编辑
					</el-button>
					<el-button type="text" size="mini" icon="el-icon-circle-plus" @click.stop="() => openInsertModal(data)">
						添加
					</el-button>
					<el-button :disabled="node.level == 1" type="text" size="mini" icon="el-icon-delete" @click.stop="() => remove(data)">
						删除
					</el-button>
				</span>
			</span>
		</el-tree>

		<!-- 打开编辑模态框 -->
		<el-dialog title="编辑分类" :visible.sync="editModalShow">
			<el-form ref="editForm" :rules="rules" :model="editForm">
				<el-form-item label="名称" label-width="120px" prop="name">
					<el-input v-model="editForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片" prop="img">
					<el-upload :limit="1" :file-list="fileList_img" class="avatar-uploader" action="/api/upload/common" :headers="header"
					 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="editForm.img" style="width: 100px;height: 100px;" :src="editForm.img" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<div class="cover" v-show="isShow">
						<i class="el-icon-delete-solid" @click="deleteHandle(editForm.img)"></i>
					</div>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editModalShow = false">取 消</el-button>
				<el-button type="primary" @click="edit">修 改</el-button>
			</div>
		</el-dialog>

		<!-- 打开添加模态框 -->
		<el-dialog title="添加分类" :visible.sync="insertModalShow">
			<el-form ref="insertForm" :rules="rules" :model="insertForm">
				<el-form-item label="分类名称" label-width="120px" prop="name">
					<el-input v-model="insertForm.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="图片" prop="img">
					<el-upload :limit="1" :file-list="fileList_img" class="avatar-uploader" action="/api/upload/common" :headers="header"
					 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
						<img v-if="insertForm.img" style="width: 100px;height: 100px;" :src="insertForm.img" class="avatar">
						<i v-else class="el-icon-plus avatar-uploader-icon"></i>
					</el-upload>
					<div class="cover" v-show="isShow">
						<i class="el-icon-delete-solid" @click="deleteHandle(insertForm.img)"></i>
					</div>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="insertModalShow = false">取 消</el-button>
				<el-button type="primary" @click="append">添 加</el-button>
			</div>
		</el-dialog>
	</el-card>
</template>

<script>
	import { Admin, Category } from '@/api/index.js'

	export default {
		data() {
			return {
				header: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
				node: '',
				fileList_img: [],
				isShow: false,
				defaultProps: {
					children: 'son',
					label: 'name'
				},
				editForm: {
					id: '',
					name: '',
					img: ''
				},
				insertForm: {
					name: '',
					img: '',
					pId: '',
					level: ''
				},
				rules: {
					name: [{
							required: true,
							message: '请输入分类名称',
							trigger: 'blur'
						},
						{
							min: 2,
							max: 20,
							message: '长度在 2 到 20 个字符',
							trigger: 'blur'
						}
					],
				},
				insertModalShow: false,
				editModalShow: false,
				delModalShow: false
			}
		},
		methods: {
			async loadNode(node, resolve) {
				if (node.level == 0) {
					let { status, data } = await Category.sub({ pId: 0 })
					resolve(data);
				}
				if (node.level > 0) {
					let pId = node.data.id;
					let { status, data } = await Category.sub({ pId })
					resolve(data);
				}
			},
			openEditModal(data) {
				this.editModalShow = true;
				this.editForm = { ...data };
				this.node = data;
			},
			edit() {
				this.$refs.editForm.validate(async (valid) => {
					if (valid) {
						let { status, msg } = await Category.update({ ...this.editForm });
						if (status) {
							this.$message.success(msg)
							this.node.name = this.editForm.name;
							this.editModalShow = false;
						} else {
							this.$message.error(msg)
						}
					} else {
						return false;
					}
				})
			},
			openInsertModal(data) {
				console.log(data)
				this.insertModalShow = true;
				this.insertForm = { ...data };
				this.node = data;
			},
			append() {
				this.$refs.insertForm.validate(async (valid) => {
					if (valid) {
						let { status, data, msg } = await Category.add({ ...this.insertForm });
						if (status) {
							this.$message.success(msg)
							this.insertModalShow = false;
						} else {
							this.$message.error(msg);
						}
					} else {
						return false;
					}
				})
			},
			remove(data) {
				this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let id = data.id;
					let { status, msg } = await Category.del({ id });
					if (status) {
						this.$message.success(msg);
					} else {
						this.$message.error(msg);
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
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
				console.log(res)
				this.editForm.img = res.src;
				this.insertForm.img = res.src;
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
					this.editForm.img = '';
					this.insertForm.img = '';
					this.isShow = false;
				} else {
					this.$message.error(msg);
					this.isShow = true;
				}
			},
		}
	};
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
		width: 1280px;
		margin-top: 10px;
		padding-bottom: 20px;
	}

	.el-tree {
		padding: 20px 0;
	}

	.custom-tree-node {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 14px;
		padding-right: 8px;
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

	.cover {
		width: 100px;
		height: 100px;
		background-color: rgba(0, 0, 0, 0.2);
		position: absolute;
		bottom: 44px;
		left: 400px;
		margin-top: -50%;
		margin-left: -50%;

		i {
			width: 150px;
			height: 150px;
			position: absolute;
			top: 130px;
			bottom: 0;
			left: 45px;
			right: 0;
			margin: auto;
			color: white;
		}
	}
</style>

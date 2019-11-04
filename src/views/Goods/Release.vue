<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>发布商品</span>
		</div>
		<el-form ref="form" :rules="rules" :model="form" label-width="80px">
			<el-form-item label="商品分类" prop="cate_1st">
				<el-select v-model="form.cate_1st" placeholder="请选择分类">
					<el-option v-for="item in options_1st" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
				<el-select v-model="form.cate_2nd" placeholder="请选择分类">
					<el-option v-for="item in options_2nd" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
				<el-select v-model="form.cate_3rd" placeholder="请选择分类">
					<el-option v-for="item in options_3rd" :key="item.id" :label="item.name" :value="item.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="商品名称" prop="name">
				<el-input v-model="form.name"></el-input>
				<div class="txt">商品标题名称长度至少3个字符，最长200个汉字</div>
			</el-form-item>
			<el-form-item label="商品卖点" prop="hotPoint">
				<el-input v-model="form.hotPoint"></el-input>
				<div class="txt">商品卖点不能超过140个汉字</div>
			</el-form-item>
			<el-form-item label="商品价格" prop="price">
				<el-input placeholder="请输入价格" v-model="form.price" class="items">
					<template slot="append">元</template>
				</el-input>
				<div class="txt">价格必须是0-999999之间的数字，且不能高于市场价</div>
				<div class="txt">此价格为商品实际销售价格，如果商品存在规格，改价格显示最低价格</div>
			</el-form-item>
			<el-form-item label="市场价" prop="marketPrice">
				<el-input placeholder="请输入价格" v-model="form.marketPrice" class="items">
					<template slot="append">元</template>
				</el-input>
				<div class="txt">价格必须是0-999999之间的数字，此价格仅为市场参考价，请根据实际情况认真填写</div>
			</el-form-item>
			<el-form-item label="成本价" prop="cost">
				<el-input placeholder="请输入价格" v-model="form.cost" class="items">
					<template slot="append">元</template>
				</el-input>
				<div class="txt">价格必须是0-999999之间的数字，此价格为商户对所销售的商品的实际成本价进行备注记录，非必填选项，不会在前台销售页面中显示</div>
			</el-form-item>
			<el-form-item label="折扣" prop="discount">
				<el-input placeholder="请输入折扣" v-model="form.discount" class="items">
					<template slot="append">折</template>
				</el-input>
				<div class="txt">根据销售价与市场价比例自动生成不需要编辑</div>
			</el-form-item>
			<el-form-item label="商品库存" prop="inventory">
				<el-input placeholder="请输入件数" v-model="form.inventory" class="items">
					<template slot="append">件</template>
				</el-input>
				<div class="txt">价格必须是0-999999之间的整数</div>
				<div class="txt">价格必须是0-999999之间的整数若启动了库存配置，则系统自动计算商品的总数，此处无需卖家填写</div>
			</el-form-item>
			<el-form-item label="商品货号" prop="articleNo">
				<el-input v-model="form.articleNo" placeholder="请输入商品货号"></el-input>
				<div class="txt">商品货号是商家管理商品的编号，买家不可见</div>
				<div class="txt">最多输入20个字符，只支持输入中文、字母、数字、_、/、-和小数点</div>
			</el-form-item>
			<el-form-item label="商品主图" prop="img_md">
				<el-upload :limit="1" :file-list="fileList_img_md" class="avatar-uploader" action="/api/upload/goods" :headers="header"
				 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="form.img_md" style="width: 100px;height: 100px;" :src="form.img_md" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<div class="cover" v-show="isShow">
					<i class="el-icon-delete-solid" @click="deleteHandle(form.img_md)"></i>
				</div>
				<div class="txt"> 上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸
					800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</div>
			</el-form-item>
			<el-form-item label="商品轮播图" prop="slider">
				<el-upload :file-list="fileList_slider" class="avatar-uploader" action="/api/upload/slider" :headers="header"
				 :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
					<img v-if="form.slider" style="width: 100px;height: 100px;" :src="form.slider" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>
				</el-upload>
				<div class="cover" v-show="isShow">
					<i class="el-icon-delete-solid" @click="deleteHandle(form.slider)"></i>
				</div>
				<div class="txt">上传商品默认主图，如多规格时将默认图片或分规格上传规格主图，支持jpg、if、png格式上传或从图片空间选中，建议使用尺寸
					800*800像素以上，大小不超过1M的正方形图片，上传后的图片将自动保存在图片空间的默认分类中</div>
			</el-form-item>
			<div class="title">商品详情描述</div>
			<el-form-item label="商品品牌" prop="brand">
				<el-input v-model="form.brand"></el-input>
			</el-form-item>
			<el-form-item label="商品描述" prop="detail">
				<editor v-model="form.detail"></editor>
			</el-form-item>
			<div class="title">商品物流信息</div>
			<el-form-item label="所在地">
				<el-select v-model="form.region" placeholder="请选择分类">
					<el-option label="山东省" value="山东省"></el-option>
				</el-select>
				<el-select v-model="form.region" placeholder="请选择分类">
					<el-option label="青岛市" value="青岛市"></el-option>
				</el-select>
				<el-select v-model="form.region" placeholder="请选择分类">
					<el-option label="城阳区" value="城阳区"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="运费" prop="freight">
				<el-input placeholder="请输入运费" v-model="form.freight" class="items">
					<template slot="append">元</template>
				</el-input>
				<div class="txt">运费设为0，前台商品将显示免运费</div>
			</el-form-item>
			<el-form-item>
				<el-button type="success" @click="release">提交</el-button>
			</el-form-item>
		</el-form>
	</el-card>
</template>

<script>
	import Editor from '@/components/EditorBar.vue'
	import { Goods, Category } from '@/api/index.js'

	export default {
		data() {
			return {
				name: 'editor',
				form: {
					cate_1st: '',
					cate_2nd: '',
					cate_3rd: '',
					name: '',
					hotPoint:'',
					price:'',
					marketPrice:'',
					cost:'',
					discount:'',
					inventory:'',
					articleNo:'',
					img_md:'',
					slider:'',
					brand:'',
					detail:'',
					freight:'',
					region:''
				},
				rules: {
					cate_1st: [{
						required: true,
						message: '请选择分类',
						trigger: 'blur'
					}],
					name: [{
						required: true,
						message: '请输入商品名称',
						trigger: 'blur'
					}, {
						min: 2,
						message: '长度至少 3 个字符',
						trigger: 'blur'
					}],
					hotPoint: [{
						required: true,
						message: '请输入卖点',
						trigger: 'blur'
					}, {
						min: 2,
						message: '长度至少 3 个字符',
						trigger: 'blur'
					}],
					price: [{
						required: true,
						message: '请输入价格',
						trigger: 'blur'
					}],
					marketPrice: [{
						required: true,
						message: '请输入市场价格',
						trigger: 'blur'
					}],
					cost: [{
						required: true,
						message: '请输入成本价格',
						trigger: 'blur'
					}],
					discount: [{
						required: true,
						message: '请输入商品折扣',
						trigger: 'blur'
					}],
					inventory: [{
						required: true,
						message: '请输入商品库存',
						trigger: 'blur'
					}],
					articleNo: [{
						required: true,
						message: '请输入商品货号',
						trigger: 'blur'
					}],
					img_md: [{
						required: true,
						message: '请上传主图',
						trigger: 'blur'
					}],
					slider: [{
						required: true,
						message: '请上传轮播图',
						trigger: 'blur'
					}],
					brand: [{
						required: true,
						message: '请输入商品品牌',
						trigger: 'blur'
					}],
					detail: [{
						required: true,
						message: '请输入商品详情',
						trigger: 'blur'
					}],
					freight: [{
						required: true,
						message: '请输入运费',
						trigger: 'blur'
					}],
				},
				header: {
					Authorization: `Bearer ${sessionStorage.token}`
				},
				fileList_img_md:[],
				fileList_slider:[],
				isShow: false,
				options_1st: [],
				options_2nd: [],
				options_3rd: [],
				resource: '',
				desc: '',
				disabled: false,
				input1: '',
				input2: '',
				input3: '',
				input4: '',
				input5: '',
			}
		},
		components: {
			Editor
		},
		created() {
			this.loadCate_1st(1)
			// this.form.discount = (this.form.price / this.form.marketPrice * 10).toFixed(2)
		},
		watch: {
			"form.cate_1st": function(newValue, oldValue) {
				this.loadCate_2nd(newValue);
			},
			"form.cate_2nd": function(newValue, oldValue) {
				this.loadCate_3rd(newValue);
			},
		},
		methods: {
			release() {
				this.$refs.form.validate(async (valid) => {
					if(valid){
						let { status, msg } = await Goods.release({ ...this.form });
						if (status) {
							this.$message({
								message: msg,
								type: 'success',
								duration: 1000,
								onClose: () => {
									this.$router.push('/goods/list');
								}
							}); 
							
						this.loading = false;
						} else {
							this.$message.error(msg)
						}
					}else{
						return false;
					}
				})
			},
			async loadCate_1st(pId) {
				let { status, data } = await Category.sub({ pId });
				if (status) {
					console.log(data)
					if (data.length > 0) {
						this.form.cate_1st = data[0].id;
					}
					if (data.length == 0) {
						this.form.cate_1st = '';
					}
					this.options_1st = data;
				}
			},
			async loadCate_2nd(pId) {
				let { status, data } = await Category.sub({ pId });
				if (status) {
					if (data.length > 0) {
						this.form.cate_2nd = data[0].id;
					}
					if (data.length == 0) {
						this.form.cate_2nd = '';
					}
					this.options_2nd = data;
				}
			},
			async loadCate_3rd(pId) {
				let { status, data } = await Category.sub({ pId });
				if (status) {
					if (data.length > 0) {
						this.form.cate_3rd = data[0].id;
					}
					if (data.length == 0) {
						this.form.cate_3rd = '';
					}
					this.options_3rd = data;
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
				console.log(res, file);
				this.form.img_md = res.src;
				this.isShow = true;
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
					this.form.img_md = '';
					this.isShow = false;
				} else {
					this.$message.error(msg);
					this.isShow = true;
				}
			},
		},
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

	.txt {
		font-size: 12px;
		color: #999;
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
		width: 100px;
		height: 100px;
		background-color: rgba(0, 0, 0, 0.2);
		position: absolute;
		bottom: 70px;
		left: 50%;
		margin-top: -50%;
		margin-left: -50%;

		i {
			width: 150px;
			height: 150px;
			position: absolute;
			top: 130px;
			bottom: 0;
			left: 50px;
			right: 0;
			margin: auto;
			color: white;
		}
	}
</style>

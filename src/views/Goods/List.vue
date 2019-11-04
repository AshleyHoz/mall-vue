<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>商品列表</span>
		</div>
		<el-table :data="tableData" :default-sort="{prop: 'date', order: 'descending'}">
			<el-table-column label="商品名称" width="500">
				<template slot-scope="scope">
					<el-image style="width: 100px; height: 100px;float: left;margin-right: 10px;" :src="scope.row.img_md"></el-image>
					<p style="font-size: 12px;margin-top: 10px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{scope.row.name}}</p>
					<p style="font-size: 12px;margin-top: 10px;">商品货号：{{scope.row.id}}</p>
				</template>
			</el-table-column>
			<el-table-column prop="price" label="价格" sortable width="180"></el-table-column>
			<el-table-column prop="inventory" label="库存" sortable width="180"></el-table-column>
			<el-table-column prop="create_time" label="发布时间" sortable width="180"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<router-link :to="{name:'GoodsEdit',params:{id:scope.row.id}}">
						<el-button type="primary" plain><i class="el-icon-edit"></i></el-button>
					</router-link>
					<el-button type="danger" size="mini" plain @click="del(scope.row.id)"><i class="el-icon-delete"></i></el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination background layout="prev, pager, next, sizes, total" @size-change="sizeChange" @current-change="currentChange"
		 :page-sizes="[4, 8, 16, 32]" :total="total"></el-pagination>
	</el-card>
</template>

<script>
	import { Goods } from '@/api/index.js'

	export default {
		data() {
			return {
				tableData: [],
				total: 0
			}
		},
		created() {
			this.loadList();
		},
		methods: {
			async loadList() {
				let { status, goods, total } = await Goods.list();
				if (status) {
					this.tableData = goods;
					this.total = total;
					this.loading = false;
				}
			},
			async sizeChange(val) {
				let { status, goods, total } = await Goods.list({ pageSize: val });
				if (status) {
					this.goods = goods;
				}
			},
			async currentChange(val) {
				let { status, goods, total } = await Goods.list({ pageIndex: val });
				if (status) {
					this.goods = goods;
				}
			},
			del(id) {
				this.$confirm('此操作将永久删除该账户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(async () => {
					let { status, msg } = await Goods.del({ id });
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
			}
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
		width: 1280px;
		margin-top: 10px;
		padding-bottom: 20px;
	}

	.el-table {
		margin-bottom: 10px;
	}

	.el-pagination {
		float: right;
	}
</style>

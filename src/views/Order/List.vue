<template>
	<el-card class="box-card">
		<div slot="header" class="clearfix">
			<span>订单列表</span>
		</div>
		<el-table :data="tableData" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}">
			<el-table-column prop="id" label="#" width="180"></el-table-column>
			<el-table-column prop="name" label="" width="500">
				<div class="block" v-for="fit in fits" :key="fit">
					<span class="demonstration">{{ fit }}</span>
					<el-image style="width: 100px; height: 100px" :src="url" :fit="fit"></el-image>
				</div>
				<div class="description"></div>
			</el-table-column>
			<el-table-column prop="payment" label="付款总额" width="180"></el-table-column>
			<el-table-column prop="create_time" label="下单时间" sortable width="180"></el-table-column>
			<el-table-column prop="status" label="状态" sortable width="180"></el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
				</template>
			</el-table-column>
		</el-table>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				tableData: [],
				fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
				url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
			}
		},
		methods: {
			formatter(row, column) {
				return row.address;
			},
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
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

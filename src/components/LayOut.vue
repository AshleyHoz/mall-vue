<template>
	<div>
		<!-- 顶部菜单 -->
		<NavBar></NavBar>
		<!-- 主体 -->
		<div class="container">
			<!-- 左侧菜单 -->
			<SideBar></SideBar>
			<div class="main">
				<router-view></router-view>
			</div>
		</div>
		
	</div>
</template>

<script>
	import NavBar from '@/components/NavBar.vue'
	import SideBar from '@/components/SideBar.vue'
	
	export default {
		components:{
			NavBar,
			SideBar
		}
	}
</script>

<style>
</style>

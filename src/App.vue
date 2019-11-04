<template>
	<div id="app">
		<!-- <div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
		</div>
		<router-view /> -->
		<router-view></router-view>
	</div>
	<!-- <Login></Login> -->
	<!-- <Register></Register> -->
</template>

<script>
	// import Login from '@/views/Admin/Login.vue'
	// import Register from '@/views/Admin/Register.vue'
	import NavBar from '@/components/NavBar.vue'
	import SideBar from '@/components/SideBar.vue'
	import LayOut from '@/components/LayOut.vue'

	export default {
		components: {
			// Login,
			// Register
			NavBar,
			SideBar,
			LayOut
		}
	}
</script>

<style lang="scss">
	body {
		margin: 0;
	}
	
	.container{
		display: flex;
		
		.main{
			flex: 1;
		}
	}
</style>

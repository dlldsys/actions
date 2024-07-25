<template>
	<view>
		<view class="goback" @tap="goback()">
			后退
		</view>
		<view class="">
			<slot></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"layout",
		data() {
			return {
				
			};
		},
		methods:{
			goback(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.goback{position: absolute;
	left: 0;
	top: 0;
		width: 100%;
		height: 10px;
	}
</style>
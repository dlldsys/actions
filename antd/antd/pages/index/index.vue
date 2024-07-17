<template>
	<view class="content">
		<view v-for="(item,index) in list" :key="index">
			{{item.text}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello',
				list: [],
			}
		},
		onLoad() {
			this.load();
		},
		methods: {
			async load() {
				const result=await this.$http.post('https://sql.dlld0319.asia/', `{
				     "sql": "select * from db_content ;"
				}`)
				this.list = result;
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>

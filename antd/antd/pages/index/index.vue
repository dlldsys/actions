<template>
	<layout>
		<view class="content">
			<view class="now">
				{{now}}
			</view>
			<image class="loading-icon" src="../../static/img/loading.png" mode=""></image>
			<view class="huxi">
				<view class="breathe-div">
					{{yiyan}}
				</view>
			</view>
			<br>
			<a href="https://www.zconnect.cn/home" target="_blank" rel="noopener noreferrer">登录极空间</a>
			<text @tap="login()">登录</text>
		</view>
	</layout>
</template>
<script>
	export default {
		name:'index',
		data() {
			return {
				title: 'Hello',
				list: [],
				yiyan: '',
				now:'',
			}
		},
		onLoad() {
			const self=this;
			this.load();
			this.getYiyan();
			setInterval(()=>{
				self.getNow();
			},500)
		},
		methods: {
			async load() {
				const result = await this.$http.post('https://sql.dlld0319.asia/', `{
				     "sql": "select * from db_content ;"
				}`)
				this.list = result;
			},
			async getYiyan() {
				const result = await this.$http.get('https://v1.hitokoto.cn/')
				this.yiyan = result.hitokoto;
			},
			getNow(){
				const now= new Date();
				const Hour=now.getHours();
				const minutes=now.getMinutes();
				const seconds=now.getSeconds();
				this.now= `${Hour.toString().length==1?'0'+Hour.toString():Hour}:${minutes.toString().length==1?'0'+minutes.toString():minutes}:${seconds.toString().length==1? '0'+seconds.toString():seconds}`
			},
			login(){
				uni.navigateTo({
					url:'/pages/auth/login/login'
				})
			},
			view(){
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100vw;
		height: 100vh;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.now{
		font-size: 3rem;
	}
	.loading-icon {
		width: 250rpx;
		height: 250rpx;
		animation: just1 2.5s ease-in-out infinite alternate;
	}

	.huxi {
		animation: just3 2.5s infinite alternate;
		border-radius: 20rpx;
		padding: 20rpx;
	}

	@keyframes just3 {
		0% {
			color: 5px solid rgba(0, 0, 255, 0);
			box-shadow: 0 0 0 rgba(0, 0, 255, 0), 0 0 0 rgba(0, 0, 255, 0) inset;
		}

		100% {
			color: 5px solid rgba(0, 0, 255, 1);
			box-shadow: 0 0 70px rgba(0, 0, 255, 0.7), 0 0 15px rgba(0, 0, 255, 0.5) inset;
		}
	}
	
	@keyframes just1 {
		0% {
			 transform: rotate(90deg);
		}
	
		50% {
			 transform: rotate(270deg);
		}
		
		100% {
			 transform: rotate(90deg);
		}
	}
</style>

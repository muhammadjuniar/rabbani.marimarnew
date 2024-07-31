<template>
	<div class="nk-content p-0">
		<div class="container-fluid">
			<div class="nk-content-inner">
				<div class="nk-content-body">
					<div class="wide-xs mx-auto border shadow main-content bg-contain" :style="{ 'background-image': `url('${getAssetFile('images','bg-home.png')}')` }">
						<div class="card bg-transparent">
							<div class="card-inner p-0 is-relative">
								<div class="nk-block mb-5 is-relative z-index-2">
									<div class="col-12 col-lg-12 text-center is-relative p-0">
										<img class="br-0 mb-0 is-relative z-index-2 w-100" src="@/assets/images/2024/img_bg.png"/>
									</div>
								</div>
								<div class="h-100px"></div>
								<div class="nk-block text-center content-three-home-2024 is-content-welcome-2024 is-relative main-bg-light">
									<img class="br-0 ico-awan-welcome-content-2024" src="@/assets/images/2024/ico_awan_left.png"/>
									<img class="welcome-awan-purple-2024 w-100" :src="getAssetFile('images', '2024/ico_awan_purple.png')"/>
									<div class="content-three-home-inner-2024 is-content-welcome-inner-2024 z-index-2">
										<img  :src="getAssetFile('images', 'dpr-peserta-2.png')"/>
									</div>
									<div class="nk-block mb-4">
										<div class="d-flex align-items-center justify-content-center">
											<div class="col-8 col-lg-7">
												<router-link :to="{name: '2024.register'}" class="p-3 fs-15px btn-block btn btn-xl btn-white br-8 main-bg-secondary shadow border-0 text-white mb-2">Daftar DPR Sekarang</router-link>
												<router-link :to="{name:'2024.profile'}" class="p-3 fs-15px btn-block btn btn-xl btn-white br-8 main-bg shadow mb-2 border-0 text-white mb-2">Masuk Member Area</router-link>
												<router-link :to="{name:'2024.public'}" class="p-3 fs-15px btn-block btn btn-xl btn-white br-8 main-bg-orange shadow border-0 main-color">Public Area & Vote</router-link>
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="is-relative p-3 pt-5 welcome-footer-2024" :style="{ 'background-image': `url('${getAssetFile('images','2024/img_kertas2.png')}')` }">
								<Footer :isDetail="true"></Footer>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import session from "@/config/session";
	import { getAssetFile, winnerTop } from '@/models/attribute'

	import Footer from '@/layout/Footer2024'

	export default {
		setup(){
			const readyAuth = session.getters.authenticatedUser;
			const winners = winnerTop();

			return {getAssetFile, readyAuth, winners}
		},
		methods:{},
		components:{Footer},
		name: 'home',
		mounted() {
			if(this.$route.meta.title){
				document.title = this.$route.meta.title;
			}
		}, 
	}
</script>
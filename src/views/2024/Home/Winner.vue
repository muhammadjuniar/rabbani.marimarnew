<template>
	<div class="nk-content p-0">
		<div class="container-fluid">
			<div class="nk-content-inner">
				<div class="nk-content-body">
					<div class="wide-xs mx-auto border shadow main-content bg-contain" :style="{ 'background-image': `url('${getAssetFile('images/2024','ico_bg_kotak.png')}')` }">
						<div class="card bg-transparent pb-2">
							<div class="card-inner p-0 bg-cream-winner is-relative">
								<div class="nk-block mb-5 pt-5 is-relative z-index-2">
									<div class="col-12 col-lg-12 text-center is-relative">
										<img class="br-0 ico-awan-right-2024" src="@/assets/images/2024/ico_awan_right.png"/>
										<img class="br-0 mb-0 is-relative z-index-2" src="@/assets/images/2024/winner/home/img_font.png"/>
										<img class="br-0 ico-awan-left-2024 ico-awan-left-2024-winner" src="@/assets/images/2024/ico_awan.png"/>
									</div>
									<div class="content-header-top-2024 content-header-top-2024-winner is-relative">
										<img class="br-0 w-100" src="@/assets/images/2024/winner/home/img_photo_bareng.png"/>
									</div>
									<div class="content-header-ready-2024 is-relative z-index-2">
										<div class="is-relative content-header-ready-bg-2024" :style="{ 'background-image': `url('${getAssetFile('images','2024/winner/home/slice.png')}')` }">
											<img class="content-header-ready-logo-2024 br-0" src="@/assets/images/2024/ico_logo_rabbani.png"/>
										</div>
									</div>
									<div class="nk-block text-center content-three-home-2024 is-relative">
										<img class="w-100 z-index-1" :src="getAssetFile('images', '2024/winner/home/ico_awan.png')"/>
										<div class="content-three-home-inner-2024 z-index-2">
											<div class="content-header-ready-action-2024 d-flex align-items-center justify-content-center mb-4">
												<div class="col-8 col-lg-7">
													<router-link :to="{name: (readyAuth) ? '2024.profile' : '2024.login'}" class="p-3 fs-18px btn btn-xl btn-white br-8 main-color-secondary shadow btn-block mb-2">{{ (readyAuth) ? 'Profile' : 'Masuk Sekarang' }}</router-link>
												</div>
											</div>
											<div class="card border-0 b-transparent br-8 w-90 mt-7">
												<iframe class="w-100 h-300px br-8" frameborder="0" src="https://www.youtube.com/embed/rVKSTdnHeYE"></iframe>
											</div>
										</div>
									</div>
								</div>
								<div class="nk-block p-2 text-center mb-0 content-what-dpr-2024 content-what-dpr-2024-winner z-index-1 is-relative">
									<div class="fw-bold mb-2 title-content text-uppercase"><h1 class="main-color what-dpr-2024 text-outline-white">APA ITU DPR?</h1></div>
									<div class="text-content p-2 mb-4">
										<p class="main-text-secondary fs-14px lh-150 text-outline-white-sm">
											DPR “Duta Pelajar Rabbani” dan MPR “Mahasiswi Pilihan Rabbani “ adalah sebuah kompetisi pemilihan ambassador RABBANI di level sekolah tingkat SMP/SMA/SMK sederajat dan Mahasiswi di Seluruh Indonesia
										</p>
										<p class="main-text-secondary fs-14px lh-150 text-outline-white-sm mt-4">
											Setiap Tahunnya kami memilih talenta-talenta muslimah berbakat untuk berkompetisi menjadi ambassador Rabbani
										</p>
									</div>
								</div>
								<img class="br-0 ico-awan-what-dpr-2024 ico-awan-what-dpr-2024-winner" src="@/assets/images/2024/ico_awan_left.png"/>
							</div>
							<div class="is-relative content-about-bg-2024 content-about-bg-2024-winner is-relative mb-3" :style="{ 'background-image': `url('${getAssetFile('images','2024/kertas.png')}')` }">
								<div class="text-center why-follow-content-2024-winner">
									<div class="fw-bold mb-4 title-content text-uppercase why-follow text-center"><h2 class="main-color">KENAPA HARUS IKUTAN?</h2></div>
									<div class="text-content pl-2 pr-2 pb-2 pt-0 text-why-home fw-bold">
										<p class="main-color text-uppercase fs-12px">Jadi infulencer dengan kontak 1 tahun. rabbani mendorong semua DPR - MPR mengembangkan bakat dan keahlian</p>
										<p class="main-color text-uppercase fs-12px">Kontrak profesional menjadi model foto dan video rabbani dan partner</p>
										<p class="main-color text-uppercase fs-12px">Free kerudung rabbani selama satu tahun</p>
										<p class="main-color text-uppercase fs-12px">Mendapat keistimewaan disetiap event yang dibuat rabbani dan partner</p>
									</div>
								</div>
								<div class="nk-block p-0 text-center mb-5 mt-5">
									<img :src="getAssetFile('images', '2024/winner/home/img_poster.png')"/>
								</div>
							</div>

							<div class="card-inner is-body-content-2024-winner p-0">
								<div class="nk-block p-0 text-center mb-3">
									<div class="fw-bold mb-2 title-content text-uppercase">
										<h1 class="main-color title-ready-time-home title-ready-time-home-winner">
											<span class="d-block">3 Pemenang</span>
											<span class="d-block">DUTA PELAJAR RABBANI</span>
											<span class="d-block">2024</span>
										</h1>
									</div>
									<div class="nk-block p-0 text-center d-flex align-items-center justify-content-center w-100 mb-5">
										<img :src="getAssetFile('images', '2024/winner/home/img_winner_dpr.png')"/>
									</div>
									<div class="nk-block p-0 text-center d-flex align-items-center justify-content-center w-100 mb-5">
										<img :src="getAssetFile('images', '2024/winner/home/img_runnerup1_dpr.png')"/>
									</div>
									<div class="nk-block p-0 text-center d-flex align-items-center justify-content-center w-100 mb-5">
										<img :src="getAssetFile('images', '2024/winner/home/img_runnerup2_dpr.png')"/>
									</div>
								</div>
								<div class="nk-block p-0 text-center mb-3 mt-7">
									<div class="fw-bold mb-2 title-content text-uppercase">
										<h1 class="main-color-secondary-dark title-ready-time-home">
											<span class="d-block">3 Pemenang</span>
											<span class="d-block fs-22px">MAHASISWI PILIHAN RABBANI</span>
											<span class="d-block">2024</span>
										</h1>
									</div>
									<div class="nk-block p-0 text-center d-flex align-items-center justify-content-center w-100 mb-5">
										<img :src="getAssetFile('images', '2024/winner/home/img_winner_mpr.png')"/>
									</div>
									<div class="nk-block p-0 text-center d-flex align-items-center justify-content-center w-100 mb-5">
										<img :src="getAssetFile('images', '2024/winner/home/img_runnerup1_mpr.png')"/>
									</div>
									<div class="nk-block p-0 text-center d-flex align-items-center justify-content-center w-100 mb-5">
										<img :src="getAssetFile('images', '2024/winner/home/img_runnerup2_mpr.png')"/>
									</div>
								</div>

								<div class="nk-block mt-4">
									<div class="d-flex align-items-center justify-content-center">
										<div class="col-9 col-lg-9">
											<router-link :to="{name: '2024.finalis'}" class="p-3 fs-15px btn-block btn btn-xl btn-white br-8 main-bg-secondary shadow border-0 text-white mb-2">40 Finalis DPR MPR 2024</router-link>
											<router-link :to="{name:'2024.login'}" class="p-3 fs-15px btn-block btn btn-xl btn-white br-8 main-bg shadow mb-2 border-0 text-white mb-2">Masuk Member Area</router-link>
										</div>
									</div>
								</div>
							</div>
						</div>
						<Footer :isDetail="true"></Footer>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import session from "@/config/session";
	import { getAssetFile, winnerTop, timelineList2024, fiturStatus } from '@/models/attribute'

	import Footer from '@/layout/Footer2024'

	export default {
		setup(){
			const fitur_status = fiturStatus();
			const readyAuth = session.getters.authenticatedUser;
			const winners = winnerTop();
			const timelines = timelineList2024();

			return {getAssetFile, readyAuth, winners, timelines, fitur_status}
		},
		methods:{},
		components:{Footer},
		name: '2024.home',
		mounted() {
			if(this.$route.meta.title){
				document.title = this.$route.meta.title;
			}
		}, 
	}
</script>
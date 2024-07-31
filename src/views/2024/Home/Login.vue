<template>
	<div class="nk-content p-0">
		<div class="container-fluid">
			<div class="nk-content-inner">
				<div class="nk-content-body">
					<div
						class="wide-xs mx-auto border shadow main-content bg-cover"
						:style="{
						'background-image': `url('${getAssetFile('images/marimar/member_area', 'img_background.png')}')`
						}">
						<div class="card bg-transparent mb-5 pb-5">
							<div class="card-inner p-0 mb-5">
								<div class="nk-block pt-5">
									<router-link :to="{name: '2024.home'}">
										<img class="logo-marimar" src="@/assets/images/marimar/img_logo_marimar.png" />
									</router-link>
								</div>
								<div class="nk-block mb-5">
									<div class="col-8 col-lg-8 p-0 m-auto">
										<div class="voting-title">
											LOGIN MARIMAR
										</div>
									</div>
								</div>
								<div class="nk-block p-0">
									<div class="col-8 col-lg-8 p-0 m-auto">
										<form @submit.prevent="processLogin">
											<div class="form-content mb-1">
												<div class="form-group mb-3">
													<div class="form-label mb-1 fs-13px main-color">No Whatsapp <code>*</code></div>
													<input type="text" minlength="8" maxlength="15" v-on:keypress="numbersOnly" v-model="user.phone" id="phone-rabbani-dpr-login" autocomplete="phone-rabbani-dpr-login" required class="form-control form-control-lg br-8 pl-3 pr-3 pt-4 pb-4 border-0" placeholder="08xxxxxxxxxx">
												</div>
												<div class="form-group mb-5">
													<div class="form-label mb-1 fs-13px main-color">Password <code>*</code></div>
													<div class="form-control-wrap" id="is-password-member">
														<input type="password" minlength="6" v-model="user.password" autocomplete="password-rabbani-dpr-login" required class="form-control form-control-lg br-8 pl-3 pr-3 pt-4 pb-4 border-0" name="password" placeholder="min 6 karakter">
														<div @click.prevent="showHidePassword('is-password-member')" class="form-icon form-icon-right pointer show_hide_password" for="is-password-member"><em class="icon ni ni-eye-off"></em></div>
													</div>
													<div class="row m-0 align-items-center justify-content-start p-1 pt-2">
														<span class="fs-11px main-text-secondary">Lupa kata sandi?</span>
														<a href="#" @click.prevent="forgotPassword()" class="fs-11 ls-05 fw-bold main-text-secondary ml-1">Reset</a>
													</div>
												</div>
												<div class="form-group">
													<button type="submit" class="btn btn-lg br-8 main-bg-secondary text-white btn-block fs-15px mb-4 p-3">Masuk Sekarang</button>
												</div>
											</div>
										</form>
										<div v-if="fitur_status.register" class="form-action">
											<div class="form-note-s2 text-center fs-11px main-color"> Belum punya akun? <router-link :to="{name: '2024.register'}" class="fs-11 ls-05 fw-bold main-color"><span>Daftar sekarang</span></router-link></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<Footer></Footer>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { reactive } from 'vue'
	import { sleep, showHidePassword } from '@/helpers/general'
	import { numbersOnly } from '@/helpers/validation'
	import { getAssetFile, fiturStatus } from '@/models/attribute'

	import { postLogin, resetPassword } from '@/controllers/api_v2/home'

	import Footer from '@/layout/Footer2024'

	export default {
		setup(){
			const user = reactive({phone:'', password:''})
			const fitur_status = fiturStatus();

			const processLogin = async () => {
				const result = await postLogin({phone_number:user.phone, password:user.password});
				if(result){
					sleep(1000); window.location.href = '/profile';
				}
			}

			const forgotPassword = async () => {
				await resetPassword(user.phone);
			}
			return { user, showHidePassword, processLogin, numbersOnly, getAssetFile, forgotPassword, fitur_status }
		},
		components: {Footer},
		name: '2024.login',
		mounted() {
			if(this.$route.meta.title){
				document.title = this.$route.meta.title;
			}
			window.scrollTo(0, 0);
		}, 
	}
</script>
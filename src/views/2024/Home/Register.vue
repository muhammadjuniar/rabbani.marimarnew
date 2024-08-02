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
											BUAT AKUN MARIMAR DISINI
										</div>
									</div>
								</div>
								<div class="nk-block p-0">
									<div class="col-8 col-lg-8 p-0 m-auto">
										<form @submit.prevent="processRegister">
											<div class="form-content mb-1">
												<div class="form-group mb-2">
													<div class="form-label mb-1 fs-13px main-color-secondary">Isi dengan no whatsapp kamu <code>*</code></div>
													<input minlength="8" maxlength="15" v-on:keypress="numbersOnly" :disabled="(user.status == 'confirm') ? true : false" v-bind:class="{ disabled: user.status == 'confirm' }" type="text" v-model="user.phone" autocomplete="phone-rabbani-dpr" required class="form-control form-control-lg br-8 pl-3 pr-3 pt-4 pb-4 border-0 main-bg-cream main-text-secondary" placeholder="08xxxxxx">
												</div>
												<div class="form-group mb-2">
													<div class="form-label mb-1 fs-13px main-color-secondary">Password minimal 6 karakter <code>*</code></div>
													<div class="form-control-wrap" id="is-password-member">
														<input minlength="6" :disabled="(user.status == 'confirm') ? true : false" v-bind:class="{ disabled: user.status == 'confirm' }" type="password" v-model="user.password" autocomplete="password-rabbani-dpr" required class="form-control form-control-lg br-8 pl-3 pr-3 pt-4 pb-4 border-0 main-bg-cream main-text-secondary" name="password" placeholder="min 6 karakter">
														<div @click.prevent="showHidePassword('is-password-member')" class="form-icon form-icon-right pointer show_hide_password" for="is-password-member"><em class="icon ni ni-eye-off"></em></div>
													</div>
												</div>
												<div class="form-group mb-2">
													<div class="form-label mb-1 fs-13px main-color-secondary">Masukan kembali password <code>*</code></div>
													<div class="form-control-wrap" id="is-confirm-password-member">
														<input minlength="6" type="password" :disabled="(user.status == 'confirm') ? true : false" v-bind:class="{ disabled: user.status == 'confirm' }" v-model="user.confirm_password" autocomplete="confirm-password-rabbani-dpr" required class="form-control form-control-lg br-8 pl-3 pr-3 pt-4 pb-4 border-0 main-bg-cream main-text-secondary" name="password" placeholder="min 6 karakter">
														<div @click.prevent="showHidePassword('is-confirm-password-member')" class="form-icon form-icon-right pointer show_hide_password" for="is-confirm-password-member"><em class="icon ni ni-eye-off"></em></div>
													</div>
												</div>
												<div v-if="user.status == 'confirm'" class="form-group mb-2 border-top pt-2">
													<div class="form-label mb-1 fs-13px main-color-secondary">Kode verifikasi <code>*(OTP)</code></div>
													<input type="number" v-model="user.otp" autocomplete="confirmation-register-rabbani-dpr" required class="form-control form-control-lg br-8" placeholder="kode OTP">
												</div>
												<div class="form-group mt-5">
													<button type="submit" class="btn btn-lg main-bg br-8 text-white btn-block fs-15px mb-4 p-3">{{ (user.status == 'confirm') ? 'Konfirmasi Pendaftaran' : 'Daftar Sekarang' }}</button>
												</div>
											</div>
										</form>
										<div class="form-action">
											<div class="form-note-s2 text-center fs-11px main-color-secondary"> Sudah punya akun? <router-link :to="{name: '2024.login'}" class="fs-11 ls-05 fw-bold main-color-secondary"><span>Masuk sekarang</span></router-link></div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<Footer :color="'main-text-secondary'"></Footer>
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
	import { getAssetFile } from '@/models/attribute'

	import { postRegister, confirmationRegister } from '@/controllers/api_v2/home'

	import Footer from '@/layout/Footer2024'

	export default {
		setup(){
			const user = reactive({phone:'', password:'', confirm_password:'', status:'pending',otp:''})

			const processRegister = async () => {
				if(user.status == 'confirm'){
					return processConfirm();
				}else{
					const result = await postRegister({phone_number:user.phone, password:user.password, cpassword:user.confirm_password});
					if(result){
						user.status = 'confirm';
					}
				}
			}

			const processConfirm = async () => {
				const result = await confirmationRegister({
					phone_number:user.phone, password:user.password,
					cpassword:user.confirm_password, otp:user.otp, code:'MARIMAR'
				});
				if(result){
					sleep(1000); window.location.href = '/profile';
				}
			}

			return { user, showHidePassword, processRegister, numbersOnly, getAssetFile }
		},
		components: {Footer},
		name: '2024.register',
		mounted() {
			if(this.$route.meta.title){
				document.title = this.$route.meta.title;
			}
			window.scrollTo(0, 0);
		}, 
	}
</script>
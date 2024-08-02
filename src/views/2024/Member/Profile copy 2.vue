<template>
	<div class="nk-content p-0">
		<div class="container-fluid">
			<div class="nk-content-inner">
				<div class="nk-content-body">
					<div class="wide-xs mx-auto border shadow main-content is-relative bg-cover" :style="{ 'background-image': `url('${getAssetFile('images/marimar/member_area', 'img_background.png')}')` }">
						<div class="card bg-transparent">
							<div class="card-inner p-0">
								<div v-if="load.status == 'pending'">
									<div class="nk-block mb-5 p-2 mt-5">
										<div class="row align-items-center justify-content-between m-0">
											<LazyContent class="mb-1" :isHeight="'50'" :isWidth="'w-100'"></LazyContent>
											<LazyContent class="mb-1" :isHeight="'50'" :isWidth="'w-75'"></LazyContent>
										</div>
									</div>
									<div class="nk-block p-1 pl-2 pr-2">
										<div v-for="index in 10" class="mb-2">
											<LazyContent class="mb-1" :isHeight="'20'" :isWidth="'w-35'"></LazyContent>
											<LazyContent class="mb-1" :isHeight="'35'" :isWidth="'w-100'"></LazyContent>
										</div>
									</div>
								</div>
								<div v-cloak v-else v-bind:class="{ hide_element: load.status == 'pending' }">
									<div v-if="load.status == 'success'">
										<div class="nk-block pt-4">
											<img class="ribbon" src="@/assets/images/marimar/member_area/img_ribbon_1.png" />
										</div>
										<div class="nk-block nk-block-middle nk-auth-body wide-xs mt-5">
	        <div class="brand-logo pb-4 text-center">
	            <img class="logo-img logo-img-lg" src="@/assets/images/img-rabbani-md.png" alt="logo">
	        </div>
	        <div class="card card-bordered">
	            <div class="card-inner card-inner-lg">
	                <div class="nk-block-head">
	                    <div class="nk-block-head-content">
	                        <div class="nk-block-des text-center">
	                            <div class="text-dark fw-bold fs-18 ls-05 mb-2">Page Not Found!</div>
	                            <p class="text-gray lh-normal">Halaman yang anda kunjungi masih dalam tahap pengembangan.</p>
	                            <p class="nk-error-text fs-11 mb-0 desc-empty-content text-danger"><i>*Bisa juga dikarenakan koneksi internet anda tidak aktif</i></p>
	                        </div>
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
										<div id="member-area-top" class="nk-block p-4 pt-5">
											<div class="row align-items-center justify-content-between m-0 mb-1">
												<div class="title w-75">
													<!-- <h2 class="text-uppercase main-color-marimar ls-sm mb-2">Selamat Datang</h2>
													<div class="row m-0 align-items-center mb-1">
														<h4 class="text-uppercase main-color-marimar ls-sm mb-0 w-auto mw-80 text-short">{{ (user.member_name) ? user.member_name : ( (user.member_phone) ? user.member_phone : 'DPR Sekolah Dasar' ) }}</h4> -->
														<!-- <div class="icon-status-profile pl-2">
															<span @click.prevent="notifStatus()" v-if="user.member_verified == 1" data-tooltip="Verified" data-tooltip-pos="right" class="text-teal fw-bold fs-18px"><em class="icon ni ni-check-circle-cut bg-white br-80 p-1 text-teal"></em></span>
															<span @click.prevent="notifStatus()" v-else data-tooltip="Pending" data-tooltip-pos="right" class="text-orange fw-bold fs-18px"><em class="icon ni ni-histroy bg-white br-80 p-1 text-orange"></em></span>
														</div> -->
													<!-- </div> -->
												</div>
											</div>
										</div>
										<!-- <div v-if="fitur_status.register">
											<div class="nk-block p-1 mb-3 pl-4 pr-4" v-if="user.member_verified == 0">
												<div class="card card-bordered p-1">
													<AlertContent class="mb-1" :typeNotif="{type: 'info'}" :textNotif="'Pendaftaran belum terverifikasi, silahkan melakukan verifikasi dengan klik Proses Verifikasi'"></AlertContent>
													<a :disabled="(payments.load) ? true : false" v-bind:class="{disabled: payments.load}" class="btn btn-lg main-bg text-white br-8 fs-14px" data-toggle="modal" data-target="#popup-payment-register"><span>Proses Verifikasi</span></a>
												</div>
											</div>
										</div> -->
										<div class="nk-block p-1 pl-3 pr-3">
											<div class="col-11 col-lg-11 m-auto p-0">
												<form @submit.prevent="processUpdateProfile">
													<!-- <div class="user-card align-items-center mb-4">
														<div class="w-40">
															<div class="content-custom-select-image is-relative d-flex justify-content-center">
																<div @click.prevent="onSelectImage('foto-profile')" class="user-avatar xl bg-white main-border-secondary box-image">
																	<img :default="(profilePic) ? profilePic : getAssetFile('images','empty.png')" class="br-0" id="preview-select-image-foto-profile" :src="(profilePic) ? profilePic : getAssetFile('images','empty.png')"/>
																</div>
																<input id="file-select-image-foto-profile" type="file" @change.prevent="onChangeSelectImage($event, 'foto-profile')" class="custom-file-input file-select-image is-absolute w-100 h-100 br-80" name="foto">
																<div id="action-reset-select-image-foto-profile" class="action-reset-select-image is-auto none-select top-0 right-0 is-absolute bg-transparent">
																	<a @click.prevent="onResetImage('foto-profile')" disabled class="reset-select-image disabled btn btn-icon btn-danger btn-dim main-border-secondary"><em class="icon ni ni-reload"></em></a>
																</div>
															</div>

															<a v-if="user.level_publish == 0" @click.prevent="onSelectImage('foto-profile')" class="btn btn-md fs-14px main-bg-secondary text-white btn-block mt-1">Upload</a>
														</div>
														<div class="user-info pl-2 w-60">
															<div class="mb-1 border br-4 p-1">
																<div class="overline-title fs-9px main-color-secondary-dark mb-1">ID PESERTA / ID REFERENSI:</div>
																<div>
																	<span class="badge main-bg-cream-light main-color-secondary-dark border-0">{{(user.member_code) ? user.member_code : 'Belum ada'}}</span>
																</div>
															</div>
														</div>
													</div> -->
													<!-- <div class="content-profile">
														<div class="head-content-profile mb-2">
															<div class="fs-16px main-color-secondary-marimar fw-bold">Profile Group</div>
														</div>
														<div class="body-content-profile mb-5">
															<div class="form-group mb-3">
																<label class="form-label-profile form-label-profile form-label mb-1 fs-12px main-color-secondary-marimar w-100">Nama Group <span class="main-color-secondary-marimar fs-9px lh-normal fw-normal">wajib diisi</span></label>
																<input type="text" v-model="profile.name" required class="form-control form-control-lg br-8 pl-3 pr-3 pt-4 pb-4 border-0 main-bg-cream-light main-text-secondary-marimar text-capitalize" placeholder="Group Qasidah Anda">
															</div>
															<div class="form-group mb-3">
																<label class="form-label-profile form-label-profile form-label mb-1 fs-12px main-color-secondary-marimar w-100">Kontak Penanggungjawab <span class="main-color-secondary-marimar fs-9px lh-normal fw-normal">wajib diisi</span></label>
																<input type="text" v-model="profile.name" required class="form-control form-control-lg br-8 pl-3 pr-3 pt-4 pb-4 border-0 main-bg-cream-light main-text-secondary-marimar text-capitalize" placeholder="08XXXXXXXXXX">
															</div>
														</div>
														<div class="head-content-profile mb-2">
															<div class="fs-16px main-color-secondary-marimar fw-bold">Group Member</div>
														</div>
														<div class="body-content-profile mb-3">
															<div class="card card-daftar-member">
																<div class="row align-items-center mb-3">
																	<div class="col-lg-12">
																		<div class="row align-items-center p-1 pl-2 pr-2">
																			<div class="col-4 text-center">
																		<div class="profile-img">
																		<img
																			src="@/assets/images/marimar/member_area/ico_profile.png"
																		/>
																		</div>
																	</div>
																	<div class="col-8">
																		<div class="foto-member mb-2">Foto Member</div>
																		<div class="btn btn-sm btn-upload">Upload</div>
																	</div>
																		</div>
																	</div>
																	
																	<div class="col-lg-12">
																		<div class="p-1 pl-3 pr-3">
																		<div class="form-group mb-3">
																			<label class="form-label-profile form-label-profile form-label mb-1 fs-12px main-color-secondary-marimar w-100">Nama Member 1<span class="main-color-secondary-marimar fs-9px lh-normal fw-normal">wajib diisi</span></label>
																			<input type="text" v-model="profile.name" required class="form-control form-control-lg br-8 pl-3 pr-3 pt-4 pb-4 border-0 main-bg-cream-light main-text-secondary-marimar text-capitalize" placeholder="Group Qasidah Anda">
																		</div>
																		<div class="form-group mb-3">
																			<label class="form-label-profile form-label mb-1 fs-12px main-color-secondary">Tanggal Lahir <span class="main-color-secondary fs-9px lh-normal fw-normal">wajib diisi</span></label>
																			<div class="row m-0 gap-10">
																				<input type="text" v-on:keypress="numbersOnly" v-model="birthdate.day" minlength="1" maxlength="2" required class="text-center w-15 form-control form-control-lg br-8 pl-3 pr-3 pt-4 pb-4 border-0 main-bg-cream-light main-text-secondary" placeholder="00">
																				<input type="text" v-on:keypress="numbersOnly" v-model="birthdate.month" minlength="1" maxlength="2" required class="text-center w-15 form-control form-control-lg br-8 pl-3 pr-3 pt-4 pb-4 border-0 main-bg-cream-light main-text-secondary" placeholder="00">
																				<input type="text" v-on:keypress="numbersOnly" v-model="birthdate.year" minlength="4" maxlength="4" required class="text-center w-20 form-control form-control-lg br-8 pl-3 pr-3 pt-4 pb-4 border-0 main-bg-cream-light main-text-secondary" placeholder="0000">
																			</div>
																		</div>
																		<div class="form-group mb-3">
																			<label class="form-label-profile form-label-profile form-label mb-1 fs-12px main-color-secondary-marimar w-100">Nomor Whatsapp <span class="main-color-secondary-marimar fs-9px lh-normal fw-normal">wajib diisi</span></label>
																			<input type="text" v-model="profile.name" required class="form-control form-control-lg br-8 pl-3 pr-3 pt-4 pb-4 border-0 main-bg-cream-light main-text-secondary-marimar text-capitalize" placeholder="08XXXXXXXXXX">
																		</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>		

													</div>
													
													<div class="nk-block mt-5 text-center">
														<div
															class="p-3 btn btn-xl btn-daftar-member br-8 shadow align-items-center justify-content-center mb-4"
															>TAMBAH MEMBER</div
														>
														<div
															class="p-3 btn btn-xl btn-daftar-member br-8 shadow align-items-center justify-content-center mb-4"
															>KURANGI MEMBER</div
														>
														<div
															class="p-3 btn btn-xl btn-daftar-marimar br-8 shadow align-items-center justify-content-center mb-4"
															>SIMPAN</div
														>
														<div
															:to="{ name: '2024.home' }"
															class="p-3 btn btn-xl btn-marimar br-8 shadow align-items-center justify-content-center mb-4"
															>KEMBALI</div
														>
													</div> -->
													<div class="nk-block mt-5 mb-4">
														<button v-if="user.level_publish == 0" type="submit" class="btn btn-block btn-lg main-bg-secondary text-white br-8 mb-3 p-3 fs-15px"><span>Simpan Perubahan</span></button>
														<div class="d-flex align-items-center justify-content-between pt-2 pb-2">
															<router-link :to="{name: '2024.home'}" class="btn btn-md fs-14px main-color-secondary">Kembali</router-link>
															<a @click.prevent="procesLogout" class="btn btn-md fs-14px text-danger">Keluar Akun</a>
														</div>
													</div>
												</form>
											</div>
										</div>
									</div>
									<div v-else>
										<EmptyContent :textMessage="load.msg" :typeNotif="'empty'" :actionNotif="(needLogin) ? procesLogout : null" :actionNotifTitle="(needLogin) ? 'Masuk Ulang' : null"></EmptyContent>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { onMounted, ref, reactive } from 'vue'
	import session from "@/config/session";
	import { sleep, resAlert, dateFormat, isValidDate, numberFormat, loadingAlert } from '@/helpers/general'
	import { numbersOnly, alertNotComplete } from '@/helpers/validation'

	import { socialMedia, getAssetFile, talentList, paymentList, fiturStatus } from '@/models/attribute'
	import { onChangeSelectImage, onSelectImage, onResetImage, getFileUpload } from '@/models/media'
	import { handleListLocation, onChangeLocation, autoSelectLocation, getSelectedLocation, handleListStoreGroupLocation } from '@/models/location'

	import { logoutUser } from '@/controllers/home'
	import { getProfile, postUpdateProfile, getDetailMember, postUpdateImage, getLevel } from '@/controllers/api_v2/member'
	import { getProvince, getStoreGroupLocation } from '@/controllers/location'
	import { checkRegisterTransaction, postRegisterTransaction, paymentChannelList } from '@/controllers/api_v2/transaction'

	import LazyContent from '@/components/LazyContent'
	import EmptyContent from '@/components/EmptyContent'
	import AlertContent from '@/components/AlertContent'

	export default {
		setup(){
			const member_id = (session.getters.stateUser && session.getters.stateUser.member_id) ? session.getters.stateUser.member_id : null;
			const model_fitur = fiturStatus();
			let fitur_status = reactive({register: model_fitur.register, level:model_fitur.level})
			const socialList = socialMedia();
			let user = ref(null), load = reactive({status:'pending', msg:''});
			let achievements = ref([]);
			let birthdate = reactive({day:'', month:'', year:''}), talents = ref(talentList());
			let profilePic = ref(null), parentDoc = ref(null), schoolDoc = ref(null), parentCardPic = ref(null);
			let profile = reactive({
				name: '',
				dob: '',
				address: '',
				school: '',
				talent:'',
				instagram_username: '',
				instagram_followers: '',
				tiktok_username: '',
				tiktok_followers: '',
				twitter_username: '',
				twitter_followers: '',
				facebook_username: '',
				facebook_followers: '',
				youtube_username: '',
				youtube_followers: '',
				parent_name:'',
				parent_phone:'',
				gender: 'male',
			});
			let registrationNumber = ref(null);

			let needLogin = ref(false);
			let location = reactive({province:null, city:null, district:null, subdistrict:null, store:null});
			let selectStore = ref(null)
			const fotos = reactive({main:-1, data:[]})

			const payments = reactive({load: false, data:paymentList()});
			const payment_register = reactive({price: 0, referal:'', confirmation:null, method:null, verification: null})
			const show_evaluation = ref(1)
			let is_current_level = ref(1);
			let levels = ref([]), summary = ref([])

			onMounted(async () => {
				await sleep(100);
				loadProfile();
			})

			const loadProfile = async () => {
				const result = await getProfile(member_id);
				if(result){
					load.msg = result.msg;
					if(result.success && result.data){
						user.value = result.data;
						is_current_level.value = parseInt(user.value.member_current_level);

						//if(user.value.event){
							//event.value = user.value.event;
							//payment_register.price = event.value.event_fee;
						//}

						if(user.value.levels && user.value.levels.length){
							levels.value = user.value.levels;
							payment_register.price = levels.value[0].level_fee;
						}

						if(user.value.summary && user.value.summary.length){
							summary.value = user.value.summary;
						}

						await handleDataProfile();
					}
					load.status = result.type;
					//if(result.reLogin) needLogin.value = true;
					await sleep(100);
					//await loadPayment();
					//await loadLevel();
					await loadProvince();
					await loadStoreGroup();
				}
			}

			const loadLevel = async () => {
				if(load.status == 'success'){
					const result = await getLevel();
					if(result){
						levels.value = result;
					}
				}
			}

			const loadPayment = async () => {
				if(load.status == 'success'){
					if(user.value.profile && (!user.value.profile.transaction_register_paid || user.value.profile.transaction_register_paid == 0)){
						payments.load = true;
						const result = await paymentChannelList();
						if(result){
							if(result.data && result.data.length) payments.data = result.data;
							payments.load = false;
						}
					}
				}
			}

			const loadProvince = async () => {
				if(load.status == 'success'){
					const result = await getProvince();
					if(result){
						await handleListLocation('province', result, location.province);
						if(location.province && location.province.length){
							await autoSelectLocation(location.province, location.city, location.district, location.subdistrict);
						}
					}
				}
			}

			const loadStoreGroup = async () => {
				if(load.status == 'success'){
					const result = await getStoreGroupLocation();
					if(result){
						await handleListStoreGroupLocation(result, location.store);
						await sleep(100);
						selectStore.value = $('#is-select-store').select2({
							allowClear:true, placeholder:'Pilih toko'
						});
					}
				}
			}

			function handleDataProfile(){
				if(user.value && Object.keys(user.value).length){
					Object.keys(profile).forEach(function(key) {
						if(`member_${key}` in user.value){
							var isData = user.value[`member_${key}`] || '';
							profile[`${key}`] = isData;
							if(isData){
								if(`${key}` == 'dob' && isValidDate(isData) == true){
									birthdate.day = dateFormat(isData, 'DD');
									birthdate.month = dateFormat(isData, 'MM');
									birthdate.year = dateFormat(isData, 'YYYY');
								}
							}
						}
					});

					profile.gender = (profile.gender == 1) ? 'male' : 'female';

					if(user.value.member_code) registrationNumber.value = user.value.member_code;
					if(user.value.member_province) location.province = user.value.member_province;
					if(user.value.member_regency) location.city = user.value.member_regency;
					if(user.value.member_district) location.district = user.value.member_district;
					if(user.value.member_village) location.subdistrict = user.value.member_village;

					if(user.value.member_attribute){
						var member_attribute = JSON.parse(user.value.member_attribute);
						if(member_attribute.store){
							location.store = member_attribute.store;
						}
					}

					if(user.value.member_achievements && user.value.member_achievements.length){
						var is_achievements = JSON.parse(user.value.member_achievements);
						achievements.value = is_achievements;
					}
					if(user.value.member_pic && user.value.member_pic.length){
						profilePic.value = user.value.member_pic;
					}
					if(user.value.member_parental_certificate && user.value.member_parental_certificate.length){
						parentDoc.value = user.value.member_parental_certificate;
					}
					if(user.value.member_school_recommendation_letter && user.value.member_school_recommendation_letter.length){
						schoolDoc.value = user.value.member_school_recommendation_letter;
					}
					if(user.value.member_parent_card_pic && user.value.member_parent_card_pic.length){
						parentCardPic.value = user.value.member_parent_card_pic;
					}
					if(user.value.member_image && user.value.member_image.length){
						var userImages = JSON.parse(user.value.member_image);
						userImages.forEach((img, idx) =>{
							fotos.data.push({pic:img, new:false});
						})
					}else{
						fotos.data.push({pic:'', new:true});
					}

					if(user.value.register){
						payment_register.verification = user.value.register;
					}
				}
			}

			async function actionAchievement(type, index = null){
				if(type == 'add'){
					if(achievements.value.length){
						const emptyIndex = achievements.value.findIndex(item => item == '');
						if(emptyIndex >= 0){
							await sleep(100);
							var elmItem = document.getElementById(`achievement-${emptyIndex}`) || null;
							if(elmItem) elmItem.focus();
							return false;
						}
					}
					achievements.value.push('');
				}else{
					if(achievements.value.length && achievements.value.indexOf(index)){
						achievements.value.splice(index, 1);
					}
				}
			}

			async function handleValueAchievement(event, index){
				event.preventDefault();
				var isValue = event.target.value || '';
				if(achievements.value.indexOf(index)){
					achievements.value[index] = isValue;
				}
			}

			const procesLogout = async () => {
				await logoutUser();
			}

			const processUpdateProfile = async () => {
				if(user.value.level_publish == 1){
					return false;
				}
				var forUpdateData = new FormData();

				var existPic = await getFileUpload('file-select-image-foto-profile');
				if(!existPic && (!profilePic.value || profilePic.value == '')){
					alertNotComplete('Lengkapi foto profile (tekan ditengah pada bingkai foto untuk memilih atau tekan tombol upload)'); return false;
				}
				forUpdateData.append(`pic`, existPic);

				if(!profile.name){
					alertNotComplete('Lengkapi nama lengkap kamu'); return false;
				}
				forUpdateData.append('name', profile.name);

				var setDob = `${birthdate.year}-${birthdate.month}-${birthdate.day}`;
				var checkDob = isValidDate(setDob);
				if(!checkDob || checkDob == false){
					alertNotComplete('Tanggal lahir tidak sesuai'); return false;
				}
				var is_dob = dateFormat(setDob, 'YYYY-MM-DD');
				forUpdateData.append('dob', is_dob);
				forUpdateData.append(`gender`, profile.gender);

				if(!profile.address){
					alertNotComplete('Lengkapi alamat lengkap kamu'); return false;
				}
				forUpdateData.append(`address`, profile.address);
				
				var locMember = await getSelectedLocation(null);
				if(!locMember.province || !locMember.city || !locMember.district){
					alertNotComplete('Lengkapi data alamat (provinsi/kota/kabupaten/kecamatan'); return false;
				}
				
				forUpdateData.append(`province`, locMember.province);
				forUpdateData.append(`regency`, locMember.city);
				forUpdateData.append(`district`, locMember.district);

				if(!profile.school || profile.school == ''){
					alertNotComplete('Lengkapi asal sekolah'); return false;
				}
				forUpdateData.append(`school`, profile.school);

				var is_achievements = 0;
				if(achievements.value && achievements.value.length){
					is_achievements = achievements.value.join(',');
				}
				forUpdateData.append(`achievement`, is_achievements);
				forUpdateData.append(`talent`, profile.talent);

				var slcStore = null;
				if(selectStore.value){
					slcStore = $('#is-select-store').find(':selected').val();
				}

				if(!slcStore){
					alertNotComplete('Lengkapi atau pilih lokasi toko audisi'); return false;
				}
				forUpdateData.append(`attribute[store]`, slcStore);

				forUpdateData.append(`instagram_username`, profile.instagram_username);
				forUpdateData.append(`instagram_followers`, profile.instagram_followers);
				forUpdateData.append(`tiktok_username`, profile.tiktok_username);
				forUpdateData.append(`tiktok_followers`, profile.tiktok_followers);
				forUpdateData.append(`twitter_username`, profile.twitter_username);
				forUpdateData.append(`twitter_followers`, profile.twitter_followers);
				forUpdateData.append(`facebook_username`, profile.facebook_username);
				forUpdateData.append(`facebook_followers`, profile.facebook_followers);
				forUpdateData.append(`youtube_username`, profile.youtube_username);
				forUpdateData.append(`youtube_followers`, profile.youtube_followers);
				
				const result = await postUpdateProfile(member_id, forUpdateData);
				if(result){
					if(result.success){
						await sleep(1000); window.location.reload();
					}
				}
			}

			function notifStatus(){
				if(user.value.member_verified == 1){
					resAlert({type:'success', title:'Akun Verified', text:(!fitur_status.register) ? '' : 'Selamat! akun kamu sudah diverifikasi.'});
				}else{
					resAlert({type:'error', title:'Akun Pending', text:(!fitur_status.register) ? '' : 'Segera lakukan pembayaran biaya pendaftaran untuk verifikasi akun dan mengaktifkan vote.'});
				}
			}

			async function selectPaymentRegister(paymentCode){
				if(!fitur_status.register){
					return false;
				}
				if(payment_register.referal && payment_register.referal == registrationNumber.value){
					alertNotComplete('Kode referal (ID DPRD) tidak sesuai');
					return false;
				}
				const checkPayment = payments.data.find(item => item.code == paymentCode);
				if(checkPayment && checkPayment.code){
					payment_register.method = checkPayment;
					//var payPrice = (payment_register.referal) ? payment_register.price_referal : payment_register.price;

					var sendData = new FormData();
					sendData.append('code', paymentCode);
					sendData.append('referral', payment_register.referal);
					sendData.append('action', 'check');
					sendData.append('level', fitur_status.level);

					const result = await checkRegisterTransaction(member_id, sendData);
					if(result){
						if(result.data){
							payment_register.confirmation = result.data;
						}else{
							resAlert({type:'error', title:'Not Found!', text:'Metode pembayaran tidak tersedia untuk saat ini.'});
						}
					}
				}
			}

			async function processPaymentRegister(){
				if(!fitur_status.register){
					return false;
				}
				//var payPrice = (payment_register.referal) ? payment_register.price_referal : payment_register.price;
				var sendData = new FormData();
				sendData.append('code', payment_register.method.code);
				sendData.append('referral', payment_register.referal);
				sendData.append('action', 'process');
				sendData.append('level', fitur_status.level);

				const result = await postRegisterTransaction(member_id, sendData);
				if(result){
					if(result.success && result.data){
						payment_register.verification = result.data;
					}else{
						resAlert({type:'error', title:'Failed!', text:`${result.msg}. Kamu juga bisa memilih metode pembayaran lainnya`});
					}
				}
			}

			async function resetPaymentRegister(){
				$('#popup-payment-register').modal('hide');
				await sleep(100)
				payment_register.referal = '';
				payment_register.confirmation = null;
				payment_register.method = null;
			}

			async function actionFotos(type, index = null){
				if(user.value.level_publish == 1){
					return false;
				}
				if(type == 'add'){
					if(fotos.data.length){
						var lastIndexFoto = fotos.data.length -1;
						var existPicLast = (fotos.data[lastIndexFoto].pic) ? true : false;
						if(fotos.data[lastIndexFoto].new){
							existPicLast = await getFileUpload(`file-select-image-foto-profile-${lastIndexFoto}`);
						}
						if(!existPicLast){
							alertNotComplete('Lengkapi foto sebelumnya (tekan ditengah pada bingkai foto untuk memilih)');
							return false;
						}
					}
					if(fotos.data.length >= 5){
						alertNotComplete('Maksimal 5 foto');
						return false;
					}
					fotos.data.push({pic:'', new:true});
				}else if(type == 'select'){
					return false;
					var existPicMain = (fotos.data[index].pic) ? true : false;
					if(fotos.data[index].new){
						existPicMain = await getFileUpload(`file-select-image-foto-profile-${index}`);
					}
					var validSelect = true;
					if(!existPicMain){
						alertNotComplete('Pilih foto terlebih dahulu (tekan ditengah pada bingkai foto untuk memilih)');
						var validSelect = false;
					}
					fotos.main = (validSelect) ? index : '';
					document.getElementById(`select-main-foto-profile-${index}`).checked = validSelect;
				}else if(type == 'update'){
					var isDataPic = fotos.data[index];
					var existPicFile = await getFileUpload(`file-select-image-foto-profile-${index}`);
					//var is_main_pic = (fotos.main == index) ? 1 : 0;

					if(!existPicFile){
						alertNotComplete('Pilih foto terlebih dahulu (tekan ditengah pada bingkai foto untuk memilih)'); return false;
					}

					//if(isDataPic.new && !existPicFile){
						//alertNotComplete('Pilih foto terlebih dahulu (tekan ditengah pada bingkai foto untuk memilih)'); return false;
					//}
					//if(!isDataPic.new && !existPicFile && !is_main_pic){
						//alertNotComplete('Pilih foto terlebih dahulu atau set (centang/tekan) sebagai foto profile'); return false;
					//}

					var formUpFoto = new FormData();
					formUpFoto.append(`current`, isDataPic.pic);
					formUpFoto.append(`pic`, existPicFile);
					//formUpFoto.append(`main`, is_main_pic);
					//if(existPicFile){
						//formUpFoto.append(`image`, existPicFile);
					//}
					
					const result = await postUpdateImage(member_id, formUpFoto);
					if(result){
						if(result.data){
							await onResetImage(`foto-profile-${index}`);
							fotos.data[index].pic = result.data;
							fotos.data[index].new = false;
							//if(is_main_pic){
								//profilePic.value = result.data;
							//}
						}
					}
				}
			}

			async function checkReferalCode(){
				if(!fitur_status.register){
					return false;
				}
				var isReferal = payment_register.referal;
				if(!isReferal || isReferal.length < 5){
					$('#payment-register-referal').focus();
					return false;
				}
				if(isReferal == registrationNumber.value){
					payment_register.referal = '';
					$('#payment-register-referal').focus();
					return false;
				}

				loadingAlert({title:'Check Referal', text:'Tunggu sebentar...'});
				const result = await getDetailMember(isReferal);
				if(result){
					await sleep(100); Swal.close();
					if(result.data){
						var msgFound = `ID DPRD ditemukan`;
						if(result.data.member_name) msgFound = `${msgFound} atas nama (${result.data.name})`;
						resAlert({type:'success', title:'Tersedia!', text:msgFound});
					}else{
						resAlert({type:'warning', title:'Not Found!', text:'Tidak ditemukan peserta dengan ID DPRD tersebut.'});
					}
				}
			}

			return {
				procesLogout, user, profile, birthdate, load, numbersOnly, socialList, talents,
				getAssetFile, onChangeLocation, achievements, actionAchievement, handleValueAchievement,
				onChangeSelectImage, onSelectImage, onResetImage, processUpdateProfile, profilePic,
				parentDoc, schoolDoc, needLogin, location, notifStatus, numberFormat, payment_register,
				payments, selectPaymentRegister, processPaymentRegister, resetPaymentRegister, dateFormat,
				parentCardPic, fotos, actionFotos, checkReferalCode, fitur_status, show_evaluation,
				is_current_level, levels
			}
		},
		components: {EmptyContent, LazyContent, AlertContent},
		name: '2024.profile',
		mounted() {
			if(this.$route.meta.title){
				document.title = this.$route.meta.title;
			}
			window.scrollTo(0, 0);
		}, 
	}
</script>
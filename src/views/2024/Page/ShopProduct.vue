<template>
	<div class="nk-content p-0">
		<div class="container-fluid">
			<div class="nk-content-inner">
				<div class="nk-content-body">
					<div class="wide-xs mx-auto border shadow bg-white main-content is-relative">
						<div class="card bg-transparent pt-5 pb-5">
							<div class="card-inner p-0">
								<div class="nk-block mb-3">
									<div class="col-10 col-lg-10 m-auto p-0">
										<div class="user-card align-items-start">
											<div class="user-avatar bg-transparent md br-0">
												<router-link :to="{name: '2024.home'}"><img class="br-0" src="@/assets/images/img-rabbani-md.png"/></router-link>
											</div>
											<div class="user-info">
												<h4 class="text-uppercase main-color ls-sm mb-1">BELI MERCH LIMITED</h4>
												<h2 class="text-uppercase main-color ls-sm mb-1">DPR/MPR 24</h2>
												<h5 class="text-uppercase main-color ls-sm mb-0">GRATIS VOTE UNTUK JAGOANMU</h5>
											</div>
										</div>
									</div>
								</div>
								<div class="nk-block-content pt-2">
									<div v-if="load_product.status == 'pending'" class="p-2 pl-3 pr-3">
										<div class="card br-8 m-0 mb-2 bg-lighter">
											<div class="card-inner">
												<div class="user-card align-items-start">
													<div class="user-image">
														<div class="user-avatar xl br-8 bg-light mb-1"></div>
													</div>
													<div class="user-info pl-2 w-65">
														<LazyContent class="mb-2" :isHeight="'20'" :isWidth="'w-100'"></LazyContent>
														<LazyContent class="mb-2" :isHeight="'25'" :isWidth="'w-50'"></LazyContent>
														<LazyContent class="mb-1" :isHeight="'15'" :isWidth="'w-50'"></LazyContent>
														<LazyContent class="mb-1" :isHeight="'15'" :isWidth="'w-50'"></LazyContent>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div v-else v-cloak v-bind:class="{ hide_element: load_product.status == 'pending'}" class="p-2 pl-3 pr-3">
										<div v-if="load_product.status == 'success' && product">
											<div class="card br-8 m-0 mb-2 bg-lighter">
												<div class="card-inner p-3">
													<div class="user-card align-items-start">
														<div class="user-image col-4 col-lg-4 p-0 product-image">
															<div class="br-8 bg-light mb-0 user-avatar xl box-image" :style="{ 'background-image': `url('${product.pic}') !important` }"></div>
														</div>
														<div class="user-info col-8 col-lg-8 p-0 pl-1 pt-1">
															<div class="main-color-secondary mb-3 fs-13px">{{product.title}}</div>
															<div class="main-color-purple mb-4 fs-16px fw-bold ml-3">
																<span class="text-price currency-rp-before is-relative">{{numberFormat(product.price, {style:'currency'})}}</span>
															</div>
															<div class="main-color-pink fs-11px mb-1">{{`Point Vote :`}}<span class="ml-1 fw-bold">{{product.point}}</span></div>
															<div class="main-color-pink fs-11px">{{`Tersedia :`}}<span class="ml-1 fw-bold">{{product.stock}}</span></div>
														</div>
													</div>
												</div>
											</div>
											<div v-if="product.stock <= 0">
												<EmptyContent :textMessage="'Stok produk sudah habis untuk saat ini. Silahkan dukung jagoan kamu dengan vote'" :typeNotif="'empty'"></EmptyContent>
												<div class="col-10 col-lg-10 p-0 m-auto">
													<router-link :to="{name:'2024.vote'}" class="p-3 fs-15px btn-block btn btn-xl btn-white br-8 main-bg-orange shadow border-0 main-color">Vote Jagoanmu Disini</router-link>
												</div>
											</div>
											<div v-else>
												<div class="nk-block">
													<form @submit.prevent="handleSearch()">
														<div class="form-control-wrap">
															<div class="form-icon form-icon-right">
																<button class="btn btn-white btn-icon btn-sm" type="submit"><em class="main-text-secondary icon ni ni-search fs-18px lh-150"></em></button>
															</div>
															<input type="text" required v-model="searchMember.search" class="pl-3 pr-3 pt-3 pb-3 form-control form-control-lg br-80 main-text-secondary" id="search-member" placeholder="DPR/MPRxxxxxxxxxxxx">
														</div>
													</form>
												</div>
												<div v-if="searchMember.load" class="nk-block pt-2">
													<div v-if="load.status == 'pending'">
														<div class="vote-information p-2 pl-3 pr-3">
															<LazyContent class="mb-2" :isHeight="'20'" :isWidth="'w-75'"></LazyContent>
															<div class="card br-8 m-0 mb-2 bg-lighter">
																<div class="card-inner">
																	<div class="user-card align-items-start">
																		<div class="user-image">
																			<div class="user-avatar xl br-8 bg-light mb-1"></div>
																			<LazyContent class="mb-1" :isHeight="'15'" :isWidth="'w-50'"></LazyContent>
																			<LazyContent class="mb-1" :isHeight="'20'" :isWidth="'w-100'"></LazyContent>
																			<LazyContent :isHeight="'20'" :isWidth="'w-100'"></LazyContent>
																		</div>
																		<div class="user-info pl-2 w-65">
																			<div class="user-info-content mb-2">
																				<LazyContent class="mb-1" :isHeight="'15'" :isWidth="'w-50'"></LazyContent>
																				<LazyContent class="mb-1" :isHeight="'20'" :isWidth="'w-100'"></LazyContent>
																			</div>
																			<div class="user-info-content mb-2">
																				<LazyContent class="mb-1" :isHeight="'15'" :isWidth="'w-50'"></LazyContent>
																				<LazyContent class="mb-1" :isHeight="'20'" :isWidth="'w-100'"></LazyContent>
																			</div>
																			<div class="user-info-content mb-2">
																				<LazyContent class="mb-1" :isHeight="'15'" :isWidth="'w-50'"></LazyContent>
																				<LazyContent class="mb-1" :isHeight="'20'" :isWidth="'w-100'"></LazyContent>
																			</div>
																			<div class="user-info-content text-right d-flex justify-content-end">
																				<LazyContent :isHeight="'30'" :isWidth="'w-50'"></LazyContent>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div class="p-0 pl-3 pr-3">
															<LazyContent v-for="index in 5" class="mb-1" :isHeight="'50'" :isWidth="'w-100'"></LazyContent>
														</div>
													</div>
													<div v-else v-cloak v-bind:class="{ hide_element: load.status == 'pending'}">
														<div v-if="load.status == 'success' && member">
															<div class="vote-information p-2 pl-3 pr-3">
																<div class="title text-capitalize main-color mb-2 fs-11px">Vote <span v-if="member.name" class="text-uppercase fw-bold">{{ `${member.name}`.split(' ')[0] }}</span> untuk menjadi finalis DPR - MPR 2024</div>
																<div class="card br-8 m-0 mb-2 bg-card-0">
																	<div class="card-inner p-2">
																		<div class="user-card align-items-start">
																			<div class="user-image col-4 col-lg-4 p-0">
																				<div class="user-avatar xl br-8 bg-lighter mb-1 box-image w-100">
																					<img class="br-0" :src="(member.profile_picture_url) ? member.profile_picture_url : getAssetFile('images','logo-dpr-light.png')"/>
																				</div>
																				<div class="main-text-secondary fs-9px mb-1">{{ `Calon ${member.registration_number.substring(0, 3)}` }}</div>
																			</div>
																			<div class="user-info col-8 col-lg-8 p-0 pl-2">
																				<div class="user-info-content mb-2">
																					<div class="main-text-secondary fs-10px mb-0 lh-normal">Kategori Bakat:</div>
																					<div class="main-color text-capitalize fs-11px fw-bold" v-html="viewTalent()"></div>
																				</div>
																				<div class="user-info-content mb-2">
																					<div class="main-text-secondary fs-10px mb-0 lh-normal">Prestasi:</div>
																					<div v-if="member.achievements && member.achievements.length" class="list-prestasi-vote pr-1">
																						<div v-for="achievement in member.achievements" class="main-color text-capitalize fs-11px fw-bold lh-100 mb-1">{{achievement}}</div>
																					</div>
																					<div v-else><span class="fs-10px fw-normal main-color-light">Belum ada</span></div>
																				</div>
																			</div>
																		</div>
																		<div class="row m-0 align-items-start">
																			<div class="col-4 col-lg-4 p-0">
																				<div v-if="member.name && member.name.length" class="main-color-secondary fs-11px fw-bold text-capitalize mb-1">{{member.name}}</div>
																				<div v-else><span class="fs-10px fw-normal main-color-light">No Name</span></div>
																				<div v-if="member.from_school && member.from_school.length" class="main-color-secondary fs-10px text-capitalize">{{member.from_school}}</div>
																				<div v-else><span class="fs-10px fw-normal main-color-light">No School Name</span></div>
																			</div>
																			<div class="col-8 col-lg-8 p-0 pl-2">
																				<div class="main-text-secondary fs-10px mb-1">Status: <span class="main-text-secondary text-capitalize fs-11px lh-normal">{{ (member.title && member.title.length) ? member.title : '-' }}</span></div>
																				<div class="main-text-secondary fs-10px mb-0">Jumlah Dukungan: <span v-if="member.level && member.level.display_votes" class="main-text-secondary text-capitalize fs-11px lh-normal fw-bold">{{member.level.display_votes}}</span><span v-else class="fs-10px fw-normal main-color-light">Belum ada</span></div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<div class="vote-count-content">
																<div class="title text-capitalize main-color text-center p-2">Jumlah Vote</div>
																<div class="title text-capitalize mb-3 text-center p-2 border-tb-main-color pb-3 pt-3 d-flex justify-content-center align-items-center">
																	<h2 :class="[!vote.me || vote.me == 0 ? 'main-color-light' : 'main-color']" class="ls-sm fw-normal text-poppins mb-0"><span>{{parseInt(vote.default) + parseInt(vote.me)}}</span> Vote</h2>
																	<span v-if="vote.me && parseInt(vote.me) > 0" class="badge badge-pill badge-info ml-1 fs-11px lh-normal pt-1 pb-1">+ <span>{{parseInt(vote.me)}}</span><span class="ml-1 fs-9">{{`/${parseInt(vote.count_item)} item`}}</span></span>
																</div>
																<div class="row m-0 mb-3 pl-2 pr-2">
																	<div class="col-6 col-lg-6">
																		<div class="d-flex align-items-center">
																			<a @click.prevent="manageVote('remove')" class="btn btn-lg main-color bg-pink-dim br-8 btn-icon fw-bold"><em class="icon ni ni-minus"></em></a>
																			<div class="main-color fs-10px pl-2 fw-normal">Kurangi jumlah item</div>
																		</div>
																	</div>
																	<div class="col-6 col-lg-6">
																		<div class="d-flex align-items-center">
																			<a @click.prevent="manageVote('add')" class="btn btn-lg text-white main-bg-secondary br-8 btn-icon fw-bold"><em class="icon ni ni-plus"></em></a>
																			<div class="main-text-secondary fs-10px pl-2 fw-normal">Tambah jumlah item</div>
																		</div>
																	</div>
																	<div class="col-12 col-lg-12 mt-3">
																		<AlertContent class="mb-1" :typeNotif="{type: 'info'}" :textNotif="'Setiap vote berhasil, para voter akan mendapatkan voucher diskon 10% yang akan di kirim ke WA, bisa di gunakan di seluruh otlet resmi rabbani se-indonesia'"></AlertContent>
																	</div>
																</div>

																<div class="price-vote p-2 text-center mb-1 lh-150">
																	<div class="title main-text-secondary">{{`1 item seharga Rp ${numberFormat(vote.price)}*`}}</div>
																	<div class="title main-text-secondary fs-10">{{`Jagoan kamu akan mendapatkan ${numberFormat(product.point)}* vote per item`}}</div>
																	<div class="hide_element d-none sub-title main-color-secondary fs-9px fw-normal"></div>
																</div>
																<div v-if="vote.me && vote.me > 0 && (amountVoteFinal) >= 1000000" class="title text-capitalize mb-3 text-center p-1 border-tb-main-color d-flex justify-content-center align-items-center">
																	<span v-if="vote.me && parseInt(vote.me) > 0" class="badge main-color-secondary-dark bg-transparent border-0 mr-1 fs-11px lh-normal pt-1 pb-1">Total Bayar</span>
																	<h4 class="ls-sm fw-bold text-poppins mb-0 main-color-secondary-dark">{{ numberFormat(amountVoteFinal, {style:'currency'}) }}</h4>
																</div>
																<div class="payment-vote p-2 text-center">
																	<div class="title main-text-secondary fs-14px mb-3">Pilih Pembayaran:</div>
																	<div class="col-11 col-lg-11 p-0 m-auto">
																		<div v-if="!vote.me || vote.me == 0" class="payment-list-none mb-3">
																			<div class="fs-16px text-capitalize fw-bold main-color-secondary-light lh-150">Tambah Jumlah Item Untuk Melakukan Pembayaran</div>
																		</div>
																		<div v-else class="mb-3">
																			<div v-if="(amountVoteFinal) >= 1000000" class="payment-list payment-list-register row m-0 align-items-center justify-content-center">
																				<div v-for="payment in payments" class="col-4 col-lg-4 mb-2">
																					<a  @click.prevent="selectPayment(payment.code)" class="btn btn-xl br-4 p-0 btn-white border">
																						<img class="p-0" :src="(payment.static) ? getAssetFile('icons', `${payment.slug}.png`) : payment.icon_url"/>
																					</a>
																				</div>
																			</div>
																			<div v-else class="payment-list col-10 col-lg-10 p-0 m-auto">
																				<a v-for="payment in default_payments" @click.prevent="selectPayment(payment.code)" :class="`bg-${payment.color}-dim`" class="btn btn-xl br-8 p-0 mb-1 btn-block">
																					<div class="icon-payment pl-2 pr-2 col-4">
																						<img :src="getAssetFile('icons', `${payment.slug}.png`)"/>
																					</div>
																					<div class="info-payment text-left bg-white p-1 pl-2 pr-2 lh-normal col-8">
																						<div class="main-color-secondary-dark fs-11px fw-normal">Total pembayaran:</div>
																						<div v-if="amountVote > amountVoteDiscount" class="main-color fs-10px fw-bold fw-normal">
																							<span class="text-strike">{{ numberFormat(amountVote, {style:'currency'}) }}</span>
																						</div>
																						<div class="main-color-secondary-dark fs-11px fw-bold fw-normal">{{ numberFormat(amountVoteFinal, {style:'currency'}) }}</div>
																						<div class="main-color-secondary fs-9px fw-normal">pilih metode pembayaran</div>
																					</div>
																				</a>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
														<div v-else>
															<EmptyContent :textMessage="load.msg" :typeNotif="'empty'"></EmptyContent>
														</div>
													</div>
												</div>
											</div>
											<div class="col-10 col-lg-10 p-0 m-auto pt-3">
												<router-link :to="{name:'2024.shop'}" class="p-3 fs-15px btn btn-lg main-color-secondary-dark btn-block br-8 main-bg-secondary-light mt-4">Kembali</router-link>
											</div>
										</div>
										<div v-else v-bind:class="{ hide_element: load_product.status == 'pending'}">
											<EmptyContent :textMessage="load_product.msg" :typeNotif="'empty'"></EmptyContent>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div id="popup-invoice" class="modal fade zoom" tabindex="-1" style="display: none;" aria-hidden="true">
		<div class="modal-dialog modal-me" role="document">
			<div class="modal-content">
				<div class="modal-header p-2 align-items-center">
					<h5 class="modal-title fs-16px">Konfirmasi Pembelian</h5>
					<a href="javascript;void(0)" class="close fs-18px" data-dismiss="modal" aria-label="Close">
						<em class="icon ni ni-cross"></em>
					</a>
				</div>
				<div class="modal-body p-3 pb-4">
					<div v-if="vote.payment && confirmation">
						<div class="form-group pl-2 pr-2">
							<label class="form-label main-text-secondary fs-11px">No whatsapp konfirmasi <code>*</code></label>
							<input v-model="vote.phone" class="form-control form-control-lg" type="text" v-on:keypress="numbersOnly" minlength="8" maxlength="15" placeholder="08xxxxxxxxxx">
						</div>
						<div class="nk-tb-list is-compact mb-3 pl-2 pr-2">
							<div class="nk-tb-item">
								<div class="nk-tb-col pl-0">
									<span class="tb-sub"><span>Pembayaran</span></span>
								</div>
								<div class="nk-tb-col text-right pr-0">
									<span class="tb-sub tb-amount"><span class="main-text-secondary fw-bold fs-12px">{{ (vote.payment.name) ? vote.payment.name : vote.payment.text }}</span></span>
								</div>
							</div>
							<div class="nk-tb-item">
								<div class="nk-tb-col pl-0">
									<span class="tb-sub"><span>Jumlah Item</span></span>
								</div>
								<div class="nk-tb-col text-right pr-0">
									<span class="tb-sub tb-amount"><span class="main-text-secondary fw-bold fs-13px">{{ numberFormat(confirmation.total_items) }}</span></span>
								</div>
							</div>
							<div class="nk-tb-item">
								<div class="nk-tb-col pl-0">
									<span class="tb-sub"><span>Jumlah Vote</span></span>
								</div>
								<div class="nk-tb-col text-right pr-0">
									<span class="tb-sub tb-amount"><span class="main-text-secondary fw-bold fs-13px">{{ numberFormat(confirmation.total_votes) }}</span></span>
								</div>
							</div>
							<div class="nk-tb-item">
								<div class="nk-tb-col pl-0">
									<span class="tb-sub"><span>Harga /item</span></span>
								</div>
								<div class="nk-tb-col text-right pr-0">
									<span class="tb-sub tb-amount"><span class="main-text-secondary fw-bold fs-13px">{{ numberFormat(confirmation.price, {style:'currency'}) }}</span></span>
								</div>
							</div>
							<div class="nk-tb-item">
								<div class="nk-tb-col pl-0">
									<span class="tb-sub"><span>Subtotal</span></span>
								</div>
								<div class="nk-tb-col text-right pr-0">
									<div v-if="confirmation.total_discount && parseInt(confirmation.total_discount) > 0" class="tb-sub tb-amount">
										<span class="main-color fs-11px text-strike">{{ numberFormat(confirmation.total_price_default, {style:'currency'}) }}</span>
									</div>
									<div class="tb-sub tb-amount">
										<span class="main-text-secondary fw-bold fs-13px">{{ numberFormat(confirmation.total_price, {style:'currency'}) }}</span>
									</div>
								</div>
							</div>
							<div class="nk-tb-item">
								<div class="nk-tb-col pl-0">
									<span class="tb-sub"><span>Biaya Bank</span></span>
								</div>
								<div class="nk-tb-col text-right pr-0">
									<span class="tb-sub tb-amount"><span class="main-text-secondary fw-bold fs-13px">{{ numberFormat(confirmation.total_fee, {style:'currency'}) }}</span></span>
								</div>
							</div>
							<div class="nk-tb-item main-bg">
								<div class="nk-tb-col pl-2">
									<span class="tb-sub"><span class="text-white">Total Bayar</span></span>
								</div>
								<div class="nk-tb-col text-right pr-2">
									<span class="tb-sub tb-amount"><span class="text-white  fw-bold fs-14px">{{ numberFormat(confirmation.payment_amount, {style:'currency'}) }}</span></span>
								</div>
							</div>
						</div>
						<div class="p-2">
							<a @click.prevent="processVote()" class="btn btn-block btn-lg main-bg-secondary text-white br-8 p-3 fs-15px"><span>Beli Sekarang</span></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { onMounted, ref, reactive } from 'vue'
	import { useRouter, useRoute } from 'vue-router'
	import { getAssetFile, talentList, paymentList, getPaginationData } from '@/models/attribute'
	import { sleep, numberFormat, confirmAlert, dateFormat } from '@/helpers/general'
	import { numbersOnly, alertNotComplete } from '@/helpers/validation'
	import { getDetailProduct, checkProductTransaction, postProductTransaction } from '@/controllers/product'

	import { getDetailMember } from '@/controllers/member'
	import { postVoteTransaction, getHistoryVote, paymentChannelList, getHistoryCustomVote } from '@/controllers/transaction'

	import LazyContent from '@/components/LazyContent'
	import EmptyContent from '@/components/EmptyContent'
	import AlertContent from '@/components/AlertContent'

	export default {
		setup(){
			const route = useRoute(), slugProduct = route.params.id;
			let load_product = reactive({status:'pending', msg:''});
			let product = ref(null)
			let searchMember = reactive({search:'', load:false})

			let slugMember = ref(null)
			let talents = ref([]), payments = ref([]), default_payments = ref([]);
			let load = reactive({status:'pending', msg:''});
			let member = ref(null), vote = reactive({default:0, me:0, payment:null, phone:'', price:0, price_discount : 0, count_item:1})
			let confirmation = ref({}), histories = ref([]), load_history = reactive({status:'pending',msg:''})
			let pagination_history = reactive({page:1, load: false})
			let paginationDataHistory = ref({});
			let amountVote = ref(0)
			let amountVoteDiscount = ref(0)
			let amountVoteFinal = ref(0)
			const amountVoteDiscountLength = 5;

			const today = new Date();
			const currentMonth = today.getMonth();

			let histories_custom = ref([])
			let load_history_custom = reactive({status:'pending',msg:''})
			let pagination_history_custom = reactive({page:1, load: false})
			let paginationDataHistory_custom = ref({});

			onMounted(async () => {
				talents.value = talentList();
				payments.value = paymentList();
				default_payments.value = paymentList();
				await sleep(100);
				await loadProduct();
				await loadPayment();
			})

			const loadPayment = async () => {
				const result = await paymentChannelList();
				if(result){
					if(result.data && result.data.length) payments.value = result.data;
				}
			}

			const loadProduct = async () => {
				const result = await getDetailProduct(slugProduct);
				if(result){
					load_product.msg = result.msg;
					if(result.data){
						product.value = result.data;
						vote.price = parseInt(result.data.price);
						vote.me = parseInt(result.data.point);
					}
					await sleep(200);
					load_product.status = result.type;
				}
			}

			const loadMember = async () => {
				const result = await getDetailMember(slugMember.value);
				if(result){
					load.msg = result.msg;
					if(result.data){
						member.value = result.data;
						var voteLv1 = parseInt(result.data.level_1_total_votes);
						var voteLv2 = parseInt(result.data.level_2_total_votes);
						var voteLv3 = parseInt(result.data.level_3_total_votes);
						var totalVote = voteLv1+voteLv2+voteLv3;

						if(result.data.level && ( 'total_votes' in result.data.level || 'display_votes' in result.data.level)){
							totalVote = parseInt(('display_votes' in result.data.level) ? result.data.level.display_votes : result.data.level.total_votes);
						}
						vote.default = totalVote;
						//await loadHistory();
						//await loadHistoryCustom();
					}
					await sleep(200);
					load.status = result.type;
				}
			}

			const loadHistory = async (isFrom = null) => {
				var params = '';
				if(isFrom == 'pagination') params = `page=${pagination_history.page}`;
				const result = await getHistoryVote(slugMember.value, params);
				if(result){
					load_history.msg = result.msg;
					if(result.data && result.data.length){
						if(isFrom == 'pagination'){
							histories.value.push(...result.data);
						}else{
							histories.value = result.data;
						}
						if(result.attribute){
							result.attribute.page = pagination_history.page;
							paginationDataHistory.value = await getPaginationData(result.attribute);
						}
					}else{
						if(isFrom == 'pagination') pagination_history.page = pagination_history.page-1;
					}
					await sleep(200);
					load_history.status = result.type;
					pagination_history.load = false;
				}
			}

			async function handlePaginationHistory(){
				pagination_history.load = true;
				pagination_history.page = pagination_history.page+1;
				return loadHistory('pagination');
			}

			const loadHistoryCustom = async (isFrom = null) => {
				var params = '';
				if(isFrom == 'pagination') params = `page=${pagination_history_custom.page}`;
				const result = await getHistoryCustomVote(slugMember.value, params);
				if(result){
					load_history_custom.msg = result.msg;
					if(result.data && result.data.length){
						if(isFrom == 'pagination'){
							histories_custom.value.push(...result.data);
						}else{
							histories_custom.value = result.data;
						}
						if(result.attribute){
							result.attribute.page = pagination_history_custom.page;
							paginationDataHistory_custom.value = await getPaginationData(result.attribute);
						}
					}else{
						if(isFrom == 'pagination') pagination_history_custom.page = pagination_history_custom.page-1;
					}
					await sleep(200);
					load_history_custom.status = result.type;
					pagination_history_custom.load = false;
				}
			}

			async function handlePaginationHistoryCustom(){
				pagination_history_custom.load = true;
				pagination_history_custom.page = pagination_history_custom.page+1;
				return loadHistoryCustom('pagination');
			}

			function viewTalent(){
				const checkTalent = talents.value.find(item => item.key == member.value.talent);
				var setTalent = '<span class="fs-10px fw-normal main-color-light">Belum ada</span>';
				if(checkTalent && checkTalent.key){
					setTalent = checkTalent.text;
				}
				return setTalent;
			}

			async function manageVote(type){
				var myVote = parseInt(vote.me);
				var myItem = parseInt(vote.count_item);

				var counterItem = (type == 'add') ? myItem + 1 : ( (myItem && myItem > 0) ? myItem - 1 : myItem );
				var counterVote = (type == 'add') ? myVote + product.value.point : ( (myVote && myVote > 0) ? myVote - product.value.point : myVote );
				/*if(type == 'add'){
					vote.me = myVote + 1;
				}else{
					if(myVote && myVote > 0){
						vote.me = myVote - 1;
					}
				}*/

				if(counterItem < 1 || counterItem > product.value.stock) return false;
				vote.me = counterVote;
				vote.count_item = counterItem;

				var setAmount = vote.count_item*vote.price;
				var setAmountDiscount = setAmount;

				if(currentMonth === 3){
					var checkDisc = vote.count_item % amountVoteDiscountLength;
					var existDisc = (checkDisc === 0) ? false : true;
					if(existDisc){
						var calValVote = vote.count_item - checkDisc;
						var calPriceVote = calValVote * vote.price_discount;

						var calPriceVoteDisc = checkDisc * vote.price;
						setAmountDiscount = calPriceVote + calPriceVoteDisc;
					}else{
						setAmountDiscount = vote.count_item * vote.price_discount;
					}
				}
				await handleAmount(setAmount, setAmountDiscount);
			}

			async function handleAmount(amount, discount){
				amountVote.value = amount;
				amountVoteDiscount.value = discount;
				amountVoteFinal.value = (amount > discount) ? discount : amount;
			}

			async function selectPayment(payment){
				if(vote.me && vote.me > 0){
					const checkPayment = payments.value.find(item => item.code == payment);
					if(checkPayment && checkPayment.code){
						vote.payment = checkPayment;
						const result = await checkProductTransaction({id: product.value.id, qty:parseInt(vote.count_item), registration_number:slugMember.value, payment_method_code:payment});
						if(result){
							confirmation.value = result.data;
							return await showConfirmation();
						}
					}
				}
			}

			async function showConfirmation(hidden = false){
				if(hidden){
					$('#popup-invoice').modal('hide');
				}else{
					$('#popup-invoice').modal({
						show:true,
						keyboard: false,
						backdrop: 'static'
					});
				}
			}

			async function processVote(){
				var sendOrder = {id: product.value.id, qty:parseInt(vote.count_item), registration_number:slugMember.value, payment_method_code:vote.payment.code, phone_number:vote.phone};
				const result = await postProductTransaction(sendOrder);
				if(result){
					showConfirmation(true);
					confirmAlert({type:'success',title:result.title,text:result.msg, confirmLabel:'Oke', cancel:false}).then( async (result) => {
						if (result.isConfirmed || result.value == true) {
							window.location.reload();
						}
					})
				}
			}

			async function handleSearch(){
				await resetMember();
				searchMember.load = true;
				slugMember.value = searchMember.search;
				await loadMember();
			}

			async function resetMember(){
				load.status = 'pending';
				load.msg = '';
				member.value = null;
				vote.default = 0;
				vote.me = product.value.point;
				vote.count_item = 1;
				vote.payment = null;
				vote.phone = '';
				confirmation.value = {};
				histories.value = [];
				load_history.status = 'pending';
				load_history.msg = '';
				pagination_history.page = 1;
				pagination_history.load = false;
				paginationDataHistory.value = {};
				amountVote.value = product.value.price;
				amountVoteDiscount.value = product.value.price;
				amountVoteFinal.value = 0;
				histories_custom.value = [];
				load_history_custom.status = 'pending';
				load_history_custom.msg = '';
				pagination_history_custom.page = 1;
				pagination_history_custom.load = false;
				paginationDataHistory_custom.value = {}
				await handleAmount(product.value.price, product.value.price);
			}

			return { 
				member, load, viewTalent, getAssetFile, vote, manageVote, payments, selectPayment, numberFormat, confirmation, processVote, numbersOnly,
				histories, load_history, pagination_history, paginationDataHistory, handlePaginationHistory, dateFormat, default_payments, amountVote, amountVoteDiscount, amountVoteFinal,
				histories_custom, load_history_custom, pagination_history_custom, paginationDataHistory_custom, handlePaginationHistoryCustom,
				load_product, slugProduct, product, searchMember, handleSearch
			}
		},
		components: {LazyContent, EmptyContent, AlertContent },
		name: '2024.vote',
		mounted() {
			if(this.$route.meta.title){
				document.title = this.$route.meta.title;
			}
			window.scrollTo(0, 0);
		}, 
	}
</script>
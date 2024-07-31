<template>
	<div class="nk-content p-0">
		<div class="container-fluid">
			<div class="nk-content-inner">
				<div class="nk-content-body">
					<div class="wide-xs mx-auto border shadow bg-white main-content is-relative">
						<div class="card bg-transparent pt-5 pb-5">
							<div class="card-inner p-0">
								<div class="nk-block mb-5">
									<div class="col-10 col-lg-10 m-auto p-0">
										<div class="user-card align-items-start">
											<div class="user-avatar bg-transparent md br-0">
												<router-link :to="{name: '2024.home'}"><img class="br-0" src="@/assets/images/img-dprd-lg.png"/></router-link>
											</div>
											<div class="user-info">
												<h1 class="text-uppercase main-color ls-sm mb-0">Jangan Sampai</h1>
												<h1 class="text-uppercase main-color ls-sm mb-0">Jagoan Kamu</h1>
												<h1 class="text-uppercase main-color ls-sm mb-0">GA Lolos!</h1>
											</div>
										</div>
									</div>
								</div>
								<div class="nk-block-content pt-2">
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
												<div class="title text-capitalize main-color mb-2 fs-11px">Vote <span v-if="member.member_name" class="text-uppercase fw-bold">{{ `${member.member_name}`.split(' ')[0] }}</span> untuk menjadi finalis DPRD 2024</div>
												<div class="card br-8 m-0 mb-2 bg-card-0">
													<div class="card-inner p-2">
														<div class="user-card align-items-start">
															<div class="user-image col-4 col-lg-4 p-0">
																<div class="user-avatar xl br-8 bg-lighter mb-1 box-image w-100">
																	<img class="br-0" :src="(member.member_pic) ? member.member_pic : getAssetFile('images','logo-dpr-light.png')"/>
																</div>
																<div class="main-text-secondary fs-9px mb-1">Calon DPRD</div>
															</div>
															<div class="user-info col-8 col-lg-8 p-0 pl-2">
																<div class="user-info-content mb-2">
																	<div class="main-text-secondary fs-10px mb-0 lh-normal">Kategori Bakat:</div>
																	<div class="main-color text-capitalize fs-11px fw-bold" v-html="viewTalent()"></div>
																</div>
																<div class="user-info-content mb-2">
																	<div class="main-text-secondary fs-10px mb-0 lh-normal">Prestasi:</div>
																	<div v-if="member.member_achievements && member.member_achievements.length" class="list-prestasi-vote pr-1">
																		<div v-for="achievement in JSON.parse(member.member_achievements)" class="main-color text-capitalize fs-11px fw-bold lh-100 mb-1">{{achievement}}</div>
																	</div>
																	<div v-else><span class="fs-10px fw-normal main-color-light">Belum ada</span></div>
																</div>
															</div>
														</div>
														<div class="row m-0 align-items-start">
															<div class="col-4 col-lg-4 p-0">
																<div v-if="member.member_name && member.member_name.length" class="main-color-secondary fs-11px fw-bold text-capitalize mb-1">{{member.member_name}}</div>
																<div v-else><span class="fs-10px fw-normal main-color-light">No Name</span></div>
																<div v-if="member.member_school && member.member_school.length" class="main-color-secondary fs-10px text-capitalize">{{member.member_school}}</div>
																<div v-else><span class="fs-10px fw-normal main-color-light">No School Name</span></div>
															</div>
															<div class="col-8 col-lg-8 p-0 pl-2">
																<div class="main-text-secondary fs-10px mb-1 d-none">Status: <span class="main-text-secondary text-capitalize fs-11px lh-normal">{{ (member.title && member.title.length) ? member.title : '-' }}</span></div>
																<div class="main-text-secondary fs-10px mb-0">Jumlah Dukungan: <span v-if="member.summary_level_vote > 0" class="main-text-secondary text-capitalize fs-11px lh-normal fw-bold">{{member.summary_level_vote}}</span><span v-else class="fs-10px fw-normal main-color-light">Belum ada</span></div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="vote-count-content">
												<div class="title text-capitalize main-color text-center p-2">Jumlah Vote</div>
												<div class="title text-capitalize mb-3 text-center p-2 border-tb-main-color pb-3 pt-3 d-flex justify-content-center align-items-center">
													<h1 :class="[( vote.me && parseInt(vote.me) > 0 ) || ( vote.product && parseInt(vote.product) > 0 ) ? 'main-color' : 'main-color-light']" class="ls-sm fw-normal text-poppins mb-0"><span>{{parseInt(vote.default) + parseInt(vote.me) + parseInt(vote.product)}}</span> Vote</h1>
													<span v-if="( vote.me && parseInt(vote.me) > 0 ) || ( vote.product && parseInt(vote.product) > 0 )" class="badge badge-pill badge-info ml-1 fs-11px lh-normal pt-1 pb-1">+ <span>{{parseInt(vote.me) + parseInt(vote.product)}}</span></span>
												</div>
												<div class="row m-0 mb-3 pl-2 pr-2">
													<div class="col-6 col-lg-6">
														<div class="d-flex align-items-center">
															<a @click.prevent="manageVote('remove')" class="btn btn-lg main-color bg-pink-dim br-8 btn-icon fw-bold"><em class="icon ni ni-minus"></em></a>
															<div class="main-color fs-10px pl-2 fw-normal">Kurangi jumlah vote</div>
														</div>
													</div>
													<div class="col-6 col-lg-6">
														<div class="d-flex align-items-center">
															<a @click.prevent="manageVote('add')" class="btn btn-lg text-white main-bg-secondary br-8 btn-icon fw-bold"><em class="icon ni ni-plus"></em></a>
															<div class="main-text-secondary fs-10px pl-2 fw-normal">Tambah jumlah vote</div>
														</div>
													</div>
													<div class="col-12 col-lg-12 mt-3">
														<AlertContent class="mb-1" :typeNotif="{type: 'info'}" :textNotif="'Setiap vote berhasil, para voter akan mendapatkan voucher diskon 10% yang akan di kirim ke WA, bisa di gunakan di seluruh otlet resmi rabbani se-indonesia'"></AlertContent>
													</div>
												</div>

												<div class="price-vote p-2 text-center mb-1 lh-150">
													<div class="title main-text-secondary">{{ `1 vote seharga Rp ${ numberFormat(vote.price, {style:'currency'}) }*` }}</div>
													<div class="hide_element d-none sub-title main-color-secondary fs-9px fw-normal"></div>
												</div>
												<div class="product-vote mb-3 d-none">
													<h6 class="main-color text-center mb-2">Beli Juga Official Merch DPR MPR 2024</h6>
													<div v-if="load_product.load" class="row m-0">
														<div class="col-4 col-lg-4" v-for="index in 3">
															<div class="product-item">
																<div class="user-image product-image">
																	<div class="br-8 bg-light mb-0 w-100 h-100px"></div>
																</div>
																<div class="product-info text-center p-1 row align-items-center justify-content-center m-0">
																	<LazyContent class="mb-1" :isHeight="'10'" :isWidth="'w-100'"></LazyContent>
																	<LazyContent class="mb-1" :isHeight="'15'" :isWidth="'w-75'"></LazyContent>
																	<LazyContent class="mb-1" :isHeight="'10'" :isWidth="'w-75'"></LazyContent>
																</div>
															</div>
														</div>
													</div>
													<div v-else v-cloak v-bind:class="{ hide_element: load_product.load}">
														<div v-if="products && products.length">
															<div id="slider-product">
																<div v-for="(product, idxprd) in products" class="product-item ml-1 mr-1">
																	<div class="br-8" v-bind:class="{'is-selected' : product.is_selected}" >
																		<a @click.prevent="selectedProduct(idxprd)">
																			<div class="user-image product-image">
																				<div class="br-8 bg-light mb-0 w-100 h-100px box-image" :style="{ 'background-image': `url('${product.product_pic}') !important` }">
																				</div>
																			</div>
																			<div class="product-info text-center p-1">
																				<div class="main-color-secondary mb-1 fs-10px">{{product.product_title}}</div>
																				<div class="main-color-purple mb-1 fs-11px fw-bold">
																					<span class="text-price currency-rp-before is-relative">{{numberFormat(product.product_price, {style:'currency'})}}</span>
																				</div>
																				<div class="main-color-pink fs-9px">{{`Point Vote ${product.event_product_point}`}}</div>
																			</div>
																		</a>
																	</div>
																	<div class="input-group mt-1 border br-8">
																		<a @click.prevent="handleQtyProduct('minus', idxprd)" class="btn btn-xs btn-icon input-group-prepend main-color fw-bold pl-1 pr-1"><em class="icon ni ni-minus"></em></a>
																		<input type="number" class="border-0 text-center form-control form-control-sm p-1" v-model="product.is_qty" placeholder="0">
																		<a @click.prevent="handleQtyProduct('plus', idxprd)" class="btn btn-xs btn-icon input-group-append fw-bold main-color-secondary pl-1 pr-1"><em class="icon ni ni-plus"></em></a>
																	</div>
																</div>
															</div>
														</div>
														<div v-else class="col-10 col-lg-10 p-0 m-auto">
															<AlertContent class="mb-1" :typeNotif="{type: 'danger'}" :textNotif="load_product.msg" :iconNotif="false"></AlertContent>
														</div>
													</div>
												</div>
												<div v-if="(vote.price_product) > 0" class="title text-capitalize mb-3 text-center p-1 border-tb-main-color d-flex justify-content-center align-items-center">
													<span class="badge main-color-secondary-dark bg-transparent border-0 mr-1 fs-11px lh-normal pt-1 pb-1">Total Bayar</span>
													<h4 class="ls-sm fw-bold text-poppins mb-0 main-color-secondary-dark">{{ numberFormat(amountVoteFinal+vote.price_product, {style:'currency'}) }}</h4>
												</div>
												<div class="payment-vote p-2 text-center">
													<div class="title main-text-secondary fs-14px mb-3">Pilih Pembayaran:</div>
													<div class="col-11 col-lg-11 p-0 m-auto">
														<div v-if="( vote.me && parseInt(vote.me) > 0 ) || ( vote.product && parseInt(vote.product) > 0 )" class="mb-3">
															<div v-if="(vote.price_product) > 0" class="payment-list payment-list-register row m-0 align-items-center justify-content-center">
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
														<div v-else class="payment-list-none mb-3">
															<div class="fs-16px text-capitalize fw-bold main-color-secondary-light lh-150">Tambah Jumlah Vote Untuk Melakukan Pembayaran</div>
														</div>
														<div class="col-12 col-lg-12 p-0 m-auto">
															<div class="card card-bordered mt-2">
																<div class="card-inner p-0">
																	<div class="card-title-group align-center m-0 mb-0 border-bottom p-2">
																		<div class="card-title card-title-sm">
																			<div class="overline-title fs-11px main-color-secondary-dark">Riwayat Dukungan</div>
																		</div>
																	</div>
																	<div class="card-body p-2 mh-300 h-auto content-overflow-y">
																		<div v-if="load_history.status == 'pending'">
																			<LazyContent v-for="index in 5" class="mb-1" :isHeight="'20'" :isWidth="'w-100'" :isRadius="'br-4'"></LazyContent>
																		</div>
																		<div v-else>
																			<div v-if="load_history.status == 'success' && histories && histories.length" class="text-left">
																				<div v-for="his in histories" class="item-history-vote fs-11px mb-2 main-text-secondary">
																					<span class="history-date">{{ `${dateFormat(his.vote_paid_at, 'DD/MM/YYYY')} :` }}</span>
																					<span class="history-no ml-1">{{hiddenPhoneNumber(his.vote_phone)}}</span>
																					<span class="history-count ml-1 pull-right">(<b>{{ `${his.vote_count}` }}</b>) <span class="fs-9px">vote</span></span>
																				</div>
																				<div v-if="paginationDataHistory.nextPage && paginationDataHistory.nextPage > 0" class="text-center pt-1">
																					<a @click.prevent="handlePaginationHistory()" :disabled="(pagination_history.load) ? true : false" v-bind:class="{disabled: pagination_history.load}" class="btn btn-sm btn-white br-8 main-bg-light border-0 text-white">
																						<em :class="[!pagination_history.load ? 'ni-chevrons-down' : 'ni-loader']" class="icon ni"></em>
																						<span>{{ (!pagination_history.load) ? `Lebih Banyak (${paginationDataHistory.currentPage}/${paginationDataHistory.countPage})` : 'Sedang memuat...' }}</span>
																					</a>
																				</div>
																			</div>
																			<div v-else class="text-center">
																				<p class="p-0 m-0 text-soft fs-10px fw-normal"><i>{{ `"${load_history.msg}"` }}</i></p>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>

														<div class="col-10 col-lg-10 p-0 m-auto">
															<router-link :to="{name:'2024.public'}" class="p-3 fs-15px btn btn-lg main-color-secondary-dark btn-block br-8 main-bg-secondary-light mt-4">Kembali</router-link>
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
					<h5 class="modal-title fs-16px">Konfirmasi Vote</h5>
					<a href="javascript;void(0)" class="close fs-18px" data-dismiss="modal" aria-label="Close">
						<em class="icon ni ni-cross"></em>
					</a>
				</div>
				<div class="modal-body p-3 pb-4">
					<div v-bind:class="{ hide_element: !vote.payment || !confirmation}">
						<div class="form-group pl-2 pr-2 mb-2">
							<label class="form-label main-text-secondary fs-11px">No whatsapp konfirmasi <code>*</code></label>
							<input v-model="vote.phone" class="form-control form-control-lg" type="text" v-on:keypress="numbersOnly" minlength="8" maxlength="15" placeholder="08xxxxxxxxxx">
						</div>
						<div v-if="vote.product && parseInt(vote.product) > 0" class="form-group pl-2 pr-2 mb-2">
							<label class="form-label main-text-secondary fs-11px">Nama Penerima <code>*</code></label>
							<input v-model="vote.name" class="form-control form-control-lg" type="text" placeholder="Nama lengkap kamu">
						</div>
						<div v-if="vote.product && parseInt(vote.product) > 0" class="form-group pl-2 pr-2 mb-2">
							<label class="form-label main-text-secondary fs-11px">Alamat Penerima <code>*</code></label>
							<input v-model="vote.address" class="form-control form-control-lg" type="text" placeholder="Alamat lengkap kamu">
						</div>
						<form class="pl-2 pr-2 mb-2" v-bind:class="{ hide_element: !vote.product || parseInt(vote.product) <= 0}" @submit.prevent="loadDestination()">
							<div class="form-control-wrap mb-1">
								<div class="form-icon form-icon-right">
									<button class="btn btn-white btn-icon btn-sm" type="submit"><em class="main-text-secondary icon ni ni-search fs-18px lh-150"></em></button>
								</div>
								<input type="text" required v-model="load_destination.search" minlength="3" class="pl-3 pr-3 pt-3 pb-3 form-control form-control-lg br-80 main-text-secondary" id="search-member" placeholder="Cari Kota/Kabupaten">
							</div>
							<select v-model="vote.destination" @change.prevent="handleSelectDestination()" :class="[(load_destination.status) ? '' : 'd-none', (load_destination.load) ? 'disabled' : '']" :disabled="load_destination.load" class="form-control mb-1">
								<option value="">Pilih Lokasi</option>
								<option v-for="desti in destinations" :value="desti.city_code">{{desti.city_name}}</option>
							</select>
							<select v-model="vote.shipment" @change.prevent="handleSelectShipment()" :class="[(vote.destination) ? '' : 'd-none']" class="form-control">
								<option value="">Pilih Kurir</option>
								<option v-for="shipment in shipments" :value="shipment.service_display">{{`${shipment.service_display} - ${numberFormat(shipment.price)}`}}</option>
							</select>
						</form>

						<div class="nk-tb-list is-compact mb-3 pl-2 pr-2">
							<div class="nk-tb-item">
								<div class="nk-tb-col pl-0">
									<span class="tb-sub"><span>Pembayaran</span></span>
								</div>
								<div class="nk-tb-col text-right pr-0">
									<span class="tb-sub tb-amount"><span class="main-text-secondary fw-bold fs-12px">{{ (vote.payment) ? ( (vote.payment.name) ? vote.payment.name : vote.payment.text ) : '' }}</span></span>
								</div>
							</div>
							<div v-if="vote.me && parseInt(vote.me) > 0" class="nk-tb-item">
								<div class="nk-tb-col pl-0">
									<span class="tb-sub"><span>Jumlah Vote</span></span>
								</div>
								<div class="nk-tb-col text-right pr-0">
									<span class="tb-sub tb-amount"><span class="main-text-secondary fw-bold fs-13px">{{ numberFormat(confirmation.count_vote) }}</span></span>
								</div>
							</div>
							<div v-if="vote.me && parseInt(vote.me) > 0" class="nk-tb-item">
								<div class="nk-tb-col pl-0">
									<span class="tb-sub"><span>Harga /vote</span></span>
								</div>
								<div class="nk-tb-col text-right pr-0">
									<span class="tb-sub tb-amount"><span class="main-text-secondary fw-bold fs-13px">{{ numberFormat(confirmation.price, {style:'currency'}) }}</span></span>
								</div>
							</div>
							<div v-if="vote.product && parseInt(vote.product) > 0" class="nk-tb-item">
								<div class="nk-tb-col pl-0">
									<span class="tb-sub"><span>Jumlah Produk</span></span>
								</div>
								<div class="nk-tb-col text-right pr-0">
									<span class="tb-sub tb-amount"><span class="main-text-secondary fw-bold fs-13px">{{ numberFormat(confirmation.product_qty) }}</span></span>
								</div>
							</div>
							<div v-if="vote.product && parseInt(vote.product) > 0" class="nk-tb-item">
								<div class="nk-tb-col pl-0">
									<span class="tb-sub"><span>Harga Produk</span></span>
								</div>
								<div class="nk-tb-col text-right pr-0">
									<span class="tb-sub tb-amount"><span class="main-text-secondary fw-bold fs-13px">{{ numberFormat(confirmation.product_total, {style:'currency'}) }}</span></span>
								</div>
							</div>
							<div v-if="vote.product && parseInt(vote.product) > 0" class="nk-tb-item">
								<div class="nk-tb-col pl-0">
									<span class="tb-sub"><span>Jumlah Point</span></span>
								</div>
								<div class="nk-tb-col text-right pr-0">
									<span class="tb-sub tb-amount"><span class="main-text-secondary fw-bold fs-13px">{{ numberFormat(confirmation.product_point) }}</span></span>
								</div>
							</div>
							<div v-if="vote.product && parseInt(vote.product) > 0" class="nk-tb-item">
								<div class="nk-tb-col pl-0">
									<span class="tb-sub"><span>Total Vote</span></span>
								</div>
								<div class="nk-tb-col text-right pr-0">
									<span class="tb-sub tb-amount"><span class="main-text-secondary fw-bold fs-13px">{{ numberFormat(confirmation.total_votes) }}</span></span>
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
							<div v-if="vote.product && parseInt(vote.product) > 0 && vote.shipment" class="nk-tb-item">
								<div class="nk-tb-col pl-0">
									<span class="tb-sub"><span>Kurir</span></span>
								</div>
								<div class="nk-tb-col text-right pr-0">
									<span class="tb-sub tb-amount"><span class="main-text-secondary fw-bold fs-13px">{{ vote.shipment }}</span></span>
								</div>
							</div>
							<div v-if="vote.product && parseInt(vote.product) > 0 && vote.shipment" class="nk-tb-item">
								<div class="nk-tb-col pl-0">
									<span class="tb-sub"><span>Ongkir</span></span>
								</div>
								<div class="nk-tb-col text-right pr-0">
									<span class="tb-sub tb-amount"><span class="main-text-secondary fw-bold fs-13px">{{ numberFormat(vote.ongkir, {style:'currency'}) }}</span></span>
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
							<a @click.prevent="processVote()" class="btn btn-block btn-lg main-bg-secondary text-white br-8 p-3 fs-15px"><span>Vote Sekarang</span></a>
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
	import { sleep, numberFormat, confirmAlert, dateFormat, initSlickSlider, loadingAlert, resAlert, textAlert, hiddenPhoneNumber } from '@/helpers/general'
	import { numbersOnly, alertNotComplete } from '@/helpers/validation'

	import { getDetailMember } from '@/controllers/api_v2/member'
	import { getProduct } from '@/controllers/api_v2/product'
	import { checkVoteTransaction, postVoteTransaction, getHistoryVote, paymentChannelList, getHistoryCustomVote } from '@/controllers/api_v2/transaction'
	import { getJneDestination, getJneOngkir } from '@/controllers/location'

	import LazyContent from '@/components/LazyContent'
	import EmptyContent from '@/components/EmptyContent'
	import AlertContent from '@/components/AlertContent'

	export default {
		setup(){
			const route = useRoute(), slugMember = route.params.id;
			let talents = ref([]), payments = ref([]), default_payments = ref([]);
			let load = reactive({status:'pending', msg:''});
			let member = ref(null);
			let vote = reactive({
				default:0,
				me:0, 
				payment:null, 
				phone:'', 
				name:'', 
				address:'',
				origin:'BDO10000',
				destination:'',
				shipment:'',
				ongkir:0,
				weight:1000,
				price:0, 
				price_discount : 0, 
				product:0, 
				price_product : 0
			})
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

			let load_product = reactive({load: true, msg:''})
			let products = ref([]);
			let destinations = ref([])
			let load_destination = reactive({load:true, status: false, search:''})
			let shipments = ref([])

			onMounted(async () => {
				talents.value = talentList();
				payments.value = paymentList();
				default_payments.value = paymentList();
				await sleep(100);
				//await loadPayment();
				await loadMember();
			})

			const loadPayment = async () => {
				const result = await paymentChannelList();
				if(result){
					if(result.data && result.data.length) payments.value = result.data;
				}
			}

			const loadMember = async () => {
				const result = await getDetailMember(slugMember);
				if(result){
					load.msg = result.msg;
					if(result.data){
						member.value = result.data;
						//var voteLv1 = parseInt(result.data.level_1_total_votes);
						//var voteLv2 = parseInt(result.data.level_2_total_votes);
						//var voteLv3 = parseInt(result.data.level_3_total_votes);
						//var totalVote = voteLv1+voteLv2+voteLv3;

						//if(result.data.level && ( 'total_votes' in result.data.level || 'display_votes' in result.data.level)){
							//totalVote = parseInt(('display_votes' in result.data.level) ? result.data.level.display_votes : result.data.level.total_votes);
						//}
						vote.default = member.value.summary_level_vote;
						vote.price = member.value.level_fee_vote;
						await loadHistory();
						//await loadHistoryCustom();
					}
					await sleep(200);
					load.status = result.type;
					//await loadProduct();
				}
			}

			const loadDestination = async () => {
				await resetShipment();
				var is_search = load_destination.search;
				if(is_search.length > 3){
					load_destination.status = true;
					load_destination.load = true;
					destinations.value = [];

					const result = await getJneDestination(`q=${is_search}`);
					if(result){
						if(result.success && result.data && result.data.length){
							destinations.value = result.data;
						}
						load_destination.load = false;
					}
				}
			}

			const loadHistory = async (isFrom = null) => {
				var params = '';
				if(isFrom == 'pagination') params = `page=${pagination_history.page}`;
				const result = await getHistoryVote(slugMember, params);
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
				const result = await getHistoryCustomVote(slugMember, params);
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
				const checkTalent = talents.value.find(item => item.key == member.value.member_talent);
				var setTalent = '<span class="fs-10px fw-normal main-color-light">Belum ada</span>';
				if(checkTalent && checkTalent.key){
					setTalent = checkTalent.text;
				}
				return setTalent;
			}

			function manageVote(type){
				var myVote = parseInt(vote.me);
				if(type == 'add'){
					vote.me = myVote + 1;
				}else{
					if(myVote && myVote > 0){
						vote.me = myVote - 1;
					}
				}

				var setAmount = vote.me*vote.price;
				var setAmountDiscount = setAmount;

				if(currentMonth === 3){
					var checkDisc = vote.me % amountVoteDiscountLength;
					var existDisc = (checkDisc === 0) ? false : true;
					if(existDisc){
						var calValVote = vote.me - checkDisc;
						var calPriceVote = calValVote * vote.price_discount;

						var calPriceVoteDisc = checkDisc * vote.price;
						setAmountDiscount = calPriceVote + calPriceVoteDisc;
					}else{
						setAmountDiscount = vote.me * vote.price_discount;
					}
				}
				amountVote.value = setAmount;
				amountVoteDiscount.value = setAmountDiscount;
				amountVoteFinal.value = (setAmount > setAmountDiscount) ? setAmountDiscount : setAmount;
			}

			async function selectPayment(payment){
				if((vote.me && parseInt(vote.me) > 0 ) || ( vote.product && parseInt(vote.product) > 0 )){
					const checkPayment = payments.value.find(item => item.code == payment);
					if(checkPayment && checkPayment.code){
						await resetShipment();
						vote.payment = checkPayment;
						var sendCheck = await calculationSendVote();
						sendCheck.append('action', 'check');

						const result = await checkVoteTransaction(member.value.member_id, sendCheck);
						if(result){
							confirmation.value = result.data;
							return await showConfirmation();
						}
					}
				}
			}

			async function resetShipment() {
				vote.shipment = '';
				vote.destination = '';
				vote.ongkir = 0;
				shipments.value = [];
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
				if(!vote.payment.code || !vote.phone){
			        alertNotComplete('Tidak dapat memproses vote. Lengkapi atau periksa kembali data.');
			        return false;
			    }
				var sendVote = await calculationSendVote();
				sendVote.append('action', 'process');

				const result = await postVoteTransaction(member.value.member_id, sendVote);
				if(result){
					showConfirmation(true);
					confirmAlert({type:'success',title:result.title,text:result.msg, confirmLabel:'Oke', cancel:false}).then( async (result) => {
						if (result.isConfirmed || result.value == true) {
							window.location.reload();
						}
					})
				}
			}

			async function calculationSendVote(){
				var is_total_votes = parseInt(vote.me) + parseInt(vote.product);
				var sendVote = new FormData();
				sendVote.append('count', parseInt(vote.me));
				sendVote.append('code', vote.payment.code);
				sendVote.append('phone', vote.phone);
				sendVote.append('name', vote.name);
				/*var sendVote = {
					count:parseInt(vote.me), 
					code:vote.payment.code, 
					phone:vote.phone,
					name:vote.name, 
					address:vote.address,
					destination:vote.destination,
					origin:vote.origin,
					shipment:vote.shipment,
					ongkir:vote.ongkir,
					weight:vote.weight
				};
				var prd_selected = products.value.filter(prd => prd.is_selected === true);
				if(prd_selected && prd_selected.length){
					var num = 0;
					prd_selected.forEach(itm => {
						if(itm.is_qty){
							sendVote[`products[${num}][id]`] = itm.id;
							sendVote[`products[${num}][qty]`] = itm.is_qty;
							num++;
						}
					})
				}*/

				return sendVote;
			}

			async function loadProduct(){
				return false;
				const result = await getProduct();
				if(result){
					load_product.msg = result.msg;
					if(result.data && result.data.length){
						products.value = result.data;
					}
					load_product.load = false;
				}
				await sleep(200)
				var optSlide = await initSlickSlider({slidesToShow: 3.5, slidesToScroll: 3, dots: false, prevArrow: null, nextArrow: null});
				$('#slider-product').slick(optSlide);
			}

			function selectedProduct(index){
				return false;
				var thisProduct = products.value[index];
				var currentSelect = (thisProduct.is_selected) ? true : false;
				products.value[index].is_selected = !currentSelect;
				if(!products.value[index].is_selected){
					products.value[index].is_qty = '';
				}else{
					if(!thisProduct.is_qty){
						products.value[index].is_qty = 1;
					}
				}
				return calculationVoteProduct();
			}

			async function handleQtyProduct(type, index){
				return false;
				var thisProduct = products.value[index];
				var currentQty = (thisProduct.is_qty) ? parseInt(thisProduct.is_qty) : 0;
				if(type == 'plus'){
					if(currentQty < thisProduct.product_stock){
						currentQty += 1;
					}
				}else{
					if(currentQty > 0){
						currentQty -= 1;
					}
				}
				products.value[index].is_qty = currentQty;
				products.value[index].is_selected = (products.value[index].is_qty <= 0) ? false : true;
				await calculationVoteProduct();
			}

			async function calculationVoteProduct(){
				return false;
				var prd_selected = products.value.filter(prd => prd.is_selected === true);
				var vote_prd = 0, price_prd = 0;
				if(prd_selected && prd_selected.length){
					prd_selected.forEach(itm => {
						if(itm.is_qty){
							vote_prd += parseInt(itm.point) * parseInt(itm.is_qty);
							price_prd += parseInt(itm.price) * parseInt(itm.is_qty);
						}
					})
				}
				vote.product = vote_prd;
				vote.price_product = price_prd;
			}

			async function handleSelectDestination(){
				return false;
				vote.shipment = '';
				vote.ongkir = 0;
				if(vote.destination){
					loadingAlert({title:'Memeriksa Ongkir'});
					const result = await getJneOngkir(vote.origin, vote.destination, vote.weight);
					if(result){
						await sleep(100); Swal.close();
						if(result.success && result.data && result.data.length){
							shipments.value = result.data;
						}else{
							resAlert({type:'warning', title:'', text:'Data ongkir tidak ditemukan'});
						}
					}
				}
			}

			async function handleSelectShipment(){
				return false;
				vote.ongkir = 0;
				if(vote.shipment){
					const result_shipment = shipments.value.find(dt => dt.service_display === vote.shipment);
					if(result_shipment){
						vote.ongkir = result_shipment.price;
					}
					loadingAlert({title:'Memuat data transaksi'});
					var sendCheck = await calculationSendVote();
					const result = await checkVoteTransaction(sendCheck);
					if(result){
						confirmation.value = result.data;
					}
				}
			}

			return { 
				member, load, viewTalent, getAssetFile, vote, manageVote, payments, selectPayment, numberFormat, confirmation, processVote, numbersOnly,
				histories, load_history, pagination_history, paginationDataHistory, handlePaginationHistory, dateFormat, default_payments, amountVote, amountVoteDiscount, amountVoteFinal,
				histories_custom, load_history_custom, pagination_history_custom, paginationDataHistory_custom, handlePaginationHistoryCustom, load_product, products, selectedProduct,
				handleQtyProduct, destinations, load_destination, loadDestination, handleSelectDestination, shipments, handleSelectShipment, hiddenPhoneNumber
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
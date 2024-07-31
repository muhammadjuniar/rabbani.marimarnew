<template>
	<div class="nk-content p-0">
		<div class="container-fluid">
			<div class="nk-content-inner">
				<div class="nk-content-body">
					<div class="wide-xs mx-auto border shadow bg-white main-content is-relative">
						<div class="card bg-transparent">
							<div class="card-inner p-0">
								<div class="main-bg-pink pt-3">
									<div class="content-public-head nk-block-head h-245px is-relative" :style="{ 'background-image': `url('${getAssetFile('images/2024','banner_public.png')}') !important` }">
										<div class="is-absolute shop-head-text">
											<h4 class="text-white text-uppercase text-shop pl-1 mb-3">BELI MERCH LIMITED</h4>
											<h3 class="main-color-cream text-uppercase text-dpr pl-1 mb-2">DPR/MPR 24</h3>
											<h1 class="text-uppercase text-white text-desc pl-1 mb-4">GRATIS VOTE UNTUK JAGOANMU</h1>
											<a href="#" class="btn btn-md btn-white br-8 main-bg-orange shadow main-color-dark fw-bold fs-13px d-none">Beli Sekarang</a>
											<h4 class="text-white text-uppercase pl-1 mb-3 text-buy mt-5">BELI SEKARANG !!!</h4>
										</div>
									</div>
								</div>
								<div class="nk-block bg-white public-content is-relative">
									<div class="nk-block-content p-2 pt-3 pb-3">
										<div class="text-center p-2">
											<h4 class="main-color">DPR MPR 24 OFFICIAL LIMITED MERCH!!</h4>
										</div>
										<div class="public-card mt-3">
											<div v-if="load.status == 'first' || load.status == 'pending'">
												<div class="row">
													<div class="col-6 col-lg-6 mb-2" v-for="index in 6">
														<div class="product-item">
															<div class="user-image product-image">
																<div class="br-8 bg-light mb-1 w-100 h-150px"></div>
															</div>
															<div class="product-info text-center p-1 row align-items-center justify-content-center m-0">
																<LazyContent class="mb-1" :isHeight="'15'" :isWidth="'w-100'"></LazyContent>
																<LazyContent class="mb-1" :isHeight="'20'" :isWidth="'w-75'"></LazyContent>
																<LazyContent class="mb-1 mt-1" :isHeight="'10'" :isWidth="'w-75'"></LazyContent>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div v-else v-cloak v-bind:class="{ hide_element: load.status == 'first' || load.status == 'pending'}">
												<div v-if="load.status == 'success' && products && products.length">
													<div class="row mb-2">
														<div class="col-6 col-lg-6 mb-2" v-for="(product, index) in products">
															<div class="product-item">
																<router-link :to="{name: '2024.shop.product', params:{id: product.slug}}">
																	<div class="user-image product-image">
																		<div class="br-8 bg-light mb-1 w-100 h-150px box-image" :style="{ 'background-image': `url('${product.pic}') !important` }"></div>
																	</div>
																	<div class="product-info text-center p-1">
																		<div class="main-color-secondary mb-2 fs-13px">{{product.title}}</div>
																		<div class="main-color-purple mb-2 fs-16px fw-bold">
																			<span class="text-price currency-rp-before is-relative">{{numberFormat(product.price, {style:'currency'})}}</span>
																		</div>
																		<div class="main-color-pink fs-11px">{{`Point Vote ${product.point}`}}</div>
																	</div>
																</router-link>
															</div>
														</div>
													</div>
													<div v-if="paginationData.nextPage && paginationData.nextPage > 0" class="col-10 col-lg-10 m-auto p-0 pt-3 pb-3 text-center">
														<a @click.prevent="handlePagination()" :disabled="(pagination.load) ? true : false" v-bind:class="{disabled: pagination.load}" class="btn btn-lg btn-white br-8 main-bg-light border-0 text-white">
															<em :class="[!pagination.load ? 'ni-chevrons-down' : 'ni-loader']" class="icon ni"></em>
															<span>{{ (!pagination.load) ? `Lebih Banyak (${paginationData.currentPage}/${paginationData.countPage})` : 'Sedang memuat...' }}</span>
														</a>
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
						<Footer :isDetail="true"></Footer>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { onMounted, ref, reactive } from 'vue'
	import { getAssetFile, talentList, getPaginationData } from '@/models/attribute'
	import { sleep, numberFormat, dateFormat } from '@/helpers/general'

	import { getProduct } from '@/controllers/product'

	import Footer from '@/layout/Footer2024'
	import LazyContent from '@/components/LazyContent'
	import EmptyContent from '@/components/EmptyContent'

	export default {
		setup(){
			let products = ref([]), load = reactive({status:'first', msg:''});
			let pagination = reactive({page:1, load: false})
			let paginationData = ref({}), filter = reactive({search:'', category:''})

			onMounted(async () => {
				await sleep(100);
				await loadProduct();
			})

			const loadProduct = async (params = '', isFrom = null) => {
				const result = await getProduct(params);
				if(result){
					load.msg = result.msg;
					if(result.data && result.data.length){
						if(isFrom == 'pagination'){
							products.value.push(...result.data);
						}else{
							products.value = result.data;
						}
						if(result.attribute){
							result.attribute.page = pagination.page;
							paginationData.value = await getPaginationData(result.attribute);
						}
					}else{
						if(isFrom == 'pagination') pagination.page = pagination.page-1;
					}
					await sleep(200);
					load.status = result.type;
					pagination.load = false;
				}
			}

			async function handleFilter(isFrom = null){
				var search = filter.search;
				if(isFrom == 'search' && (!search || !search.length)){
					document.getElementById('search-product').focus(); return false;
				}
				if(isFrom != 'pagination'){
					load.status = 'pending';
					products.value = [];
					await handlePagination(true);
				}
				var params = `q=${search}&page=${pagination.page}`;
				await sleep(100);
				return loadProduct(params, isFrom);
			}

			function handleSelectCategory(event, key = ''){
				event.preventDefault();
				filter.category = key;
				document.querySelectorAll(`.item-category`).forEach(e => e.classList.remove('active'));
				event.target.classList.add('active');
				return handleFilter();
			}

			async function resetData(){
				load.status = 'pending';
				products.value = [];
				filter.search = '';
				filter.category = '';
				document.querySelectorAll(`.item-category`).forEach((e, index) => {
					if(index == 0){
						e.classList.add('active');
					}else{
						e.classList.remove('active');
					}
				});
				pagination.page = 1; pagination.load = false;
				await sleep(100);
				return loadProduct();
			}

			async function handlePagination(reset = false){
				if(reset){
					pagination.page = 1; pagination.load = false;
				}else{
					pagination.load = true;
					pagination.page = pagination.page+1;
					return handleFilter('pagination');
				}
			}

			return { getAssetFile, products, load, filter, handleFilter, handleSelectCategory, resetData, pagination, handlePagination, paginationData, numberFormat }
		},
		components: {Footer, LazyContent, EmptyContent},
		name: '2024.shop',
		mounted() {
			if(this.$route.meta.title){
				document.title = this.$route.meta.title;
			}
			window.scrollTo(0, 0);
		}, 
	}
</script>
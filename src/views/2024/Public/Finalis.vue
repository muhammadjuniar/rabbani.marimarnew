<template>
	<div class="nk-content p-0">
		<div class="container-fluid">
			<div class="nk-content-inner">
				<div class="nk-content-body">
					<div class="wide-xs mx-auto border shadow bg-white main-content is-relative">
						<div class="card bg-transparent">
							<div class="card-inner p-0">
								<div class="main-bg-secondary-light">
									<div class="content-public-head nk-block-head h-300px is-relative bg-img-full" :style="{ 'background-image': `url('${getAssetFile('images','2024/winner/public/banner_finalis.png')}') !important` }">
										<div class="is-absolute public-head-text-winner w-100 text-center">
											<div class="d-flex align-items-center justify-content-center mb-5">
												<div class="pl-1 pr-1"><h1 class="text-white text-lg">40</h1></div>
												<div class="pl-1 pr-1"><img :src="getAssetFile('images', '2024/winner/public/logo_dpr_mpr_sm.png')"/></div>
											</div>
											<div class="text-white text-school-times text-md">Terbaik 2024</div>
										</div>
										<div class="public-head-search public-head-search-winner is-absolute d-flex align-items-center justify-content-center">
											<div class="col-10 col-lg-10 p-0">
												<div class="form-control-wrap">
													<div @click.prevent="handleSearch((search.status) ? 'reload' : '')" class="form-icon form-icon-right">
														<em :class="[(search.status) ? 'ni-reload' : 'ni-search']" class="main-text-secondary icon ni fs-18px lh-150"></em>
													</div>
													<input v-on:keyup.enter="handleSearch" v-model="search.value" type="text" class="bg-transparent-white fs-14px pl-3 pr-3 pt-3 pb-3 form-control form-control-xl br-80 main-text-secondary border-0" id="search-member" placeholder="Cari jagoan kamu...">
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="nk-block bg-white public-content is-relative">
									<div class="nk-block-content p-2 pt-3 pb-3">
										<div class="public-category d-flex justify-content-center p-1">
											<div class="main-color fs-20px fw-bold ls-sm">DPR MPR 2024</div>
										</div>
										<div class="public-card mt-3">
											<div v-if="load">
												<div class="card br-8 m-0 mb-2 bg-lighter" v-for="index in 5">
													<div class="card-inner p-2">
														<div class="user-card align-items-center">
															<div class="user-image col-4 col-lg-4 p-0">
																<div class="user-avatar user-avatar-finalist xl br-8 bg-light mb-0 box-image w-100"></div>
															</div>
															<div class="user-info col-8 col-lg-8 p-0 pl-2">
																<div class="user-info-content mb-2">
																	<LazyContent class="mb-1" :isHeight="'10'" :isWidth="'w-50'"></LazyContent>
																	<LazyContent class="mb-1" :isHeight="'15'" :isWidth="'w-100'"></LazyContent>
																</div>
																<div class="user-info-content mb-2">
																	<LazyContent class="mb-1" :isHeight="'10'" :isWidth="'w-50'"></LazyContent>
																	<LazyContent class="mb-1" :isHeight="'15'" :isWidth="'w-100'"></LazyContent>
																</div>
																<div class="user-info-content mb-2">
																	<LazyContent class="mb-1" :isHeight="'10'" :isWidth="'w-50'"></LazyContent>
																	<LazyContent class="mb-1" :isHeight="'15'" :isWidth="'w-100'"></LazyContent>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div v-else v-cloak v-bind:class="{ hide_element: load}">

												<div v-if="finalists && finalists.length">
													<div v-for="(finalist, index) in finalists" :class="[`main-bg-${finalist.bg}-dim`]" class="card br-8 m-0 mb-2">
														<div class="card-inner p-2">
															<div class="user-card align-items-center">
																<div class="user-image col-4 col-lg-4 p-0">
																	<div class="user-avatar user-avatar-finalist xl br-8 bg-transparent mb-0 box-image w-100">
																		<img class="br-0" :src="getAssetFile('images/2024/winner/finalis', `${finalist.name}/img.png`)"/>
																	</div>
																</div>
																<div class="user-info col-8 col-lg-8 p-0 pl-2">
																	<div class="user-info-content mb-1">
																		<div class="main-color-secondary-dark fw-bold fs-10px mb-1 lh-normal">{{finalist.title}}</div>
																		<div class="main-color text-capitalize fs-12px fw-bold">{{finalist.name}}</div>
																	</div>
																	<div class="user-info-content mb-1">
																		<div class="main-text-secondary fs-10px mb-0 lh-normal">Asal Sekolah / Universitas :</div>
																		<div class="main-color text-capitalize fs-11px fw-bold">{{finalist.school}}</div>
																	</div>
																	<div class="user-info-content mb-0">
																		<div class="main-text-secondary fs-10px mb-0 lh-normal">Wilayah :</div>
																		<div class="main-color text-capitalize fs-11px fw-bold">{{finalist.location}}</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
												<div v-else>
													<EmptyContent :textMessage="'Jagoan kamu tidak ditemukan atau tidak termasuk dalam finalis'" :typeNotif="'empty'"></EmptyContent>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<Footer :isDetail="false"></Footer>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { onMounted, ref, reactive } from 'vue'
	import { getAssetFile, finaList2024 } from '@/models/attribute'
	import { sleep } from '@/helpers/general'

	import Footer from '@/layout/Footer2024'
	import LazyContent from '@/components/LazyContent'
	import EmptyContent from '@/components/EmptyContent'

	export default {
		setup(){
			const members = finaList2024();
			let finalists = ref([]);
			let search = reactive({status:false, value:''}), load = ref(true);

			onMounted(async () => {
				await sleep(200);
				finalists.value = members;
				load.value = false;
			})

			async function handleSearch(type = ''){
				if(type == 'reload'){
					search.value = '';
					load.value = true;
					await sleep(100);
					finalists.value = members;
					search.status = false;
					await sleep(200);
					load.value = false;
				}else{
					if(!search.value || !search.value.length){
						$('#search-member').focus(); return false;
					}
					load.value = true;
					await sleep(100);
					var forSearch = search.value.trim().toLowerCase();
					var items = members.filter( function(item){
					    return item.name.trim().toLowerCase().includes(forSearch);
					})
					finalists.value = items;
					search.status = true;
					await sleep(200);
					load.value = false;
				}
			}

			return { getAssetFile, load, finalists, search, handleSearch }
		},
		components: {Footer,LazyContent,EmptyContent},
		name: '2024.finalist',
		mounted() {
			if(this.$route.meta.title){
				document.title = this.$route.meta.title;
			}
			window.scrollTo(0, 0);
		}, 
	}
</script>
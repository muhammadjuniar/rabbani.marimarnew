<template>
	<div class="nk-content p-0">
		<div class="container-fluid">
			<div class="nk-content-inner">
				<div class="nk-content-body">
					<div class="wide-xs mx-auto border shadow bg-white main-content is-relative">
						<div class="card bg-transparent">
							<div class="card-inner p-0">
								<div class="main-bg-secondary-light pt-3">
									<div class="content-public-head nk-block-head h-245px is-relative" :style="{ 'background-image': `url('${getAssetFile('images/2024','img-model-public.png')}') !important` }">
										<div class="is-absolute public-head-text">
											<h2 class="text-white text-uppercase text-vote pl-1 mb-3">VOTE</h2>
											<h3 class="main-color-cream text-uppercase text-jagoan pl-1 mb-1">JAGOAN KAMU</h3>
											<h1 class="main-color text-uppercase text-now">SEKARANG!!!</h1>
										</div>
										<div class="public-head-search is-absolute">
											<div class="col-10 col-lg-10 p-0 m-auto">
												<div class="form-control-wrap">
													<div @click.prevent="handleFilter('search')" class="form-icon form-icon-right">
														<em class="main-text-secondary icon ni ni-search fs-18px lh-150"></em>
													</div>
													<input v-on:keyup.enter="handleFilter()" v-model="filter.search" type="text" class="pl-3 pr-3 pt-3 pb-3 form-control form-control-lg br-80 main-text-secondary border-0" id="search-member" placeholder="Cari jagoan kamu...">
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="nk-block bg-white public-content is-relative">
									<div class="nk-block-content p-2 pt-3 pb-3">
										<div class="public-category row m-0 justify-content-center p-0">
											<LazyContent v-if="load.status == 'first'" v-for="index in 7" :isHeight="'25'" :isWidth="'w-20'"></LazyContent>
											<span v-if="load.status != 'first'" @click.prevent="handleSelectCategory($event)" class="is-pointer item-category badge badge-pill badge-md fw-normal active br-8 pl-1 pr-1 lh-normal fs-11px">Semua Bakat</span>
											<span v-if="load.status != 'first'" v-for="talent in talents" @click.prevent="handleSelectCategory($event, talent.key)" class="is-pointer item-category badge badge-pill badge-md fw-normal br-8 pl-1 pr-1 lh-normal fs-11px">{{talent.text}}</span>
										</div>
										<div class="public-card mt-3">
											<div v-if="load.status == 'first' || load.status == 'pending'">
												<div class="card br-8 m-0 mb-2 bg-lighter" v-for="index in 5">
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
											<div v-else v-cloak v-bind:class="{ hide_element: load.status == 'first' || load.status == 'pending'}">
												<div v-if="load.status == 'success' && members && members.length">
													<div v-for="(member, index) in members" :class="setBgCard(index)" class="card br-8 m-0 mb-2">
														<div class="card-inner p-2">
															<div class="user-card align-items-start">
																<div class="user-image col-4 col-lg-4 p-0">
																	<div class="user-avatar xl br-8 bg-lighter mb-1 box-image w-100">
																		<img class="br-0" :src="(member.member_pic) ? member.member_pic : getAssetFile('images','img-dprd-lg.png')"/>
																	</div>
																	<div class="main-text-secondary fs-9px mb-1">Calon DPRD</div>
																</div>
																<div class="user-info col-8 col-lg-8 p-0 pl-2">
																	<div class="user-info-content mb-2">
																		<div class="main-text-secondary fs-10px mb-0 lh-normal">Kategori Bakat:</div>
																		<div class="main-color text-capitalize fs-11px fw-bold" v-html="viewTalent(member.member_talent)"></div>
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
																	<div class="user-info-content text-right mt-2">
																		<router-link v-if="member.summary_id" :to="{name:'2024.vote', params:{id:member.member_code}}" class="btn btn-md text-white main-bg fs-13px text-uppercase w-80px justify-content-center br-8">Vote</router-link>
																		<a v-else disabled class="disabled btn btn-md text-white main-bg fs-13px text-uppercase w-80px justify-content-center br-8">Vote</a>
																	</div>
																</div>
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
												<div v-if="filter.search || filter.category" class="col-10 col-lg-10 m-auto p-0 pt-3 text-center">
													<a @click.prevent="resetData()" class="btn btn-lg btn-white br-8 main-bg-secondary shadow border-0 text-white btn-block">Refresh Untuk Cari Calon Lainnya</a>
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
	import { sleep } from '@/helpers/general'

	import { getMember } from '@/controllers/api_v2/member'

	import Footer from '@/layout/Footer2024'
	import LazyContent from '@/components/LazyContent'
	import EmptyContent from '@/components/EmptyContent'

	export default {
		setup(){
			let talents = ref([]), filter = reactive({search:'', category:''})
			let members = ref([]), load = reactive({status:'first', msg:''});
			let pagination = reactive({page:1, load: false})
			let paginationData = ref({});

			onMounted(async () => {
				talents.value = talentList();
				await sleep(100);
				await loadMember();
			})

			function setBgCard(index){
				return `bg-card-${index%3}`;
			}

			const loadMember = async (params = '', isFrom = null) => {
				params = `current_level=1&${params}`;
				const result = await getMember(params);
				if(result){
					load.msg = result.msg;
					if(result.data && result.data.length){
						if(isFrom == 'pagination'){
							members.value.push(...result.data);
						}else{
							members.value = result.data;
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

			function viewTalent(talent = null){
				const checkTalent = talents.value.find(item => item.key == talent);
				var setTalent = '<span class="fs-10px fw-normal main-color-light">Belum ada</span>';
				if(checkTalent && checkTalent.key){
					setTalent = checkTalent.text;
				}
				return setTalent;
			}

			async function handleFilter(isFrom = null){
				var search = filter.search;
				if(isFrom == 'search' && (!search || !search.length)){
					document.getElementById('search-member').focus(); return false;
				}
				if(isFrom != 'pagination'){
					load.status = 'pending';
					members.value = [];
					await handlePagination(true);
				}
				var params = `q=${search}&talent=${filter.category}&page=${pagination.page}`;
				await sleep(100);
				return loadMember(params, isFrom);
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
				members.value = [];
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
				return loadMember();
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

			return { setBgCard, getAssetFile, members, talents, load, viewTalent, filter, handleFilter, handleSelectCategory, resetData, pagination, handlePagination, paginationData }
		},
		components: {Footer, LazyContent, EmptyContent},
		name: '2024.public',
		mounted() {
			if(this.$route.meta.title){
				document.title = this.$route.meta.title;
			}
			window.scrollTo(0, 0);
		}, 
	}
</script>
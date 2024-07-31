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
										<div class="user-card align-items-center justify-content-center">
											<div class="user-avatar bg-transparent md br-0">
												<router-link :to="{name: '2024.home'}"><img class="br-0" src="@/assets/images/img-rabbani-md.png"/></router-link>
											</div>
											<div class="user-info">
												<h1 class="text-uppercase main-color ls-sm mb-0">Sponsor</h1>
											</div>
										</div>
									</div>
								</div>
								<div class="nk-block-content pt-2"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
  export default {
    name: '2024.sponsor',
    mounted() {
      document.title = this.$route.meta.title;
      window.scrollTo(0, 0);
    }, 
  }
</script>
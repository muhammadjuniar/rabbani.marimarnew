<template>
	<div class="nk-content ">
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
	                            <p class="text-gray lh-normal">Halaman yang anda kunjungi tidak ditemukan atau tidak tersedia untuk saat ini.</p>
	                            <p class="nk-error-text fs-11 mb-0 desc-empty-content text-danger"><i>*Bisa juga dikarenakan koneksi internet anda tidak aktif</i></p>
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
    name: '2024.pagenotfound',
    mounted() {
      document.title = this.$route.meta.title;
      window.scrollTo(0, 0);
    }, 
  }
</script>
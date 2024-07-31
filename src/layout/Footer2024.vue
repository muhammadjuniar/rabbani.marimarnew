<template>
	<div class="pb-5 pt-2">
		<div v-if="isDetail" class="card-footer bg-transparent p-2 mt-3">
			<div class="nk-block p-0 text-center">
				<div class="nk-content p-0 mb-4">
					<div class="text-content text-capitalize fs-9px main-color text-italic mb-2">MARIMAR 2024 Organize by :</div>
					<div class="d-flex align-items-center justify-content-center">
						<div><img src="@/assets/images/img-marketeam-sm.png"/></div>
					</div>
				</div>
				<div class="nk-content p-0 mb-4">
					<div class="text-content text-capitalize fs-9px main-color text-italic mb-2">MARIMAR 2024 Sponsored by :</div>
					<div class="d-flex align-items-center justify-content-center">
						<div class="pl-1 pr-1"><img src="@/assets/images/img-rabbani-sm.png"/></div>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="nk-block text-center">
			<div class="nk-content p-0 mb-4">
				<div class="text-content text-capitalize fs-9px main-color text-italic mb-2">MARIMAR 2024 Sponsored by :</div>
				<div class="d-flex align-items-center justify-content-center">
					<div class="pl-1 pr-1"><img src="@/assets/images/img-rabbani-sm.png"/></div>
				</div>
			</div>
		</div>
		<div class="nk-block text-center pt-6">
			<div class="text-content text-capitalize fs-9px">Copyright &copy; 2024 Rabbani Group. All Rights Reserved</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			isDetail:{type:Boolean, default:false},
			color:{type:String, default:`main-color-cream`}
		},
	}
</script>
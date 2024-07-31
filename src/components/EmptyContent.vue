<template>
    <div class="nk-block-content nk-error-ld text-center">
        <img v-if="typeNotif=='empty'" class="nk-error-gfx img-empty-content p-1 mb-1 w-35" src="@/assets/images/img-rabbani-md.png" alt="no-data-found">
        <img v-else class="nk-error-gfx img-empty-content w-35" src="@/assets/images/img-rabbani-md.png" alt="errorpage">
        <div class="wide-xs mx-auto lh-150">
            <h5 class="nk-error-title mb-1 pb-0 title-empty-content fs-13px main-color">Oops! Apa yang terjadi?</h5>
            <p class="fs-11px mb-0 desc-empty-content text-gray main-text-secondary">{{textMessage}}</p>
            <a v-if="actionNotif && actionNotifTitle" @click.prevent="actionNotif()" class="btn btn-md btn-round btn-primary btn-dim mt-3">{{actionNotifTitle}}</a>
        </div>
    </div>
</template>

<script>
export default {
    props: {
      textMessage: { type: String, default: 'Gagal memuat data atau halaman yang anda kunjungi tidak tersedia untuk saat ini.'},
      typeNotif: { type: String, default: 'error'},
      actionNotif: { type: Function, default: null},
      actionNotifTitle: { type: String, default: null},
    }
}
</script>
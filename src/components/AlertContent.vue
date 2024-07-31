<template>
    <div v-if="iconNotif" :class="`alert-${typeNotif.type} alert-${typeNotif.class}`" class="alert alert-icon mb-0 pt-1 pb-1 fs-11px">
        <em v-if="typeNotif.type=='info'" class="icon ni ni-info"></em>
        <em v-else class="icon ni ni-cross-circle"></em>
        <span v-html="textNotif"></span>
    </div>
    <div v-else :class="`alert-${typeNotif.type} alert-${typeNotif.class}`" class="alert alert-icon mb-0 p-1 fs-11px">
        <span v-html="textNotif"></span>
    </div>
</template>

<script>
export default {
    props: {
      textNotif: { type: String, default: 'Tidak tersedia data atau gagal memuat data untuk saat ini.'},
      typeNotif: { type: Object, default: {class:'outline',type:'danger'}},
      iconNotif: { type: Boolean, default: true},
    }
}
</script>
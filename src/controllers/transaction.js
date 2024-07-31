import { fetchData } from '@/config/api'
import { sleep, confirmAlert, loadingAlert, resAlert, textAlert } from '@/helpers/general'
import { alertNotComplete, validPhoneLength } from '@/helpers/validation'

const checkVoteTransaction = async (data) => {
    loadingAlert({title:'Memeriksa Vote'});
    const respone = await fetchData('post', `poll/vote/check`, data, {urlencoded:true});
    if(respone){
        await sleep(100); Swal.close();
        if(respone.type == 'warning' || (respone.success && !respone.data)){
            respone.msg = 'Tidak dapat memuat konfirmasi pembayaran. Muat ulang halaman atau coba beberapa saat lagi';
        }
        if(respone.success){
            return respone;
        }
        resAlert({type:respone.type, title:respone.title, text:respone.msg});
        return null;
    }
}

const postVoteTransaction = async (data, exist_product = false) => {
    if(!data || !data.registration_number || !data.payment_method_code || !data.phone_number){
        alertNotComplete('Tidak dapat memproses vote. Lengkapi atau periksa kembali data.');
        return false;
    }

    var checkPhone = validPhoneLength(data.phone_number);
    if(!checkPhone){
        alertNotComplete('No telepon konfirmasi tidak sesuai (8-15 number)');
        return false;
    }
    if(exist_product){
        if(!data.name || !data.address || !data.destination || !data.shipment){
            alertNotComplete('Lengkapi data penerima produk');
            return false;
        }
    }else{
        if(!data.total_votes){
            alertNotComplete('Tambahkan vote terlebih dahulu');
            return false;
        }
    }
    loadingAlert({title:'Proses Vote'});
    const respone = await fetchData('post', `poll/vote/submit`, data, {urlencoded:true});
    if(respone){
        await sleep(100); Swal.close();
        if(respone.type == 'warning' || (respone.success && !respone.data)){
            respone.msg = 'Tidak dapat memproses vote. Muat ulang halaman atau coba beberapa saat lagi';
        }
        if(respone.success){
            respone.title = 'Cek WA kamu sekarang!';
            respone.msg = 'Silahkan lakukan pembayaran dengan link yang di kirimkan ke WA agar vote jagoan kamu bertambah.';
            return respone;
        }
        resAlert({type:respone.type, title:respone.title, text:respone.msg});
        return false;
    }
}

const getHistoryVote = async (slug, params = '') => {
    var setParams = `data=25&not_product=1&${params}`;
    const respone = await fetchData('get', `/poll/vote/transactions/${slug}?${setParams}`);
    if(respone){
        if(respone.success && (!respone.data || !respone.data.length)){
            respone.msg = 'Belum ada riwayat dukungan atau vote';
        }
        return respone;
    }
}

const checkRegisterTransaction = async (data) => {
    loadingAlert({title:'Memeriksa Data'});
    const respone = await fetchData('post', `poll/vote/payment_register`, data, {urlencoded:true});
    if(respone){
        await sleep(100); Swal.close();
        if(respone.type == 'warning' || (respone.success && !respone.data)){
            respone.msg = (respone.msg) ? respone.msg : 'Tidak dapat memuat konfirmasi pembayaran. Muat ulang halaman atau coba beberapa saat lagi';
        }
        return respone;
    }
}

const postRegisterTransaction = async (data) => {
    loadingAlert({title:'Proses Verifikasi'});
    const respone = await fetchData('post', `poll/vote/process_payment_register`, data, {urlencoded:true});
    if(respone){
        await sleep(100); Swal.close();
        if(respone.type == 'warning' || (respone.success && !respone.data)){
            respone.msg = 'Tidak dapat memproses verifikasi. Muat ulang halaman atau coba beberapa saat lagi';
        }else{
            respone.msg = 'Pendaftaran kamu berhasil diproses, silahkan lakukan pembayaran agar akun kamu terverifikasi.';
        }
        return respone;
    }
}

const paymentChannelList = async () => {
    const respone = await fetchData('get', `/poll/vote/payment_channel`);
    if(respone){
        if(respone.success && (!respone.data || !respone.data.length)){
            respone.msg = 'Tidak ada metode pembayaran ditemukan';
        }
        return respone;
    }
}

const getHistoryCustomVote = async (slug, params = '') => {
    var setParams = `data=25&${params}`;
    const respone = await fetchData('get', `/poll/vote/custom_vote/${slug}?${setParams}`);
    if(respone){
        if(respone.success && (!respone.data || !respone.data.length)){
            respone.msg = 'Belum ada riwayat dukungan atau vote lainnya';
        }
        return respone;
    }
}

//============================ RETURN ============================//
export { checkVoteTransaction, postVoteTransaction, getHistoryVote, checkRegisterTransaction, postRegisterTransaction, paymentChannelList, getHistoryCustomVote }
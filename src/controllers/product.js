import { fetchData } from '@/config/api'
import { sleep, confirmAlert, loadingAlert, resAlert, textAlert } from '@/helpers/general'
import { alertNotComplete, validPhoneLength } from '@/helpers/validation'

const getProduct = async (params = '') => {
    var setParams = `status=1&${params}`;
    const respone = await fetchData('get', `poll/product?${setParams}`);
    if(respone){
        if(respone.success && (!respone.data || !respone.data.length)){
            respone.msg = 'Belum ada produk yang tersedia untuk saat ini.';
        }
        return respone;
    }
}

const getDetailProduct = async (productSlug) => {
    const respone = await fetchData('get', `poll/product/detail/${productSlug}`);
    if(respone){
        if(respone.type == 'warning' || (respone.success && !respone.data) || (respone.type == 'success' && !respone.data)){
            respone.msg = 'Produk tidak ditemukan atau sudah tidak tersedia.';
        }
        return respone;
    }
}

const checkProductTransaction = async (data) => {
    loadingAlert({title:'Memeriksa Pembayaran'});
    const respone = await fetchData('post', `poll/product/check_order`, data, {urlencoded:true});
    if(respone){
        await sleep(100); Swal.close();
        if((respone.success && !respone.data) || (respone.type == 'success' && !respone.data)){
            respone.msg = 'Tidak dapat memuat konfirmasi pembayaran. Muat ulang halaman atau coba beberapa saat lagi';
        }
        if(respone.success){
            return respone;
        }
        resAlert({type:respone.type, title:respone.title, text:respone.msg});
        return null;
    }
}

const postProductTransaction = async (data) => {
    if(!data || !data.id || !data.qty || !data.registration_number || !data.payment_method_code || !data.phone_number){
        alertNotComplete('Tidak dapat memproses transaksi. Lengkapi atau periksa kembali data.');
        return false;
    }
    var checkPhone = validPhoneLength(data.phone_number);
    if(!checkPhone){
        alertNotComplete('No telepon konfirmasi tidak sesuai (8-15 number)');
        return false;
    }
    loadingAlert({title:'Proses Transaksi'});
    const respone = await fetchData('post', `poll/product/process_order`, data, {urlencoded:true});
    if(respone){
        await sleep(100); Swal.close();
        if(respone.type == 'warning' || (respone.success && !respone.data)){
            respone.msg = 'Tidak dapat memproses transaksi. Muat ulang halaman atau coba beberapa saat lagi';
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

//============================ RETURN ============================//
export { getProduct, getDetailProduct, checkProductTransaction, postProductTransaction }
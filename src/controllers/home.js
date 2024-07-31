import { fetchData } from '@/config/api'
import session from "@/config/session";
import { sleep, confirmAlert, loadingAlert, resAlert, textAlert } from '@/helpers/general'
import { alertNotComplete, validPhoneLength } from '@/helpers/validation'

const postLogin = async (data = null) => {
    if(!data || !data.phone_number || !data.password){
        alertNotComplete('Lengkapi atau periksa kembali data.');
        return false;
    }
    if(!data.password.length || data.password.length < 6){
        alertNotComplete('Password minimal 6 karakter.');
        return false;
    }
    var checkPhone = validPhoneLength(data.phone_number);
    if(!checkPhone){
        alertNotComplete('No telepon tidak sesuai (8-15 number)');
        return false;
    }
    loadingAlert();
    const respone = await fetchData('post', 'poll/auth/login', data, {urlencoded:true});
    if(respone){
        var result = false;
        if(respone.success){
            var result = (respone.data) ? respone.data : null;
            if(result){
                await session.commit('setUser', result);
                respone.msg = 'Login berhasil';
            }else{
                respone.msg = 'Akun tidak tersedia atau belum terdaftar';
                respone.type = 'warning';
            }
        }
        await sleep(100);
        Swal.close(); resAlert({type:respone.type, title:respone.title, text:respone.msg});
        return result;
    }
}

const logoutUser = async () => {
    return confirmAlert({type:'question',title:'Logout',text:'Yakin ingin keluar member area?', confirmLabel:'Iya, Keluar'}).then( async (result) => {
      if (result.isConfirmed || result.value == true) {
        loadingAlert();
        await session.commit('destroyUser');
        await sleep(500); Swal.close();
        window.location.href = '/';
    }
})
}

const postRegister = async (data = null) => {
    if(!data || !data.phone_number || !data.password){
        alertNotComplete('Lengkapi atau periksa kembali data.');
        return false;
    }
    if(!data.password.length || data.password.length < 6){
        alertNotComplete('Password minimal 6 karakter.');
        return false;
    }
    if(!data.cpassword || data.cpassword != data.password){
        alertNotComplete('Lengkapi atau periksa kembali konfirmasi password.');
        return false;
    }
    var checkPhone = validPhoneLength(data.phone_number);
    if(!checkPhone){
        alertNotComplete('No telepon tidak sesuai (8-15 number)');
        return false;
    }

    loadingAlert();
    const respone = await fetchData('post', 'poll/auth/otp_send', data, {urlencoded:true});
    if(respone){
        Swal.close();
        if(respone.success){
            var msgInfo = `Kode verifikasi telah terkirim ke No. ${data.phone_number}. Silahkan periksa pesan dan masukan kode verifikasi dikolom yang tersedia.`;
            resAlert({type:'info', text:msgInfo, close:true, timer:false});
            return true;
        }
        resAlert({type:respone.type, title:respone.title, text:respone.msg});
        return false;
    }
}

const confirmationRegister = async (data = null) => {
    if(!data || !data.phone_number || !data.password || !data.otp){
        alertNotComplete('Lengkapi atau periksa kembali data.');
        return false;
    }
    if(!data.password.length || data.password.length < 6){
        alertNotComplete('Password minimal 6 karakter.');
        return false;
    }
    if(!data.cpassword || data.cpassword != data.password){
        alertNotComplete('Lengkapi atau periksa kembali konfirmasi password.');
        return false;
    }
    var checkPhone = validPhoneLength(data.phone_number);
    if(!checkPhone){
        alertNotComplete('No telepon tidak sesuai (8-15 number)');
        return false;
    }

    loadingAlert();
    const respone = await fetchData('post', 'poll/auth/otp_submit', data, {urlencoded:true});
    if(respone){
        if(respone.success){
            var result = (respone.data) ? respone.data : null;
            if(result){
                await session.commit('setUser', result);
            }
            respone.msg = 'Pendaftaran berhasil';
        }
        await sleep(100);
        Swal.close(); resAlert({type:respone.type, title:respone.title, text:respone.msg});
        return respone.success;
    }
}

const resetPassword = async (phone_number = null) => {
    if(!phone_number){
        alertNotComplete('Lengkapi nomor whatsapp kamu yang terdaftar untuk menerima kata sandi baru.');
        return false;
    }
    var checkPhone = validPhoneLength(phone_number);
    if(!checkPhone){
        alertNotComplete('Nomor telepon/whatsapp tidak sesuai (8-15 number)');
        return false;
    }
    return confirmAlert({type:'question',title:'Reset Password',text:'Kamu akan mendapatkan pesan yang berisi kata sandi baru, itu artinya kata sandi lama kamu tidak dapat digunakan lagi. Yakin ingin reset kata sandi lama kamu? ', confirmLabel:'Iya, Lanjutkan'}).then( async (result) => {
      if (result.isConfirmed || result.value == true) {
        loadingAlert();
        const respone = await fetchData('post', 'poll/auth/forgot_password', {phone_number:phone_number}, {urlencoded:true});
        if(respone){
            var alertInfo = {type:respone.type, title:respone.title, text:respone.msg};
            if(respone.success){
                alertInfo.text = 'Reset password berhasil dan kata sandi baru telah dikirim. Silahkan periksa pesan di whatsapp kamu dan login menggunakan kata sandi baru.';
                alertInfo.timer = false;
                alertInfo.cancel = true;
                alertInfo.cancelLabel = 'Oke';
            }else{
                alertInfo.text = 'Akun tidak tersedia atau belum terdaftar';
                alertInfo.type = 'warning';
            }
            await sleep(100);
            Swal.close(); resAlert(alertInfo);
            return respone.success;
        }
    }
})
}

//============================ RETURN ============================//
export { postLogin, logoutUser, postRegister, confirmationRegister, resetPassword }
import { fetchData, api_url, api_auth, api_event } from '@/config/api_v2'
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
    var sendData = new FormData();
    sendData.append('phone', data.phone_number);
    sendData.append('password', data.password);

    const respone = await fetchData('post', `user/event/audition-member/login/${api_event}`, sendData);
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
    var sendData = new FormData();
    sendData.append('phone', data.phone_number);
    sendData.append('action', 'register');

    const respone = await fetchData('post', `user/event/send-otp/${api_event}`, sendData);
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

const postMember = async (data = null) => {
    if(!data || !data.phone_number || !data.member_group){
        alertNotComplete('Lengkapi atau periksa kembali data.');
        return false;
    }
    var checkPhone = validPhoneLength(data.phone_number);
    if(!checkPhone){
        alertNotComplete('No telepon tidak sesuai (8-15 number)');
        return false;
    }
    
    loadingAlert();
    var sendData = new FormData();
    sendData.append('phone', data.phone_number);
    sendData.append('action', 'register');

    const respone = await fetchData('post', `user/event/audition-member-child/send-otp/${api_event}/${data.member_id}`, sendData);
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

const confirmationMemberRegister = async (data = null) => {
    if(!data || !data.phone_number || !data.member_group || !data.otp){
        alertNotComplete('Lengkapi atau periksa kembali data.');
        return false;
    }
    var checkPhone = validPhoneLength(data.phone_number);
    if(!checkPhone){
        alertNotComplete('No telepon tidak sesuai (8-15 number)');
        return false;
    }

    loadingAlert();

    var sendData = new FormData();
    sendData.append('name', data.name_member);
    sendData.append('phone', data.phone_number);
    sendData.append('dob', data.birthdate);
    sendData.append('gender', data.gender);
    sendData.append('address', 'indonesia');
    sendData.append('pic', data.img_member);
    sendData.append('code', '');
    sendData.append('otp', data.otp);

    const respone = await fetchData('post', `user/event/audition-member-child/add/${api_event}/${data.member_id}`, sendData);
    if(respone){
        if(respone.success){
            var result = (respone.data) ? respone.data : null;
            // if(result){
            //     await session.commit('setUser', result);
            // }
            respone.msg = 'Pendaftaran berhasil';
        }
        await sleep(100);
        Swal.close(); resAlert({type:respone.type, title:respone.title, text:respone.msg});
        return respone.success;
    }
}

const deleteMember = async (data = null) => {
    if(!data || !data.member_id || !data.child_id){
        alertNotComplete('Gagal menghapus data. Refresh halaman terlebih dulu.');
        return false;
    }
    
    loadingAlert();
    var sendData = new FormData();
    sendData.append('member_id', data.member_id);
    sendData.append('child_id', data.child_id);

    const respone = await fetchData('delete', `user/event/audition-member-child/delete/${api_event}/${data.member_id}/${data.child_id}`, sendData);
    if(respone){
        Swal.close();
            var msgInfo = `Hapus anggota member berhasil.`;
            resAlert({type:'info', text:msgInfo, close:true, timer:false});
            return true;
        }
    resAlert({type:respone.type, title:respone.title, text:respone.msg});
    return false;
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

    var sendData = new FormData();
    sendData.append('phone', data.phone_number);
    sendData.append('password', data.password);
    sendData.append('cpassword', data.cpassword);
    sendData.append('otp', data.otp);
    sendData.append('code', data.code);
    sendData.append('group', 1);

    const respone = await fetchData('post', `user/event/audition-member/add/${api_event}`, sendData);
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
        var sendData = new FormData();
        sendData.append('phone', phone_number);

        const respone = await fetchData('post', `user/event/audition-member/reset-password/${api_event}`, sendData);
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
export { postLogin, logoutUser, postRegister, confirmationRegister, postMember, confirmationMemberRegister, resetPassword, deleteMember }
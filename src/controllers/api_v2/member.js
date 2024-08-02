import { fetchData, api_url, api_auth, api_event } from '@/config/api_v2'
import { sleep, confirmAlert, loadingAlert, resAlert, textAlert } from '@/helpers/general'
import { alertNotComplete, validPhoneLength } from '@/helpers/validation'

const getLevel = async () => {
    const respone = await fetchData('get', `user/event/audition-level/list/${api_event}`);
    if(respone){
        if(respone.success && respone.data){
            return respone.data;
        }
        return null;
    }
}

const getMember = async (params = '') => {
    var setParams = `verified=1&${params}`;
    const respone = await fetchData('get', `user/event/audition-member/list/${api_event}?${setParams}`);
    if(respone){
        if(respone.success && (!respone.data || !respone.data.length)){
            respone.msg = 'Jagoan yang kamu cari tidak ditemukan, belum tersedia atau belum terdaftar';
        }
        return respone;
    }
}

const getDetailMember = async (memberCode) => {
    const respone = await fetchData('get', `user/event/audition-member/detail/${api_event}/${memberCode}`);
    if(respone){
        if(!respone.success){
            respone.msg = 'Jagoan yang kamu cari tidak ditemukan, belum tersedia atau belum terdaftar';
        }
        return respone;
    }
}

const getProfile = async (memberId) => {
	const respone = await fetchData('get', `user/event/audition-member/profile/${api_event}/${memberId}`);
    if(respone){
        return respone;
    }
}

const getMemberChildren = async (memberId) => {
	const respone = await fetchData('get', `user/event/audition-member-child/list/${api_event}/${memberId}`);
    if(respone){
        return respone;
    }
}

const postUpdateProfile = async (memberId, data = null) => {
    loadingAlert();
    const respone = await fetchData('post', `user/event/audition-member/update/${api_event}/${memberId}`, data);
    if(respone){
        await sleep(100); Swal.close();
        if(respone.success){
            respone.msg = 'Profile berhasil diperbarui';
        }
        resAlert({type:respone.type, title:respone.title, text:respone.msg});
        return respone;
    }
}

const postUpdateImage = async (memberId, data = null) => {
    loadingAlert({title:'Update Galeri',text:'Memperbarui galeri image...'});
    const respone = await fetchData('post', `user/event/audition-member/update-image/${api_event}/${memberId}`, data);
    if(respone){
        await sleep(100);
        Swal.close();
        if(!respone.success){
            resAlert({type:respone.type, title:respone.title, text:'Gagal memproses upload galeri image'});
        }
        return respone;
    }
}


//============================ RETURN ============================//
export { getMember, getMemberChildren, getDetailMember, getProfile, postUpdateProfile, postUpdateImage, getLevel }
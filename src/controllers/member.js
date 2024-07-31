import { fetchData } from '@/config/api'
import { sleep, confirmAlert, loadingAlert, resAlert, textAlert } from '@/helpers/general'
import { alertNotComplete, validPhoneLength } from '@/helpers/validation'

const getMember = async (params = '') => {
    var setParams = `status=verified&${params}`;
    const respone = await fetchData('get', `poll/vote/members?${setParams}`);
    if(respone){
        if(respone.success && (!respone.data || !respone.data.length)){
            respone.msg = 'Jagoan yang kamu cari tidak ditemukan, belum tersedia atau belum terdaftar';
        }
        return respone;
    }
}

const getDetailMember = async (slug, params = '') => {
    const respone = await fetchData('get', `poll/vote/detail/${slug}?${params}`);
    if(respone){
        if(respone.type == 'warning' || (respone.success && !respone.data) || (respone.type == 'success' && !respone.data)){
            respone.msg = 'Jagoan yang kamu cari tidak ditemukan, belum tersedia atau belum terdaftar';
        }
        return respone;
    }
}

const getProfile = async (profile = true) => {
	const respone = await fetchData('get', 'poll/me');
    if(respone){
        if(respone.success && profile){
            const checkProfile = await getProfileDetail();
            if(checkProfile){
                respone.profile = (checkProfile.success && checkProfile.data) ? checkProfile.data : null;
            }
        }
        return respone;
    }
}

const getProfileDetail = async () => {
    const respone = await fetchData('get', 'poll/me/profile');
    if(respone){
        return respone;
    }
}

const postUpdateProfile = async (data = null, picProfile = null, picParent = null, picSchool = null, picParentCard = null, formFotos = null) => {
    loadingAlert();
    const respone = await fetchData('post', 'poll/me/profile', data, {urlencoded:true});
    if(respone){
        await sleep(100); Swal.close();
        if(respone.success){
            respone.msg = 'Profile berhasil diperbarui';
            if(picProfile){
                const upProfile = await postUpdateProfilePic(picProfile);
                if(!upProfile){
                   return false;
                }
            }
            if(picParent){
                const upParentDoc = await postUpdateParentDoc(picParent);
                if(!upParentDoc){
                   return false;
                }
            }
            if(picSchool){
                const upSchoolDoc = await postUpdateSchoolDoc(picSchool);
                if(!upSchoolDoc){
                   return false;
                }
            }
            if(picParentCard){
                const upParentPicCard = await postUpdateParentCardPic(picParentCard);
                if(!upParentPicCard){
                   return false;
                }
            }

            if(formFotos){
                const upFotos = await postUpdateImages(formFotos);
                if(!upFotos){
                   return false;
                }
            }
        }
        resAlert({type:respone.type, title:respone.title, text:respone.msg});
        return respone.success;
    }
}
const postUpdateProfilePic = async (data = null) => {
    loadingAlert({title:'Upload Foto Profile',text:'Memproses upload foto profile...'});
    const respone = await fetchData('post', 'poll/me/profile_picture', data);
    if(respone){
        if(!respone.success){
            await sleep(100);
            Swal.close(); resAlert({type:respone.type, title:respone.title, text:'Gagal memproses upload foto profile'});
        }
        return respone.success;
    }
}
const postUpdateParentDoc = async (data = null) => {
    loadingAlert({title:'Upload Surat Keterangan',text:'Memproses upload surat keterangan orang tua...'});
    const respone = await fetchData('post', 'poll/me/parental_certificate', data);
    if(respone){
        if(!respone.success){
            await sleep(100);
            Swal.close(); resAlert({type:respone.type, title:respone.title, text:'Gagal memproses upload surat keterangan orang tua'});
        }
        return respone.success;
    }
}
const postUpdateSchoolDoc = async (data = null) => {
    loadingAlert({title:'Upload Surat Rekomendasi',text:'Memproses upload surat rekomendasi sekolah...'});
    const respone = await fetchData('post', 'poll/me/school_recommendation_letter', data);
    if(respone){
        if(!respone.success){
            await sleep(100);
            Swal.close(); resAlert({type:respone.type, title:respone.title, text:'Gagal memproses upload surat rekomendasi sekolah'});
        }
        return respone.success;
    }
}
const postUpdateParentCardPic = async (data = null) => {
    loadingAlert({title:'Upload KTP',text:'Memproses upload ktp orangtua...'});
    const respone = await fetchData('post', 'poll/me/parent_card_pic', data);
    if(respone){
        if(!respone.success){
            await sleep(100);
            Swal.close(); resAlert({type:respone.type, title:respone.title, text:'Gagal memproses upload ktp orangtua'});
        }
        return respone.success;
    }
}
const postUpdateImages = async (data = null) => {
    loadingAlert({title:'Upload Galeri',text:'Memproses upload galeri image...'});
    const respone = await fetchData('post', 'poll/me/upload_galery', data);
    if(respone){
        if(!respone.success){
            await sleep(100);
            Swal.close(); resAlert({type:respone.type, title:respone.title, text:'Gagal memproses upload galeri image'});
        }
        return respone.success;
    }
}
const postUpdateSingleImage = async (data = null) => {
    loadingAlert({title:'Update Galeri',text:'Memperbarui galeri image...'});
    const respone = await fetchData('post', 'poll/me/upload_single_galery', data);
    if(respone){
        await sleep(100);
        Swal.close();
        if(!respone.success){
            resAlert({type:respone.type, title:respone.title, text:'Gagal memproses upload galeri image'});
        }
        return respone;
    }
}

const getPollSetting = async (params = '') => {
    const respone = await fetchData('get', `poll/me/poll_setting?${params}`);
    if(respone){
        return respone;
    }
}

//============================ RETURN ============================//
export { getMember, getDetailMember, getProfile, getProfileDetail, postUpdateProfile, postUpdateSingleImage, getPollSetting }
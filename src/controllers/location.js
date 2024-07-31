import { fetchData } from '@/config/api'
import { sleep } from '@/helpers/general'

const getProvince = async () => {
	const respone = await fetchData('get', 'tools/location/list_provinsi');
    if(respone){
        return (respone.success && respone.data) ? respone.data : null;
    }
}

const getCity = async (provinceId = null) => {
    if(!provinceId) return null;
    const respone = await fetchData('get', `tools/location/list_kabupaten?id_prov=${provinceId}`);
    if(respone){
        return (respone.success && respone.data) ? respone.data : null;
    }
}

const getDistrict = async (cityId = null) => {
    if(!cityId) return null;
    const respone = await fetchData('get', `tools/location/list_kecamatan?id_kab=${cityId}`);
    if(respone){
        return (respone.success && respone.data) ? respone.data : null;
    }
}

const getSubDistrict = async (districtId = null) => {
    if(!districtId) return null;
    const respone = await fetchData('get', `tools/location/list_kelurahan?id_kec=${districtId}`);
    if(respone){
        return (respone.success && respone.data) ? respone.data : null;
    }
}

const getStoreLocation = async (params = null) => {
    if(!params) return null;
    var setParams = [];
    if(params.q && params.q.length){
        setParams.push(`q=${params.q}`);
    }
    if(params.id_kab){
        setParams.push(`id_kab=${parseInt(params.id_kab)}`);
    }
    if(!setParams || !setParams.length) return null;
    setParams = setParams.join('&');

    const respone = await fetchData('get', `u/store/list_store?${setParams}`);
    if(respone){
        return (respone.success && respone.data) ? respone.data : null;
    }
}

const getStoreGroupLocation = async () => {
    const respone = await fetchData('get', 'u/store/list_store_dpr');
    if(respone){
        return (respone.success && respone.data) ? respone.data : null;
    }
}

const getJneOrigin = async (params = '') => {
    const respone = await fetchData('get', `tools/location/jne_origin?${params}`);
    if(respone){
        return respone;
    }
}

const getJneDestination = async (params = '') => {
    const respone = await fetchData('get', `tools/location/jne_destination?${params}`);
    if(respone){
        return respone;
    }
}

const getJneOngkir = async (from, to, weight = 1000) => {
    const respone = await fetchData('get', `tools/location/jne_ongkir/${from}/${to}/${weight}`);
    if(respone){
        return respone;
    }
}

//============================ RETURN ============================//
export { getProvince, getCity, getDistrict, getSubDistrict, getStoreLocation, getStoreGroupLocation, getJneOrigin, getJneDestination, getJneOngkir }
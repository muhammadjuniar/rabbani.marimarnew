import axios from 'axios'
import qs from 'qs'
import { baseUrl, baseApi, secretStatic, secretUser } from "@/config/authentication";
import { sleep } from "@/helpers/general";

export const api_url_v2 = "http://localhost/sim.event.api";
export const api_auth_v2 = "3ab139e9e6186ed0ed48905e52d2be0cbfaf9abc8ddacc64f691a387d7787cc6";
export const api_event = "2";

function getHeaderData(attribute = null){
  var isSecret = (attribute && attribute.static) ? secretStatic : secretUser;
  var contentType = (attribute && attribute.urlencoded) ? 'application/x-www-form-urlencoded' : '';
  var isHeader = {'X-Token-Secret': isSecret};
  if(contentType){
    isHeader['Content-Type'] = contentType;
  }
  return isHeader;
}

function handleResponeData(respone = null, type = 'error') {
  var msgError = 'Gagal memuat data atau memproses permintaan (periksa juga koneksi internet anda)';
  var msgSuccess = 'Berhasil memuat data atau memproses permintaan';
  var msg = (type == 'success') ? msgSuccess : msgError;

  var data = null, attribute = null, isSuccess = false, title = 'Failed!', reLogin = false;
  if(respone){
    var msg = (respone.msg) ? `${respone.msg}` : ( (type == 'success') ? msgSuccess : msgError );
    if(respone.data){
      var responeData  = respone.data;
      var resultData = (responeData.result) ? responeData.result : responeData;
      if(type == 'error'){
        if(responeData.errors && responeData.errors.length){
          var detailError = responeData.errors[0];
          if(detailError.detail){
            msg = detailError.detail;
            if(msg=='Unauthorized'){
              msg = 'Akses login sudah kadaluarsa atau akun sudah tidak tersedia';
              reLogin = true;
            }
            type = 'warning';
          }
        }
      }else{
        isSuccess = (type == 'success') ? true : false;
        title = (type == 'success') ? 'Success!' : 'Information!';
        data = resultData; attribute = {};
        attribute.count = (responeData.total_data) ? responeData.total_data : ( (resultData.length) ? resultData.length : 0 );
        attribute.limit = (responeData.limit) ? responeData.limit : 20;
      }
    }
  }
  return {success:isSuccess, type:type, title:title, msg:msg, data:data, attribute:attribute, reLogin:reLogin};
}

export async function fetchData(method = 'get', url = '', data = null, attribute = null) {
  if(!url){
    return handleResponeData(null, 'error');
  }
  var setHeader = getHeaderData(attribute);
  var setData  = (attribute && attribute.urlencoded) ? qs.stringify(data) : data;
  await sleep(200);

  var fetchCall = null;
  if(method == 'get'){
    fetchCall = getData(`${url}`, setHeader, setData);
  }else if(method == 'post'){
    fetchCall = postData(`${url}`, setHeader, setData);
  }else if(method == 'del'){
    fetchCall = delData(`${url}`, setHeader, setData);
  }else if(method == 'delete'){
    fetchCall = deleteData(`${url}`, setHeader, setData);
  }

  if(fetchCall){
    return fetchCall.then(respone => {
      const resData = respone.data;
      if(resData.success){
        return handleResponeData(resData, 'success');
      }else{
        return handleResponeData(resData, 'warning');
      }
    }).catch( error => {
      return handleResponeData(error.response, 'error');
    });
  }else{
    return handleResponeData(null, 'error');
  }
}

export function getData(url, header = '', data = null) {
  return axios.get(baseApi+'/'+url, { headers: header });
}

export function postData(url, header = '', data = null) {
  return axios.post(baseApi+'/'+url,  data, { headers: header });
}

export function delData(url, header = '', data = null) {
  return axios.post(baseApi+'/'+url, '', { headers: header });
}

export function deleteData(url, header = '', data = null) {
  let readyData = (data && Object.keys(data).length === 0) ? false : true;
  if(readyData){
    return axios.delete(baseApi+'/'+url, { data: data }, { headers: header });
  }else{
    return axios.delete(baseApi+'/'+url, { headers: header });
  }
}

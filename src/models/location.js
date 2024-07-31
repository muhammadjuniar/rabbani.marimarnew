import { sleep } from '@/helpers/general'
import { getCity, getDistrict, getSubDistrict, getStoreLocation, getStoreGroupLocation } from '@/controllers/location'

async function handleContentLocation(type, status){
	var selectData = document.getElementById(`is-select-${type}`);
	if(selectData){
		if(status == 'enabled'){
			selectData.classList.remove("disabled");
			selectData.removeAttribute('disabled');
		}else{
			selectData.classList.add("disabled");
			selectData.setAttribute('disabled', true);
			if(status == 'cleared'){
				document.querySelectorAll(`#is-select-${type} option`).forEach(e => (e.value) ? e.remove() : null);
			}
		}
	}
}

export async function autoSelectLocation(provinceId = null, cityId = null, districtId = null, subDistrictId = null, store = false, storeId = null){
	if(provinceId && provinceId.length){
		await handleChangeProvince(provinceId, cityId, {store:store});
	}
	sleep(100);
	if(cityId && cityId.length){
		await handleChangeCity(cityId, districtId, {store:store, selectStore:storeId});
	}
	sleep(100);
	if(districtId && districtId.length){
		await handleChangeDistrict(districtId, subDistrictId);
	}
}

export async function handleListLocation(type, data = null, select = null) {
	await sleep(200);
	var forValue = {province:'id',city:'id_kab',district:'id_kec',subdistrict:'id_kel',store:'id'};
	var forLabel = (type == 'province' || type == 'store') ? 'name' : 'nama';

	var selectData = document.getElementById(`is-select-${type}`);
	if(selectData){
		if(data && data.length){
			data.forEach(async (item) => {
				var valItem = item[forValue[`${type}`]];
				var opt = document.createElement('option');
				opt.value = valItem;
				opt.innerHTML = item[`${forLabel}`]; 
				if(select && valItem == select){
					opt.selected = true;
				}
				selectData.appendChild(opt);
			});
		}
		await sleep(100);
		await handleContentLocation(type,'enabled');
	}
};

export async function onChangeLocation(event, type, attribute = {}) {
	event.preventDefault();
	var isValue = event.target.value || '';
	if(type == 'province'){
		return handleChangeProvince(isValue, null, attribute);
	}else if(type == 'city'){
		return handleChangeCity(isValue, null, attribute);
	}else if(type == 'district'){
		return handleChangeDistrict(isValue, null, attribute);
	}else if(type == 'subdistrict'){
		return handleChangeSubDistrict(isValue, null, attribute);
	}
}

export async function handleChangeProvince(value, selectCity = null, attribute = {}) {
	await handleContentLocation('city','cleared');
	await handleContentLocation('district','cleared');
	await handleContentLocation('subdistrict','cleared');
	var handleStore = (attribute && attribute.store) ? true : false;
	if(handleStore){
		await handleContentLocation('store','cleared');
	}

	if(value && value.length){
		await sleep(200);
		const result = await getCity(value);
		if(result){
			await handleListLocation('city', result, selectCity);
		}
	}
};

export async function handleChangeCity(value, selectDistrict = null, attribute = {}) {
	await handleContentLocation('district','cleared');
	await handleContentLocation('subdistrict','cleared');
	var handleStore = (attribute && attribute.store) ? true : false;
	var existStore = (attribute && attribute.selectStore) ? attribute.selectStore : null;
	if(handleStore){
		await handleContentLocation('store','cleared');
	}

	if(value && value.length){
		await sleep(200);
		const result = await getDistrict(value);
		if(result){
			await handleListLocation('district', result, selectDistrict);
		}
		if(handleStore){
			await sleep(100);
			var resultStore = await getStoreLocation({id_kab:value});
			if(!resultStore || !resultStore.length){
				await sleep(100);
				var textProvince = await getTextSelectedLocation('province');
				if(textProvince && textProvince.length){
					resultStore = await getStoreLocation({q:`${textProvince}`});
				}
			}
			if(resultStore){
				await handleListLocation('store', resultStore, existStore);
			}
		}
	}
};

export async function handleChangeDistrict(value, selectSubDistrict = null, attribute = {}) {
	await handleContentLocation('subdistrict','cleared');

	if(value && value.length){
		await sleep(200);
		const result = await getSubDistrict(value);
		if(result){
			await handleListLocation('subdistrict', result, selectSubDistrict);
		}
	}
};

async function getTextSelectedLocation(type = '') {
	var selectData = document.getElementById(`is-select-${type}`) || null;
	if(selectData && selectData.options && selectData.options.length){
		var selectedData = selectData.selectedIndex;
		if(selectedData && selectData.options[selectedData]){
			var selectProvText = selectData.options[selectedData].text || null;
			return (selectProvText) ? `${selectProvText}` : null;
		}
		return null;
	}
	return null;
};

export async function getSelectedLocation(type = null, store = false) {
	var result = {};
	var selectProv = document.getElementById(`is-select-province`) || null;
	result.province = (selectProv && selectProv.value) ? selectProv.value : '';

	var selectCity = document.getElementById(`is-select-city`) || null;
	result.city = (selectCity && selectCity.value) ? selectCity.value : '';

	var selectDistrict = document.getElementById(`is-select-district`) || null;
	result.district = (selectDistrict && selectDistrict.value) ? selectDistrict.value : '';

	var selectSubDistrict = document.getElementById(`is-select-subdistrict`) || null;
	result.subdistrict = (selectSubDistrict && selectSubDistrict.value) ? selectSubDistrict.value : '';

	if(store){
		var selectStore = document.getElementById(`is-select-store`) || null;
		result.store = (selectStore && selectStore.value) ? selectStore.value : '';
	}

	if(type && type.length){
		return (`${type}` in result) ? result[`${type}`] : null;
	}
	return result;
};

export async function resetSelectedLocation(type = null, store = false) {
	var result = {};
	var selectProv = document.getElementById(`is-select-province`) || null;
	if((!type || type == 'province' ) && selectProv && selectProv.value){
		selectProv.value = '';
	}
	var selectCity = document.getElementById(`is-select-city`) || null;
	if((!type || type == 'city' ) && selectCity && selectCity.value){
		selectCity.value = '';
	}
	var selectDistrict = document.getElementById(`is-select-district`) || null;
	if((!type || type == 'district' ) && selectDistrict && selectDistrict.value){
		selectDistrict.value = '';
	}
	var selectSubDistrict = document.getElementById(`is-select-subdistrict`) || null;
	if((!type || type == 'subdistrict' ) && selectSubDistrict && selectSubDistrict.value){
		selectSubDistrict.value = '';
	}
	if(store){
		var selectStore = document.getElementById(`is-select-store`) || null;
		if((!type || type == 'store' ) && selectStore && selectStore.value){
			selectStore.value = '';
		}
	}
	return;
};

export async function handleListStoreGroupLocation(data = null, select = null) {
	await sleep(200);
	var selectData = document.getElementById(`is-select-store`);
	if(selectData){
		if(data && data.length){
			data.forEach(async (item) => {
				if(item.stores && item.stores.length){
					var optgroup = document.createElement('optgroup');
					optgroup.label  = item.provinsi;
					item.stores.forEach(async (str) => {
						var option = document.createElement('option');
						option.value = str.id;
						option.innerHTML = str.name;
						if(select && str.id == select){
							option.selected = true;
						}
						optgroup.appendChild(option);
					});
					selectData.appendChild(optgroup);
				}
			});
		}
		await sleep(100);
		await handleContentLocation('store','enabled');
	}
};
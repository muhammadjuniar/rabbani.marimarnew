export function socialMedia(slug = null) {
	var sosials = ['instagram','tiktok','facebook','twitter','youtube'];
	return (sosials[`${slug}`]) ? sosials[`${slug}`] : sosials;
};

export function getAssetFile(drive, file) {
	return new URL(`../assets/${drive}/${file}`, import.meta.url).href;
};


export function talentList(slug = null) {
	var talents = [
		{
			"key": "dancer",
			"text": "Menari"
		},
		{
			"key": "singer",
			"text": "Menyanyi"
		},
		{
			"key": "acting",
			"text": "Akting/Kabaret"
		},
		{
			"key": "modeling",
			"text": "Modeling"
		},
	];
	return (slug) ? talents.find(item => item['key'] == slug) : talents;
};

export function paymentList() {
	var payments = [
	{
		"code": "OVO",
		"text": "OVO",
		"slug": "ovo",
		"color": "purple",
		"static" : true,
	},
	{
		"code": "SHOPEEPAY",
		"text": "ShopeePay",
		"slug": "shopee-pay",
		"color": "danger",
		"static" : true,
	},
	{
		"code": "QRIS",
		"text": "QRIS by ShopeePay",
		"slug": "qris",
		"color": "pink",
		"static" : true,
	},
	{
		"code": "DANA",
		"text": "DANA",
		"slug": "dana",
		"color": "primary",
		"static" : true,
	},
	];
	return payments;
};

export async function getPaginationData(infoPage = {}){
	var perPage = (!infoPage.limit || parseInt(infoPage.limit) <= 0) ? 20 : parseInt(infoPage.limit);
	var currentPage = (!infoPage.page || parseInt(infoPage.page) <= 0) ? 1 : parseInt(infoPage.page);
	var countData = (!infoPage.count || parseInt(infoPage.count) <= 0) ? 0 : parseInt(infoPage.count);
	var countPage = 1;
	if(countData > perPage){
		countPage = Math.ceil(countData/perPage);
	}
	var lastData = (currentPage*perPage) - perPage;
	var offset = (countData <= perPage) ? 0 : lastData;
	var nextPage = (countPage > currentPage) ? currentPage+1 : 0;
	return {
		perPage: perPage, currentPage: currentPage, countData: countData,
		countPage: countPage, lastData: lastData, offset: offset, nextPage: nextPage
	}
}


export function timelineList2024(){
	var timelines = [
		{type:'left', date:'22 MARET - 14 JUNI 2024', text:'PENDAFTARAN', desc:''},
		{type:'right', date:'15 JUNI 2024', text:'AUDISI TAHAP PENYISIHAN', desc:''},
		{type:'left', date:'22 JUNI 2024', text:'SEMI FINAL', desc:''},
		{type:'right', date:'JULI 2024', text:'FINAL', desc:''},
	];
	return timelines;
}

export function winnerTop2024(slug = null) {
	var winners = [
	{"title": "DPR 2024 Winner","name": "Aisyatuzzahra","school":"SMAN 2 Cimahi, Kota Cimahi","location":"Jawa Barat","social":"","pic":"","color":"winner","bg":"warning"},
	{"title": "DPR 2024 Runner Up 1","name": "Keisya Balqis Azkia","school":"Global Prestasi School","location":"JABODETABEK-Banten","social":"","pic":"","color":"secondary","bg":"purple"},
	{"title": "DPR 2024 Runner Up 2","name": "Nafila Airina Zulya Siregar","school":"SMAN 1 Rantau Selatan","location":"Sumatera Utara","social":"","pic":"","color":"secondary","bg":"pink"},
	{"title": "MPR 2024 Winner","name": "Kesya Nimarla Danuputri","school":"Universitas Negeri Jakarta","location":"JABODETABEK & Banten","social":"","pic":"","color":"info","bg":"cream"},
	{"title": "MPR 2024 Runner Up 1","name": "Nabila Eka Azzahrah","school":"Universitas Islam Indonesia","location":"Jawa Tengah","social":"","pic":"","color":"info","bg":"purple"},
	{"title": "MPR 2024 Runner Up 2","name": "Windita Sipa Alfadila","school":"Universitas Al-Ghifari","location":"Jawa Barat","social":"","pic":"","color":"success","bg":"pink"},
	];
	return winners;
};

export function finaList2024(slug = null) {
	var finalists = winnerTop2024();
	finalists.push({"title": "","name": "","school":"","location":"","social":"","pic":"","color":"secondary","bg":"secondary"});
	return finalists;
};

export function fiturStatus() {
	return {register:true, level:1};
};
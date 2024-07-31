import moment from 'moment'
import "datatables.net/js/jquery.dataTables.mjs";
import $ from "jquery";

export async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
export function external() { console.log('ok'); };
export function createTable(target, option=true, no_sort=[], sort = true){
    $("#"+target).DataTable({
		destroy:true, info:option, lengthChange : false, pageLength: 5, paging:option, searching:option, ordering:sort, aaSorting:[],
		columnDefs:[{ "orderable": false, "targets": no_sort }],
	});
};
export function destroyTable(target){ var table = $('#'+target).DataTable(); table.destroy(); };
export function simpleAlert(text, outsideClose=true){ Swal.fire({title:text, allowOutsideClick: outsideClose, showCloseButton: true }); };
export function showAlert(event={}, outsideClose=false){
	Swal.fire({ icon: event.type, title: event.title, text: event.text, footer: event.footer, showCloseButton: true, allowOutsideClick: outsideClose });
};
export function toastAlert(event={}){
	Swal.fire({
		position: 'top-end', icon: event.type, title: event.title, text: event.text, footer: event.footer, showConfirmButton: false,
		showCloseButton: (event.close) ? event.close : false, allowOutsideClick: true, timer: (event.timer) ? event.timer : 1500
	});
};
export function confirmAlert(event={}, outsideClose=false){
	return Swal.fire({
	  title: event.title, text: event.text, icon: event.type,
	  showCancelButton: ('cancel' in event) ? event.cancel : true, confirmButtonColor: '#3085d6', cancelButtonColor: '#d33',
	  cancelButtonText: (event.cancelLabel) ? event.cancelLabel : 'Batal',
	  confirmButtonText: (event.confirmLabel) ? event.confirmLabel : 'OK',
	  allowOutsideClick:outsideClose,footer: event.footer
	});
};
export function resAlert(event={}, outsideClose=true){
	var isTitle = (event.title) ? `${event.title}` : 'Information!';
	Swal.fire({
		position: 'center', icon: event.type, title: isTitle, text: event.text, showConfirmButton: false, timer: ('timer' in event) ? event.timer : 3000,
		showCloseButton: (event.close) ? true : false, allowOutsideClick: outsideClose, footer:event.footer,
		showCancelButton: (event.cancel) ? true : false, cancelButtonText: (event.cancelLabel) ? event.cancelLabel : 'Batal', cancelButtonColor: '#d33',
	});
};
export function loadingAlert(event={}){
	var textload = (event.text) ? event.text : 'Memproses permintaan...';
	Swal.fire({
		allowOutsideClick:false, title: event.title, html: textload, footer:event.footer, timer: (event.timer) ? event.timer : false, timerProgressBar: true,
		onBeforeOpen: () => { Swal.showLoading(); },
	})
};
export function textAlert(event={}){
	let isText = (event.text) ? event.text : '';
	if(event.type=='new'){
		return `Data ${event.data} baru berhasil dibuat. ${isText}`;
	}else if(event.type=='update'){
		return `Data ${event.data} berhasil diperbarui. ${isText}`;
	}else if(event.type=='delete'){
		return `Data ${event.data} berhasil dihapus. ${isText}`;
	}else if(event.type=='err_respone' || event.type=='warning'){
		return `Gagal memproses data ${event.data}. ${isText}`;
	}else if(event.type=='err_process' || event.type=='error'){
		return `Gagal memproses data ${event.data}. Periksa kembali data yang dikirim atau coba lagi. ${isText}`;
	}else if(event.type=='confirm_delete'){
		return `Yakin ingin hapus data ${event.data} tersebut? ${isText}`;
	}else if(event.type=='success'){
		return `Permintaan ${event.data} berhasil diproses. ${isText}`;
	}else if(event.type=='confirm_copy'){
		return `Yakin ingin duplikasi data ${event.data} tersebut? ${isText}`;
	}else if(event.type=='copy'){
		return `Data ${event.data} berhasil diduplikasi. ${isText}`;
	}
};
export function numberFormat(value, params={}) {
	var isformat = {};
	isformat.currency = { style: 'currency', currency: 'IDR', minimumFractionDigits: 0}
	let options = (params && params.style) ? isformat[params.style] : false;
    var formatter = new Intl.NumberFormat('id-ID', options);
    return formatter.format(value);
};
export function randomString(type='') {
	var characters = 'ABCDEFGHIJKL0123456789MNOPQRSTUVWXYZ';
	if(type=='text'){ characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; }else if(type=='number'){ characters = '0123456789'; }
    var result = [], charactersLength = characters.length;
    for ( var i = 0; i < 5; i++ ) { result.push(characters.charAt(Math.floor(Math.random() * charactersLength))); }
    return result.join('');
};
export function dateFormat(value, format=false, timestamp=false) {
	let isFormat = (format) ? format : 'DD/MM/YYYY hh:mm';
	if(!timestamp){
		return moment(String(value)).format(isFormat)
	}else{
		return moment.unix(String(value)).format(isFormat)
	}
};
export function isValidDate(date) {
	return moment(String(date), "YYYY-MM-DD", true).isValid();
};
export function slcImage(target) {
	$('#'+target).click();
};
export function clrPreviewImage(target) {
	var isTarget = $("#"+target);
	var beforeDisplay = $("#preview-"+target).attr('alt');
	let isDisplay = (beforeDisplay && beforeDisplay.length) ? '<img src="'+beforeDisplay+'"/>' : '<em class="icon ni ni-camera"></em>';
	isTarget.val(''); $('#preview-'+target).html(isDisplay);
	$('#reset-'+target).addClass('hide_element');
}
export function previewImage(target) {
	var thisId = document.getElementById(target);
	if (thisId && thisId.files && thisId.files[0]) {
		var countFile = thisId.files.length, pathFile = thisId.value;
	    if(countFile==0 || pathFile==''){ clrPreviewImage(target); return false; }
	    var sizeFile = $('#'+target)[0].files[0].size, nameFile = $('#'+target)[0].files[0].name;
	    var ext = nameFile.split('.').pop(), ekstensiOk = /(\.jpg|\.jpeg|\.png|\.jfif|\.webp|\.ico|\.bmp)$/i;
	    var sizeKb = sizeFile / 1000, sizeMb = sizeKb / 1000;
		if(!ekstensiOk.exec(pathFile) || sizeMb>5){
			showAlert({type:'warning', title:'Image Not Support', text:'Silakan upload gambar yang memiliki ekstensi (.jpeg/.jpg/.png/.jfif/.webp), Maksimal ukuran 5mb!'});
			clrPreviewImage(target); return false;
		}else{
			var oFReader = new FileReader();
			oFReader.readAsDataURL(thisId.files[0]);
			oFReader.onload = function (oFREvent) {
			  var images = oFREvent.target.result;
			  var isDisplay = '<img src="'+images+'"/>';
			  $('#preview-'+target).html(isDisplay); $('#reset-'+target).removeClass('hide_element');
			};
		}
	}else{
		clrPreviewImage(target);return false;
	}
};
export function popupImage(title, image) { $('#title-popup-image').html(title); $('#content-popup-image').html('<img src="'+image+'"/>'); };
export function popupForm(title, content) {
	$('#title-popup-form').html(title);
	var isContent = '';
	for(var ctn=0; ctn<content.length; ctn++){
		let lblCtn = (content[ctn].title) ? `<label class="form-label mb-0">${content[ctn].title} ${(content[ctn].required) ? '<code>*</code></label>' : ''}` : '';
		let startCtn = (content[ctn].type=='textarea') ? 'textarea' : 'input';
		let endCtn = (content[ctn].type=='textarea') ? '</textarea>' : '';
		var typeInputCtn = `<${startCtn} type="${content[ctn].type}" class="form-control" id="${content[ctn].id}" name="${content[ctn].name}" placeholder="${content[ctn].placeholder}" ${(content[ctn].required) ? 'required' : ''}>${endCtn}`;
		var inputCtn = `<div class="form-group mb-1">${lblCtn}${typeInputCtn}</div>`;
		isContent = isContent+inputCtn;
	}
	$('#content-popup-form').html(isContent);
};
export function closePopup(id) { $('#title-'+id).html(''); $('#content-'+id).html(''); };
export function closeSlcDataList(type){
	var ctnData = $('#ctn-slc-data-'+type), forCountData = $('#cnt-slc-data-'+type), fortextData = $('#slc-data-'+type);
	ctnData.removeClass('active'); forCountData.html(0); fortextData.html('');
	$('#slc-data-'+type+'-all').prop('checked', false); $('.slc-data-'+type).prop('checked', false);
}
export function slcDataList(type, data){
	var ctnData = $('#ctn-slc-data-'+type), forCountData = $('#cnt-slc-data-'+type), fortextData = $('#slc-data-'+type);
	if(data=='close'){
		closeSlcDataList(type); return false;
	}else{
		var isElm = document.getElementById('slc-data-'+type+'-'+data);
		if(!isElm){ return false; }
		if(data=='all'){
			$('.slc-data-'+type).prop('checked', isElm.checked);
			if(!isElm.checked){ closeSlcDataList(type); return false; }
		}
		var chks = document.getElementsByName('data-'+type);
		var results = {data:[], text:[]};
	    for(var i = 0; i < chks.length; i++){
	    	var statSlc = chks[i].checked ? true : false;
	    	if(statSlc){
	    		var isIdData = chks[i].value;
		    	var cekLbl = document.getElementById('label-'+type+'-'+isIdData);
		    	let isLblData = (cekLbl && cekLbl.innerHTML && cekLbl.innerHTML.length) ?  cekLbl.innerHTML : isIdData;
		        results.data.push(isIdData); results.text.push(isLblData);
	    	}
	    }
	    let textSelected = (results.text && results.text.length) ? String(results.text.join(', ')) : 'No data selected.';
	    fortextData.html(textSelected);
	    let statData = (results.data && results.data.length) ? true : false;
	    let countData = (statData) ? results.data.length : 0;
	    forCountData.html(countData);
	    (statData) ? ctnData.addClass('active') : ctnData.removeClass('active');
	    return results;
	}
}
export function syncCountData(attribute={}) {
	const isNewCount = parseInt($('#count-'+attribute.type).attr('alt'))-parseInt(attribute.count);
	$(attribute.elm+'#'+attribute.type+'-'+attribute.id).parent(attribute.parent+'.'+attribute.type+'-list').remove();
	(isNewCount>0) ? $('#count-'+attribute.type).html(numberFormat(isNewCount)).attr('alt', isNewCount) : '';
	return isNewCount;
};
export function woohSelect(elm={}) {
 	if(elm.type=='select' || elm.type=='default'){
		$('#wooh-select-'+elm.data).html(elm.label);
		$('.wooh-select-item-'+elm.data).removeClass('bg-lighter').removeClass('active');
		$('#wooh-select-item-'+elm.data+'-'+elm.id).addClass('bg-lighter').addClass('active');
	}
	if(elm.type!='default'){
		$('#wooh-select-content-'+elm.data).toggleClass('hide_element');
		$('#wooh-select-icon-'+elm.data+' .icon-show').toggleClass('hide_element');
		$('#wooh-select-icon-'+elm.data+' .icon-hide').toggleClass('hide_element');
	}
};
export function showHidePassword(target){
  var value = $('#'+target+' input').val();
  if(value.length==0){$('#'+target+' input').focus();return false;}
  var type = $('#'+target+' input').attr('type');
  if(type=='password'){
    $('#'+target+' input').attr('type', 'text');$('#'+target+' .show_hide_password').html('<em class="passcode-icon icon-show icon ni ni-eye"></em>');
  }else{
    $('#'+target+' input').attr('type', 'password');$('#'+target+' .show_hide_password').html('<em class="passcode-icon icon-show icon ni ni-eye-off"></em>');
  }
};
export function copyData(data) {
    $('#IsCopy').val(data).removeClass('hide_element'); var is = $('#IsCopy').val();
    $("#IsCopy").select().val();
    document.execCommand("copy");
    $('#IsCopy').addClass('hide_element').val('');
    toastAlert({type:'success',title:'Data berhasil disalin'});
};
export function randomColorGenerator () { 
    return '#' + (Math.random().toString(16) + '0000000').slice(2, 8); 
};

export function dynamicColors() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgba(" + r + "," + g + "," + b + ", 0.5)";
}

export function poolColors(a) {
    var pool = [];
    for(var i = 0; i < a; i++) {
        pool.push(dynamicColors());
    }
    return pool;
}

export function hexToRgbColor(hex, alpha) {
   hex   = hex.replace('#', '');
   var r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
   var g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
   var b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
   if ( alpha ) {
      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
   }
   else {
      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
   }
}

export function createDateRange(option = {}){
    var picker = {
		opens: (option.opens) ? option.opens : 'center',
		drops:'auto',
		alwaysShowCalendars:true,
        startDate: option.start,
        endDate: option.end,
        minDate: moment().subtract(89, 'days'),
		maxDate: moment(),
        //minYear:2023,
        //maxYear:'',
        showDropdowns:false,
        dateLimit: {
            month: 1
        },
        maxSpan: {
            days: 90
        },
        autoUpdateInput:false,
        //singleDatePicker:false,
        showDropdowns: false,
        //showWeekNumbers: true,
        timePicker: false,
        timePicker24Hour:false,
        timePickerSeconds:false,
        ranges: {
            'Hari Ini': [moment(), moment()],
            'Kemarin': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            '7 Hari Terakhir': [moment().subtract(6, 'days'), moment()],
            '30 Hari Terakhir': [moment().subtract(29, 'days'), moment()],
            '90 Hari Terakhir': [moment().subtract(89, 'days'), moment()],
            'Bulan Ini': [moment().startOf('month'), moment().endOf('month')],
            'Bulan Lalu': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
        },
        autoApply: false,
        showCustomRangeLabel:false,
        format: 'MM/DD/YYYY',
        separator: ' to ',
        locale: {
            applyLabel: 'Terapkan',
            cancelLabel: 'Batal',
            fromLabel: 'From',
            toLabel: 'To',
            //customRangeLabel: 'Sesuaikan',
            daysOfWeek: ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'],
            monthNames: ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'],
            firstDay: 1
        }
	}
	return picker;
};

export function convertToSlug( strTitle ) {
  var strSlug = strTitle.replace(/[`~!@#$%^&*()_\+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ').toLowerCase();
  strSlug = strSlug.replace(/^\s+|\s+$/gm,'');
  strSlug = strSlug.replace(/\s+/g, '-');   
  return strSlug;
}

export async function initSlickSlider(opt = {}){
	return {
		dots: ('dots' in opt) ? opt.dots : true,
		infinite: ('infinite' in opt) ? opt.infinite : false,
		speed: 300,
		slidesToShow: ('slidesToShow' in opt) ? opt.slidesToShow : 1,
		slidesToScroll: ('slidesToScroll' in opt) ? opt.slidesToScroll : 1,
		adaptiveHeight: true,
		prevArrow: ('prevArrow' in opt) ? opt.prevArrow : '<button type="button" class="slick-custom-arrow slick-prev"><em class="icon ni ni-chevron-left"></em></button>',
		nextArrow: ('nextArrow' in opt) ? opt.nextArrow : '<button type="button" class="slick-custom-arrow slick-next"><em class="icon ni ni-chevron-right"></em></button>'
	};
}

export function hiddenPhoneNumber(phone) {
    phone = phone.toString();
    let start = phone.slice(0, 3);
    let end = 'x'.repeat(phone.length - 3);
    return start + end;
}
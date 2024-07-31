import { showAlert } from './general'

export function alertNotComplete(text='') {	Swal.fire({ icon: 'warning', title: 'Incomplete!', text: text, showCloseButton: true, allowOutsideClick: true }); };
export function validGender(type) { return (type!='male' && type!='female') ? false : type ; };
export function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); }
export function validPhoneLength(nomor) {
	let isNomor = nomor.toString(), regexPhone = /^[0-9]{8,15}$/;
	return (!regexPhone.test(isNomor)) ? false : true;
}; 
export function validPhone(nomor, prefix = '62') {
	let isNomor = nomor.toString(), codePhone = prefix, regexPhone = /^[0-9]{9,14}$/;
	if(!regexPhone.test(isNomor)){ return false; }
	var firstNo = isNomor.substring(0, 1), secondNo = isNomor.substring(0, 2);
  	var firstSecondNo = `${firstNo}${secondNo}`;
  	var setNomor = isNomor;
  	if(firstNo=='0'){ setNomor = isNomor.substring(1); }else if(secondNo==codePhone){ setNomor = isNomor.substring(2); }
	return `${codePhone}${setNomor}`;
};
export function validEmail(email) {
	let regexEmail = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return (!regexEmail.test(email)) ? false : email.toLowerCase();
};
export function validRangeNo(nomor, min=false, max=false) {
	let isMin = (!min) ? 1 : min, isMax = (!max) ? 100: max;
	return (!nomor || nomor.length==0 || nomor<isMin || nomor>isMax) ? false : nomor ;
};

export function validAttachment(type, target, only=false) {
	var thisId = document.getElementById(target);
	var idLabel = $('#label-'+target);
	if (thisId && thisId.files && thisId.files[0]) {
		var countFile = thisId.files.length, pathFile = thisId.value;
	    if(countFile==0 || pathFile==''){ return false; }
	    var sizeFile = $('#'+target)[0].files[0].size, nameFile = $('#'+target)[0].files[0].name;
	    var ekstensiOk = {document:/(\.pdf|\.xls|\.doc|\.xlsx|\.docx|\.txt)$/i, image:/(\.jpg|\.jpeg|\.png|\.jfif|\.webp)$/i};
	    var msgExt = {document:'(.pdf/.xls/.xlsx/.doc/.docx/.txt)', image:'(.jpeg/.jpg/.png/.jfif/.webp)'};

	    var ext = nameFile.split('.').pop();
	    var msgExt = (!only) ? msgExt[type] : only;
	    var sizeKb = sizeFile / 1000, sizeMb = sizeKb / 1000;
	    var isSupport = true, doneValid = true;
	    if(!ekstensiOk[type]){
	    	showAlert({type:'warning', title:'File Not Support', text:'File yang dipilih tidak sesuai.'});
	    	isSupport = false; doneValid = false;
	    }else{
	    	if(only){
		    	if(ext!=only){ isSupport = false; }
		    }else{
		    	if(!ekstensiOk[type].exec(pathFile)){ isSupport = false; }
		    }
		    if(!isSupport){
		    	showAlert({type:'warning', title:'File Not Support', text:'Silakan upload file yang memiliki ekstensi '+msgExt+', Maksimal ukuran 100mb!'}); doneValid = false;
		    }
		    if(sizeMb>100){
		    	showAlert({type:'warning', title:'Size Not Support', text:'Silakan upload file dengan maksimal ukuran 100mb!'}); doneValid = false;
		    }
	    }
	    var setLabel = doneValid ? nameFile : idLabel.attr('alt');
	    idLabel.html(setLabel);
	    if(!doneValid){ $('#'+target).val(''); } return doneValid;
	}else{ idLabel.html(idLabel.attr('alt')); return false; }
};

export function validAttachmentMulti(type, target, only=false) {
	var thisId = document.getElementById(target);
	var idLabel = $('#label-'+target);
	if (thisId && thisId.files && thisId.files[0]) {
		var countFile = thisId.files.length, pathFile = thisId.value;
	    if(countFile==0 || pathFile==''){ return false; }

	    var ekstensiOk = {document:/(\.pdf|\.xls|\.doc|\.xlsx|\.docx|\.txt)$/i, image:/(\.jpg|\.jpeg|\.png|\.jfif|\.webp)$/i};
	    var msgExt = {document:'(.pdf/.xls/.xlsx/.doc/.docx/.txt)', image:'(.jpeg/.jpg/.png/.jfif/.webp)'};
	    var msgExt = (!only) ? msgExt[type] : only;
	    var isSupport = true, doneValid = true;
	    var isName = [];
	    for(let x=0;x<countFile;x++){
	    	var sizeFile = $('#'+target)[0].files[x].size, nameFile = $('#'+target)[0].files[x].name;
	    	if(x==0){
	    		pathFile = pathFile.replace(nameFile, '');
	    	}
	    	pathFile = pathFile+nameFile;
		    var ext = nameFile.split('.').pop(), sizeKb = sizeFile / 1000, sizeMb = sizeKb / 1000;
		    if(!ekstensiOk[type]){
		    	showAlert({type:'warning', title:'File Not Support', text:'File ('+nameFile+') yang dipilih tidak sesuai.'});
		    	isSupport = false; doneValid = false;
		    	break;
		    }else{
		    	if(only){
			    	if(ext!=only){ isSupport = false; }
			    }else{
			    	if(!ekstensiOk[type].exec(pathFile)){ isSupport = false; }
			    }
			    if(!isSupport){
			    	showAlert({type:'warning', title:'File Not Support', text:'Jenis file ('+nameFile+') tidak sesuai. Silakan upload file yang memiliki ekstensi '+msgExt+', Maksimal ukuran 100mb!'}); doneValid = false;
			    	break;
			    }
			    if(sizeMb>100){
			    	showAlert({type:'warning', title:'Size Not Support', text:'Ukuran file ('+nameFile+') tidak sesuai. Silakan upload file dengan maksimal ukuran 100mb!'}); doneValid = false;
			    	break;
			    }
		    }
		    isName.push(nameFile);
	    }
	    var setLabel = doneValid ? isName.join(',') : idLabel.attr('alt');
	    idLabel.html(setLabel);
	    if(!doneValid){ $('#'+target).val(''); } return doneValid;
	}else{ idLabel.html(idLabel.attr('alt')); return false; }
};
export function numbersOnly(evt) {
  let char = String.fromCharCode(evt.keyCode);
  if(isNumber(char)) return true;
  evt.preventDefault();
}
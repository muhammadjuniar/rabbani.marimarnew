import { sleep, resAlert } from '@/helpers/general'

export async function getFileUpload(_target){
	var fileElm = document.getElementById(`${_target}`) || null;
	if(fileElm){
		var _files = fileElm.files;
		var _filesPath = fileElm.value;
		if(_target && _target.length && _files && _files.length && _filesPath && _filesPath.length){
			return _files[0];
		}
	}
	return null;
}

async function getFileSize(file){
	var _sizeByte = file.size;
	var _sizeKByte = _sizeByte / 1000;
	var _sizeMByte = _sizeKByte / 1000;
	return {b: _sizeByte, kb: _sizeKByte, mb: _sizeMByte};
}

async function checkFileExtention(file, type = null){
	if(!type || !type.length || type == null){
		return false;
	}
	var imageExt = ["webp","png","jpg","jpeg","gif","jfif","bmp","ico"];
    var videoExt = ["webm","mp4","ogv"];
    var audioExt = ["mp3","mpeg"];
    var documentExt = ["txt","pdf","docx","xlsx"];
    var listExt = {image: imageExt, video: videoExt, audio: audioExt, document: documentExt};

    var fileName = file.name;
    var fileExt = fileName.split('.');
    fileExt = fileExt[fileExt.length - 1];
    fileExt = fileExt.toLowerCase();

    return (listExt[`${type}`].includes(`${fileExt}`)) ? true : false;
}

export async function onSelectImage(_target){
	var fileElm = document.getElementById(`file-select-image-${_target}`);
	if(fileElm){
		fileElm.click();
	}
}
export async function onResetImage(_target){
	var fileElm = document.getElementById(`file-select-image-${_target}`);
	_handleDisplayManageFoto(fileElm, _target, 'none');
}

export async function onChangeSelectImage(event, _target) {
	event.preventDefault();
	await sleep(200);
	var _files = event.target.files;
	var _filesPath = event.target.value;
	if(_target && _target.length && _files && _files.length && _filesPath && _filesPath.length){
		var _file = _files[0];
		var _size = await getFileSize(_file);
		var _checkExt = await checkFileExtention(_file, 'image');
		if(!_checkExt || _size.mb > 5){
			await resAlert({type:'warning', text:'File not support (hanya diperbolehkan file image dengan ukuran maksimal 5mb)'});
			_handleDisplayManageFoto(event.target, _target, 'none');
			return false;
		}
		var oFReader = new FileReader();
		oFReader.readAsDataURL(_file);
		oFReader.onload = function (oFREvent) {
			var preview = oFREvent.target.result;
			var previewLm = document.getElementById(`preview-select-image-${_target}`);
			if(previewLm){
				previewLm.src = preview;
			}
			_handleDisplayManageFoto(event.target, _target, 'select');
		};
	}else{
		_handleDisplayManageFoto(event.target, _target, 'none');
	}
};

function _handleDisplayManageFoto(isFile, target, action){
	var removeActionElm = document.getElementById(`action-reset-select-image-${target}`);
	var removeInner = document.querySelector(`#action-reset-select-image-${target} .reset-select-image`);
	var previewLm = document.getElementById(`preview-select-image-${target}`);
	if(removeActionElm){
		if(action == 'select'){
			removeActionElm.classList.add('is-select');
			removeActionElm.classList.remove('none-select');
			removeInner.classList.remove('disabled');
			removeInner.removeAttribute('disabled');
		}else{
			removeActionElm.classList.add('none-select');
			removeActionElm.classList.remove('is-select');
			removeInner.classList.add('disabled');
			removeInner.setAttribute('disabled', true);

			if(previewLm){
				var _defaultImg = previewLm.getAttribute("default");
				previewLm.src = _defaultImg;
			}
			isFile.value = null;
		}
	}
}
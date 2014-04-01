/**
 * jQuery ddUrl Plugin
 * @version 1.1 (2012-09-05)
 * 
 * @desc Библиотека для работы с URL.
 * 
 * @uses jQuery 1.7.2
 * 
 * @copyright 2012, DivanDesign
 * http://www.DivanDesign.biz
 */

(function($){
$.ddUrl = {
	current: {},
	
	get: function(url){
		//Если url не передан
		if ($.type(url) != 'string'){
			//Берём за основу текущий урл
			return this.current;
		}
		
		var regResult = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(decodeURI(url)),
			result = {
				//Полный адрес (обработаем позже)
				full: '',
				//Протокол
				protocol: regResult[1] || window.location.protocol.replace(':', ''),
				//Хост
				host: regResult[6] || '',
				//Порт
				port: regResult[7] || '',
				//Относительный адрес (без протокола, хоста и порта)
				relative: regResult[8],
				//Путь (без протокола, хоста, порта и всех параметров)
				path: regResult[9],
				//Get-Параметры
				query: regResult[12] || '',
				//Хэш
				hash: regResult[13] || '',
				//Внутренняя ли это ссылка
				internal: false
			};
		
		//Если хост не пустой
		if (result.host != ''){
			//Но при этом инвалидный (не содержит доменное окончание) (относительная ссылка без «/» в начале)
			if (result.host.search(/\.[^\.]+/) == -1){
				//Добавим несчастному слэш в начале
				result.relative = '/' + result.host + result.relative;
				//Сбросим хост, ибо это внутренняя ссылка
				result.host = window.location.hostname;
			}
		}else{
			//Выставим текущий хост, ибо это внутренняя ссылка
			result.host = window.location.hostname;
		}
		
		//Если мы находимся в текущем домене, то это внутренняя ссылка
		if (result.host == window.location.hostname) result.internal = true;
		
		//Полный урл
		result.full = result.protocol + '://' + result.host + (result.port != '' ? ':' + result.port : '') + result.relative;
		
		return result;
	}
};

//Распарсим один раз текущий url
$.ddUrl.current = $.ddUrl.get(window.location.toString());
})(jQuery);
/**
 * jQuery ddUrl Plugin
 * @version 1.2 (2014-04-02)
 * 
 * @desc Библиотека для работы с URL.
 * 
 * @uses jQuery 1.7.2
 * 
 * @copyright 2014, DivanDesign
 * http://www.DivanDesign.biz
 */

(function($){
$.ddUrl = {
	current: {},
	
	/**
	 * parseQuery
	 * @version 1.0 (2014-04-02)
	 * 
	 * @desc Разбивает строку запроса в объект.
	 * 
	 * @param query {string} - Строка запроса. @required
	 * 
	 * @return {plain object}
	 */
	parseQuery: function(query){
		var result = {};
		
		//Если что-то вообще передали
		if (query.length > 0){
			//Разбиваем по паре ключ-значение
			query = query.split('&');
			
			for (var i = 0; i < query.length; i++){
				var elem = query[i].split('=');
				
				result[elem[0]] = elem[1] || '';
			}
		}
		
		return result;
	},
	
	/**
	 * parse
	 * @version 1.1 (2014-04-02)
	 * 
	 * @desc Разбивает строку url в объект.
	 * 
	 * @param url {string} - Строка url. Default: window.location.toString().
	 * 
	 * @return {plain object}
	 */
	parse: function(url){
		var _this = this;
		
		//Если url не передан
		if ($.type(url) != 'string'){
			//Берём за основу текущий урл
			url = window.location.toString();
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
				query: _this.parseQuery(regResult[12] || ''),
				//Хэш
				hash: _this.parseQuery(regResult[13] || ''),
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
$.ddUrl.current = $.ddUrl.parse();
})(jQuery);
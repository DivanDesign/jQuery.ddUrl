/**
 * jQuery ddUrl Plugin
 * @version 1.4 (2015-04-27)
 * 
 * @desc Библиотека для работы с URL.
 * 
 * @uses jQuery 1.7.2
 * 
 * @copyright 2015, DivanDesign
 * http://www.DivanDesign.biz
 */

(function($){
$.ddUrl = {
	current: {},
	
	/**
	 * parseQuery
	 * @version 1.2 (2015-04-26)
	 * 
	 * @desc Разбивает строку запроса в объект. Поддерживаются также конструкции вида «param[key][]=1».
	 * 
	 * @param query {string} - Строка запроса. @required
	 * 
	 * @return {plain object}
	 */
	parseQuery: function(query){
		/**
		 * @desc Устанавливает значение необходимому элементу объекта с проверкой на массив.
		 * 
		 * @param obj {plain object} - Исходный объект. @required
		 * @param key {string} - Ключ. @required
		 * @param value {mixed} - Значение. @required
		 * 
		 * @return {void}
		 */
		function setValue(obj, key, value){
			//Если элемент существует и является массивом
			if ($.isArray(obj[key])){
				//Докидываем значение
				obj[key].push(value);
			}else{
				//Просто присваиваем
				obj[key] = value;
			}
		}
		
		/**
		 * @desc Копирует все элементы массива в простой объект, сохраняя числовые ключи.
		 * 
		 * @param arr {array} - Исходный массив. @required
		 * 
		 * @return {plain object}
		 */
		function arrayToObject(arr){
			var result = {};
			
			//Перебираем элементы элемента и закидываем в объект
			$.each(arr, function(key, val){
				result[key] = val;
			});
			
			return result;
		}
		
		/**
		 * @desc Рекурсивно разбирает «сложный» ключ и присваивает значение необходимому элементу объекта.
		 * 
		 * @param keyParts {array} - Части ключа (ключ, разбитый по '['). @required
		 * @param obj {plain object} - Самый главный результирующий объект. @required
		 * @param key {string} - Ключ элемента, которому необходимо присвоить значение. @required
		 * @param value {mixed} - Значение. @required
		 * 
		 * @return {void}
		 */
		function parseQueryItem(keyParts, obj, key, value){
			//Самый первый возможный ключ (помним, что из массива он вырезается)
			var keyParts_first = keyParts.shift();
			
			//Если сегментов ключа больше нет (значит всё уже разобрали, осталось только присвоить значение)
			if (!keyParts_first){
				//Присваиваем
				setValue(obj, key, value);
			}else{
				//Если такого элемента нет, определим по дефолту как массив
				if (!obj[key]){obj[key] = [];}
				
				//Если ключ пустой (был равен «[]», но после разбиения осталась только закрывающая скобка)
				if (keyParts_first == ']'){
					//Присваиваем значение
					setValue(obj, key, value);
				//Самый обычный ключ
				}else{
					//Если в ключе есть закрывающая скобка (в самом конце)
					if (keyParts_first.indexOf(']') != -1){
						//Обрезаем её (последний символ)
						keyParts_first = keyParts_first.substr(0, keyParts_first.length - 1);
					}
					
					//Ключ не числовой, но элемент является массивом, надо преобразовать массив в объект с числовыми ключами
					if (!$.isNumeric(keyParts_first) && $.isArray(obj[key])){
						//Преобразовываем массив в объект
						obj[key] = arrayToObject(obj[key]);
					}
					
					//Помним, что keyParts уже не содержит первого элемента
					parseQueryItem(keyParts, obj[key], keyParts_first, value);
				}
			}
		}
		
		//Дополнительная обёртка необходима для удобства при рекурсивном разборе «сложного» ключа
		var result = {result: {}};
		
		//Если что-то вообще передали
		if (query.length > 0){
			//Разбиваем по паре ключ-значение
			query = query.split('&');
			
			for (var i = 0; i < query.length; i++){
				var elem = query[i].split('='),
					key = elem[0],
					value = elem[1] || '';
				
				//Если это обычный ключ
				if (key.indexOf('[') == -1){
					//Просто установим значение
					setValue(result.result, key, value);
				}else{
					parseQueryItem(key.split('['), result, 'result', value);
				}
			}
		}
		
		return result.result;
	},
	
	/**
	 * parse
	 * @version 1.2 (2014-12-28)
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
				//Get-параметры в виде объекта
				query: _this.parseQuery(regResult[12] || ''),
				//Get-параметры в виде строки
				queryString: regResult[12] || '',
				//Хэш в виде объекта
				hash: _this.parseQuery(regResult[13] || ''),
				//Хэш в виде строки
				hashString: regResult[13] || '',
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
		if (result.host == window.location.hostname){result.internal = true;}
		
		//Полный урл
		result.full = result.protocol + '://' + result.host + (result.port != '' ? ':' + result.port : '') + result.relative;
		
		return result;
	}
};

//Распарсим один раз текущий url
$.ddUrl.current = $.ddUrl.parse();
})(jQuery);
/**
 * jQuery.ddUrl
 * @version 2.0 (2020-11-30)
 * 
 * @see README.md
 * 
 * @copyright 2012–2020 [DD Group]{@link https://DivanDesign.biz }
 */

(function($){
$.ddUrl = {
	current: {},
	
	/**
	 * @method parseQuery
	 * @version 1.2.3 (2022-12-08)
	 */
	parseQuery: function(query){
		/**
		 * @desc Устанавливает значение необходимому элементу объекта с проверкой на массив.
		 * 
		 * @param obj {objectPlain} — Исходный объект.
		 * @param key {string} — Ключ.
		 * @param value {mixed} — Значение.
		 * 
		 * @returns {void}
		 */
		function setValue(
			obj,
			key,
			value
		){
			//Если элемент существует и является массивом
			if (Array.isArray(obj[key])){
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
		 * @param arr {array} — Исходный массив.
		 * 
		 * @returns {objectPlain}
		 */
		function arrayToObject(arr){
			var result = {};
			
			//Перебираем элементы элемента и закидываем в объект
			arr.forEach(
				([
					key,
					val
				]) =>
				{
					result[key] = val;
				}
			);

			return result;
		}
		
		/**
		 * @desc Рекурсивно разбирает «сложный» ключ и присваивает значение необходимому элементу объекта.
		 * 
		 * @param keyParts {array} — Части ключа (ключ, разбитый по '[').
		 * @param obj {objectPlain} — Самый главный результирующий объект.
		 * @param key {string} — Ключ элемента, которому необходимо присвоить значение.
		 * @param value {mixed} — Значение.
		 * 
		 * @returns {void}
		 */
		function parseQueryItem(
			keyParts,
			obj,
			key,
			value
		){
			//Самый первый возможный ключ (помним, что из массива он вырезается)
			var keyParts_first = keyParts.shift();
			
			//Если сегментов ключа больше нет (значит всё уже разобрали, осталось только присвоить значение)
			if (!keyParts_first){
				//Присваиваем
				setValue(
					obj,
					key,
					value
				);
			}else{
				//Если такого элемента нет, определим по дефолту как массив
				if (!obj[key]){
					obj[key] = [];
				}
				
				//Если ключ пустой (был равен «[]», но после разбиения осталась только закрывающая скобка)
				if (keyParts_first == ']'){
					//Присваиваем значение
					setValue(
						obj,
						key,
						value
					);
				//Самый обычный ключ
				}else{
					//Если в ключе есть закрывающая скобка (в самом конце)
					if (keyParts_first.indexOf(']') != -1){
						//Обрезаем её (последний символ)
						keyParts_first = keyParts_first.substr(
							0,
							keyParts_first.length - 1
						);
					}
					
					//Ключ не числовой, но элемент является массивом, надо преобразовать массив в объект с числовыми ключами
					if (
						!$.isNumeric(keyParts_first) &&
						Array.isArray(obj[key])
					){
						//Преобразовываем массив в объект
						obj[key] = arrayToObject(obj[key]);
					}
					
					//Помним, что keyParts уже не содержит первого элемента
					parseQueryItem(
						keyParts,
						obj[key],
						keyParts_first,
						value
					);
				}
			}
		}
		
		var
			//Дополнительная обёртка необходима для удобства при рекурсивном разборе «сложного» ключа
			result = {
				result: {}
			}
		;
		
		//Если что-то вообще передали
		if (query.length > 0){
			//Разбиваем по паре ключ-значение
			query = query.split('&');
			
			for (
				var i = 0;
				i < query.length;
				i++
			){
				var
					elem = query[i].split('='),
					key = elem[0],
					value =
						elem[1] ||
						''
				;
				
				//Если это обычный ключ
				if (key.indexOf('[') == -1){
					//Просто установим значение
					setValue(
						result.result,
						key,
						value
					);
				}else{
					parseQueryItem(
						key.split('['),
						result,
						'result',
						value
					);
				}
			}
		}
		
		return result.result;
	},
	
	/**
	 * @method parsePath
	 * @version 1.0 (2020-11-29)
	 */
	parsePath: function(path){
		var result = [];
		
		path = path.split('/');
		
		for (
			var i = 0;
			i < path.length;
			i++
		){
			var elem = $.trim(path[i]);
			
			if(elem.length != 0){
				//Просто установим значение
				result.push(elem);
			}
		}
		
		return result;
	},
	
	/**
	 * @method parse
	 * @version 2.0.1 (2022-12-08)
	 */
	parse: function(url){
		var _this = this;
		
		//Если url не передан
		if (typeof url != 'string'){
			//Берём за основу текущий урл
			url = window.location.toString();
		}
		
		var
			regResult = /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(decodeURI(url)),
			result = {
				//Полный адрес (обработаем позже)
				full: '',
				//Протокол
				protocol:
					regResult[1] ||
					window.location.protocol.replace(
						':',
						''
					)
				,
				//Хост
				host:
					regResult[6] ||
					''
				,
				//Порт
				port:
					regResult[7] ||
					''
				,
				//Относительный адрес (без протокола, хоста и порта)
				relative: regResult[8],
				//Путь (без протокола, хоста, порта и всех параметров)
				path: regResult[9],
				
				//Get-параметры в виде строки
				queryString:
					regResult[12] ||
					''
				,
				//Get-параметры в виде объекта
				queryObject: _this.parseQuery(
					regResult[12] ||
					''
				),
				
				//Хэш в виде строки
				hashString:
					regResult[13] ||
					''
				,
				//Хэш в виде объекта
				hashObject: {},
				//Путь в хеше
				hashPath: [],
				
				//Внутренняя ли это ссылка
				isInternal: false
			}
		;
		
		//Если хэш не пустой
		if (result.hashString.length > 0){
			//в хеше содержится путь (domain.com/#/section)
			if(result.hashString.charAt(0) == '/') {
				result.hashPath = _this.parsePath(result.hashString);
			}else{
				//Значит там query string
				result.hashObject = _this.parseQuery(result.hashString);
			}
		}
		
		//Если хост не пустой
		if (result.host != ''){
			//Но при этом инвалидный (не содержит доменное окончание) (относительная ссылка без «/» в начале)
			if (result.host.search(/\.[^\.]+/) == -1){
				//Добавим несчастному слэш в начале
				result.relative =
					'/' +
					result.host +
					result.relative
				;
				//Сбросим хост, ибо это внутренняя ссылка
				result.host = window.location.hostname;
			}
		}else{
			//Выставим текущий хост, ибо это внутренняя ссылка
			result.host = window.location.hostname;
		}
		
		//Если мы находимся в текущем домене, то это внутренняя ссылка
		if (result.host == window.location.hostname){
			result.isInternal = true;
		}
		
		//Полный урл
		result.full =
			result.protocol +
			'://' +
			result.host +
			(
				result.port != '' ?
				(
					':' +
					result.port
				) :
				''
			) +
			result.relative
		;
		
		return result;
	}
};

//Распарсим один раз текущий url
$.ddUrl.current = $.ddUrl.parse();

//On document.ready
$(function(){
	//При изменении url (кнопки «Назад» и пр.)
	(
		(
			$.ddTools &&
			$.ddTools.$window
		) ||
		$(window)
	).on(
		'popstate',
		function(event){
			//Распарсим текущий url
			$.ddUrl.current = $.ddUrl.parse();
		}
	);
});
})(jQuery);
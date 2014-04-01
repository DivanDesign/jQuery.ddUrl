/**
 * jQuery ddUrl Plugin
 * @version 1.0b (2012-06-18)
 * 
 * @desc Библиотека для работы с URL.
 * 
 * @uses jQuery 1.7.2
 * @uses $.url 2.0
 * 
 * @copyright 2012, DivanDesign
 * http://www.DivanDesign.biz
 */

(function($){
$.ddUrl = {
	host: $.url().attr('host'),
	
	get: function(url){
		var _this = this;
		
		//Если url не передан
		if ($.type(url) != 'string'){
			//Берём за основу текущий урл
			url = $.url();
		}else{
			//Пытаемся получить урл
			url = $.url(url);
		}
		
		var result = {
			host: url.attr('host'),
			url: url.attr('relative'),
			full: '',
			internal: false
		};
		
		//Если хост не пустой
		if (result.host != ''){
			//Но при этом инвалидный (не содержит доменное окончание) (относительная ссылка без «/» в начале)
			if (result.host.search(/\.[^\.]+/) == -1){
				//Добавим несчастному слэш в начале
				result.url = '/' + result.host + result.url;
				//Сбросим хост, ибо это внутренняя ссылка
				result.host = _this.host;
			}
		}else{
			//Выставим текущий хост, ибо это внутренняя ссылка
			result.host = _this.host;
		}
		
		//Если мы находимся в текущем домене, то это внутренняя ссылка
		if (result.host == _this.host) result.internal = true;
		
//		result.url = $.url(result.url).attr('relative');
		result.full = (url.attr('protocol') || 'http') + '://' + result.host + result.url;
		
		return result;
	}
};
})(jQuery);
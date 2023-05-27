# jQuery.ddUrl

Библиотека для работы с URL.


## Использует

* [jQuery](https://jquery.com/) >= 1.7.2


## Usage


### 1. Подключаем JS на странице

```html
<!-- Необходимые библиотеки -->
<script src="jQuery-1.7.2.min.js"></script>

<!-- jQuery.ddUrl -->
<script src="jQuery.ddUrl-2.0.min.js"></script>
```


### 2. Используем методы и свойства библиотеки

```js
console.log($.ddUrl.current);
```


## Описание параметров


### `jQuery.ddUrl.current`

* `jQuery.ddUrl.current`
	* Описание: Всегда содержит актуальные данные об URL текущей страницы.
	* Допустимые значения: `objectPlain`
	
* `jQuery.ddUrl.current.full`
	* Описание: Полный URL.
	* Допустимые значения: `string`
	
* `jQuery.ddUrl.current.protocol`
	* Описание: Протокол.  
		Например, `'http'`, `'https'`.
	* Допустимые значения: `string`
	
* `jQuery.ddUrl.current.host`
	* Описание: Имя домена.  
		Например, `'example.com'`, `'subdomain.example.com'`.
	* Допустимые значения: `string`
	
* `jQuery.ddUrl.current.port`
	* Описание: Порт.
	* Допустимые значения:
		* `string`
		* `''`
	
* `jQuery.ddUrl.current.relative`
	* Описание: Относительный путь (всё за исключением протокола, хоста и порта).
	* Допустимые значения:
		* `string`
		* `''`
	
* `jQuery.ddUrl.current.path`
	* Описание: Только путь (всё за исключением протокола, хоста, порта, query и hash).
	* Допустимые значения:
		* `string`
		* `''`
	
* `jQuery.ddUrl.current.queryString`
	* Описание: Query-параметры в виде строки.  
		Например, `'param1=value1&param2=value2'`.
	* Допустимые значения:
		* `string`
		* `''`
	
* `jQuery.ddUrl.current.queryObject`
	* Описание: Query-параметры в виде объекта.  
		Например, `{param1: 'value1', param2: 'value2'}`.
	* Допустимые значения:
		* `objectPlain`
		* `{}`
	
* `jQuery.ddUrl.current.queryObject[$paramName]`
	* Описание: Параметр, где ключ — имя параметра, значение — значение.
	* Допустимые значения: `mixed`
	
* `jQuery.ddUrl.current.hashString`
	* Описание: Hash в виде строки.  
		Например, `'param1=value1&param2=value2'`.
	* Допустимые значения:
		* `string`
		* `''`
	
* `jQuery.ddUrl.current.hashObject`
	* Описание: Hash-параметры в виде объекта, если hash задан, как [query string](https://en.wikipedia.org/wiki/Query_string).  
		Например, `{param1: 'value1', param2: 'value2'}`).
	* Допустимые значения:
		* `objectPlain`
		* `{}`
	
* `jQuery.ddUrl.current.hashObject[$paramName]`
	* Описание: Параметр, где ключ — имя параметра, значение — значение.
	* Допустимые значения: `mixed`
	
* `jQuery.ddUrl.current.hashPath`
	* Описание: Hash-путь в виде массива (если URL вроде такого `'https://example.com#/some/path'`).
	* Допустимые значения:
		* `array`
		* `[]`
	
* `jQuery.ddUrl.current.hashPath[i]`
	* Описание: Элемент пути.
	* Допустимые значения: `string`
	
* `jQuery.ddUrl.current.isInternal`
	* Описание: Принадлежит ли URL к текущему домену (всегда равен `true` в объекте `jQuery.ddUrl.current`)?
	* Допустимые значения: `boolean`


### `jQuery.ddUrl.parse(url)`

Парсит строку URL в объект.

* `url`
	* Описание: URL для парсинга.  
		Например, `https://example.com/page?param1=value1/#filter[availiable]=1`.
	* Допустимые значения: `string`
	* Значение по умолчанию: `window.location.toString()` (URL текущей страницы)


#### Вовзращает

* `result`
	* Описание: Вовзращает объект с такими же свойствами, как `jQuery.ddUrl.current`.
	* Допустимые значения: `objectPlain`


### `jQuery.ddUrl.parseQuery(query)`

Парсит [Query string](https://en.wikipedia.org/wiki/Query_string) в объект.

* `query`
	* Описание: Query string для парсинга.  
		Например, `param1=value1&param2=value2`.
	* Допустимые значения: `string`
	* **Обязателен**


#### Вовзращает

* `result`
	* Допустимые значения: `objectPlain`


### `jQuery.ddUrl.parsePath(path)`

Парсит строку пути в массив. Все элементы будут триммингованы :D, пустые элементы будут удалены.

* `path`
	* Описание: Строка пути для парсинга.
	* Допустимые значения: `string`
	* **Обязателен**


#### Вовзращает

* `result`
	* Допустимые значения: `array`
	
* `result[i]`
	* Допустимые значения: `string`


## Ссылки

* [Telegram chat](https://t.me/dd_code)
* [GitHub](https://github.com/DivanDesign/jQuery.ddUrl)


<link rel="stylesheet" type="text/css" href="https://raw.githack.com/DivanDesign/CSS.ddMarkdown/master/style.min.css" />
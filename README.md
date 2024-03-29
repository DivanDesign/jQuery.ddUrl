# jQuery.ddUrl

The library for working with URLs.


## Requires

* [jQuery](https://jquery.com/) >= 3.5 (not tested with older versions)


## Usage


### 1. Include JS on page

```html
<!-- Required libs -->
<script src="jQuery-3.5.0.min.js"></script>

<!-- jQuery.ddUrl -->
<script src="jQuery.ddUrl-2.1.1.min.js"></script>
```


### 2. Use library methods and fields

```js
console.log($.ddUrl.current);
```


## Parameters description


### `jQuery.ddUrl.current`

* `jQuery.ddUrl.current`
	* Desctription: Always contains actual data about current page URL.
	* Valid values: `objectPlain`
	
* `jQuery.ddUrl.current.full`
	* Desctription: Full URL.
	* Valid values: `string`
	
* `jQuery.ddUrl.current.protocol`
	* Desctription: Protocol.  
		E. g. `'http'`, `'https'`.
	* Valid values: `string`
	
* `jQuery.ddUrl.current.host`
	* Desctription: Domain name.  
		E. g. `'example.com'`, `'subdomain.example.com'`.
	* Valid values: `string`
	
* `jQuery.ddUrl.current.port`
	* Desctription: Port.
	* Valid values:
		* `string`
		* `''`
	
* `jQuery.ddUrl.current.origin`
	* Desctription: Origin (protocol, host and port together).  
		E. g. `'https://example.com:443'`.
	* Valid values: `string`
	
* `jQuery.ddUrl.current.relative`
	* Desctription: Relative path (all except origin).
	* Valid values:
		* `string`
		* `''`
	
* `jQuery.ddUrl.current.path`
	* Desctription: Path only (all except origin, query and hash).
	* Valid values:
		* `string`
		* `''`
	
* `jQuery.ddUrl.current.queryString`
	* Desctription: Query parameters as string.  
		E. g. `'param1=value1&param2=value2'`.
	* Valid values:
		* `string`
		* `''`
	
* `jQuery.ddUrl.current.queryObject`
	* Desctription: Query parameters as object.  
		E. g. `{param1: 'value1', param2: 'value2'}`.
	* Valid values:
		* `objectPlain`
		* `{}`
	
* `jQuery.ddUrl.current.queryObject[$paramName]`
	* Desctription: Parameter, when key is parameter name, value is parameter value.
	* Valid values: `mixed`
	
* `jQuery.ddUrl.current.hashString`
	* Desctription: Hash as string.  
		E. g. `'param1=value1&param2=value2'`.
	* Valid values:
		* `string`
		* `''`
	
* `jQuery.ddUrl.current.hashObject`
	* Desctription: Hash parameters as object if hash is set as [query string](https://en.wikipedia.org/wiki/Query_string).  
		E. g. `{param1: 'value1', param2: 'value2'}`).
	* Valid values:
		* `objectPlain`
		* `{}`
	
* `jQuery.ddUrl.current.hashObject[$paramName]`
	* Desctription: Parameter, when key is parameter name, value is parameter value.
	* Valid values: `mixed`
	
* `jQuery.ddUrl.current.hashPath`
	* Desctription: Hash path as array (if URL is set as something like `'https://example.com#/some/path'`).
	* Valid values:
		* `array`
		* `[]`
	
* `jQuery.ddUrl.current.hashPath[i]`
	* Desctription: Path item.
	* Valid values: `string`
	
* `jQuery.ddUrl.current.isInternal`
	* Desctription: Does the URL refer to the current domain (always equal to `true` in the `jQuery.ddUrl.current` object)?
	* Valid values: `boolean`


### `jQuery.ddUrl.parse(url)`

Parse an URL string to an object.

* `url`
	* Desctription: URL to parse.  
		E. g. `https://example.com/page?param1=value1/#filter[availiable]=1`.
	* Valid values: `string`
	* Default value: `window.location.toString()` (current page URL)


#### Returns

* `result`
	* Desctription: Returns an object with the same fields as `jQuery.ddUrl.current`.
	* Valid values: `objectPlain`


### `jQuery.ddUrl.parseQuery(query)`

Parse a [Query string](https://en.wikipedia.org/wiki/Query_string) to an object.

* `query`
	* Desctription: Query string to parse.  
		E. g. `param1=value1&param2=value2`.
	* Valid values: `string`
	* **Required**


#### Returns

* `result`
	* Valid values: `objectPlain`


### `jQuery.ddUrl.parsePath(path)`

Parse a path string to an array. All items will be trimmed, empty items will be removed.

* `path`
	* Desctription: Path string to parse.
	* Valid values: `string`
	* **Required**


#### Returns

* `result`
	* Valid values: `array`
	
* `result[i]`
	* Valid values: `string`


## Links

* [Telegram chat](https://t.me/dd_code)
* [GitHub](https://github.com/DivanDesign/jQuery.ddUrl)


<link rel="stylesheet" type="text/css" href="https://raw.githack.com/DivanDesign/CSS.ddMarkdown/master/style.min.css" />
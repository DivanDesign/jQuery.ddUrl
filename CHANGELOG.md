# jQuery.ddUrl changelog


## Version 2.1.1 (2023-10-05)
* \* `jQuery.ddUrl.parse` → Result → `result.path`: Will be fixed the same way as `result.relative` if URL is set as relative without `'/'` at the beginning.


## Version 2.1 (2023-05-27)
* \+ `jQuery.ddUrl.current.origin`: The new property. Contains origin (protocol, host and port together), e. g. `'https://example.com:443'`.
* \+ README_ru.
* \* jQuery >= 3.5 is required because the library is not tested with older versions.


## Version 2.0 (2020-11-30)
* \* Attention! Backward compatibility is broken.
* \* `jQuery.ddUrl.current` (and the same results of `jQuery.ddUrl.parse`):
	* \* The following fields were renamed:
		* \* `query` → `queryObject`.
		* \* `hash` → `hashObject`.
		* \* `internal` → `isInternal`.
	* \+ `hashPath`: The new field. Contains hash path as array (if URL is set as something like `'https://example.com#/some/path'`).
* \+ `jQuery.ddUrl.parsePath`: The new method. Parses a path string to an array.
* \* File names refactoring.
* \+ README:
	* \+ Requires.
	* \+ Documentation.
	* \+ Links.
	* \+ Style improvements.
* \+ CHANGELOG.


## Version 1.0b (2012-06-18)
* \+ The first release.


<link rel="stylesheet" type="text/css" href="https://raw.githack.com/DivanDesign/CSS.ddMarkdown/master/style.min.css" />
<style>ul{list-style:none;}</style>
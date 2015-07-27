# jQuery.ddUrl
Библиотека для работы с URL.

## Changelog
### Версия 1.5 (2015-07-27)
* \* Метод «$.ddUrl.parse» обновлён до 1.2.1:
	* \* Хэш, как query string обрабатывается только если не содержит путь («domain.com/#/section»), т.е., не начинается с символа «/».
* \+ При изменении URL (событие «popstate» у «$.ddTools.$window») обновляется текущий URL в поле «$.ddUrl.current», таким образом это поле всегда содержит объект актуального URL страницы.

### Версия 1.4 (2015-04-27)
* \* Метод «$.ddUrl.parseQuery» обновлён до 1.2:
	* \+ Добавлена поддержка объектов, в т.ч. и вложенных (конструкции вида «param[key][]=1»).
	* \* Улучшена работа с массивами (раньше не поддерживались вложенные).

### Версия 1.3 (2015-03-24)
* \* Метод «$.ddUrl.parseQuery» обновлён до 1.1:
	* \+ Добавлена поддержка массивов в строке запроса («param[]=1&param[]=2»).

### Версия 1.2.1 (2014-12-28)
* \* Метод «$.ddUrl.parse» обновлён до 1.2:
	* \+ К результату добавлены поля «queryString» и «hashString», содержащие строковые представления get-параметров и хэша соответственно.

### Версия 1.2 (2014-04-02)
* \+ Добавлен метод «$.ddUrl.parseQuery». Разбивает строку запроса в объект.
* \* Метод «$.ddUrl.get» переименован в «$.ddUrl.parse».
* \* Метод «$.ddUrl.parse» обновлён до 1.1:
	* \* Поля «query» и «hash» обрабатываются методом «$.ddUrl.parseQuery».

### Версия 1.1.1 (2012-09-17)
* \* При вызове метода «$.ddUrl.get» без параметров url каждый раз пересчитывается заново.

### Версия 1.1 (2012-09-05)
* \* Библиотека «$.url» больше не используется, url разбирается по регулярке.
* \- Удалено поле «$.ddTools.host».
* \+ Добавлено поле «$.ddTools.current», содержащее текущий разобранный адрес.

### Версия 1.0b (2012-06-18)
* \+ Первая версия.

<style>ul{list-style:none;}</style>
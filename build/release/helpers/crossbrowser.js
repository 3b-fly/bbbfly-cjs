/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/

var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.checkStringArgs=function(a,c,b){if(null==a)throw new TypeError("The 'this' value for String.prototype."+b+" must not be null or undefined");if(c instanceof RegExp)throw new TypeError("First argument to String.prototype."+b+" must not be a regular expression");return a+""};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,c,b){a!=Array.prototype&&a!=Object.prototype&&(a[c]=b.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,c,b,d){if(c){b=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in b||(b[e]={});b=b[e]}a=a[a.length-1];d=b[a];c=c(d);c!=d&&null!=c&&$jscomp.defineProperty(b,a,{configurable:!0,writable:!0,value:c})}};
$jscomp.polyfill("String.prototype.repeat",function(a){return a?a:function(a){var b=$jscomp.checkStringArgs(this,null,"repeat");if(0>a||1342177279<a)throw new RangeError("Invalid count value");a|=0;for(var c="";a;)if(a&1&&(c+=b),a>>>=1)b+=b;return c}},"es6","es3");"function"!==typeof Boolean.isBoolean&&(Boolean.isBoolean=function(a){return"boolean"===typeof a});"function"!==typeof String.isString&&(String.isString=function(a){return"string"===typeof a});
String.trim=function(a){return"string"===typeof a?a.replace(/^\s+|\s+$/g,""):""};"function"!==typeof String.capitalize&&(String.capitalize=function(a){return"string"===typeof a?a.charAt(0).toUpperCase()+a.slice(1):""});"function"!==typeof String.repeat&&(String.repeat=function(a,c){var b="";if("string"===typeof a&&"number"===typeof c)for(;0<c;c--)b+=a;return b});
"function"!==typeof String.leading&&(String.leading=function(a,c,b){var d="";a="string"===typeof a?a:"";"string"===typeof c&&"number"===typeof b&&(d=String.repeat(c,b-a.length));return d+a});"function"!==typeof Object.isObject&&(Object.isObject=function(a){return"[object Object]"===Object.prototype.toString.call(a)});"function"!==typeof Object.includes&&(Object.includes=function(a,c){if(Object.isObject(a))for(var b in a)if(a[b]===c)return!0;return!1});
"function"!==typeof Array.isArray&&(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)});"function"!==typeof Array.indexOf&&(Array.indexOf=function(a,c){if(Array.isArray(a))for(var b in a)if(a[b]===c)return b;return-1});"function"!==typeof Array.includes&&(Array.includes=function(a,c){return-1<Array.indexOf(a,c)});"function"!==typeof Date.isDate&&(Date.isDate=function(a){return"[object Date]"===Object.prototype.toString.call(a)});
"function"!==typeof Number.isNumber&&(Number.isNumber=function(a){return"number"===typeof a&&!isNaN(a)});"function"!==typeof Number.isInteger&&(Number.isInteger=function(a){return Number.isNumber(a)&&0===a%1});"function"!==typeof Function.isFunction&&(Function.isFunction=function(a){return"function"===typeof a});

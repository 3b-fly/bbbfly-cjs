/**
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
 */
var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.checkStringArgs=function(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};
$jscomp.polyfill("String.prototype.repeat",function(a){return a?a:function(a){var c=$jscomp.checkStringArgs(this,null,"repeat");if(0>a||1342177279<a)throw new RangeError("Invalid count value");a|=0;for(var b="";a;)if(a&1&&(b+=c),a>>>=1)c+=c;return b}},"es6","es3");"function"!==typeof String.prototype.trim&&(String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g,"")});
"function"!==typeof String.prototype.capitalize&&(String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)});"function"!==typeof String.prototype.repeat&&(String.prototype.repeat=function(a){var b="";if("number"===typeof a)for(var c=this.valueOf();0<a;a--)b+=c;return b});"function"!==typeof String.prototype.leading&&(String.prototype.leading=function(a,b){var c="",d=this.valueOf();"string"===typeof a&&"number"===typeof b&&(c=a.repeat(b-d.length));return c+d});
"function"!==typeof Array.prototype.includes&&(Array.prototype.includes=function(a){for(var b in this)if(this[b]===a)return!0;return!1});"function"!==typeof Object.isObject&&(Object.isObject=function(a){return"[object Object]"===Object.prototype.toString.call(a)});"function"!==typeof Date.isDate&&(Date.isDate=function(a){return"[object Date]"===Object.prototype.toString.call(a)});"function"!==typeof Array.isArray&&(Array.isArray=function(a){return"[object Array]"===Object.prototype.toString.call(a)});

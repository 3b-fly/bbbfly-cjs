/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/

var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Object.is",function(a){return a?a:function(a,c){return a===c?0!==a||1/a===1/c:a!==a&&c!==c}},"es6","es3");
$jscomp.polyfill("Array.prototype.includes",function(a){return a?a:function(a,c){var b=this;b instanceof String&&(b=String(b));var e=b.length;for(c=c||0;c<e;c++)if(b[c]==a||Object.is(b[c],a))return!0;return!1}},"es7","es3");
$jscomp.checkStringArgs=function(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""};$jscomp.polyfill("String.prototype.includes",function(a){return a?a:function(a,c){return-1!==$jscomp.checkStringArgs(this,a,"includes").indexOf(a,c||0)}},"es6","es3");var bbbfly=bbbfly||{};bbbfly.listener={_initialized:!1};
bbbfly.listener.Initialize=function(){this._initialized||(ngOnControlCreated=ngAddEvent(ngOnControlCreated,function(a){bbbfly.listener.SetListenable(a)}),this._initialized=!0)};
bbbfly.listener.SetListenable=function(a,b){"undefined"===typeof a.AllowListeners&&(a.AllowListeners=!1);return a&&"object"===typeof a&&(b||a.AllowListeners)&&!a._listeners?(a._listeners=[],a.AddListener=ngAddEvent(a.AddListener,bbbfly.listener._addListener),a.RemoveListener=ngAddEvent(a.RemoveListener,bbbfly.listener._removeListener),!0):!1};
bbbfly.listener._addListener=function(a,b){if("object"!==typeof a||!a||"object"!==typeof b||!b)return!1;for(var c in a){var d=a[c];if(!String.isString(d)||!Function.isFunction(b[d])||!Function.isFunction(this[d])&&this[d])return!1}for(var e in a)d=a[e],c=this._listeners[d],Array.isArray(c)||(bbbfly.listener._doAddListener(this,d),c=this._listeners[d]),Array.includes(c,b)||c.push(b);return!0};
bbbfly.listener._removeListener=function(a,b){if("object"!==typeof a||!a||"object"!==typeof b||!b)return!1;for(var c in a){var d=this._listeners[a[c]];if(Array.isArray(d))for(var e in d)if(d[e]===b){d.splice(e,1);break}}return!0};bbbfly.listener._doAddListener=function(a,b){a._listeners[b]=[];a[b]=ngAddEvent(a[b],function(){var a=this._listeners[b];if(Array.isArray(a))for(var d in a){var e=a[d];Function.isFunction(e[b])&&e[b].apply(e,arguments?arguments:[])}return!0})};

/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.1
 * @license see license in 'LICENSE' file
*/

var bbbfly=bbbfly||{};bbbfly.appindex={};bbbfly.appindex._addURLVersion=function(a){if(!String.isString(a))return"";var b=ngDEBUG?Date.now():ngVERSION;return a+(-1===a.indexOf("?")?"?":"&")+"app_v="+(b?b:"")};
bbbfly.appindex._initIndex=function(){if("object"===typeof ngAppFiles)for(var a in ngAppFiles)ngAppFiles[a]=this.AddURLVersion(ngAppFiles[a]);if("object"===typeof ngAppDeviceFiles)for(var b in ngAppDeviceFiles)if("object"===typeof ngAppDeviceFiles[b])for(a in ngAppDeviceFiles[b])ngAppDeviceFiles[b][a]=this.AddURLVersion(ngAppDeviceFiles[b][a])};
bbbfly.appindex._requireLeaveDialog=function(a){Boolean.isBoolean(a)||(a=!0);var b=bbbfly.appindex._leaveDialog;a?window.attachEvent?window.attachEvent("onbeforeunload",b):window.onbeforeunload=b:window.detachEvent?window.detachEvent("onbeforeunload",b):window.onbeforeunload=null};bbbfly.appindex._leaveDialog=function(){return ngTxt("bbbfly_app_index_leave")};
bbbfly.appindex._allowSelfLinks=function(a){Boolean.isBoolean(a)||(a=!0);var b=bbbfly.appindex._onclick;a?window.detachEvent?window.detachEvent("onclick",b):window.onclick=null:window.attachEvent?window.attachEvent("onclick",b):window.onclick=b};
bbbfly.appindex._onclick=function(a){a||(a=window.event);var b=a.target||a.srcElement;if("A"===b.tagName){a=b.getAttribute("href");var c=b.getAttribute("target");b=b.getAttribute("location");String.isString(a)&&("#"===a.substring(0,1)?"_system"!==c&&(c="_self"):"_system"!==c?c="_blank":"null"===b&&(b="location=no"),window.open(a,c,b));return!1}};
bbbfly.AppIndex={AddURLVersion:bbbfly.appindex._addURLVersion,InitIndex:bbbfly.appindex._initIndex,RequireLeaveDialog:bbbfly.appindex._requireLeaveDialog,AllowSelfLinks:bbbfly.appindex._allowSelfLinks};

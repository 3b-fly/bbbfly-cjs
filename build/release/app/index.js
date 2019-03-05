/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/

var bbbfly=bbbfly||{};bbbfly.appindex={};bbbfly.appindex._addURLVersion=function(a){if(!String.isString(a))return"";var b=ngDEBUG?Date.now():ngVERSION;return a+(-1===a.indexOf("?")?"?":"&")+"v="+(b?b:"")};
bbbfly.appindex._initIndex=function(){if("object"===typeof ngAppFiles)for(var a in ngAppFiles)ngAppFiles[a]=this.AddURLVersion(ngAppFiles[a]);if("object"===typeof ngAppDeviceFiles)for(var b in ngAppDeviceFiles)if("object"===typeof ngAppDeviceFiles[b])for(a in ngAppDeviceFiles[b])ngAppDeviceFiles[b][a]=this.AddURLVersion(ngAppDeviceFiles[b][a])};
bbbfly.appindex._requireLeaveDialog=function(a){Boolean.isBoolean(a)||(a=!0);a?window.attachEvent?window.attachEvent("onbeforeunload",bbbfly.appindex._leaveDialog):window.onbeforeunload=bbbfly.appindex._leaveDialog:window.detachEvent?window.detachEvent("onbeforeunload",bbbfly.appindex._leaveDialog):window.onbeforeunload=null};bbbfly.appindex._leaveDialog=function(){return ngTxt("bbbfly_app_index_leave")};
bbbfly.AppIndex={AddURLVersion:bbbfly.appindex._addURLVersion,InitIndex:bbbfly.appindex._initIndex,RequireLeaveDialog:bbbfly.appindex._requireLeaveDialog};

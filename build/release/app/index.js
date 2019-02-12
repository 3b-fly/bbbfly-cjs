/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/

var bbbfly=bbbfly||{};bbbfly.appindex={};bbbfly.appindex._addTimestampToURL=function(a){return String.isString(a)?a+(-1===a.indexOf("?")?"?":"&")+"ts="+Date.now():""};bbbfly.appindex._initIndex=function(){if(ngDEBUG){if("object"===typeof ngAppFiles)for(var a in ngAppFiles)ngAppFiles[a]=this.AddTimestampToURL(ngAppFiles[a]);if("object"===typeof ngAppDeviceFiles)for(var b in ngAppDeviceFiles)if("object"===typeof ngAppDeviceFiles[b])for(a in ngAppDeviceFiles[b])ngAppDeviceFiles[b][a]=this.AddTimestampToURL(ngAppDeviceFiles[b][a])}};
bbbfly.appindex._requireLeaveDialog=function(a){Boolean.isBoolean(a)||(a=!0);a?window.attachEvent?window.attachEvent("onbeforeunload",bbbfly.appindex._leaveDialog):window.onbeforeunload=bbbfly.appindex._leaveDialog:window.detachEvent?window.detachEvent("onbeforeunload",bbbfly.appindex._leaveDialog):window.onbeforeunload=null};bbbfly.appindex._leaveDialog=function(){return ngTxt("bbbfly_app_index_leave")};
bbbfly.AppIndex={AddTimestampToURL:bbbfly.appindex._addTimestampToURL,InitIndex:bbbfly.appindex._initIndex,RequireLeaveDialog:bbbfly.appindex._requireLeaveDialog};

/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/

var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Number.isFinite",function(a){return a?a:function(a){return"number"!==typeof a?!1:!isNaN(a)&&Infinity!==a&&-Infinity!==a}},"es6","es3");
$jscomp.polyfill("Number.isInteger",function(a){return a?a:function(a){return Number.isFinite(a)?a===Math.floor(a):!1}},"es6","es3");var bbbfly=bbbfly||{};bbbfly.auth={};bbbfly.auth._setMethod=function(a){if(!Number.isInteger(a))return!1;for(var b in bbbfly.Auth.method)if(bbbfly.Auth.method[b]===a)return this.Method=a,!0;return!1};bbbfly.auth._getMethod=function(){return Number.isInteger(this.Method)?this.Method:bbbfly.Auth.method.none};
bbbfly.auth._setUserData=function(a){if(Object.isObject(a)&&String.isString(a.Id)&&""!==a.Id&&String.isString(a.Name)&&""!==a.Name&&String.isString(a.IPAddr)&&""!==a.IPAddr)return a=ng_CopyVar(a),String.isString(a.SurName)&&""!==a.SurName||(a.SurName=null),String.isString(a.PhoneNumber)&&""!==a.PhoneNumber||(a.PhoneNumber=null),this.UserData=a,!0;this.UserData=null;return!1};bbbfly.auth._getUserData=function(){return Object.isObject(this.UserData)?this.UserData:null};
bbbfly.auth._setData=function(a){Object.isObject(a)&&(this.SetMethod(a.Method),this.SetUserData(a.UserData))};bbbfly.auth._init=function(){this.SetData(bbbfly.AuthData)};bbbfly.Auth={Method:null,UserData:null,SetMethod:bbbfly.auth._setMethod,GetMethod:bbbfly.auth._getMethod,SetUserData:bbbfly.auth._setUserData,GetUserData:bbbfly.auth._getUserData,SetData:bbbfly.auth._setData,Init:bbbfly.auth._init};bbbfly.Auth.method={none:0,basic:1};bbbfly.Auth.Init();

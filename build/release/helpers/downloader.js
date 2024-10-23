/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.1
 * @license see license in 'LICENSE' file
*/

var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Number.isFinite",function(a){return a?a:function(a){return"number"!==typeof a?!1:!isNaN(a)&&Infinity!==a&&-Infinity!==a}},"es6","es3");
$jscomp.polyfill("Number.isInteger",function(a){return a?a:function(a){return Number.isFinite(a)?a===Math.floor(a):!1}},"es6","es3");var bbbfly=bbbfly||{};bbbfly.downloader={};bbbfly.downloader._setMethod=function(a){if(!Number.isInteger(a))return!1;for(var b in bbbfly.Downloader.method)if(bbbfly.Downloader.method[b]===a)return this.Method=a,!0;return!1};bbbfly.downloader._getMethod=function(){return Number.isInteger(this.Method)?this.Method:bbbfly.Downloader.method.auto};
bbbfly.downloader._download=function(a){var b=this.GetMethod();b===bbbfly.Downloader.method.auto&&(b=bbbfly.downloader._detectMethod());switch(b){case bbbfly.Downloader.method.iframe:return bbbfly.downloader._downloadByIframe(this,a)}return!1};bbbfly.downloader._detectMethod=function(){return bbbfly.Downloader.method.iframe};
bbbfly.downloader._downloadByIframe=function(a,b){if(!a._Iframe){var c=document.createElement("iframe");c.style.width="0px";c.style.height="0px";c.style.frameborder="0";c.style.visible="none";a._Iframe=document.body.appendChild(c)}a._Iframe.src=b;return!0};bbbfly.Downloader={Method:0,_Iframe:null,SetMethod:bbbfly.downloader._setMethod,GetMethod:bbbfly.downloader._getMethod,Download:bbbfly.downloader._download};bbbfly.Downloader.method={auto:0,iframe:1};

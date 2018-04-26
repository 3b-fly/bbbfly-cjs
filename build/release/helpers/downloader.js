/**
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE_GPLv3_with_commercial_exception' file
 */
var bbbfly=bbbfly||{};bbbfly.downloader={};bbbfly.downloader._setMethod=function(a){if("number"!==typeof a)return!1;for(var b in bbbfly.Downloader.method)if(bbbfly.Downloader.method[b]===a)return this.Method=a,!0;return!1};bbbfly.downloader._getMethod=function(){return"number"===typeof this.Method?this.Method:bbbfly.Downloader.method.auto};
bbbfly.downloader._download=function(a){var b=this.GetMethod();b===bbbfly.Downloader.method.auto&&(b=bbbfly.downloader._detectMethod());switch(b){case bbbfly.Downloader.method.iframe:return bbbfly.downloader._downloadByIframe(this,a)}return!1};bbbfly.downloader._detectMethod=function(){return bbbfly.Downloader.method.iframe};
bbbfly.downloader._downloadByIframe=function(a,b){if(!a._Iframe){var c=document.createElement("iframe");c.style.width="0px";c.style.height="0px";c.style.frameborder="0";c.style.visible="none";a._Iframe=document.body.appendChild(c)}a._Iframe.src=b;return!0};bbbfly.Downloader={Method:0,_Iframe:null,SetMethod:bbbfly.downloader._setMethod,GetMethod:bbbfly.downloader._getMethod,Download:bbbfly.downloader._download};bbbfly.Downloader.method={auto:0,iframe:1};

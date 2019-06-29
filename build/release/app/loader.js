/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/

var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Number.isFinite",function(a){return a?a:function(a){return"number"!==typeof a?!1:!isNaN(a)&&Infinity!==a&&-Infinity!==a}},"es6","es3");
$jscomp.polyfill("Number.isInteger",function(a){return a?a:function(a){return Number.isFinite(a)?a===Math.floor(a):!1}},"es6","es3");var bbbfly=bbbfly||{};bbbfly.apploader={};bbbfly.apploader._getElm=function(a){if("string"!==typeof a||""===a)return null;var b=this._Elms[a];b||(b=document.getElementById(a),this._Elms[a]=b);return b};bbbfly.apploader._setProgressMessage=function(a){var b=this.GetElm(bbbfly.AppLoader.eml.loadMessage);return b&&String.isString(a)?(b.innerHTML=a,!0):!1};
bbbfly.apploader._setProgress=function(a){if(!Number.isNumber(a))return!1;this._Progress=a;setTimeout(function(){bbbfly.AppLoader.UpdateProgress()},1);return!0};bbbfly.apploader._getProgress=function(){return Number.isNumber(this._Progress)?this._Progress:0};bbbfly.apploader._clearProgress=function(){this._Step=0;this.SetProgress(0)};bbbfly.apploader._updateProgress=function(){var a=this.GetElm(bbbfly.AppLoader.eml.loadProgress);if(!a)return!1;a.style.width=this.GetProgress()+"%";return!0};
bbbfly.apploader._setStepsCnt=function(a){if(!Number.isInteger(a))return!1;this._StepsCnt=a;this._StepSize=Math.floor(100/a);return!0};bbbfly.apploader._moveByStep=function(){if(!Number.isInteger(this._Step)||!Number.isInteger(this._StepSize))return!1;this._Step++;return this.SetProgress(this._Step*this._StepSize)};
bbbfly.apploader._fail=function(){this._Failed=!0;var a=this.GetElm(bbbfly.AppLoader.eml.error);if(!a)return!1;var b=this.GetElm(bbbfly.AppLoader.eml.load);b&&(b.style.display="none");a.style.display="block";return!0};bbbfly.apploader._hide=function(){var a=this.GetElm(bbbfly.AppLoader.eml.loader);if(this._Failed||!a)return!1;""!==a.className&&(a.className+=" ");a.className+="bbbflyAppLoaderFinished";return!0};
bbbfly.AppLoader={_Progress:0,_StepsCnt:0,_StepSize:0,_Step:0,_Elms:{},_Failed:!1,GetElm:bbbfly.apploader._getElm,SetProgressMessage:bbbfly.apploader._setProgressMessage,SetProgress:bbbfly.apploader._setProgress,GetProgress:bbbfly.apploader._getProgress,ClearProgress:bbbfly.apploader._clearProgress,UpdateProgress:bbbfly.apploader._updateProgress,SetStepsCount:bbbfly.apploader._setStepsCnt,MoveByStep:bbbfly.apploader._moveByStep,Fail:bbbfly.apploader._fail,Hide:bbbfly.apploader._hide};
bbbfly.AppLoader.eml={loader:"bbbflyAppLoader",load:"bbbflyAppLoaderLoad",loadBar:"bbbflyAppLoaderLoadBar",loadProgress:"bbbflyAppLoaderLoadProgress",loadMessage:"bbbflyAppLoaderLoadMessage",error:"bbbflyAppLoaderError",errorMessage:"bbbflyAppLoaderErrorMessage",errorReload:"bbbflyAppLoaderErrorReload"};var ngOnAppLoadProgress=ngOnAppLoadProgress||function(a){return bbbfly.AppLoader.SetProgress(a)},ngOnAppLoadFailed=ngOnAppLoadFailed||function(){bbbfly.AppLoader.Fail();return!1};

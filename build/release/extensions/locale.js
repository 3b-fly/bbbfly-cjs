/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/

var bbbfly=bbbfly||{};bbbfly.locale={_lang:null,_locs:{}};bbbfly.locale.SetLang=function(a){if(!(a instanceof bbbfly.locale.Lang))return!1;this._lang=a;return!0};bbbfly.locale.GetLang=function(){return this._lang?this._lang:new bbbfly.locale.Lang};bbbfly.locale.Register=function(a){if(!Object.isObject(a))return!1;var b=a.Lang,c=a.Region;String.isString(b)||(b="-");String.isString(c)||(c="-");Object.isObject(this._locs[b])||(this._locs[b]={});b=this._locs[b];Object.isObject(b[c])||(b[c]=a);return!0};
bbbfly.locale.GetLocalRules=function(a){a instanceof bbbfly.locale.Lang||(a=this.GetLang());var b=a.Lang?this._locs[a.Lang]:null;b||(b=this._locs["-"]);if(!b)return null;(a=a.Region?b[a.Region]:null)||(a=b["-"]);return a?a:null};bbbfly.locale.RemoveDiacritics=function(a,b){if(String.isString(a)&&(b=this.GetLocalRules(b))&&Object.isObject(b.Diacritics)){b=b.Diacritics;for(var c in b)b.hasOwnProperty(c)&&(a=a.replace(new RegExp(c,"g"),b[c]))}return a};
bbbfly.locale.Compare=function(a,b,c){if(String.isString(a)&&String.isString(a)&&(c=this.GetLocalRules(c))&&String.isString(c.CharOrder)){c=c.CharOrder;for(var g=Math.min(a.length,b.length),f=0;f<g+1;f++){var d=a.charAt(f),e=b.charAt(f),h=""===e;if(""===d||h){a=d;b=e;break}d=c.indexOf(d);e=c.indexOf(e);if(d!==e){a=d;b=e;break}}}return a<b?-1:a>b?1:0};
bbbfly.locale.Lang=function(a,b){this.Region=this.Lang=null;String.isString(a)&&(a=a.split("-"),a[0]&&(this.Lang=a[0]),a[1]&&(this.Region=a[1]));String.isString(b)&&(this.Region=b)};

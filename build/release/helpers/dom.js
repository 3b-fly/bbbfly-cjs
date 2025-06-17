/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.1
 * @license see license in 'LICENSE' file
*/

var bbbfly=bbbfly||{};bbbfly.dom={};bbbfly.dom._addEvent=function(a,b,c){a instanceof HTMLElement&&(a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent&&a.attachEvent(b,c))};bbbfly.dom._removeEvent=function(a,b,c){a instanceof HTMLElement&&(a.removeEventListener?a.removeEventListener(b,c,!1):a.detachEvent&&a.detachEvent(b,c))};
bbbfly.dom._stopEvent=function(a){a||(a=window.event);a instanceof window.Event&&(a.stopPropagation?a.stopPropagation():a.cancelBubble=!0,a.preventDefault?a.preventDefault():a.returnValue=!1)};bbbfly.dom._elementContains=function(a,b){if(!(a instanceof HTMLElement&&b instanceof HTMLElement))return!1;if("function"===typeof a.contains)return a.contains(b);for(;b;){if(b===a)return!0;b=b.parentNode}return!1};
bbbfly.DOM={AddEvent:bbbfly.dom._addEvent,RemoveEvent:bbbfly.dom._removeEvent,StopEvent:bbbfly.dom._stopEvent,ElementContains:bbbfly.dom._elementContains};

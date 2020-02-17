/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/

var bbbfly=bbbfly||{};bbbfly.object=bbbfly.object||{};bbbfly.object.Extend=function(b,a){if(Function.isFunction(b)&&Function.isFunction(a)){var c=function(){};c.prototype=b.prototype;a.prototype=new c;a.prototype.constructor=a}return a};

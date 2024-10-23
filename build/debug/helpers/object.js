/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.1
 * @license see license in 'LICENSE' file
*/

var bbbfly = bbbfly || {};
bbbfly.object = bbbfly.object || {};
bbbfly.object.Extend = function(ancestor,descendant){
  if(Function.isFunction(ancestor) && Function.isFunction(descendant)){
    var fnc = function(){};
    fnc.prototype = ancestor.prototype;

    descendant.prototype = new fnc();
    descendant.prototype.constructor = descendant;
  }

  return descendant;
};
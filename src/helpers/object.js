/**
 * @file
 * @author Jan Nejedly [support@3b-fly.eu]
 * @copyright Jan Nejedly
 *
 * @inpackage object
 */

/** @ignore */
var bbbfly = bbbfly || {};
/**
 * @namespace
 * @name bbbfly.object
 * @inpackage object
 */
bbbfly.object = bbbfly.object || {};

/**
 * @function
 * @name Extend
 * @memberOf bbbfly.object
 * @description Modifies descendant to inherit from ancestor.
 *
 * @param {function} ancestor - Ancestor constructor
 * @param {function} desc - Descendant constructor
 * @return {function} Descendant constructor
 *
 * @example
 * ...
 *   var Ancestor = function(options){...};
 *
 *   var Descandant = bbbfly.object.Extend(
 *     Ancestor,function(options){
 *       Ancestor.call(this,options);
 *     }
 *   );
 * ...
 */
bbbfly.object.Extend = function(ancestor,descendant){
  if(Function.isFunction(ancestor) && Function.isFunction(descendant)){
    var fnc = function(){};
    fnc.prototype = ancestor.prototype;

    descendant.prototype = new fnc();
    descendant.prototype.constructor = descendant;
  }

  return descendant;
};
/**
 * @fileOverview Crossbrowser compatibility set.
 * @author Jan Nejedly [support@3b-fly.eu]
 * @copyright Jan Nejedly
 * @version 2.0.0
 */

/**
 * @module crossbrowser
 * @exports crossbrowser
 * @description
 *   Adds methods to JavaScript types if they are not defined yet.
 *
 * @controlsjs-library bbbfly-cjs
 * @controlsjs-package crossbrowser
 */

/**
 * @function
 * @name string․trim
 * @memberof module:crossbrowser#
 *
 * @return {string}
 */
if(typeof String.prototype.trim !== 'function'){
  String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g,'');
  };
}

/**
 * @function
 * @name string․capitalize
 * @memberof module:crossbrowser#
 *
 * @return {string}
 */
if(typeof String.prototype.capitalize !== 'function'){
  String.prototype.capitalize = function(){
    return this.charAt(0).toUpperCase()+this.slice(1);
  };
}

/**
 * @function
 * @name string․repeat
 * @memberof module:crossbrowser#
 *
 * @param {integer} count
 * @return {string}
 */
if(typeof String.prototype.repeat !== 'function'){
  String.prototype.repeat = function(count){
    var result = '';
    if((typeof count === 'number')){
      var value = this.valueOf();
      for(var cnt = count;cnt>0;cnt--){
        result += value;
      }
    }
    return result;
  };
}

/**
 * @function
 * @name string․leading
 * @memberof module:crossbrowser#
 *
 * @param {string} str - string to repeat
 * @param {integer} length - minimal final string length
 * @return {string}
 */
if(typeof String.prototype.leading !== 'function'){
  String.prototype.leading = function(str,length){
    var result = '';
    var value = this.valueOf();
    if((typeof str === 'string') && (typeof length === 'number')){
      result = str.repeat(length - value.length);
    }

    return result+value;
  };
}

/**
 * @function
 * @name array․includes
 * @memberof module:crossbrowser#
 *
 * @param {mixed} value
 * @return {boolean}
 */
if(typeof Array.prototype.includes !== 'function'){
  Array.prototype.includes = function(value){
    for(var i in this){if(this[i] === value){return true;}}
    return false;
  };
}

/**
 * @function
 * @name Object․prototype.isObject
 * @memberof module:crossbrowser#
 *
 * @param {mixed} value
 * @return {boolean}
 */
if(typeof Object.isObject !== 'function'){
  Object.isObject = function(value){
    return (Object.prototype.toString.call(value) === '[object Object]');
  };
}

/**
 * @function
 * @name Date․isDate
 * @memberof module:crossbrowser#
 *
 * @param {mixed} value
 * @return {boolean}
 */
if(typeof Date.isDate !== 'function'){
  Date.isDate = function(value){
    return (Object.prototype.toString.call(value) === '[object Date]');
  };
}

/**
 * @function
 * @name Array․isArray
 * @memberof module:crossbrowser#
 *
 * @param {mixed} value
 * @return {boolean}
 */
if(typeof Array.isArray !== 'function'){
  Array.isArray = function(value){
    return (Object.prototype.toString.call(value) === '[object Array]');
  };
}
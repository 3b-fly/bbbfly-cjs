/**
 * @file
 * @author Jan Nejedly [support@3b-fly.eu]
 * @copyright Jan Nejedly
 *
 * @inpackage crossbrowser
 */

/**
 * @namespace
 * @name bbbfly.crossbrowser
 * @description
 *   Adds methods to JavaScript types if they are not defined yet.
 *
 * @inpackage crossbrowser
 */

/**
 * @function
 * @name string․trim
 * @memberof bbbfly.crossbrowser#
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
 * @memberof bbbfly.crossbrowser#
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
 * @memberof bbbfly.crossbrowser#
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
 * @memberof bbbfly.crossbrowser#
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
 * @memberof bbbfly.crossbrowser#
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
 * @name Object․isObject
 * @memberof bbbfly.crossbrowser#
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
 * @name object․includes
 * @memberof bbbfly.crossbrowser#
 *
 * @param {mixed} value
 * @return {boolean}
 */
if(typeof Object.prototype.includes !== 'function'){
  Object.prototype.includes = function(value){
    for(var i in this){if(this[i] === value){return true;}}
    return false;
  };
}

/**
 * @function
 * @name Date․isDate
 * @memberof bbbfly.crossbrowser#
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
 * @memberof bbbfly.crossbrowser#
 *
 * @param {mixed} value
 * @return {boolean}
 */
if(typeof Array.isArray !== 'function'){
  Array.isArray = function(value){
    return (Object.prototype.toString.call(value) === '[object Array]');
  };
}
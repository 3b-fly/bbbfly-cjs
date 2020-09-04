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
 * @class
 * @name Boolean
 * @alias Boolean
 * @hideconstructor
 * @memberof bbbfly.crossbrowser
 */

if(typeof Boolean.isBoolean !== 'function'){
  /**
   * @function
   * @name isBoolean
   * @memberof Boolean
   *
   * @param {mixed} value
   * @return {boolean}
   */
  Boolean.isBoolean = function(value){
    return (typeof value === 'boolean');
  };
}

/**
 * @class
 * @name String
 * @alias String
 * @hideconstructor
 * @memberof bbbfly.crossbrowser
 */

if(typeof String.isString !== 'function'){
  /**
   * @function
   * @name isString
   * @memberof String
   *
   * @param {mixed} value
   * @return {boolean}
   */
  String.isString = function(value){
    return (typeof value === 'string');
  };
}

/**
 * @function
 * @name trim
 * @memberof String
 *
 * @param {string} string
 * @return {string}
 */
//override deprecated String.trim
String.trim = function(string){
  if(typeof string === 'string'){
    return string.replace(/^\s+|\s+$/g,'');
  }
  return '';
};

if(typeof String.capitalize !== 'function'){
  /**
   * @function
   * @name capitalize
   * @memberof String
   *
   * @param {string} string
   * @return {string}
   */
  String.capitalize = function(string){
    if(typeof string === 'string'){
      return string.charAt(0).toUpperCase()+string.slice(1);
    }
    return '';
  };
}

if(typeof String.repeat !== 'function'){
  /**
   * @function
   * @name repeat
   * @memberof String
   *
   * @param {string} string
   * @param {integer} count
   * @return {string}
   */
  String.repeat = function(string,count){
    var result = '';
    if((typeof string === 'string') && (typeof count === 'number')){
      for(var cnt = count;cnt>0;cnt--){
        result += string;
      }
    }
    return result;
  };
}

if(typeof String.leading !== 'function'){
  /**
   * @function
   * @name leading
   * @memberof String
   *
   * @param {string} string - base string
   * @param {string} lead - string to repeat
   * @param {integer} length - minimal final string length
   * @return {string}
   */
  String.leading = function(string,lead,length){
    var result = '';
    var value = (typeof string === 'string') ? string : '';
    if((typeof lead === 'string') && (typeof length === 'number')){
      result = String.repeat(lead,(length - value.length));
    }

    return result+value;
  };
}

/**
 * @class
 * @name Object
 * @alias Object
 * @hideconstructor
 * @memberof bbbfly.crossbrowser
 */

if(typeof Object.isObject !== 'function'){
  /**
   * @function
   * @name isObject
   * @memberof Object
   *
   * @param {mixed} value
   * @return {boolean}
   */
  Object.isObject = function(value){
    return (Object.prototype.toString.call(value) === '[object Object]');
  };
}

if(typeof Object.includes !== 'function'){
  /**
   * @function
   * @name includes
   * @memberof Object
   *
   * @param {object} object
   * @param {mixed} value
   * @return {boolean}
   */
  Object.includes = function(object,value){
    if(Object.isObject(object)){
      for(var i in object){
        if(object.hasOwnProperty(i)){
          if(object[i] === value){return true;}
        }
      }
    }
    return false;
  };
}

if(typeof Object.keys !== 'function'){
  /**
   * @function
   * @name keys
   * @memberof Object
   *
   * @param {object} object
   * @param {mixed} value
   * @return {boolean}
   */
  Object.keys = function(object){
    var keys = [];

    if(Object.isObject(object)){
      for(var i in object){
        if(object.hasOwnProperty(i)){keys.push(i);}
      }
    }
    return keys;
  };
}

/**
 * @class
 * @name Array
 * @alias Array
 * @hideconstructor
 * @memberof bbbfly.crossbrowser
 */

if(typeof Array.isArray !== 'function'){
  /**
   * @function
   * @name isArray
   * @memberof Array
   *
   * @param {mixed} value
   * @return {boolean}
   */
  Array.isArray = function(value){
    return (Object.prototype.toString.call(value) === '[object Array]');
  };
}

if(typeof Array.indexOf !== 'function'){
  /**
   * @function
   * @name indexOf
   * @memberof Array
   *
   * @param {array} array
   * @param {mixed} value
   * @return {boolean}
   */
  Array.indexOf = function(array,value){
    if(Array.isArray(array)){
      for(var i in array){
        if(array[i] === value){return i;}
      }
    }
    return -1;
  };
}

if(typeof Array.includes !== 'function'){
  /**
   * @function
   * @name includes
   * @memberof Array
   *
   * @param {array} array
   * @param {mixed} value
   * @return {boolean}
   */
  Array.includes = function(array,value){
    return (Array.indexOf(array,value) > -1);
  };
}

/**
 * @class
 * @name Date
 * @alias Date
 * @hideconstructor
 * @memberof bbbfly.crossbrowser
 */

if(typeof Date.isDate !== 'function'){
  /**
   * @function
   * @name isDate
   * @memberof Date
   *
   * @param {mixed} value
   * @return {boolean}
   */
  Date.isDate = function(value){
    return (Object.prototype.toString.call(value) === '[object Date]');
  };
}

/**
 * @class
 * @name Number
 * @alias Number
 * @hideconstructor
 * @memberof bbbfly.crossbrowser
 */

if(typeof Number.isNumber !== 'function'){
  /**
   * @function
   * @name isNumber
   * @memberof Number
   *
   * @param {mixed} value
   * @return {boolean}
   */
  Number.isNumber = function(value){
    return ((typeof value === 'number') && !isNaN(value));
  };
}

if(typeof Number.isInteger !== 'function'){
  /**
   * @function
   * @name isInteger
   * @memberof Number
   *
   * @param {mixed} value
   * @return {boolean}
   */
  Number.isInteger = function(value){
    return (Number.isNumber(value) && (value % 1 === 0));
  };
}

/**
 * @class
 * @name Function
 * @alias Function
 * @hideconstructor
 * @memberof bbbfly.crossbrowser
 */

if(typeof Function.isFunction !== 'function'){
  /**
  * @function
  * @name isFunction
  * @memberof Function
  *
  * @param {mixed} value
  * @return {boolean}
  */
  Function.isFunction = function(value){
    return (typeof value === 'function');
  };
}
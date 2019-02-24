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

/**
 * @function
 * @name isBoolean
 * @memberof Boolean
 *
 * @param {mixed} value
 * @return {boolean}
 */
if(typeof Boolean.isBoolean !== 'function'){
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

/**
 * @function
 * @name isString
 * @memberof String
 *
 * @param {mixed} value
 * @return {boolean}
 */
if(typeof String.isString !== 'function'){
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

/**
 * @function
 * @name capitalize
 * @memberof String
 *
 * @param {string} string
 * @return {string}
 */
if(typeof String.capitalize !== 'function'){
  String.capitalize = function(string){
    if(typeof string === 'string'){
      return string.charAt(0).toUpperCase()+string.slice(1);
    }
    return '';
  };
}

/**
 * @function
 * @name repeat
 * @memberof String
 *
 * @param {string} string
 * @param {integer} count
 * @return {string}
 */
if(typeof String.repeat !== 'function'){
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
if(typeof String.leading !== 'function'){
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

/**
 * @function
 * @name isObject
 * @memberof Object
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
 * @name includes
 * @memberof Object
 *
 * @param {object} object
 * @param {mixed} value
 * @return {boolean}
 */
if(typeof Object.includes !== 'function'){
  Object.includes = function(object,value){
    if(Object.isObject(object)){
      for(var i in object){
        if(object[i] === value){return true;}
      }
    }
    return false;
  };
}

/**
 * @class
 * @name Array
 * @alias Array
 * @hideconstructor
 * @memberof bbbfly.crossbrowser
 */

/**
 * @function
 * @name isArray
 * @memberof Array
 *
 * @param {mixed} value
 * @return {boolean}
 */
if(typeof Array.isArray !== 'function'){
  Array.isArray = function(value){
    return (Object.prototype.toString.call(value) === '[object Array]');
  };
}

/**
 * @function
 * @name includes
 * @memberof Array
 *
 * @param {array} array
 * @param {mixed} value
 * @return {boolean}
 */
if(typeof Array.includes !== 'function'){
  Array.includes = function(array,value){
    if(Array.isArray(array)){
      for(var i in array){
        if(array[i] === value){return true;}
      }
    }
    return false;
  };
}

/**
 * @class
 * @name Date
 * @alias Date
 * @hideconstructor
 * @memberof bbbfly.crossbrowser
 */

/**
 * @function
 * @name isDate
 * @memberof Date
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
 * @class
 * @name Number
 * @alias Number
 * @hideconstructor
 * @memberof bbbfly.crossbrowser
 */

/**
 * @function
 * @name isNumber
 * @memberof Number
 *
 * @param {mixed} value
 * @return {boolean}
 */
if(typeof Number.isNumber !== 'function'){
  Number.isNumber = function(value){
    return ((typeof value === 'number') && !this.isNaN(value));
  };
}

/**
 * @function
 * @name isInteger
 * @memberof Number
 *
 * @param {mixed} value
 * @return {boolean}
 */
if(typeof Number.isInteger !== 'function'){
  Number.isInteger = function(value){
    return (Number.isNumber && (value % 1 === 0));
  };
}

/**
 * @class
 * @name Function
 * @alias Function
 * @hideconstructor
 * @memberof bbbfly.crossbrowser
 */

/**
 * @function
 * @name isFunction
 * @memberof Function
 *
 * @param {mixed} value
 * @return {boolean}
 */
if(typeof Function.isFunction !== 'function'){
  Function.isFunction = function(value){
    return (typeof value === 'function');
  };
}
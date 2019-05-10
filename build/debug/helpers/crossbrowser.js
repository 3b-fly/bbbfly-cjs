/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/


if(typeof Boolean.isBoolean !== 'function'){
  Boolean.isBoolean = function(value){
    return (typeof value === 'boolean');
  };
}
if(typeof String.isString !== 'function'){
  String.isString = function(value){
    return (typeof value === 'string');
  };
}
String.trim = function(string){
  if(typeof string === 'string'){
    return string.replace(/^\s+|\s+$/g,'');
  }
  return '';
};
if(typeof String.capitalize !== 'function'){
  String.capitalize = function(string){
    if(typeof string === 'string'){
      return string.charAt(0).toUpperCase()+string.slice(1);
    }
    return '';
  };
}
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
if(typeof Object.isObject !== 'function'){
  Object.isObject = function(value){
    return (Object.prototype.toString.call(value) === '[object Object]');
  };
}
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
if(typeof Array.isArray !== 'function'){
  Array.isArray = function(value){
    return (Object.prototype.toString.call(value) === '[object Array]');
  };
}
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
if(typeof Date.isDate !== 'function'){
  Date.isDate = function(value){
    return (Object.prototype.toString.call(value) === '[object Date]');
  };
}
if(typeof Number.isNumber !== 'function'){
  Number.isNumber = function(value){
    return ((typeof value === 'number') && !this.isNaN(value));
  };
}
if(typeof Number.isInteger !== 'function'){
  Number.isInteger = function(value){
    return (Number.isNumber(value) && (value % 1 === 0));
  };
}
if(typeof Function.isFunction !== 'function'){
  Function.isFunction = function(value){
    return (typeof value === 'function');
  };
}
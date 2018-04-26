/**
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE_GPLv3_with_commercial_exception' file
 */

if(typeof String.prototype.trim !== 'function'){
  String.prototype.trim = function(){
    return this.replace(/^\s+|\s+$/g,'');
  };
}
if(typeof String.prototype.capitalize !== 'function'){
  String.prototype.capitalize = function(){
    return this.charAt(0).toUpperCase()+this.slice(1);
  };
}
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
if(typeof Array.prototype.includes !== 'function'){
  Array.prototype.includes = function(value){
    for(var i in this){if(this[i] === value){return true;}}
    return false;
  };
}
if(typeof Object.isObject !== 'function'){
  Object.isObject = function(value){
    return (Object.prototype.toString.call(value) === '[object Object]');
  };
}
if(typeof Object.prototype.includes !== 'function'){
  Object.prototype.includes = function(value){
    for(var i in this){if(this[i] === value){return true;}}
    return false;
  };
}
if(typeof Date.isDate !== 'function'){
  Date.isDate = function(value){
    return (Object.prototype.toString.call(value) === '[object Date]');
  };
}
if(typeof Array.isArray !== 'function'){
  Array.isArray = function(value){
    return (Object.prototype.toString.call(value) === '[object Array]');
  };
}
/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/

var bbbfly=bbbfly||{};bbbfly.datetime={};bbbfly.datetime._bigIntToDateTime=function(a){var b=null;if("string"===typeof a&&(a=bbbfly.DateTime.bigintPattern.exec(a)))switch(a[2]){case bbbfly.DateTime.calendar.gregorian:b=new Date,b.setUTCFullYear(parseInt(a[3])*(a[1]?-1:1)),b.setUTCMonth(parseInt(a[4])-1),b.setUTCDate(parseInt(a[5])),b.setUTCHours(parseInt(a[6])),b.setUTCMinutes(parseInt(a[7])),b.setUTCSeconds(0),b.setUTCMilliseconds(0)}return b};
bbbfly.datetime._dateTimeToBigInt=function(a){var b=null;if(Date.isDate(a)){var c=a.getUTCFullYear();b=(0>c?"-":"")+bbbfly.DateTime.calendar.gregorian;b+=String.leading(Math.abs(c).toString(),"0",10);b+=String.leading((a.getUTCMonth()+1).toString(),"0",2);b+=String.leading(a.getUTCDate().toString(),"0",2);b+=String.leading(a.getUTCHours().toString(),"0",2);b+=String.leading(a.getUTCMinutes().toString(),"0",2)}return b};bbbfly.DateTime={BigIntToDateTime:bbbfly.datetime._bigIntToDateTime,DateTimeToBigInt:bbbfly.datetime._dateTimeToBigInt};
bbbfly.DateTime.bigintPattern=/^(-?)([1-8]{1})([0-9]{10})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})$/;bbbfly.DateTime.calendar={gregorian:"1"};

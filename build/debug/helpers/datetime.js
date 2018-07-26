/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/


var bbbfly = bbbfly || {};
bbbfly.datetime = {};
bbbfly.datetime._bigIntToDateTime = function(bigint){
  var date = null;
  if(typeof bigint === 'string'){
    var parts = bbbfly.DateTime.bigintPattern.exec(bigint);

    if(parts){
      switch(parts[2]){
        case bbbfly.DateTime.calendar.gregorian:
          date = new Date();
          date.setUTCFullYear(parseInt(parts[3])*(parts[1] ? -1 : 1));
          date.setUTCMonth(parseInt(parts[4])-1);
          date.setUTCDate(parseInt(parts[5]));
          date.setUTCHours(parseInt(parts[6]));
          date.setUTCMinutes(parseInt(parts[7]));
          date.setUTCSeconds(0);
          date.setUTCMilliseconds(0);
        break;
      }
    }
  }
  return date;
};
bbbfly.datetime._dateTimeToBigInt = function(date){
  var bigint = null;
  if(Date.isDate(date)){
    var year = date.getUTCFullYear();

    bigint = (year < 0) ? '-' : '';
    bigint += bbbfly.DateTime.calendar.gregorian;
    bigint += String.leading(Math.abs(year).toString(),'0',10);
    bigint += String.leading((date.getUTCMonth() + 1).toString(),'0',2);
    bigint += String.leading(date.getUTCDate().toString(),'0',2);
    bigint += String.leading(date.getUTCHours().toString(),'0',2);
    bigint += String.leading(date.getUTCMinutes().toString(),'0',2);
  }
  return bigint;
};
bbbfly.DateTime = {
  BigIntToDateTime: bbbfly.datetime._bigIntToDateTime,
  DateTimeToBigInt: bbbfly.datetime._dateTimeToBigInt
};
bbbfly.DateTime.bigintPattern = new RegExp(
    '^(-?)([1-8]{1})([0-9]{10})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})$'
  );
bbbfly.DateTime.calendar = {
  gregorian: '1'
};

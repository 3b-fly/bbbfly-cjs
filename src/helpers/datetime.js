/**
 * @file
 * @author Jan Nejedly [support@3b-fly.eu]
 * @copyright Jan Nejedly
 *
 * @inpackage datetime
 */

/** @ignore */
var bbbfly = bbbfly || {};
/** @ignore */
bbbfly.datetime = {};

/** @ignore */
bbbfly.datetime._bigIntToUTCDateTime = function(bigint){
  var date = null;
  if(String.isString(bigint)){
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

/** @ignore */
bbbfly.datetime._utcDateTimeToBigInt = function(date){
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

/** @ignore */
bbbfly.datetime._bigIntToDate = function(bigint){
  var utcDate = this.BigIntToUTCDateTime(bigint);
  if(!Date.isDate(utcDate)){return null;}

  return new Date(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth(),
    utcDate.getUTCDate(),
    0,0,0,0
  );
};

/** @ignore */
bbbfly.datetime._dateToBigInt = function(date){
  if(!Date.isDate(date)){return null;}

  var utcDate = new Date(0,0,0,0,0,0,0);
  utcDate.setUTCFullYear(date.getFullYear());
  utcDate.setUTCMonth(date.getMonth());
  utcDate.setUTCDate(date.getDate());

  return this.UTCDateTimeToBigInt(utcDate);
};

/**
 * @class
 * @hideconstructor
 *
 * @inpackage datetime
 */
bbbfly.DateTime = {
  /**
   * @function
   * @name BigIntToUTCDateTime
   * @memberof bbbfly.DateTime#
   *
   * @param {bbbfly.DateTime.bigint} bigint
   * @return {Date}
   */
  BigIntToUTCDateTime: bbbfly.datetime._bigIntToUTCDateTime,
  /**
   * @function
   * @name UTCDateTimeToBigInt
   * @memberof bbbfly.DateTime#
   *
   * @param {Date} date
   * @return {bbbfly.DateTime.bigint}
   */
  UTCDateTimeToBigInt: bbbfly.datetime._utcDateTimeToBigInt,
    /**
   * @function
   * @name BigIntToDate
   * @memberof bbbfly.DateTime#
   *
   * @param {bbbfly.DateTime.bigint} bigint
   * @return {Date}
   */
  BigIntToDate: bbbfly.datetime._bigIntToDate,
  /**
   * @function
   * @name DateToBigInt
   * @memberof bbbfly.DateTime#
   *
   * @param {Date} date
   * @return {bbbfly.DateTime.bigint}
   */
  DateToBigInt: bbbfly.datetime._dateToBigInt
};

/**
 * @typedef {RegExp}
 * @description
 *   {@link bbbfly.DateTime.bigint|bigint} string pattern:
 *   <table>
 *     <col width="126px"><col>
 *     <tr><td>(-?)</td><td>before or after reference date</td></tr>
 *     <tr><td>([1-8]{1})</td><td>{@link bbbfly.DateTime.calendar|calendar}</td></tr>
 *     <tr><td>([0-9]{10})</td><td>year</td></tr>
 *     <tr><td>([0-9]{2})</td><td>month</td></tr>
 *     <tr><td>([0-9]{2})</td><td>day</td></tr>
 *     <tr><td>([0-9]{2})</td><td>hour</td></tr>
 *     <tr><td>([0-9]{2})</td><td>minute</td></tr>
 *   </table>
 */
bbbfly.DateTime.bigintPattern = new RegExp(
    '^(-?)([1-8]{1})([0-9]{10})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})$'
  );

/**
 * @enum {string}
 * @description
 *   Possible values for {@link bbbfly.DateTime.bigint|bigint} calendar part
 */
bbbfly.DateTime.calendar = {
  gregorian: '1'
};

/**
 * @typedef {string} bbbfly.DateTime.bigint
 * @description
 *  {@link bbbfly.DateTime.bigintPattern|bigintPattern} pattern matching string.
 */

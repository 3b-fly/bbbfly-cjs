/**
 * @file
 * @author Jan Nejedly [support@3b-fly.eu]
 * @copyright Jan Nejedly
 *
 * @inpackage auth
 */

/** @ignore */
var bbbfly = bbbfly || {};
/** @ignore */
bbbfly.auth = {};

/** @ignore */
bbbfly.auth._setMethod = function(method){
if(!Number.isInteger(method)){return false;}

  for(var i in bbbfly.Auth.method){
    if(bbbfly.Auth.method[i] === method){
      this.Method = method;
      return true;
    }
  }
  return false;
};

/** @ignore */
bbbfly.auth._getMethod = function(){
  return (Number.isInteger(this.Method))
    ? this.Method : bbbfly.Auth.method.none;
};

/** @ignore */
bbbfly.auth._setUserData = function(data){
  if(
    Object.isObject(data)
    && String.isString(data.Id) && (data.Id !== '')
    && String.isString(data.Name) && (data.Name !== '')
    && String.isString(data.IPAddr) && (data.IPAddr !== '')
  ){
    data = ng_CopyVar(data);

    if(!String.isString(data.SurName) || (data.SurName === '')){
      data.SurName = null;
    }
    if(!String.isString(data.PhoneNumber) || (data.PhoneNumber === '')){
      data.PhoneNumber = null;
    }

    this.UserData = data;
    return true;
  }

  this.UserData = null;
  return false;
};

/** @ignore */
bbbfly.auth._getUserData = function(){
  return (Object.isObject(this.UserData))
    ? this.UserData : null;
};

/** @ignore */
bbbfly.auth._setData = function(data){
  if(!Object.isObject(data)){return;}

  this.SetMethod(data.Method);
  this.SetUserData(data.UserData);
};

/** @ignore */
bbbfly.auth._init = function(){
    this.SetData(bbbfly.AuthData);
};

/**
 * @namespace
 * @inpackage auth
 *
 * @property {bbbfly.Auth.method} [Method=none]
 * @property {bbbfly.Auth.UserData} [UserData=null]
 */
bbbfly.Auth = {
  Method: null,
  UserData: null,

  /**
  * @function
  * @name SetMethod
  * @memberOf bbbfly.Auth
  *
  * @param {bbbfly.Auth.method} method
  * @return {boolean} If method was set
  */
  SetMethod: bbbfly.auth._setMethod,
  /**
   * @function
   * @name GetMethod
   * @memberof bbbfly.Auth#
   *
   * @return {bbbfly.Auth.method}
   */
  GetMethod: bbbfly.auth._getMethod,
  /**
  * @function
  * @name SetUserData
  * @memberOf bbbfly.Auth
  *
  * @param {bbbfly.Auth.UserData} data
  * @return {boolean} If data were valid
  */
  SetUserData: bbbfly.auth._setUserData,
  /**
  * @function
  * @name GetUserData
  * @memberOf bbbfly.Auth
  *
  * @return {bbbfly.Auth.UserData}
  */
  GetUserData: bbbfly.auth._getUserData,
  /**
  * @function
  * @name SetData
  * @memberOf bbbfly.Auth
  *
  * @param {bbbfly.Auth.Data} data
  */
  SetData: bbbfly.auth._setData,
  /**
   * @function
   * @name Init
   * @memberOf bbbfly.Auth
   * @description Initialize authentication from global "bbbfly.AuthData" object
   */
  Init: bbbfly.auth._init
};

/**
 * @enum {integer}
 * @description
 *   Possible values for {@link bbbfly.Downloader|bbbfly.Downloader.Method}
 */
bbbfly.Auth.method = {
  none: 0,
  basic: 1
};

/**
 * @interface
 * @name Data
 * @memberof bbbfly.Auth
 *
 * @property {bbbfly.Auth.method} Method
 * @property {bbbfly.Auth.UserData} UserData
 */

/**
 * @interface
 * @name UserData
 * @memberof bbbfly.Auth
 *
 * @property {string} Id
 * @property {string} Name
 * @property {string} IPAddr
 *
 * @property {string} [SurName=null]
 * @property {string} [PhoneNumber=null]
 */

/** @ignore */
bbbfly.Auth.Init();
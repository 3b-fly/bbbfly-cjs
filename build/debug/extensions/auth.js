/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/

var bbbfly = bbbfly || {};
bbbfly.auth = {};
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
bbbfly.auth._getMethod = function(){
  return (Number.isInteger(this.Method))
    ? this.Method : bbbfly.Auth.method.none;
};
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
bbbfly.auth._getUserData = function(){
  return (Object.isObject(this.UserData))
    ? this.UserData : null;
};
bbbfly.auth._setData = function(data){
  if(!Object.isObject(data)){return;}

  this.SetMethod(data.Method);
  this.SetUserData(data.UserData);
};
bbbfly.auth._init = function(){
    this.SetData(bbbfly.AuthData);
};
bbbfly.Auth = {
  Method: null,
  UserData: null,
  SetMethod: bbbfly.auth._setMethod,
  GetMethod: bbbfly.auth._getMethod,
  SetUserData: bbbfly.auth._setUserData,
  GetUserData: bbbfly.auth._getUserData,
  SetData: bbbfly.auth._setData,
  Init: bbbfly.auth._init
};
bbbfly.Auth.method = {
  none: 0,
  basic: 1
};
bbbfly.Auth.Init();
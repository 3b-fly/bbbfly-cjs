/**
 * @file
 * @author Jan Nejedly [support@3b-fly.eu]
 * @copyright Jan Nejedly
 *
 * @inpackage appIndex
 */

/** @ignore */
var bbbfly = bbbfly || {};
/** @ignore */
bbbfly.appindex = {};

/** @ignore */
bbbfly.appindex._addURLVersion = function(url){
  if(!String.isString(url)){return '';}

  var v = (ngDEBUG) ? Date.now() : ngVERSION;
  return url+((url.indexOf('?') === -1) ? '?' : '&')+'v='+(v ? v : '');
};

/** @ignore */
bbbfly.appindex._initIndex = function(){
  if(typeof ngAppFiles === 'object'){
    for(var file in ngAppFiles){
      ngAppFiles[file] = this.AddURLVersion(
        ngAppFiles[file]
      );
    }
  }
  if(typeof ngAppDeviceFiles === 'object'){
    for(var device in ngAppDeviceFiles){
      if(typeof ngAppDeviceFiles[device] === 'object'){
        for(var file in ngAppDeviceFiles[device]){
          ngAppDeviceFiles[device][file] = this.AddURLVersion(
            ngAppDeviceFiles[device][file]
          );
        }
      }
    }
  }
};

/** @ignore */
bbbfly.appindex._requireLeaveDialog = function(require){
  if(!Boolean.isBoolean(require)){require = true;}

  if(require){
    if(window.attachEvent){
      window.attachEvent("onbeforeunload",bbbfly.appindex._leaveDialog);
    }
    else{
      window.onbeforeunload = bbbfly.appindex._leaveDialog;
    }
  }
  else{
    if(window.detachEvent){
      window.detachEvent("onbeforeunload",bbbfly.appindex._leaveDialog);
    }
    else{
      window.onbeforeunload = null;
    }
  }
};

/** @ignore */
bbbfly.appindex._leaveDialog = function(){
  return ngTxt('bbbfly_app_index_leave');
};

/**
 * @class
 * @hideconstructor
 *
 * @inpackage appIndex
 */
bbbfly.AppIndex = {

  /**
   * @function
   * @name AddURLVersion
   * @memberof bbbfly.AppIndex#
   * @description Add version parameter to URL.
   *
   * @param {string} url
   * @return {string}
   */
  AddURLVersion: bbbfly.appindex._addURLVersion,
  /**
   * @function
   * @name InitIndex
   * @memberof bbbfly.AppIndex#
   * @description Initialize index before loading starts.
   *
   */
  InitIndex: bbbfly.appindex._initIndex,

  /**
   * @function
   * @name RequireLeaveDialog
   * @memberof bbbfly.AppIndex#
   * @description Require leave application dialog.
   *
   * @param {boolean} [require=true]
   */
  RequireLeaveDialog: bbbfly.appindex._requireLeaveDialog
};
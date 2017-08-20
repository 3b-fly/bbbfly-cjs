/**
 * @fileOverview Application index set.
 * @author Jan Nejedly [support@3b-fly.eu]
 * @copyright Jan Nejedly
 * @version 2.0.0
 *
 * @requires {@link http://controlsjs.com/|controls.js v5.0.0}
 */

/** @ignore */
var bbbfly = bbbfly || {};
/** @ignore */
bbbfly.appindex = {};

/** @ignore */
bbbfly.appindex._addTimestampToURL = function(url){
  if(typeof url !== 'string'){return '';}
  return url+((url.indexOf('?') === -1) ? '?' : '&')+'ts='+Date.now();
};

/** @ignore */
bbbfly.appindex._initIndex = function(){
  if(ngDEBUG){
    if(typeof ngAppFiles === 'object'){
      for(var file in ngAppFiles){
        ngAppFiles[file] = this.AddTimestampToURL(
          ngAppFiles[file]
        );
      }
    }
    if(typeof ngAppDeviceFiles === 'object'){
      for(var device in ngAppDeviceFiles){
        if(typeof ngAppDeviceFiles[device] === 'object'){
          for(var file in ngAppDeviceFiles[device]){
            ngAppDeviceFiles[device][file] = this.AddTimestampToURL(
              ngAppDeviceFiles[device][file]
            );
          }
        }
      }
    }
  }
};

/** @ignore */
bbbfly.appindex._requireLeaveDialog = function(require){
  if(typeof require !== 'boolean'){require = true;}

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
 * @controlsjs-library bbbfly-cjs
 * @controlsjs-package appIndex
 */
bbbfly.AppIndex = {

  /**
   * @function
   * @name AddTimestampToURL
   * @memberof bbbfly.AppIndex#
   * @description Add timestamp parameter to URL.
   *
   * @param {string} url
   * @return {string}
   */
  AddTimestampToURL: bbbfly.appindex._addTimestampToURL,
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
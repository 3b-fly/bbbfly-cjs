/**
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
 */

var bbbfly = bbbfly || {};
bbbfly.appindex = {};
bbbfly.appindex._addTimestampToURL = function(url){
  if(typeof url !== 'string'){return '';}
  return url+((url.indexOf('?') === -1) ? '?' : '&')+'ts='+Date.now();
};
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
bbbfly.appindex._leaveDialog = function(){
  return ngTxt('bbbfly_app_index_leave');
};
bbbfly.AppIndex = {
  AddTimestampToURL: bbbfly.appindex._addTimestampToURL,
  InitIndex: bbbfly.appindex._initIndex,
  RequireLeaveDialog: bbbfly.appindex._requireLeaveDialog
};
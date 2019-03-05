/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/


var bbbfly = bbbfly || {};
bbbfly.appindex = {};
bbbfly.appindex._addURLVersion = function(url){
  if(!String.isString(url)){return '';}

  var v = (ngDEBUG) ? Date.now() : ngVERSION;
  return url+((url.indexOf('?') === -1) ? '?' : '&')+'v='+(v ? v : '');
};
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
bbbfly.appindex._leaveDialog = function(){
  return ngTxt('bbbfly_app_index_leave');
};
bbbfly.AppIndex = {
  AddURLVersion: bbbfly.appindex._addURLVersion,
  InitIndex: bbbfly.appindex._initIndex,
  RequireLeaveDialog: bbbfly.appindex._requireLeaveDialog
};
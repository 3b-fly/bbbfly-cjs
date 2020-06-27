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
  return url+((url.indexOf('?') === -1) ? '?' : '&')+'app_v='+(v ? v : '');
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
  var fnc = bbbfly.appindex._leaveDialog;

  if(require){
    if(window.attachEvent){window.attachEvent("onbeforeunload",fnc);}
    else{window.onbeforeunload = fnc;}
  }
  else{
    if(window.detachEvent){window.detachEvent("onbeforeunload",fnc);}
    else{window.onbeforeunload = null;}
  }
};
bbbfly.appindex._leaveDialog = function(){
  return ngTxt('bbbfly_app_index_leave');
};
bbbfly.appindex._allowSelfLinks = function(allow){
  if(!Boolean.isBoolean(allow)){allow = true;}
  var fnc = bbbfly.appindex._onclick;

  if(allow){
    if(window.detachEvent){window.detachEvent("onclick",fnc);}
    else{window.onclick = null;}
  }
  else{
    if(window.attachEvent){window.attachEvent("onclick",fnc);}
    else{window.onclick = fnc;}
  }
};
bbbfly.appindex._onclick = function(event){
  if(!event){event = window.event;}

  var node = event.target || event.srcElement;
  if (node.tagName !== 'A') {return;}

  var href = node.getAttribute('href');
  var hrefTarget = node.getAttribute('target');
  var hrefLocation = node.getAttribute('location');

  if(hrefTarget !== '_system'){hrefTarget = '_blank';}
  else if(hrefLocation === 'null'){ hrefLocation = 'location=no';}

  window.open(href,hrefTarget,hrefLocation);
  return false;
};
bbbfly.AppIndex = {
  AddURLVersion: bbbfly.appindex._addURLVersion,
  InitIndex: bbbfly.appindex._initIndex,
  RequireLeaveDialog: bbbfly.appindex._requireLeaveDialog,
  AllowSelfLinks: bbbfly.appindex._allowSelfLinks
};
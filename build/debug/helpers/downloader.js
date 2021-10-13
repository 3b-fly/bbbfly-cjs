/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/

var bbbfly = bbbfly || {};
bbbfly.downloader = {};
bbbfly.downloader._setMethod = function(method){
  if(!Number.isInteger(method)){return false;}
  for(var i in bbbfly.Downloader.method){
    if(bbbfly.Downloader.method[i] === method){
      this.Method = method;
      return true;
    }
  }
  return false;
};
bbbfly.downloader._getMethod = function(){
  return (Number.isInteger(this.Method))
    ?this.Method : bbbfly.Downloader.method.auto;
};
bbbfly.downloader._download = function(url){
  var method = this.GetMethod();
  if(method === bbbfly.Downloader.method.auto){
    method = bbbfly.downloader._detectMethod();
  }

  switch(method)
  {
    case bbbfly.Downloader.method.iframe:
      return bbbfly.downloader._downloadByIframe(this,url);
    break;
  }

  return false;
};
bbbfly.downloader._detectMethod = function(){
  return bbbfly.Downloader.method.iframe;
};
bbbfly.downloader._downloadByIframe = function(downloader,url){
  if(!downloader._Iframe){
    var iframe = document.createElement('iframe');
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.style.frameborder = '0';
    iframe.style.visible = 'none';
    downloader._Iframe = document.body.appendChild(iframe);
  }

  downloader._Iframe.src = url;
  return true;
};
bbbfly.Downloader = {
  Method: 0,
  _Iframe: null,
  SetMethod: bbbfly.downloader._setMethod,
  GetMethod: bbbfly.downloader._getMethod,
  Download: bbbfly.downloader._download
};
bbbfly.Downloader.method = {
  auto: 0,
  iframe: 1
};
/**
 * @fileOverview Downloader helper set.
 * @author Jan Nejedly [support@3b-fly.eu]
 * @copyright Jan Nejedly
 * @version 2.0.0
 */

/** @ignore */
var bbbfly = bbbfly || {};
/** @ignore */
bbbfly.downloader = {};

/** @ignore */
bbbfly.downloader._setMethod = function(method){
  if(typeof method !== 'number'){return false;}
  for(var i in bbbfly.Downloader.method){
    if(bbbfly.Downloader.method[i] === method){
      this.Method = method;
      return true;
    }
  }
  return false;
};

/** @ignore */
bbbfly.downloader._getMethod = function(){
  return (typeof this.Method === 'number')
    ?this.Method : bbbfly.Downloader.method.auto;
};

/** @ignore */
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

/** @ignore */
bbbfly.downloader._detectMethod = function(){
  return bbbfly.Downloader.method.iframe;
};

/** @ignore */
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

/**
 * @class
 * @hideconstructor
 *
 * @controlsjs-library bbbfly-cjs
 * @controlsjs-package downloader
 *
 * @property {bbbfly.Downloader.method} [Method=auto]
 *   Set this property to require certain download method.
 */
bbbfly.Downloader = {
  Method: 0,

  /** @private */
  _Iframe: null,

  /**
   * @function
   * @name SetMethod
   * @memberof bbbfly.Downloader#
   *
   * @param {bbbfly.Downloader.method} - Download method to use
   * @return {boolean} If method was set
   */
  SetMethod: bbbfly.downloader._setMethod,
  /**
   * @function
   * @name GetMethod
   * @memberof bbbfly.Downloader#
   *
   * @return {bbbfly.Downloader.method} Current download method
   */
  GetMethod: bbbfly.downloader._getMethod,
  /**
   * @function
   * @name Download
   * @memberof bbbfly.Downloader#
   *
   * @param {url} url - URL to download from
   * @return {boolean} If download start was successfull
   */
  Download: bbbfly.downloader._download
};

/**
 * @enum {number}
 * @description
 *   Possible values for {@link bbbfly.Downloader|bbbfly.Downloader.Method}
 */
bbbfly.Downloader.method = {
  auto: 0,
  iframe: 1
};
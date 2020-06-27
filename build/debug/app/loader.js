/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/


var bbbfly = bbbfly || {};
bbbfly.apploader = {};
bbbfly.apploader._getElm = function(id){
  if((typeof id !== 'string') || (id === '')){return null;}
  var elm = this._Elms[id];

  if(!elm){
    elm = document.getElementById(id);
    this._Elms[id] = elm;
  }

  return elm;
};
bbbfly.apploader._setProgressMessage = function(message){
  var msgElm = this.GetElm(bbbfly.AppLoader.eml.loadMessage);
  if(msgElm && String.isString(message)){
    msgElm.innerHTML = message;
    return true;
  }
  return false;
};
bbbfly.apploader._setProgress = function(progress){
  if(!Number.isNumber(progress)){return false;}

  this._Progress = progress;
  var fnc = function(){bbbfly.AppLoader.UpdateProgress();};

  setTimeout(fnc,1);
  return true;
};
bbbfly.apploader._getProgress = function(){
  return Number.isNumber(this._Progress) ? this._Progress : 0;
};
bbbfly.apploader._clearProgress = function(){
  this._Step = 0;
  this.SetProgress(0);
};
bbbfly.apploader._updateProgress = function(){
  var progressElm = this.GetElm(bbbfly.AppLoader.eml.loadProgress);
  if(!progressElm){return false;}

  progressElm.style.width = (this.GetProgress()+'%');
  return true;
};
bbbfly.apploader._setStepsCnt = function(count){
  if(!Number.isInteger(count)){return false;}

  this._StepsCnt = count;
  this._StepSize = Math.floor(100/count);
  return true;
};
bbbfly.apploader._moveByStep = function(){
  if(!Number.isInteger(this._Step) || !Number.isInteger(this._StepSize)){
    return false;
  }

  this._Step++;
  return this.SetProgress(this._Step*this._StepSize);
};
bbbfly.apploader._fail = function(){
  this._Failed = true;

  var errorElm = this.GetElm(bbbfly.AppLoader.eml.error);
  if(!errorElm){return false;}

  var loadElm = this.GetElm(bbbfly.AppLoader.eml.load);
  if(loadElm){loadElm.style.display = 'none';}

  errorElm.style.display = 'block';
  return true;
};
bbbfly.apploader._show = function(){
  var loader = this.GetElm(bbbfly.AppLoader.eml.loader);
  if(!loader){return false;}

  var cn = loader.className;
  if(String.isString(cn)){
    loader.className = cn.replace(
      /( )?bbbflyAppLoaderFinished/g,''
    );
    return true;
  }
  return false;
};
bbbfly.apploader._hide = function(){
  var loader = this.GetElm(bbbfly.AppLoader.eml.loader);
  if(this._Failed || !loader){return false;}

  if(loader.className !== ''){loader.className += ' ';}
  loader.className += 'bbbflyAppLoaderFinished';
  return true;
};
bbbfly.AppLoader = {
  _Progress: 0,
  _StepsCnt: 0,
  _StepSize: 0,
  _Step: 0,
  _Elms: {},
  _Failed: false,
  GetElm: bbbfly.apploader._getElm,
  SetProgressMessage: bbbfly.apploader._setProgressMessage,
  SetProgress: bbbfly.apploader._setProgress,
  GetProgress: bbbfly.apploader._getProgress,
  ClearProgress: bbbfly.apploader._clearProgress,
  UpdateProgress: bbbfly.apploader._updateProgress,
  SetStepsCount: bbbfly.apploader._setStepsCnt,
  MoveByStep: bbbfly.apploader._moveByStep,
  Fail: bbbfly.apploader._fail,
  Show: bbbfly.apploader._show,
  Hide: bbbfly.apploader._hide
};
bbbfly.AppLoader.eml = {
  loader: 'bbbflyAppLoader',

  load: 'bbbflyAppLoaderLoad',
  loadBar: 'bbbflyAppLoaderLoadBar',
  loadProgress: 'bbbflyAppLoaderLoadProgress',
  loadMessage: 'bbbflyAppLoaderLoadMessage',

  error: 'bbbflyAppLoaderError',
  errorMessage: 'bbbflyAppLoaderErrorMessage',
  errorReload: 'bbbflyAppLoaderErrorReload'
};
var ngOnAppLoadProgress = ngOnAppLoadProgress || function(progress){
  return bbbfly.AppLoader.SetProgress(progress);
};
var ngOnAppLoadFailed = ngOnAppLoadFailed || function(){
  bbbfly.AppLoader.Fail();
  return false;
};
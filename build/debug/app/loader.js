/**
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
 */

var bbbfly = bbbfly || {};
bbbfly.apploader = {};
bbbfly.apploader._getMessageElm = function(){
  if(!this._MessageElm){
    this._MessageElm = document.getElementById('bbbflyAppLoaderMessage');
  }
  return this._MessageElm;
};
bbbfly.apploader._getProgressElm = function(){
  if(!this._ProgressElm){
    this._ProgressElm = document.getElementById('bbbflyAppLoaderProgress');
  }
  return this._ProgressElm;
};
bbbfly.apploader._setProgressMessage = function(message){
  var msgElm = this.GetMessageElm();
  if(msgElm && (typeof message === 'string')){
    msgElm.innerHTML = message;
    return true;
  }
  return false;
};
bbbfly.apploader._setProgress = function(progress){
  if(typeof progress === 'number'){
    this._Progress = progress;
    setTimeout(bbbfly.apploader._updateProgress,1);
    return true;
  }
  return false;
};
bbbfly.apploader._clearProgress = function(){
  this._Step = 0;
  this.SetProgress(0);
};
bbbfly.apploader._updateProgress = function(){
  var progressElm = bbbfly.AppLoader.GetProgressElm();
  var progress = bbbfly.AppLoader._Progress;
  if(progressElm && (typeof progress === 'number')){
    progressElm.style.width = (progress+'%');
    return true;
  }
  return false;
};
bbbfly.apploader._setStepsCnt = function(count){
  if(typeof count === 'number'){
    this._StepsCnt = count;
    this._StepSize = Math.floor(100/count);
    return true;
  }
  return false;
};
bbbfly.apploader._moveByStep = function(){
  if(
    (typeof this._Step === 'number')
    && (typeof this._StepSize === 'number')
  ){
    this._Step++;
    return this.SetProgress(this._Step*this._StepSize);
  }
  return false;
};
bbbfly.apploader._hide = function(){
  var loader = document.getElementById('bbbflyAppLoader');
  if(loader){
    if(loader.className !== ''){loader.className += ' ';}
    loader.className += 'bbbflyAppLoaderFinished';
    return true;
  }
  return false;
};
bbbfly.AppLoader = {
  _Progress: 0,
  _StepsCnt: 0,
  _StepSize: 0,
  _Step: 0,
  _MessageElm: null,
  _ProgressElm: null,
  GetMessageElm: bbbfly.apploader._getMessageElm,
  GetProgressElm: bbbfly.apploader._getProgressElm,
  SetProgressMessage: bbbfly.apploader._setProgressMessage,
  SetProgress: bbbfly.apploader._setProgress,
  ClearProgress: bbbfly.apploader._clearProgress,
  SetStepsCount: bbbfly.apploader._setStepsCnt,
  MoveByStep: bbbfly.apploader._moveByStep,
  Hide: bbbfly.apploader._hide
};
var ngOnAppLoadProgress = ngOnAppLoadProgress || function(progress){
  if(typeof progress === 'number'){
    return bbbfly.AppLoader.SetProgress(progress);
  }
  return false;
};
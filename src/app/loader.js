/**
 * @file
 * @author Jan Nejedly [support@3b-fly.eu]
 * @copyright Jan Nejedly
 *
 * @inpackage appLoader
 */

/** @ignore */
var bbbfly = bbbfly || {};
/** @ignore */
bbbfly.apploader = {};

/** @ignore */
bbbfly.apploader._getMessageElm = function(){
  if(!this._MessageElm){
    this._MessageElm = document.getElementById('bbbflyAppLoaderMessage');
  }
  return this._MessageElm;
};

/** @ignore */
bbbfly.apploader._getProgressElm = function(){
  if(!this._ProgressElm){
    this._ProgressElm = document.getElementById('bbbflyAppLoaderProgress');
  }
  return this._ProgressElm;
};

/** @ignore */
bbbfly.apploader._setProgressMessage = function(message){
  var msgElm = this.GetMessageElm();
  if(msgElm && String.isString(message)){
    msgElm.innerHTML = message;
    return true;
  }
  return false;
};

/** @ignore */
bbbfly.apploader._setProgress = function(progress){
  if(Number.isNumber(progress)){
    this._Progress = progress;
    setTimeout(bbbfly.apploader._updateProgress,1);
    return true;
  }
  return false;
};

/** @ignore */
bbbfly.apploader._clearProgress = function(){
  this._Step = 0;
  this.SetProgress(0);
};

/** @ignore */
bbbfly.apploader._updateProgress = function(){
  var progressElm = bbbfly.AppLoader.GetProgressElm();
  var progress = bbbfly.AppLoader._Progress;
  if(progressElm && Number.isNumber(progress)){
    progressElm.style.width = (progress+'%');
    return true;
  }
  return false;
};

/** @ignore */
bbbfly.apploader._setStepsCnt = function(count){
  if(Number.isNumber(count)){
    this._StepsCnt = count;
    this._StepSize = Math.floor(100/count);
    return true;
  }
  return false;
};

/** @ignore */
bbbfly.apploader._moveByStep = function(){
  if(
    (Number.isNumber(this._Step))
    && (Number.isNumber(this._StepSize))
  ){
    this._Step++;
    return this.SetProgress(this._Step*this._StepSize);
  }
  return false;
};

/** @ignore */
bbbfly.apploader._hide = function(){
  var loader = document.getElementById('bbbflyAppLoader');
  if(loader){
    if(loader.className !== ''){loader.className += ' ';}
    loader.className += 'bbbflyAppLoaderFinished';
    return true;
  }
  return false;
};

/**
 * @class
 * @hideconstructor
 *
 * @inpackage appLoader
 *
 * @example
 * function ngMain(){
 *
 *   bbbfly.AppLoader.ClearProgress();
 *   bbbfly.AppLoader.SetStepsCount(actions.length);
 *
 *   for(var i in actions){
 *     bbbfly.AppLoader.SetProgressMessage(actions[i].message);
 *     actions[i].Do();
 *     bbbfly.AppLoader.MoveByStep();
 *   }
 *
 *   bbbfly.AppLoader.Hide();
 * }
 */
bbbfly.AppLoader = {
  /** @private */
  _Progress: 0,
  /** @private */
  _StepsCnt: 0,
  /** @private */
  _StepSize: 0,
  /** @private */
  _Step: 0,

  /** @private */
  _MessageElm: null,
  /** @private */
  _ProgressElm: null,

  /**
   * @function
   * @name GetMessageElm
   * @memberof bbbfly.AppLoader#
   * @description Get message node.
   *
   * @return {div}
   */
  GetMessageElm: bbbfly.apploader._getMessageElm,
  /**
   * @function
   * @name GetProgressElm
   * @memberof bbbfly.AppLoader#
   * @description Get progress node.
   *
   * @return {div}
   */
  GetProgressElm: bbbfly.apploader._getProgressElm,
  /**
   * @function
   * @name SetProgressMessage
   * @memberof bbbfly.AppLoader#
   * @description Set current progress message.
   *
   * @param {string} message
   * @return {boolean} If message was valid.
   */
  SetProgressMessage: bbbfly.apploader._setProgressMessage,
  /**
   * @function
   * @name SetProgress
   * @memberof bbbfly.AppLoader#
   * @description Set progress to certain percentage.
   *
   * @param {float} progress - Percentage progress value
   * @return {boolean} If progress was valid.
   *
   * @see {@link bbbfly.AppLoader#ClearProgress|ClearProgress()}
   */
  SetProgress: bbbfly.apploader._setProgress,
  /**
   * @function
   * @name ClearProgress
   * @memberof bbbfly.AppLoader#
   * @description Set progress to 0% (step 0).
   *
   * @see {@link bbbfly.AppLoader#SetProgress|SetProgress()}
   */
  ClearProgress: bbbfly.apploader._clearProgress,
  /**
   * @function
   * @name SetStepsCount
   * @memberof bbbfly.AppLoader#
   * @description Define number of progress steps for easy progress handling.
   *
   * @param {integer} count - Number of progress steps
   * @return {boolean} If number of steps was valid.
   *
   * @see {@link bbbfly.AppLoader#MoveByStep|MoveByStep()}
   */
  SetStepsCount: bbbfly.apploader._setStepsCnt,
  /**
   * @function
   * @name MoveByStep
   * @memberof bbbfly.AppLoader#
   * @description Move progress by one defined step.
   *
   * @return {boolean} If number of steps was set.
   *
   * @see {@link bbbfly.AppLoader#SetStepsCount|SetStepsCount()}
   */
  MoveByStep: bbbfly.apploader._moveByStep,
  /**
   * @function
   * @name Hide
   * @memberof bbbfly.AppLoader#
   *
   * @param {bbbfly.Downloader.method} - Download method to use
   * @return {boolean} If loader was hidden.
   */
  Hide: bbbfly.apploader._hide
};

/** @ignore */
var ngOnAppLoadProgress = ngOnAppLoadProgress || function(progress){
  if(Number.isNumber(progress)){
    return bbbfly.AppLoader.SetProgress(progress);
  }
  return false;
};
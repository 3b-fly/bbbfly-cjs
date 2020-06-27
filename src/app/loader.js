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
bbbfly.apploader._getElm = function(id){
  if((typeof id !== 'string') || (id === '')){return null;}
  var elm = this._Elms[id];

  if(!elm){
    elm = document.getElementById(id);
    this._Elms[id] = elm;
  }

  return elm;
};

/** @ignore */
bbbfly.apploader._setProgressMessage = function(message){
  var msgElm = this.GetElm(bbbfly.AppLoader.eml.loadMessage);
  if(msgElm && String.isString(message)){
    msgElm.innerHTML = message;
    return true;
  }
  return false;
};

/** @ignore */
bbbfly.apploader._setProgress = function(progress){
  if(!Number.isNumber(progress)){return false;}

  this._Progress = progress;
  var fnc = function(){bbbfly.AppLoader.UpdateProgress();};

  setTimeout(fnc,1);
  return true;
};

/** @ignore */
bbbfly.apploader._getProgress = function(){
  return Number.isNumber(this._Progress) ? this._Progress : 0;
};

/** @ignore */
bbbfly.apploader._clearProgress = function(){
  this._Step = 0;
  this.SetProgress(0);
};

/** @ignore */
bbbfly.apploader._updateProgress = function(){
  var progressElm = this.GetElm(bbbfly.AppLoader.eml.loadProgress);
  if(!progressElm){return false;}

  progressElm.style.width = (this.GetProgress()+'%');
  return true;
};

/** @ignore */
bbbfly.apploader._setStepsCnt = function(count){
  if(!Number.isInteger(count)){return false;}

  this._StepsCnt = count;
  this._StepSize = Math.floor(100/count);
  return true;
};

/** @ignore */
bbbfly.apploader._moveByStep = function(){
  if(!Number.isInteger(this._Step) || !Number.isInteger(this._StepSize)){
    return false;
  }

  this._Step++;
  return this.SetProgress(this._Step*this._StepSize);
};

/** @ignore */
bbbfly.apploader._fail = function(){
  this._Failed = true;

  var errorElm = this.GetElm(bbbfly.AppLoader.eml.error);
  if(!errorElm){return false;}

  var loadElm = this.GetElm(bbbfly.AppLoader.eml.load);
  if(loadElm){loadElm.style.display = 'none';}

  errorElm.style.display = 'block';
  return true;
};

/** @ignore */
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

/** @ignore */
bbbfly.apploader._hide = function(){
  var loader = this.GetElm(bbbfly.AppLoader.eml.loader);
  if(this._Failed || !loader){return false;}

  if(loader.className !== ''){loader.className += ' ';}
  loader.className += 'bbbflyAppLoaderFinished';
  return true;
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
  _Elms: {},
  /** @private */
  _Failed: false,

  /**
   * @function
   * @name GetElm
   * @memberof bbbfly.AppLoader#
   * @description Get html element
   *
   * @param {bbbfly.AppLoader.eml} string
   * @return {div}
   */
  GetElm: bbbfly.apploader._getElm,
  /**
   * @function
   * @name SetProgressMessage
   * @memberof bbbfly.AppLoader#
   * @description Set current progress message
   *
   * @param {string} message
   * @return {boolean} If message was valid
   */
  SetProgressMessage: bbbfly.apploader._setProgressMessage,
  /**
   * @function
   * @name SetProgress
   * @memberof bbbfly.AppLoader#
   * @description Set percentage progress
   *
   * @param {float} progress - Percentage progress value
   * @return {boolean} If progress was valid
   *
   * @see {@link bbbfly.AppLoader#GetProgress|GetProgress()}
   * @see {@link bbbfly.AppLoader#ClearProgress|ClearProgress()}
   */
  SetProgress: bbbfly.apploader._setProgress,
  /**
   * @function
   * @name GetProgress
   * @memberof bbbfly.AppLoader#
   * @description Get percentage progress
   *
   * @return {number} Progress
   *
   * @see {@link bbbfly.AppLoader#SetProgress|SetProgress()}
   * @see {@link bbbfly.AppLoader#ClearProgress|ClearProgress()}
   */
  GetProgress: bbbfly.apploader._getProgress,
  /**
   * @function
   * @name ClearProgress
   * @memberof bbbfly.AppLoader#
   * @description Set progress to 0% (step 0)
   *
   * @see {@link bbbfly.AppLoader#SetProgress|SetProgress()}
   * @see {@link bbbfly.AppLoader#GetProgress|GetProgress()}
   */
  ClearProgress: bbbfly.apploader._clearProgress,
  /**
   * @function
   * @name UpdateProgress
   * @memberof bbbfly.AppLoader#
   * @description Update progress visualization
   *
   * @return {number} If progress was updated
   */
  UpdateProgress: bbbfly.apploader._updateProgress,
  /**
   * @function
   * @name SetStepsCount
   * @memberof bbbfly.AppLoader#
   * @description Define number of progress steps for easy progress handling
   *
   * @param {integer} count - Number of progress steps
   * @return {boolean} If number of steps was valid
   *
   * @see {@link bbbfly.AppLoader#MoveByStep|MoveByStep()}
   */
  SetStepsCount: bbbfly.apploader._setStepsCnt,
  /**
   * @function
   * @name MoveByStep
   * @memberof bbbfly.AppLoader#
   * @description Move progress by one defined step
   *
   * @return {boolean} If number of steps was set
   *
   * @see {@link bbbfly.AppLoader#SetStepsCount|SetStepsCount()}
   */
  MoveByStep: bbbfly.apploader._moveByStep,
  /**
   * @function
   * @name Fail
   * @memberof bbbfly.AppLoader#
   *
   * @return {boolean} If error was indicated
   */
  Fail: bbbfly.apploader._fail,
  /**
   * @function
   * @name Show
   * @memberof bbbfly.AppLoader#
   *
   * @return {boolean} If loader was shown
   */
  Show: bbbfly.apploader._show,
  /**
   * @function
   * @name Hide
   * @memberof bbbfly.AppLoader#
   *
   * @return {boolean} If loader was hidden
   */
  Hide: bbbfly.apploader._hide
};

/**
 * @enum {string}
 * @description Loader html element IDs
 */
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

/** @ignore */
var ngOnAppLoadProgress = ngOnAppLoadProgress || function(progress){
  return bbbfly.AppLoader.SetProgress(progress);
};

/** @ignore */
var ngOnAppLoadFailed = ngOnAppLoadFailed || function(){
  bbbfly.AppLoader.Fail();
  return false;
};
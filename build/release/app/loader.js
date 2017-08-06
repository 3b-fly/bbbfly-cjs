/**
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
 */
var bbbfly=bbbfly||{};bbbfly.apploader={};bbbfly.apploader._getMessageElm=function(){this._MessageElm||(this._MessageElm=document.getElementById("bbbflyAppLoaderMessage"));return this._MessageElm};bbbfly.apploader._getProgressElm=function(){this._ProgressElm||(this._ProgressElm=document.getElementById("bbbflyAppLoaderProgress"));return this._ProgressElm};bbbfly.apploader._setProgressMessage=function(a){var b=this.GetMessageElm();return b&&"string"===typeof a?(b.innerHTML=a,!0):!1};
bbbfly.apploader._setProgress=function(a){return"number"===typeof a?(this._Progress=a,setTimeout(bbbfly.apploader._updateProgress,1),!0):!1};bbbfly.apploader._clearProgress=function(){this._Step=0;this.SetProgress(0)};bbbfly.apploader._updateProgress=function(){var a=bbbfly.AppLoader.GetProgressElm(),b=bbbfly.AppLoader._Progress;return a&&"number"===typeof b?(a.style.width=b+"%",!0):!1};
bbbfly.apploader._setStepsCnt=function(a){return"number"===typeof a?(this._StepsCnt=a,this._StepSize=Math.floor(100/a),!0):!1};bbbfly.apploader._moveByStep=function(){return"number"===typeof this._Step&&"number"===typeof this._StepSize?(this._Step++,this.SetProgress(this._Step*this._StepSize)):!1};bbbfly.apploader._hide=function(){var a=document.getElementById("bbbflyAppLoader");return a?(""!==a.className&&(a.className+=" "),a.className+="bbbflyAppLoaderFinished",!0):!1};
bbbfly.AppLoader={_Progress:0,_StepsCnt:0,_StepSize:0,_Step:0,_MessageElm:null,_ProgressElm:null,GetMessageElm:bbbfly.apploader._getMessageElm,GetProgressElm:bbbfly.apploader._getProgressElm,SetProgressMessage:bbbfly.apploader._setProgressMessage,SetProgress:bbbfly.apploader._setProgress,ClearProgress:bbbfly.apploader._clearProgress,SetStepsCount:bbbfly.apploader._setStepsCnt,MoveByStep:bbbfly.apploader._moveByStep,Hide:bbbfly.apploader._hide};
var ngOnAppLoadProgress=ngOnAppLoadProgress||function(a){return"number"===typeof a?bbbfly.AppLoader.SetProgress(a):!1};

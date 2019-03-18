/**
 * @file
 * @author Jan Nejedly [support@3b-fly.eu]
 * @copyright Jan Nejedly
 *
 * @inpackage listener
 */

/** @ignore */
var bbbfly = bbbfly || {};
/**
 * @namespace
 * @description
 *   Set any control {@link bbbfly.listener.Listenable|AllowListeners} property to true
 *   or use {@link bbbfly.listener.SetListenable|SetListenable()} method
 *   to allow its events listening.
 *
 * @inpackage listener
 *
 * @example
 * var appForm;
 * function ngMain(){
 *
 *   appForm = new ngControls({
 *     Invoker: {
 *       Type: 'ngPanel',
 *       Data: {
 *         AllowListeners: true
 *       }
 *     }
 *   });
 *
 *   var Listener = {
 *     OnUpdate: function(){return true;}
 *     OnUpdated: function(){}
 *   };
 *
 *   appForm.Invoker.AddListener(['OnUpdate','OnUpdated'],Listener);
 *
 *   //...or...
 *
 *   bbbfly.listener.SetListenable(Listener,true);
 *   Listener.AddListener(['OnUpdated'],{
 *     OnUpdated: function(){}
 *   });
 *
 *   appForm.Update();
 * }
 */
bbbfly.listener = {};

/**
 * @function
 * @name Initialize
 * @memberOf bbbfly.listener
 * @description
 *   Initialize listener to add
 *   {@link bbbfly.listener.Listenable|interface} methods automatically
 *
 * @see {@link bbbfly.listener.SetListenable|SetListenable()}
 * @see {@link bbbfly.listener.Listenable|Listenable.AllowListeners}
 */
bbbfly.listener.Initialize = function(){
  ngOnControlCreated = ngAddEvent(ngOnControlCreated,
    function(control){bbbfly.listener.SetListenable(control);}
  );
};

/**
 * @function
 * @name SetListenable
 * @memberOf bbbfly.listener
 * @description
 *   Sets {@link bbbfly.listener.Listenable|Listenable} interface methods to passed object
 *   if its {@link bbbfly.listener.Listenable|AllowListeners} property is set to true.
 *
 * @param {object} obj
 *   Object whose events should be listenable
 * @param {boolean} force
 *   Set object listenable even if
 *   its {@link bbbfly.listener.Listenable|AllowListeners} property is set to false
 * @return {boolean} If was set
 */
bbbfly.listener.SetListenable = function(obj,force){
  if(typeof obj.AllowListeners === 'undefined'){
    obj.AllowListeners = false;
  }

  if(
    obj && (typeof obj === 'object')
    && (force || obj.AllowListeners)
    && !obj._listeners
  ){
    obj._listeners = new Array();

    obj.AddListener = ngAddEvent(
      obj.AddListener,bbbfly.listener._addListener
    );
    obj.RemoveListener = ngAddEvent(
      obj.RemoveListener,bbbfly.listener._removeListener
    );

    return true;
  }
  return false;
};

/**
 * @function
 * @name AddListener
 * @memberof bbbfly.listener.Listenable#
 * @description Add object events listener. Listener must implement listening event functions.
 *
 * @param {string[]} eventNames - Names of events to listen
 * @param {object} listener
 * @return {boolean} If listener was added
 */
bbbfly.listener._addListener = function(eventNames,listener){
  if(
    ((typeof eventNames !== 'object') || !eventNames)
    || ((typeof listener !== 'object') || !listener)
  ){return false;}

  for(var i in eventNames){
    var eventNm = eventNames[i];
    if(
      !String.isString(eventNm)
      || !Function.isFunction(listener[eventNm])
      || (!Function.isFunction(this[eventNm]) && this[eventNm])
    ){return false;}
  }

  for(var j in eventNames){
    var eventNm = eventNames[j];
    var listeners = this._listeners[eventNm];

    if(!Array.isArray(listeners)){
      bbbfly.listener._doAddListener(this,eventNm);
      listeners = this._listeners[eventNm];
    }

    if(!Array.includes(listeners,listener)){
      listeners.push(listener);
    }
  }
  return true;
};

/**
 * @function
 * @name RemoveListener
 * @memberof bbbfly.listener.Listenable#
 * @description Remove object event listener.
 *
 * @param {string[]} eventNames - Names of events to do not listen
 * @param {object} listener
 * @return {boolean} If listener was removed
 */
bbbfly.listener._removeListener = function(eventNames,listener){
  if(
    ((typeof eventNames !== 'object') || !eventNames)
    || ((typeof listener !== 'object') || !listener)
  ){return false;}

  for(var i in eventNames){
    var eventNm = eventNames[i];
    var listeners = this._listeners[eventNm];

    if(Array.isArray(listeners)){
      for(var j in listeners){
        if(listeners[j] === listener){
          listeners.splice(j,1);
          break;
        }
      }
    }
  }
  return true;
};

/** @ignore */
bbbfly.listener._doAddListener = function(obj,eventNm){
  obj._listeners[eventNm] = new Array();

  obj[eventNm] = ngAddEvent(obj[eventNm],function(){
    var listeners = this._listeners[eventNm];
    if(Array.isArray(listeners)){
      for(var i in listeners){
        var listener = listeners[i];
        if(Function.isFunction(listener[eventNm])){
          listener[eventNm].apply(
            listener,(arguments ? arguments : [])
          );
        }
      }
    }
    return true;
  });
};

/**
 * @interface
 * @name Listenable
 * @memberof bbbfly.listener
 *
 * @property {boolean} [AllowListeners=false]
 *   Interface methods
 *   {@link bbbfly.listener.Listenable#AddListener|AddListener()}
 *   and {@link bbbfly.listener.Listenable#RemoveListener|RemoveListener()}
 *   can be added if set to true
 */
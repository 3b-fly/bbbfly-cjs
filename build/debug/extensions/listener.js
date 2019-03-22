/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/


var bbbfly = bbbfly || {};
bbbfly.listener = {
  _initialized: false
};
bbbfly.listener.Initialize = function(){
  if(this._initialized){return;}

  ngOnControlCreated = ngAddEvent(ngOnControlCreated,
    function(control){bbbfly.listener.SetListenable(control);}
  );

  this._initialized = true;
};
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
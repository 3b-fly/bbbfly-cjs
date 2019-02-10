/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/


var bbbfly = bbbfly || {};
bbbfly.listener = {};
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
      || (typeof listener[eventNm] !== 'function')
      || ((typeof this[eventNm] !== 'function') && (this[eventNm] !== null))
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
        if(typeof listener[eventNm] === 'function'){
          listener[eventNm].apply(
            listener,(arguments ? arguments : [])
          );
        }
      }
    }
    return true;
  });
};
var ngOnControlCreated = ngAddEvent(ngOnControlCreated,
  function(control){bbbfly.listener.SetListenable(control);}
);

/**
 * @interface
 * @name Listenable
 * @memberof bbbfly.listener
 *
 * @property {boolean} [AllowListeners=false] - If set to true, interface methods will be added
 */
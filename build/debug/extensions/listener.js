/**
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
      (typeof eventNm !== 'string')
      || (typeof listener[eventNm] !== 'function')
      || ((typeof this[eventNm] !== 'function') && (this[eventNm] !== null))
    ){return false;}
  }

  for(var i in eventNames){
    var eventNm = eventNames[i];
    var listeners = this._listeners[eventNm];
    if(!Array.isArray(listeners)){
      listeners = new Array();
      this._listeners[eventNm] = listeners;

      var invoke = function(){
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
      };
      this[eventNm] = ngAddEvent(this[eventNm],invoke);
    }

    if(!listeners.includes(listener)){
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
      for(var i in listeners){
        if(listeners[i] === listener){
          listeners.splice(i,1);
          break;
        }
      }
    }
  }
  return true;
};
var ngOnControlCreated = ngAddEvent(ngOnControlCreated,
  function(control){bbbfly.listener.SetListenable(control);}
);

/**
 * @interface Listenable
 * @memberOf bbbfly.listener
 *
 * @property {boolean} [AllowListeners=false] - If set to true, interface methods will be added
 */
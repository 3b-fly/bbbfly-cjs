/**
 * @file
 * @author Jan Nejedly [support@3b-fly.eu]
 * @copyright Jan Nejedly
 *
 * @inpackage dom
 */

/** @ignore */
var bbbfly = bbbfly || {};
/** @ignore */
bbbfly.dom = {};

/** @ignore */
bbbfly.dom._addEvent = function(node,name,fnc){
  if(node instanceof HTMLElement){
    if(node.addEventListener){node.addEventListener(name,fnc,false);}
    else if(node.attachEvent){node.attachEvent(name,fnc);}
  }
};

/** @ignore */
bbbfly.dom._removeEvent = function(node,name,fnc){
  if(node instanceof HTMLElement){
    if(node.removeEventListener){node.removeEventListener(name,fnc,false);}
    else if(node.detachEvent){node.detachEvent(name,fnc);}
  }
};

/** @ignore */
bbbfly.dom._stopEvent = function(event){
  if(!event){event = window.event;}

  if(event instanceof window.Event){
    if(event.stopPropagation){event.stopPropagation();}
    else{event.cancelBubble = true;}

    if(event.preventDefault){event.preventDefault();}
    else{event.returnValue = false;}
  }
};

/** @ignore */
bbbfly.dom._elementContains = function(parent,child){
  if(!(parent instanceof HTMLElement)){return false;}
  if(!(child instanceof HTMLElement)){return false;}

  if(typeof parent.contains === 'function'){
    return parent.contains(child);
  }
  else{
    while(child){
      if((child === parent)){return true;}
      else{child = child.parentNode;}
    }
  }
  return false;
};

/**
 * @class
 * @hideconstructor
 */
bbbfly.DOM = {
  
  /**
   * @function
   * @name AddEvent
   * @memberof bbbfly.DOM#
   * @description Adds event listener to DOM node.
   *
   * @param {HTMLElement} node - HTML element
   * @param {string} name - Event name
   * @param {function} fnc - Listener function
   */
  AddEvent: bbbfly.dom._addEvent,

  /**
   * @function
   * @name RemoveEvent
   * @memberof bbbfly.DOM#
   * @description Removes event listener from DOM node.
   *
   * @param {HTMLElement} node - HTML element
   * @param {string} name - Event name
   * @param {function} fnc - Listener function
   */
  RemoveEvent: bbbfly.dom._removeEvent,

  /**
   * @function
   * @name StopEvent
   * @memberof bbbfly.DOM#
   * @description Stops event propagation.
   *
   * @param {Event} event - Event
   */
  StopEvent: bbbfly.dom._stopEvent,

  /**
   * @function
   * @name ElementContains
   * @memberof bbbfly.DOM#
   * @description Check if MTML Element contains another element while providing old IE support.
   *
   * @param {HTMLElement} parent - Parent HTML element
   * @param {HTMLElement} child - Child HTML element
   * @return {boolean}
   */
  ElementContains: bbbfly.dom._elementContains
};
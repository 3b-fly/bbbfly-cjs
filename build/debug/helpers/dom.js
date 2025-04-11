/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.1
 * @license see license in 'LICENSE' file
*/

var bbbfly = bbbfly || {};
bbbfly.dom = {};
bbbfly.dom._addEvent = function(node,name,fnc){
  if(node instanceof HTMLElement){
    if(node.addEventListener){node.addEventListener(name,fnc,false);}
    else if(node.attachEvent){node.attachEvent(name,fnc);}
  }
};
bbbfly.dom._removeEvent = function(node,name,fnc){
  if(node instanceof HTMLElement){
    if(node.removeEventListener){node.removeEventListener(name,fnc,false);}
    else if(node.detachEvent){node.detachEvent(name,fnc);}
  }
};
bbbfly.dom._stopEvent = function(event){
  if(!event){event = window.event;}

  if(event instanceof window.Event){
    if(event.stopPropagation){event.stopPropagation();}
    else{event.cancelBubble = true;}

    if(event.preventDefault){event.preventDefault();}
    else{event.returnValue = false;}
  }
};
bbbfly.DOM = {
  AddEvent: bbbfly.dom._addEvent,
  RemoveEvent: bbbfly.dom._removeEvent,
  StopEvent: bbbfly.dom._stopEvent
};
/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/


var bbbfly = bbbfly || {};
bbbfly.widget = {};
bbbfly.widget.registry = {};
bbbfly.widget.registry._widgetId = function(widget){
  if(Object.isObject(widget)){
    var widgetId = widget.WidgetId;
    if(String.isString(widgetId) && (widgetId !== '')){
      return  widgetId;
    }
  }
  return null;
};
bbbfly.widget.registry._registerWidget = function(widget){
  if(!Object.isObject(widget)){return false;}

  var widgetId = this.WidgetId(widget);
  if(!widgetId){return false;}

  if(this._Widgets[widgetId]){return true;}

  this._Widgets[widgetId] = widget;
  widget.AddEvent('OnShow',bbbfly.widget.registry._onWidgetShow);
  widget.AddEvent('OnShown',bbbfly.widget.registry._onWidgetShown);
  widget.AddEvent('OnHidden',bbbfly.widget.registry._onWidgetHidden);

  bbbfly.widget.registry._registerWidgetInGroup(widget);
  return true;
};
bbbfly.widget.registry._registerWidgetInGroup = function(widget){
  var registry = bbbfly.WidgetRegistry;
  var widgetGroup = widget.WidgetGroup;

  if(registry && String.isString(widgetGroup)){
    if(typeof registry._WidgetGroups[widgetGroup] !== 'object'){
      registry._WidgetGroups[widgetGroup] = new Array();
      registry._WidgetGroups_Shown[widgetGroup] = null;
    }
    registry._WidgetGroups[widgetGroup].push(widget);
  }
};
bbbfly.widget.registry._unregisterWidgetFromGroup = function(widget){
  var registry = bbbfly.WidgetRegistry;
  var widgetGroup = widget.WidgetGroup;

  if(registry && String.isString(widgetGroup)){
    var registryGroup = registry._WidgetGroups[widgetGroup];
    var registryGroupShown = bbbfly.WidgetRegistry._WidgetGroups_Shown;

    if(typeof registryGroup === 'object'){
      for(var i in registryGroup){
        if(registryGroup[i] === widget){
          registryGroup.splice(i,1);
          break;
        }
      }
    }
    if(registryGroupShown[widgetGroup] === widget){
      registryGroupShown[widgetGroup] = null;
    }
  }
};
bbbfly.widget.registry._getWidgets = function(){
  return this._Widgets;
};
bbbfly.widget.registry._getWidgetById = function(id){
  if(String.isString(id) && this._Widgets[id]){
    return this._Widgets[id];
  }
  return null;
};
bbbfly.widget.registry._getGroupWidgets = function(group){
  if(String.isString(group) && this._WidgetGroups[group]){
    return this._WidgetGroups[group];
  }
  return null;
};
bbbfly.widget.registry._getGroupShownWidget = function(group){
  if(String.isString(group) && this._WidgetGroups_Shown[group]){
    return this._WidgetGroups_Shown[group];
  }
  return null;
};
bbbfly.widget.registry._callWidget = function(widget,funcName,args){
  if(
    Object.isObject(widget) && String.isString(funcName)
    && ((typeof args === 'undefined') || (typeof args === 'object'))
    && (Function.isFunction(widget[funcName]))
  ){
    return widget[funcName].apply(widget,(args ? args : []));
  }
  return undefined;
};
bbbfly.widget.registry._callWidgetById = function(id,funcName,args){
  var widgets = this.GetWidgets();
  if(widgets[id]){
    return this.CallWidget(widgets[id],funcName,args);
  }
  return undefined;
};
bbbfly.widget.registry._callAllWidgets = function(funcName,args){
  if(
    !String.isString(funcName)
    || ((typeof args !== 'undefined') && (typeof args !== 'object'))
  ){return null;}

  return bbbfly.widget.registry._callWidgets(
    this.GetWidgets(),funcName,args
  );
};
bbbfly.widget.registry._callAllGroupWidgets = function(group,funcName,args){
  if(
    !String.isString(group) || !String.isString(funcName)
    || ((typeof args !== 'undefined') && (typeof args !== 'object'))
  ){return null;}

  return bbbfly.widget.registry._callWidgets(
    this.GetGroupWidgets(group),funcName,args
  );
};
bbbfly.widget.registry._callWidgets = function(widgets,funcName,args){
  if(widgets){
    var returns = [];
    ngApp.BeginUpdateParams();
    for(var i in widgets){
      var widget = widgets[i];
      if(Function.isFunction(widget[funcName])){
        returns.push(widget[funcName].apply(widget,(args ? args : [])));
      }
    }
    ngApp.EndUpdateParams();
    return returns;
  }
  return null;
};
bbbfly.widget.registry._onWidgetShow = function(force){
  var groupName = this.WidgetGroup;
  if(String.isString(groupName)){
    var group = bbbfly.WidgetRegistry.GetGroupWidgets(groupName);
    if(group){
      for(var i in group){
        var widget = group[i];
        if(widget !== this){

          if(Function.isFunction(widget.IsShown) && widget.IsShown()){
            var canHide = false;

            if(force && Function.isFunction(widget.CanForceHide)){
              canHide = widget.CanForceHide();
            }
            else if(Function.isFunction(widget.CanHide)){
              canHide = widget.CanHide();
            }
            if(!canHide){return false;}
          }
        }
      }
    }
  }
  return true;
};
bbbfly.widget.registry._onWidgetShown = function(force){
  var registry = bbbfly.WidgetRegistry;
  registry.CallAllWidgets('OnWidgetShown',[this]);

  var groupName = this.WidgetGroup;
  if(String.isString(groupName)){
    var group = registry.GetGroupWidgets(groupName);
    if(group){
      for(var i in group){
        var widget = group[i];
        if(widget !== this){
          if(force && Function.isFunction(widget.ForceHide)){
            widget.ForceHide();
          }
          else if(Function.isFunction(widget.Hide)){
            widget.Hide();
          }
        }
      }
      registry._WidgetGroups_Shown[groupName] = this;
      registry.CallAllWidgets('OnWidgetGroupChanged',[groupName]);
    }
  }
};
bbbfly.widget.registry._onWidgetHidden = function(force){
  var registry = bbbfly.WidgetRegistry;
  registry.CallAllWidgets('OnWidgetHidden',[this]);

  var groupName = this.WidgetGroup;
  if(String.isString(groupName)){
    if(this === registry.GetGroupShownWidget(groupName)){
      registry._WidgetGroups_Shown[groupName] = null;
      registry.CallAllWidgets('OnWidgetGroupChanged',[groupName]);
    }
  }
};
bbbfly.widget._setForced = function(forced){
  if(forced){
    var shown = this.IsShown();
    this._forceShown = (shown ? true : false);
    this._forceHidden = (shown ? false : true);
  }
  else{
    this._forceShown = false;
    this._forceHidden = false;
  }
};
bbbfly.widget._canShow = function(){
  return (!this._forceHidden && this.CanForceShow());
};
bbbfly.widget._canHide = function(){
  return (!this._forceShown && this.CanForceHide());
};
bbbfly.widget._canForceShow = function(){
  return (this.AllowShow && !this.IsShown());
};
bbbfly.widget._canForceHide = function(){
  return (this.AllowHide && this.IsShown());
};
bbbfly.widget._show = function(){
  if(this.CanShow()){return this._DoShow(false);}
  return false;
};
bbbfly.widget._hide = function(){
  if(this.CanHide()){return this._DoHide(false);}
  return false;
};
bbbfly.widget._forceShow = function(force){
  if(this.CanForceShow()){
    this._DoShow(true);
    this._forceShown = true;
    this._forceHidden = false;
  }
};
bbbfly.widget._forceHide = function(){
  if(this.CanForceHide()){
    this._DoHide(true);
    this._forceShown = false;
    this._forceHidden = true;
  }
};
bbbfly.widget._doShow = function(force){

  ngApp.BeginUpdateParams();
  if(Function.isFunction(this.OnShow) && !this.OnShow(force)){
    ngApp.EndUpdateParams();
    return false;
  }

  this.SetVisible(true);
  if(Function.isFunction(this.OnShown)){this.OnShown(force);}

  ngApp.EndUpdateParams();
  return true;
};
bbbfly.widget._doHide = function(force){

  ngApp.BeginUpdateParams();
  if(Function.isFunction(this.OnHide) && !this.OnHide(force)){
    ngApp.EndUpdateParams();
    return false;
  }

  this.SetVisible(false);
  if(Function.isFunction(this.OnHidden)){this.OnHidden(force);}

  ngApp.EndUpdateParams();
  return true;
};
bbbfly.widget._showOrHide = function(){
  var shown = this.IsShown();
  if(shown){return !this.Hide();}
  else{return this.Show();}
};
bbbfly.widget._forceShowOrHide = function(){
  var shown = this.IsShown();
  if(shown){return !this.ForceHide();}
  else{return this.ForceShow();}
};
bbbfly.widget._isShown = function(){
  return !!(this.Visible);
};
bbbfly.widget._setWidgetGroup = function(groupName){
  if(String.isString(groupName) && (groupName !== this.WidgetGroup)){
    bbbfly.widget.registry._unregisterWidgetFromGroup(this);
    this.WidgetGroup = groupName;
    bbbfly.widget.registry._registerWidgetInGroup(this);
    return true;
  }
  return false;
};
bbbfly.WidgetRegistry = {
  _Widgets: {},
  _WidgetGroups: {},
  _WidgetGroups_Shown: {},
  WidgetId: bbbfly.widget.registry._widgetId,
  RegisterWidget: bbbfly.widget.registry._registerWidget,
  GetWidgets: bbbfly.widget.registry._getWidgets,
  GetWidgetById: bbbfly.widget.registry._getWidgetById,
  GetGroupWidgets: bbbfly.widget.registry._getGroupWidgets,
  GetGroupShownWidget: bbbfly.widget.registry._getGroupShownWidget,
  CallWidget: bbbfly.widget.registry._callWidget,
  CallWidgetById: bbbfly.widget.registry._callWidgetById,
  CallAllWidgets: bbbfly.widget.registry._callAllWidgets,
  CallAllGroupWidgets: bbbfly.widget.registry._callAllGroupWidgets
};
bbbfly.Widget = function(def,ref,parent){

  ng_MergeDef(def,{
    ParentReferences: false,
    Data: {
      WidgetId: null,
      WidgetGroup: null,
      AllowHide: true,
      AllowShow: true,

      Visible: false,
      _forceHidden: false,
      _forceShown: false
    },
    Events: {
      OnShow: null,
      OnHide: null,
      OnShown: null,
      OnHidden: null
    },
    Methods: {
      _DoShow: bbbfly.widget._doShow,
      _DoHide: bbbfly.widget._doHide,
      SetForced: bbbfly.widget._setForced,
      CanShow: bbbfly.widget._canShow,
      CanHide: bbbfly.widget._canHide,
      CanForceShow: bbbfly.widget._canForceShow,
      CanForceHide: bbbfly.widget._canForceHide,
      Show: bbbfly.widget._show,
      Hide: bbbfly.widget._hide,
      ShowOrHide: bbbfly.widget._showOrHide,
      ForceShow: bbbfly.widget._forceShow,
      ForceHide: bbbfly.widget._forceHide,
      ForceShowOrHide: bbbfly.widget._forceShowOrHide,
      IsShown: bbbfly.widget._isShown,
      SetWidgetGroup: bbbfly.widget._setWidgetGroup
    }
  });

  var c = ngCreateControlAsType(def,'ngPanel',ref, parent);
  if(c){bbbfly.WidgetRegistry.RegisterWidget(c);}
  return c;
};
ngUserControls = ngUserControls || new Array();
ngUserControls['bbbfly_widget'] = {
  OnInit: function(){
    ngRegisterControlType('bbbfly.Widget',bbbfly.Widget);
  }
};

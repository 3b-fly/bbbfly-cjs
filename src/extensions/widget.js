/**
 * @file
 * @author Jan Nejedly [support@3b-fly.eu]
 * @copyright Jan Nejedly
 *
 * @inpackage widget
 */

/** @ignore */
var bbbfly = bbbfly || {};
/** @ignore */
bbbfly.widget = {};
/** @ignore */
bbbfly.widget.registry = {};

/** @ignore */
bbbfly.widget.registry._widgetId = function(widget){
  if(Object.isObject(widget)){
    var widgetId = widget.WidgetId;
    if(String.isString(widgetId) && (widgetId !== '')){
      return  widgetId;
    }
  }
  return null;
};

/** @ignore */
bbbfly.widget.registry._registerWidget = function(widget){
  if(!Object.isObject(widget)){return false;}

  var widgetId = this.WidgetId(widget);
  if(!widgetId || this._Widgets[widgetId]){return false;}

  this._Widgets[widgetId] = widget;
  widget.AddEvent('OnShow',bbbfly.widget.registry._onWidgetShow);
  widget.AddEvent('OnShown',bbbfly.widget.registry._onWidgetShown);
  widget.AddEvent('OnHidden',bbbfly.widget.registry._onWidgetHidden);

  bbbfly.widget.registry._registerWidgetInGroup(widget);
  return true;
};

/** @ignore */
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

/** @ignore */
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

/** @ignore */
bbbfly.widget.registry._getWidgets = function(){
  return this._Widgets;
};

/** @ignore */
bbbfly.widget.registry._getWidgetById = function(id){
  if(String.isString(id) && this._Widgets[id]){
    return this._Widgets[id];
  }
  return null;
};

/** @ignore */
bbbfly.widget.registry._getGroupWidgets = function(group){
  if(String.isString(group) && this._WidgetGroups[group]){
    return this._WidgetGroups[group];
  }
  return null;
};

/** @ignore */
bbbfly.widget.registry._getGroupShownWidget = function(group){
  if(String.isString(group) && this._WidgetGroups_Shown[group]){
    return this._WidgetGroups_Shown[group];
  }
  return null;
};

/** @ignore */
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

/** @ignore */
bbbfly.widget.registry._callWidgetById = function(id,funcName,args){
  var widgets = this.GetWidgets();
  if(widgets[id]){
    return this.CallWidget(widgets[id],funcName,args);
  }
  return undefined;
};

/** @ignore */
bbbfly.widget.registry._callAllWidgets = function(funcName,args){
  if(
    !String.isString(funcName)
    || ((typeof args !== 'undefined') && (typeof args !== 'object'))
  ){return null;}

  return bbbfly.widget.registry._callWidgets(
    this.GetWidgets(),funcName,args
  );
};

/** @ignore */
bbbfly.widget.registry._callAllGroupWidgets = function(group,funcName,args){
  if(
    !String.isString(group) || !String.isString(funcName)
    || ((typeof args !== 'undefined') && (typeof args !== 'object'))
  ){return null;}

  return bbbfly.widget.registry._callWidgets(
    this.GetGroupWidgets(group),funcName,args
  );
};

/** @ignore */
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

/** @ignore */
bbbfly.widget.registry._onWidgetShow = function(force){
  var groupName = this.WidgetGroup;
  if(String.isString(groupName)){
    var group = bbbfly.WidgetRegistry.GetGroupWidgets(groupName);
    if(group){
      for(var i in group){
        var widget = group[i];
        if((widget !== this) && widget.IsShown()){
          var canHide = (force ? widget.CanForceHide() : widget.CanHide());
          if(!canHide){ return false;}
        }
      }
    }
  }
  return true;
};

/** @ignore */
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
          if(force){widget.ForceHide();}
          else{widget.Hide();}
        }
      }
      registry._WidgetGroups_Shown[groupName] = this;
      registry.CallAllWidgets('OnWidgetGroupChanged',[groupName]);
    }
  }
};


/** @ignore */
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

/** @ignore */
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

/** @ignore */
bbbfly.widget._canShow = function(){
  return (!this._forceHidden && this.CanForceShow());
};

/** @ignore */
bbbfly.widget._canHide = function(){
  return (!this._forceShown && this.CanForceHide());
};

/** @ignore */
bbbfly.widget._canForceShow = function(){
  return (this.AllowShow && !this.IsShown());
};

/** @ignore */
bbbfly.widget._canForceHide = function(){
  return (this.AllowHide && this.IsShown());
};

/** @ignore */
bbbfly.widget._show = function(){
  if(this.CanShow()){return this._DoShow(false);}
  return false;
};

/** @ignore */
bbbfly.widget._hide = function(){
  if(this.CanHide()){return this._DoHide(false);}
  return false;
};

/** @ignore */
bbbfly.widget._forceShow = function(force){
  if(this.CanForceShow()){
    this._DoShow(true);
    this._forceShown = true;
    this._forceHidden = false;
  }
};

/** @ignore */
bbbfly.widget._forceHide = function(){
  if(this.CanForceHide()){
    this._DoHide(true);
    this._forceShown = false;
    this._forceHidden = true;
  }
};

/** @ignore */
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

/** @ignore */
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

/** @ignore */
bbbfly.widget._showOrHide = function(){
  var shown = this.IsShown();
  if(shown){return !this.Hide();}
  else{return this.Show();}
};

/** @ignore */
bbbfly.widget._forceShowOrHide = function(){
  var shown = this.IsShown();
  if(shown){return !this.ForceHide();}
  else{return this.ForceShow();}
};

/** @ignore */
bbbfly.widget._isShown = function(){
  return !!(this.Visible);
};

/** @ignore */
bbbfly.widget._setWidgetGroup = function(groupName){
  if(String.isString(groupName) && (groupName !== this.WidgetGroup)){
    bbbfly.widget.registry._unregisterWidgetFromGroup(this);
    this.WidgetGroup = groupName;
    bbbfly.widget.registry._registerWidgetInGroup(this);
    return true;
  }
  return false;
};

/**
 * @class
 * @hideconstructor
 *
 * @inpackage widget
 */
bbbfly.WidgetRegistry = {
  /** @private */
  _Widgets: {},
  /** @private */
  _WidgetGroups: {},
  /** @private */
  _WidgetGroups_Shown: {},

  /**
   * @function
   * @name WidgetId
   * @memberof bbbfly.WidgetRegistry#
   *
   * @param {bbbfly.Widget} - Widget
   * @return {string|null} Widget ID
   */
  WidgetId: bbbfly.widget.registry._widgetId,

  /**
   * @function
   * @name RegisterWidget
   * @memberof bbbfly.WidgetRegistry#
   *
   * @param {bbbfly.Widget} - Widget to register
   * @return {bolean} If widget was registered
   */
  RegisterWidget: bbbfly.widget.registry._registerWidget,
  /**
   * @function
   * @name GetWidgets
   * @memberof bbbfly.WidgetRegistry#
   *
   * @return {bbbfly.Widget[]}
   */
  GetWidgets: bbbfly.widget.registry._getWidgets,
  /**
   * @function
   * @name GetWidgetById
   * @memberof bbbfly.WidgetRegistry#
   *
   * @param {string} id - Widget id
   * @return {bbbfly.Widget}
   */
  GetWidgetById: bbbfly.widget.registry._getWidgetById,
  /**
   * @function
   * @name GetGroupWidgets
   * @memberof bbbfly.WidgetRegistry#
   * @description Get all widgets of certain group
   *
   * @param {string} group - Widget group id
   * @return {bbbfly.Widget[]}
   */
  GetGroupWidgets: bbbfly.widget.registry._getGroupWidgets,
  /**
   * @function
   * @name GetGroupShownWidget
   * @memberof bbbfly.WidgetRegistry#
   * @description Get widget shown in certain group
   *
   * @param {string} group - Widget group id
   * @return {bbbfly.Widget}
   */
  GetGroupShownWidget: bbbfly.widget.registry._getGroupShownWidget,
  /**
   * @function
   * @name CallWidget
   * @memberof bbbfly.WidgetRegistry#
   * @description Call widget method
   *
   * @param {bbbfly.Widget} widget
   * @param {string} funcName - Method to call
   * @param {mixed[]} args - Method arguments
   * @return {mixed} called method return value
   */
  CallWidget: bbbfly.widget.registry._callWidget,
  /**
   * @function
   * @name CallWidgetById
   * @memberof bbbfly.WidgetRegistry#
   * @description Call widget method
   *
   * @param {string} id - Widget id
   * @param {string} funcName - Method to call
   * @param {mixed[]} args - Method arguments
   * @return {mixed} called method return value
   */
  CallWidgetById: bbbfly.widget.registry._callWidgetById,
  /**
   * @function
   * @name CallAllWidgets
   * @memberof bbbfly.WidgetRegistry#
   * @description Call all widgets method
   *
   * @param {string} funcName - Method to call
   * @param {mixed[]} args - Method arguments
   * @return {mixed[]} Array of returned values
   */
  CallAllWidgets: bbbfly.widget.registry._callAllWidgets,
  /**
   * @function
   * @name CallAllGroupWidgets
   * @memberof bbbfly.WidgetRegistry#
   * @description Call all widgets in group method
   *
   * @param {string} group - Widget group id
   * @param {string} funcName - Method to call
   * @param {mixed[]} args - Method arguments
   * @return {mixed[]} Array of returned values
   */
  CallAllGroupWidgets: bbbfly.widget.registry._callAllGroupWidgets
};

/**
 * @class
 * @type control
 * @extends ngPanel
 *
 * @inpackage widget
 *
 * @param {object} [def=undefined] - Descendant definition
 * @param {object} [ref=undefined] - Reference owner
 * @param {object|string} [parent=undefined] - Parent DIV element or it's ID
 *
 * @property {string} [WidgetId=null] - Widget ID
 * @property {string} [WidgetGroup=null] - Widget group ID
 * @property {boolean} [AllowHide=null] - If widget can hide
 * @property {boolean} [AllowShow=null] - If widget can show
 */
bbbfly.Widget = function(def,ref,parent){

  ng_MergeDef(def,{
    ParentReferences: false,
    Data: {
      WidgetId: null,
      WidgetGroup: null,
      AllowHide: true,
      AllowShow: true,

      Visible: false,

      /** @private */
      _forceHidden: false,
      /** @private */
      _forceShown: false
    },
    Events: {
      /**
       * @event
       * @name OnShow
       * @memberof bbbfly.Widget#
       *
       * @param {boolean} force - If widget should be force-shown
       * @return {boolean} If widget can show
       *
       * @see {@link bbbfly.Widget#Show|Show()}
       * @see {@link bbbfly.Widget#ForceShow|ForceShow()}
       * @see {@link bbbfly.Widget#OnShown|OnShown}
       */
      OnShow: null,
      /**
       * @event
       * @name OnHide
       * @memberof bbbfly.Widget#
       *
       * @param {boolean} force - If widget should be force-hidden
       * @return {boolean} If widget can hide
       *
       * @see {@link bbbfly.Widget#Hide|Hide()}
       * @see {@link bbbfly.Widget#ForceHide|ForceHide()}
       * @see {@link bbbfly.Widget#OnHidden|OnHidden}
       */
      OnHide: null,
      /**
       * @event
       * @name OnShown
       * @memberof bbbfly.Widget#
       *
       * @param {boolean} force - If widget was force-shown
       *
       * @see {@link bbbfly.Widget#Show|Show()}
       * @see {@link bbbfly.Widget#ForceShow|ForceShow()}
       * @see {@link bbbfly.Widget#OnShow|OnShow}
       */
      OnShown: null,
      /**
       * @event
       * @name OnHidden
       * @memberof bbbfly.Widget#
       *
       * @param {boolean} force - If widget was force-hidden
       *
       * @see {@link bbbfly.Widget#Hide|Hide()}
       * @see {@link bbbfly.Widget#ForceHide|ForceHide()}
       * @see {@link bbbfly.Widget#OnHide|OnHide}
       */
      OnHidden: null
    },
    Methods: {
      /** @private */
      _DoShow: bbbfly.widget._doShow,
      /** @private */
      _DoHide: bbbfly.widget._doHide,
      /**
       * @function
       * @name SetForced
       * @memberof bbbfly.Widget#
       * @description
       *   Widget will be set force-shown or force-hidden depending on its actual state.
       *   Forced widget state can be changed only by force methods.
       *
       * @param {boolean} forced - If set widget forced or not forced
       *
       * @see {@link bbbfly.Widget#CanForceShow|CanForceShow()}
       * @see {@link bbbfly.Widget#CanForceHide|CanForceHide()}
       * @see {@link bbbfly.Widget#ForceShow|ForceShow()}
       * @see {@link bbbfly.Widget#ForceHide|ForceHide()}
       * @see {@link bbbfly.Widget#ForceShowOrHide|ForceShowOrHide()}
       */
      SetForced: bbbfly.widget._setForced,
      /**
       * @function
       * @name CanShow
       * @memberof bbbfly.Widget#
       *
       * @return {boolean} If widget can be shown now
       *
       * @see {@link bbbfly.Widget#Show|Show()}
       * @see {@link bbbfly.Widget#ShowOrHide|ShowOrHide()}
       */
      CanShow: bbbfly.widget._canShow,
      /**
       * @function
       * @name CanHide
       * @memberof bbbfly.Widget#
       *
       * @return {boolean} If widget can be hidden now
       *
       * @see {@link bbbfly.Widget#Hide|Hide()}
       * @see {@link bbbfly.Widget#ShowOrHide|ShowOrHide()}
       */
      CanHide: bbbfly.widget._canHide,
      /**
       * @function
       * @name CanForceShow
       * @memberof bbbfly.Widget#
       *
       * @return {boolean} If widget can be force-shown now
       *
       * @see {@link bbbfly.Widget#ForceShow|ForceShow()}
       * @see {@link bbbfly.Widget#ForceShowOrHide|ForceShowOrHide()}
       * @see {@link bbbfly.Widget#SetForced|SetForced()}
       */
      CanForceShow: bbbfly.widget._canForceShow,
      /**
       * @function
       * @name CanForceHide
       * @memberof bbbfly.Widget#
       *
       * @return {boolean} If widget can be force-hidden now
       *
       * @see {@link bbbfly.Widget#ForceHide|ForceHide()}
       * @see {@link bbbfly.Widget#ForceShowOrHide|ForceShowOrHide()}
       * @see {@link bbbfly.Widget#SetForced|SetForced()}
       */
      CanForceHide: bbbfly.widget._canForceHide,
      /**
       * @function
       * @name Show
       * @memberof bbbfly.Widget#
       *
       * @return {boolean} If widget shownin was successful
       *
       * @see {@link bbbfly.Widget#CanShow|CanShow()}
       * @see {@link bbbfly.Widget#ShowOrHide|ShowOrHide()}
       * @see {@link bbbfly.Widget#OnShow|OnShow}
       * @see {@link bbbfly.Widget#OnShown|OnShown}
       */
      Show: bbbfly.widget._show,
      /**
       * @function
       * @name Hide
       * @memberof bbbfly.Widget#
       *
       * @return {boolean} If widget hiding was successful
       *
       * @see {@link bbbfly.Widget#CanHide|CanHide()}
       * @see {@link bbbfly.Widget#ShowOrHide|ShowOrHide()}
       * @see {@link bbbfly.Widget#OnHide|OnHide}
       * @see {@link bbbfly.Widget#OnHidden|OnHidden}
       */
      Hide: bbbfly.widget._hide,
      /**
       * @function
       * @name ShowOrHide
       * @memberof bbbfly.Widget#
       *
       * @return {boolean} If action was successful
       *
       * @see {@link bbbfly.Widget#Show|Show()}
       * @see {@link bbbfly.Widget#Hide|Hide()}
       */
      ShowOrHide: bbbfly.widget._showOrHide,
      /**
       * Forced widget state can be changed only by force methods.
       * @function
       * @name ForceShow
       * @memberof bbbfly.Widget#
       *
       * @return {boolean} If widget force-shownin was successful
       *
       * @see {@link bbbfly.Widget#CanForceShow|CanForceShow()}
       * @see {@link bbbfly.Widget#ForceShowOrHide|ForceShowOrHide()}
       * @see {@link bbbfly.Widget#SetForced|SetForced()}
       */
      ForceShow: bbbfly.widget._forceShow,
      /**
       * Forced widget state can be changed only by force methods.
       * @function
       * @name ForceHide
       * @memberof bbbfly.Widget#
       *
       * @return {boolean} If widget force-hiding was successful
       *
       * @see {@link bbbfly.Widget#CanForceHide|CanForceHide()}
       * @see {@link bbbfly.Widget#ForceShowOrHide|ForceShowOrHide()}
       * @see {@link bbbfly.Widget#SetForced|SetForced()}
       */
      ForceHide: bbbfly.widget._forceHide,
      /**
       * Forced widget state can be changed only by force methods.
       * @function
       * @name ForceShowOrHide
       * @memberof bbbfly.Widget#
       *
       * @return {boolean} If action was successful
       *
       * @see {@link bbbfly.Widget#Show|ForceShow()}
       * @see {@link bbbfly.Widget#Hide|ForceHide()}
       */
      ForceShowOrHide: bbbfly.widget._forceShowOrHide,
      /**
       * @function
       * @name IsShown
       * @memberof bbbfly.Widget#
       *
       * @return {boolean} If widget is shown
       *
       * @see {@link bbbfly.Widget#Show|Show()}
       * @see {@link bbbfly.Widget#Hide|Hide()}
       * @see {@link bbbfly.Widget#Show|ForceShow()}
       * @see {@link bbbfly.Widget#Hide|ForceHide()}
       */
      IsShown: bbbfly.widget._isShown,
      /**
       * @function
       * @name SetWidgetGroup
       * @memberof bbbfly.Widget#
       *
       * @param {string} groupName - Group name to be set
       * @return {boolean} if group name was set
       */
      SetWidgetGroup: bbbfly.widget._setWidgetGroup
    }
  });

  var c = ngCreateControlAsType(def,'ngPanel',ref, parent);
  if(c){bbbfly.WidgetRegistry.RegisterWidget(c);}
  return c;
};

/** @ignore */
ngUserControls = ngUserControls || new Array();
ngUserControls['bbbfly_widget'] = {
  OnInit: function(){
    ngRegisterControlType('bbbfly.Widget',bbbfly.Widget);
  }
};

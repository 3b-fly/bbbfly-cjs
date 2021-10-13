/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/

var bbbfly = bbbfly || {};
bbbfly.renderer = {};
bbbfly.renderer._imageId = function(id,suffix){
  if(!String.isString(id)){return null;}
  return String.isString(suffix) ? id+suffix : id;
};
bbbfly.renderer._updateHTMLState = function(node,state){
  if(!(node instanceof HTMLElement)){return;}
  if(!Object.isObject(state)){return;}

  for(var prop in state){
    var attr = bbbfly.Renderer.stateattr[prop];
    if(!String.isString(attr)){continue;}

    if(state[prop]){node.setAttribute(attr,'1');}
    else{node.removeAttribute(attr);}
  }
};
bbbfly.renderer._styleDim = function(dim,neg){
  if(Number.isInteger(dim)){
    if(neg){dim *= -1;}
    return dim+'px';
  }
  else if(String.isString(dim)){
    if(neg){
      return (dim.indexOf('-') === 0)
        ? dim.substring(1) : '-'+dim;
    }
    return dim;
  }
  return '';
};
bbbfly.renderer._styleToString = function(style){
  if(!Object.isObject(style)){return '';}
  var cssStyle = '';

  for(var prop in style){
    if(!style.hasOwnProperty(prop)){continue;}

    var propVal = style[prop];
    if(!String.isString(propVal) || !propVal){continue;}

    cssStyle += prop+':'+propVal+';';
  }
  if(cssStyle){
    cssStyle = ' style="'+cssStyle+'"';
  }
  return cssStyle;
};
bbbfly.renderer._getStatePropName = function(state,nameRoot){
  var propName = '';

  if(Object.isObject(state)){
    var attrs = bbbfly.Renderer.stateattr;

    if(state.disabled){propName += attrs.disabled;}
    if(state.readonly){propName += attrs.readonly;}
    if(state.invalid){propName += attrs.invalid;}

    if(state.selected){propName += attrs.selected;}
    else if(state.grayed){propName += attrs.grayed;}
  }

  if(String.isString(nameRoot)){
    propName += nameRoot;
  }

  return propName;
};
bbbfly.renderer._isStateProp = function(propName,patternRoot){
  if(!String.isString(propName)){return false;}

  if(!String.isString(patternRoot)){
    patternRoot = this.StatePropPattern_Any;
  }

  var pattern = new RegExp(
    '^'+this.StatePropPattern+patternRoot+'$'
  );

  return pattern.test(propName);
};
bbbfly.renderer._getStateValue = function(value,state,nameRoot){
  if(!Object.isObject(value)){return value;}
  if(!Object.isObject(state)){return undefined;}

  var attrs = bbbfly.Renderer.stateattr;
  var propRoot = this.GetStatePropName(state,nameRoot);
  var propName = '';

  if(state.highlight){
    if(state.mouseover){
      propName = attrs.mouseover+attrs.highlight+propRoot;
      if(value.hasOwnProperty(propName)){return value[propName];}
    }

    propName = attrs.highlight+propRoot;
    if(value.hasOwnProperty(propName)){return value[propName];}
  }

  propName = attrs.mouseover+propRoot;
  if(value.hasOwnProperty(propName)){return value[propName];}

  propName = propRoot;
  if(value.hasOwnProperty(propName)){return value[propName];}

  this.RecalcValue(value,nameRoot);
  if(value.hasOwnProperty(propName)){return value[propName];}

  return undefined;
};
bbbfly.renderer._containsState = function(propName,state){
  if(!String.isString(propName)){return false;}
  if(!Object.isObject(state)){return false;}

  for(var prop in state){
    var attr = bbbfly.Renderer.stateattr[prop];
    if(!String.isString(attr)){continue;}

    var hasAttr = !(propName.indexOf(attr) < 0);
    if(hasAttr !== !!state[prop]){return false;}
  }
  return true;
};
bbbfly.renderer._isImagePosition = function(propName){
  if(!String.isString(propName)){return false;}
  return this.IsStateProp(propName,this.StatePropPattern_Pos);
};
bbbfly.renderer._recalcValue = function(value,nameRoot){
  if(!Object.isObject(value)){return;}

  if(!String.isString(nameRoot)){nameRoot = '';}
  if(!value.hasOwnProperty(nameRoot)){value[nameRoot] = undefined;}

  var map = this.StateMap;
  if(!Object.isObject(map)){return;}

  bbbfly.renderer._updateValueProps(value,nameRoot,map);
};
bbbfly.renderer._updateValueProps = function(value,nameRoot,map,source){
  if(!Object.isObject(value) || !Object.isObject(map)){return;}

  if(!String.isString(nameRoot)){nameRoot = '';}
  var hasSource = String.isString(source);

  for(var mapState in map){
    var propName = mapState+nameRoot;

    if(!value.hasOwnProperty(propName)){
      value[propName] = hasSource ? value[source+nameRoot] : undefined;
    }

    var mapObj = map[mapState];
    if(!Object.isObject(mapObj)){continue;}

    bbbfly.renderer._updateValueProps(value,nameRoot,mapObj,mapState);
  }

  if(!hasSource){
    for(var valState in value){
      if(typeof value[valState] !== 'undefined'){continue;}

      if(bbbfly.Renderer.IsStateProp(valState,nameRoot)){
        value[valState] = value[nameRoot];
      }
    }
  }
};
bbbfly.renderer._recalcImage = function(img){
  if(!Object.isObject(img)){return;}

  if(!Number.isInteger(img.L)){img.L = 0;}
  if(!Number.isInteger(img.T)){img.T = 0;}

  var map = this.StateMap;
  if(!Object.isObject(map)){return;}

  bbbfly.renderer._updateImageProps(img,map);
};
bbbfly.renderer._recalcImageState = function(img,state,pos){
  if(!Object.isObject(img)){return;}
  if(!Object.isObject(state)){return;}
  if(!Object.isObject(pos)){return;}

  var hasLeft = Number.isInteger(pos.L);
  var hasTop = Number.isInteger(pos.T);
  if(!hasLeft && !hasTop){return;}

  for(var propName in img){
    if(!Number.isInteger(img[propName])){continue;}
    if(!this.IsImagePosition(propName)){continue;}
    if(!this.ContainsState(propName,state)){continue;}

    var lastChar = propName.slice(-1);
    if(hasLeft && (lastChar === 'L')){img[propName] += pos.L;}
    if(hasTop && (lastChar === 'T')){img[propName] += pos.T;}
  }
};
bbbfly.renderer._updateImageProps = function(img,map,source){
  if(!Object.isObject(img) || !Object.isObject(map)){return;}
  var hasSource = String.isString(source);

  for(var mapState in map){
    if(!Number.isInteger(img[mapState+'L'])){
      img[mapState+'L'] = hasSource ? img[source+'L'] : undefined;
    }
    if(!Number.isInteger(img[mapState+'T'])){
      img[mapState+'T'] = hasSource ? img[source+'T'] : undefined;
    }

    var mapObj = map[mapState];
    if(!Object.isObject(mapObj)){continue;}

    bbbfly.renderer._updateImageProps(img,mapObj,mapState);
  }

  if(!hasSource){
    for(var imgState in img){
      if(Number.isInteger(img[imgState])){continue;}

      if(bbbfly.Renderer.IsImagePosition(imgState)){
        var defState = imgState.slice(-1);
        img[imgState] = img[defState];
      }
    }
  }
};
bbbfly.renderer._recalcFrame = function(frame){
  if(Object.isObject(frame)){
    this.RecalcImage(frame.Left);
    this.RecalcImage(frame.Top);
    this.RecalcImage(frame.Right);
    this.RecalcImage(frame.Bottom);
    this.RecalcImage(frame.LeftTop);
    this.RecalcImage(frame.RightTop);
    this.RecalcImage(frame.LeftBottom);
    this.RecalcImage(frame.RightBottom);
    this.RecalcImage(frame.Center);
  }
};
bbbfly.renderer._imageProxy = function(img,state,id){
  if(!Object.isObject(img)){return {W:0, H:0, _mock:true};}

  var proxy = {Img:img, _mock:false};
  if(String.isString(id)){proxy.Id = id;}
  if(String.isString(img.Src)){proxy.Src = img.Src;}

  if(Number.isInteger(img.W)){proxy.W = img.W;}
  if(Number.isInteger(img.H)){proxy.H = img.H;}

  if(Object.isObject(img.Anchor)){
    proxy.Anchor = {L:0,T:0};
    if(Number.isInteger(img.Anchor.L)){proxy.Anchor.L = img.Anchor.L;}
    if(Number.isInteger(img.Anchor.T)){proxy.Anchor.T = img.Anchor.T;}
  }

  this.UpdateImageProxy(proxy,state);
  return proxy;
};
bbbfly.renderer._frameProxy = function(frame,state,id){
  if(!Object.isObject(frame)){frame = {};}

  var proxy = {
    L: this.ImageProxy(frame.Left,state,this.ImageId(id,'_FL')),
    T: this.ImageProxy(frame.Top,state,this.ImageId(id,'_FT')),
    R: this.ImageProxy(frame.Right,state,this.ImageId(id,'_FR')),
    B: this.ImageProxy(frame.Bottom,state,this.ImageId(id,'_FB')),
    LT: this.ImageProxy(frame.LeftTop,state,this.ImageId(id,'_FLT')),
    RT: this.ImageProxy(frame.RightTop,state,this.ImageId(id,'_FRT')),
    LB: this.ImageProxy(frame.LeftBottom,state,this.ImageId(id,'_FLB')),
    RB: this.ImageProxy(frame.RightBottom,state,this.ImageId(id,'_FRB')),
    C: this.ImageProxy(frame.Center,state,this.ImageId(id,'_FC'))
  };

  if(String.isString(id)){proxy.Id = id;}
  return proxy;
};
bbbfly.renderer._stackProxy = function(imgs,state,id){
  if(!Array.isArray(imgs)){imgs = [];}

  var images = [];
  var anchor = {L:0,T:0,R:0,B:0};

  for(var i in imgs){
    var iProxy = this.ImageProxy(
      imgs[i],state,this.ImageId(id,'_'+i)
    );

    images.push(iProxy);
    if(!iProxy.W || !iProxy.H){continue;}

    var left = (iProxy.Anchor) ? iProxy.Anchor.L : 0;
    var top = (iProxy.Anchor) ? iProxy.Anchor.T : 0;
    var right = (iProxy.W) ? (iProxy.W - left) : 0;
    var bottom = (iProxy.H) ? (iProxy.H - top) : 0;

    if(left > anchor.L){anchor.L = left;}
    if(top > anchor.T){anchor.T = top;}
    if(right > anchor.R){anchor.R = right;}
    if(bottom > anchor.B){anchor.B = bottom;}
  }

  var proxy = {
    Imgs: images,
    Anchor: anchor,
    W: (anchor.L+anchor.R),
    H: (anchor.T+anchor.B)
  };

  if(String.isString(id)){proxy.Id = id;}
  return proxy;
};
bbbfly.renderer._updateImageProxy = function(proxy,state){
  if(!Object.isObject(proxy) || proxy._mock){return;}
  if(!Object.isObject(proxy.Img)){return;}

  var l = null;
  var t = null;
  var ol = null;
  var ot = null;

  var attrs = bbbfly.Renderer.stateattr;
  var propName = this.GetStatePropName(state);

  if(Object.isObject(state) && state.highlight){
    var hlPropName = attrs.highlight+propName;

    l = proxy.Img[hlPropName+'L'];
    t = proxy.Img[hlPropName+'T'];
    ol = proxy.Img[attrs.mouseover+hlPropName+'L'];
    ot = proxy.Img[attrs.mouseover+hlPropName+'T'];
  }

  if(!Number.isInteger(l) || !Number.isInteger(t)){
    l = proxy.Img[propName+'L'];
    t = proxy.Img[propName+'T'];

    if(!Number.isInteger(l) || !Number.isInteger(t)){
      this.RecalcImage(proxy.Img);
      l = proxy.Img[propName+'L'];
      t = proxy.Img[propName+'T'];
    }

    ol = proxy.Img[attrs.mouseover+propName+'L'];
    ot = proxy.Img[attrs.mouseover+propName+'T'];
  }

  if(Number.isInteger(l)){proxy.L = l;}
  if(Number.isInteger(t)){proxy.T = t;}

  proxy.oL = Number.isInteger(ol) ? ol : proxy.L;
  proxy.oT = Number.isInteger(ot) ? ot : proxy.T;
};
bbbfly.renderer._updateFrameProxy = function(proxy,state){
  if(!Object.isObject(proxy)){return;}

  this.UpdateImageProxy(proxy.L,state);
  this.UpdateImageProxy(proxy.T,state);
  this.UpdateImageProxy(proxy.R,state);
  this.UpdateImageProxy(proxy.B,state);
  this.UpdateImageProxy(proxy.LT,state);
  this.UpdateImageProxy(proxy.RT,state);
  this.UpdateImageProxy(proxy.LB,state);
  this.UpdateImageProxy(proxy.RB,state);
  this.UpdateImageProxy(proxy.C,state);
};
bbbfly.renderer._updateStackProxy = function(proxy,state){
  if(!Object.isObject(proxy)){return;}

  for(var i in proxy.Imgs){
    this.UpdateImageProxy(proxy.Imgs[i],state);
  }
};
bbbfly.renderer._imageHTMLProps = function(
  proxy,left,top,right,bottom,state,className,style,innerHtml,id
){
  if(!Object.isObject(proxy) || proxy._mock){return null;}
  if(!String.isString(proxy.Src) || (proxy.Src === '')){return null;}

  var props = {
    id: null,
    className: null,
    innerHtml: '',
    style: {}
  };

  left = this.StyleDim(left);
  top = this.StyleDim(top);
  right = this.StyleDim(right);
  bottom = this.StyleDim(bottom);

  var width = this.StyleDim(proxy.W);
  var height = this.StyleDim(proxy.H);

  var over = (state && state.mouseover);
  var l = over ? proxy.oL : proxy.L;
  var t = over ? proxy.oT : proxy.T;

  props.style['position'] = 'absolute';
  props.style['overflow'] = 'hidden';

  props.style['left'] = left;
  props.style['top'] = top;
  props.style['right'] = right;
  props.style['bottom'] = bottom;

  props.style['width'] = width;
  props.style['height'] = height;

  var bckStyle = 'transparent url(\''+proxy.Src+'\')';

  if(!width && !height){bckStyle += ' repeat';}
  else if(!width){bckStyle += ' repeat-x';}
  else if(!height){bckStyle += ' repeat-y';}
  else{bckStyle += ' no-repeat';}

  bckStyle += ' scroll'
    +' '+this.StyleDim(l,true)
    +' '+this.StyleDim(t,true);

  props.style['background'] = bckStyle;

  if(Object.isObject(style)){
    ng_MergeVarReplace(props.style,style);
  }

  if(String.isString(id)){props.id = id;}
  else if(String.isString(proxy.Id)){props.id = proxy.Id;}

  if(String.isString(className)){props.className = className;}
  if(String.isString(innerHtml)){props.innerHtml = innerHtml;}

  return props;
};
bbbfly.renderer._setImage = function(
  node,proxy,left,top,right,bottom,state,className,style,innerHtml,id
){
  if(!(node instanceof HTMLElement)){return;}

  var props = this.ImageHTMLProps(
    proxy,left,top,right,bottom,
    state,className,style,
    innerHtml,id
  );

  if(!props){return;}

  if(props.id){node.id = props.id;}
  if(props.className){node.className = props.className;}

  if(props.style){
    for(var prop in props.style){
      if(!props.style.hasOwnProperty(prop)){continue;}

      var propVal = props.style[prop];
      if(!String.isString(propVal)){propVal = '';}

      prop = prop.split('-',2);
      switch(prop.length){
        case 1: prop = prop[0]; break;
        case 2: prop = prop[0]+String.capitalize(prop[1]); break;
        default: continue;
      }
      node.style[prop] = propVal;
    }
  }

  node.innerHtml = props.innerHtml;
};
bbbfly.renderer._imageHTML = function(
  proxy,left,top,right,bottom,state,className,style,innerHtml,id
){
  var props = this.ImageHTMLProps(
    proxy,left,top,right,bottom,
    state,className,style,
    innerHtml,id
  );

  if(!props){return '';}

  var imgAttrs = '';
  var imgStyle = '';

  if(props.id){imgAttrs += ' id="'+props.id+'"';}
  if(props.className){imgAttrs += ' class="'+props.className+'"';}
  if(props.style){imgStyle = this.StyleToString(props.style);}

  return '<div unselectable="on"'+imgAttrs+imgStyle+'>'
      +props.innerHtml
    +'</div>';
};
bbbfly.renderer._frameHTML = function(proxy,state,className,id){
  var frameHtml = '';

  if(Object.isObject(proxy)){
    frameHtml += this.ImageHTML(
      proxy.L,0,proxy.LT.H,null,proxy.LB.H,state,
      className,null,this.ImageId(id,'_FL')
    );
    frameHtml += this.ImageHTML(
      proxy.T,proxy.LT.W,0,proxy.RT.W,null,state,
      className,null,this.ImageId(id,'_FT')
    );
    frameHtml += this.ImageHTML(
      proxy.R,null,proxy.RT.H,0,proxy.RB.H,state,
      className,null,this.ImageId(id,'_FR')
    );
    frameHtml += this.ImageHTML(
      proxy.B,proxy.LB.W,null,proxy.RB.W,0,state,
      className,null,this.ImageId(id,'_FB')
    );
    frameHtml += this.ImageHTML(
      proxy.LT,0,0,null,null,state,
      className,null,this.ImageId(id,'_FLT')
    );
    frameHtml += this.ImageHTML(
      proxy.RT,null,0,0,null,state,
      className,null,this.ImageId(id,'_FRT')
    );
    frameHtml += this.ImageHTML(
      proxy.LB,0,null,null,0,state,
      className,null,this.ImageId(id,'_FLB')
    );
    frameHtml += this.ImageHTML(
      proxy.RB,null,null,0,0,state,
      className,null,this.ImageId(id,'_FRB')
    );
    frameHtml += this.ImageHTML(
      proxy.C,proxy.L.W,proxy.T.H,proxy.R.W,proxy.B.H,state,
      className,null,this.ImageId(id,'_FC')
    );
  }
  return frameHtml;
};
bbbfly.renderer._dynamicFrameHTML = function(
  proxy,state,className,innerHtml,id
){
  var frameHtml = this.FrameHTML(proxy,state,className,id);

  if(String.isString(innerHtml)){
    var left = this.StyleDim(proxy.L.W);
    var top = this.StyleDim(proxy.T.H);
    var right = this.StyleDim(proxy.R.W);
    var bottom = this.StyleDim(proxy.B.H);

    var attrs = '';
    if(left){attrs += 'padding-left:'+left+';';}
    if(top){attrs += 'padding-top:'+top+';';}
    if(right){attrs += 'padding-right:'+right+';';}
    if(bottom){attrs += 'padding-bottom:'+bottom+';';}
    if(attrs){attrs = ' style="'+attrs+'"';}

    if(String.isString(className)){attrs += ' class="'+className+'"';}

    if(!String.isString(id) && Object.isObject(proxy)){id = proxy.Id;}
    if(String.isString(id)){attrs += ' id="'+proxy.Id+'_C"';}

    frameHtml += '<div unselectable="on"'+attrs+'>'+innerHtml+'</div>';
  }
  return frameHtml;
};
StackHTML: bbbfly.renderer._stackHTML = function(proxy,state,className,id){
  var stackHtml = '';

  if(Object.isObject(proxy) && Array.isArray(proxy.Imgs)){

    var anchorLeft = (proxy.Anchor) ? proxy.Anchor.L : 0;
    var anchorTop = (proxy.Anchor) ? proxy.Anchor.T : 0;

    for(var i in proxy.Imgs){
      var iProxy = proxy.Imgs[i];

      var index = (parseInt(i)+1).toString();
      var style = { 'z-index': index };

      var left = anchorLeft;
      var top = anchorTop;

      if(iProxy.Anchor){
        left -= iProxy.Anchor.L;
        top -= iProxy.Anchor.T;
      }

      stackHtml += this.ImageHTML(
        iProxy,left,top,null,null,state,
        className,style,null,this.ImageId(id,'_'+i)
      );
    }
  }
  return stackHtml;
};
bbbfly.renderer._updateImageHTML = function(proxy,state,id){
  if(!Object.isObject(proxy) || proxy._mock){return;}

  if(!String.isString(id)){id = proxy.Id;}
  if(!String.isString(id) || (id === '')){return;}

  var node = document.getElementById(id);
  if(!node){return;}

  var over = (state && state.mouseover);
  var left = over ? proxy.oL : proxy.L;
  var top = over ? proxy.oT : proxy.T;

  left = this.StyleDim(left,true);
  top = this.StyleDim(top,true);

  node.style.backgroundPosition = left+' '+top;
};
bbbfly.renderer._updateFrameHTML = function(proxy,state,id){
  if(!Object.isObject(proxy)){return;}

  this.UpdateImageHTML(proxy.L,state,this.ImageId(id,'_FL'));
  this.UpdateImageHTML(proxy.T,state,this.ImageId(id,'_FT'));
  this.UpdateImageHTML(proxy.R,state,this.ImageId(id,'_FR'));
  this.UpdateImageHTML(proxy.B,state,this.ImageId(id,'_FB'));
  this.UpdateImageHTML(proxy.LT,state,this.ImageId(id,'_FLT'));
  this.UpdateImageHTML(proxy.RT,state,this.ImageId(id,'_FRT'));
  this.UpdateImageHTML(proxy.LB,state,this.ImageId(id,'_FLB'));
  this.UpdateImageHTML(proxy.RB,state,this.ImageId(id,'_FRB'));
  this.UpdateImageHTML(proxy.C,state,this.ImageId(id,'_FC'));
};
bbbfly.renderer._updateStackHTML = function(proxy,state,id){
  if(!Object.isObject(proxy)){return;}

  for(var i in proxy.Imgs){
    this.UpdateImageHTML(
      proxy.Imgs[i],state,this.ImageId(id,'_'+i)
    );
  }
};
bbbfly.Renderer = {
  StatePropPattern: '[o]?[h]?[D]?[R]?[I]?[S|G]?',

  StatePropPattern_Any: '(.*)',
  StatePropPattern_Pos: '[L|T]',

  StateMap: {
    D: { DR:true, DI:true, DS:true, DG:true },
    R: { DR:true, RI:true, RS:true, RG:true },
    I: { DI:true, RI:true, IS:true, IG:true },
    S: { DS:true, RS:true, IS:true },
    G: { DG:true, RG:true, IG:true },

    DR: { DRI:true, DRS:true, DRG:true },
    DI: { DRI:true, DIS:true, DIG:true },
    DS: { DRS:true, DIS:true },
    DG: { DRG:true, DIG:true },

    RI: { DRI:true, RIS:true, RIG:true },
    RS: { DRS:true, RIS:true },
    RG: { DRG:true, RIG:true },

    IS: { DIS:true, RIS:true },
    IG: { DIG:true, RIG:true },

    DRI: { DRIS:true, DRIG:true },
    DRS: { DRIS:true },
    DRG: { DRIG:true },

    DIS: { DRIS:true },
    DIG: { DRIG:true },

    RIS: { DRIS:true },
    RIG: { DRIG:true }
  },
  ImageId: bbbfly.renderer._imageId,
  ImageHTMLProps: bbbfly.renderer._imageHTMLProps,
  StyleDim: bbbfly.renderer._styleDim,
  StyleToString: bbbfly.renderer._styleToString,
  GetStatePropName: bbbfly.renderer._getStatePropName,
  IsStateProp: bbbfly.renderer._isStateProp,
  GetStateValue: bbbfly.renderer._getStateValue,
  ContainsState: bbbfly.renderer._containsState,
  IsImagePosition: bbbfly.renderer._isImagePosition,
  UpdateHTMLState: bbbfly.renderer._updateHTMLState,
  RecalcValue: bbbfly.renderer._recalcValue,
  RecalcImage: bbbfly.renderer._recalcImage,
  RecalcImageState: bbbfly.renderer._recalcImageState,
  RecalcFrame: bbbfly.renderer._recalcFrame,
  ImageProxy: bbbfly.renderer._imageProxy,
  FrameProxy: bbbfly.renderer._frameProxy,
  StackProxy: bbbfly.renderer._stackProxy,
  UpdateImageProxy: bbbfly.renderer._updateImageProxy,
  UpdateFrameProxy: bbbfly.renderer._updateFrameProxy,
  UpdateStackProxy: bbbfly.renderer._updateStackProxy,
  SetImage: bbbfly.renderer._setImage,
  ImageHTML: bbbfly.renderer._imageHTML,
  FrameHTML: bbbfly.renderer._frameHTML,
  DynamicFrameHTML: bbbfly.renderer._dynamicFrameHTML,
  StackHTML: bbbfly.renderer._stackHTML,
  UpdateImageHTML: bbbfly.renderer._updateImageHTML,
  UpdateFrameHTML: bbbfly.renderer._updateFrameHTML,
  UpdateStackHTML: bbbfly.renderer._updateStackHTML
};
bbbfly.Renderer.stateattr = {
  mouseover: 'o',
  highlight: 'h',
  disabled: 'D',
  readonly: 'R',
  invalid: 'I',
  selected: 'S',
  grayed: 'G'
  };

/**
 * @typedef {object} stackproxy
 * @memberOf bbbfly.Renderer
 *
 * @description Images stack properties for certain state
 *
 * @property {string|undefined} [Id] - Stack ID
 * @property {bbbfly.Renderer.imageproxy[]} Imgs - Image properties
 * @property {pos} [Anchor] - Stack reference point
 * @property {px} [W] - Stack width
 * @property {px} [H] - Stack height
 */
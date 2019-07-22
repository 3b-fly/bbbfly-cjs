/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/


var bbbfly = bbbfly || {};
bbbfly.renderer = {};
bbbfly.renderer._isImageLTPosition = function(propName){
  if(!String.isString(propName)){return false;}
  return this.ImgLTPattern.test(propName);
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
bbbfly.renderer._recalcImage = function(img){
  if(!Object.isObject(img)){return;}

  if(!Number.isInteger(img.L)){img.L = 0;}
  if(!Number.isInteger(img.T)){img.T = 0;}

  bbbfly.renderer._updateImageProps(img,'L',['DL','RL','IL','SL','GL']);
  bbbfly.renderer._updateImageProps(img,'T',['DT','RT','IT','ST','GT']);

  bbbfly.renderer._updateImageProps(img,'DL',['DRL','DIL','DSL','DGL']);
  bbbfly.renderer._updateImageProps(img,'DT',['DRT','DIT','DST','DGT']);

  bbbfly.renderer._updateImageProps(img,'RL',['RIL','RSL','RGL']);
  bbbfly.renderer._updateImageProps(img,'RT',['RIT','RST','RGT']);

  bbbfly.renderer._updateImageProps(img,'SL',['ISL']);
  bbbfly.renderer._updateImageProps(img,'ST',['IST']);
  bbbfly.renderer._updateImageProps(img,'GL',['IGL']);
  bbbfly.renderer._updateImageProps(img,'GT',['IGT']);

  bbbfly.renderer._updateImageProps(img,'DRL',['DRIL','DRSL','DRGL']);
  bbbfly.renderer._updateImageProps(img,'DRT',['DRIT','DRST','DRGT']);

  bbbfly.renderer._updateImageProps(img,'DSL',['DISL']);
  bbbfly.renderer._updateImageProps(img,'DST',['DIST']);
  bbbfly.renderer._updateImageProps(img,'DGL',['DIGL']);
  bbbfly.renderer._updateImageProps(img,'DGT',['DIGT']);

  bbbfly.renderer._updateImageProps(img,'RSL',['RISL']);
  bbbfly.renderer._updateImageProps(img,'RST',['RIST']);
  bbbfly.renderer._updateImageProps(img,'RGL',['RIGL']);
  bbbfly.renderer._updateImageProps(img,'RGT',['RIGT']);

  bbbfly.renderer._updateImageProps(img,'DISL',['DRISL']);
  bbbfly.renderer._updateImageProps(img,'DIST',['DRIST']);
  bbbfly.renderer._updateImageProps(img,'DIGL',['DRIGL']);
  bbbfly.renderer._updateImageProps(img,'DIGT',['DRIGT']);
};
bbbfly.renderer._updateImageProps = function(img,source,target){
  if(!Object.isObject(img) || !Array.isArray(target)){return;}

  for(var i in target){
    var prop = target[i];
    if(!Number.isInteger(img[prop])){
      img[prop] = img[source];
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

  this.UpdateImageProxy(proxy,state);
  return proxy;
};
bbbfly.renderer._frameProxy = function(frame,state,id){
  if(!Object.isObject(frame)){frame = {};}
  var hasId = String.isString(id);

  function imgId(suffix){
    return (hasId) ? id+suffix : null;
  };

  var proxy = {
    L: this.ImageProxy(frame.Left,state,imgId('_FL')),
    T: this.ImageProxy(frame.Top,state,imgId('_FT')),
    R: this.ImageProxy(frame.Right,state,imgId('_FR')),
    B: this.ImageProxy(frame.Bottom,state,imgId('_FB')),
    LT: this.ImageProxy(frame.LeftTop,state,imgId('_FLT')),
    RT: this.ImageProxy(frame.RightTop,state,imgId('_FRT')),
    LB: this.ImageProxy(frame.LeftBottom,state,imgId('_FLB')),
    RB: this.ImageProxy(frame.RightBottom,state,imgId('_FRB')),
    C: this.ImageProxy(frame.Center,state,imgId('_FC'))
  };

  if(String.isString(id)){proxy.Id = id;}
  return proxy;
};
bbbfly.renderer._updateImageProxy = function(proxy,state){
  if(!Object.isObject(proxy || proxy._mock)){return;}
  if(!Object.isObject(proxy.Img)){return;}

  var l = null;
  var t = null;
  var ol = null;
  var ot = null;

  var attrs = bbbfly.Renderer.stateattr;
  var overAttr = attrs.mouseover;
  var propName = '';

  if(Object.isObject(state)){
    if(state.disabled){propName += attrs.disabled;}
    if(state.readonly){propName += attrs.readonly;}
    if(state.invalid){propName += attrs.invalid;}

    if(state.selected){propName += attrs.selected;}
    else if(state.grayed){propName += attrs.grayed;}

    if(state.highlight){
      var hlPropName = attrs.highlight+propName;

      l = proxy.Img[hlPropName+'L'];
      t = proxy.Img[hlPropName+'T'];
      ol = proxy.Img[overAttr+hlPropName+'L'];
      ot = proxy.Img[overAttr+hlPropName+'T'];
    }
  }

  if(!Number.isInteger(l) || !Number.isInteger(t)){
    l = proxy.Img[propName+'L'];
    t = proxy.Img[propName+'T'];

    if(!Number.isInteger(l) || !Number.isInteger(t)){
      this.RecalcImage(proxy.Img);
      l = proxy.Img[propName+'L'];
      t = proxy.Img[propName+'T'];
    }

    ol = proxy.Img[overAttr+propName+'L'];
    ot = proxy.Img[overAttr+propName+'T'];
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
bbbfly.renderer._imageHTMLProps = function(
  proxy,left,top,right,bottom,state,className,style,innerHtml
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

  if(String.isString(proxy.Id)){props.id = proxy.Id;}
  if(String.isString(className)){props.className = className;}
  if(String.isString(innerHtml)){props.innerHtml = innerHtml;}

  return props;
};
bbbfly.renderer._setImage = function(
  node,proxy,left,top,right,bottom,state,className,style,innerHtml
){
  if(!(node instanceof HTMLElement)){return;}

  var props = this.ImageHTMLProps(
    proxy,left,top,right,bottom,
    state,className,style,
    innerHtml
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
  proxy,left,top,right,bottom,state,className,style,innerHtml
){
  var props = this.ImageHTMLProps(
    proxy,left,top,right,bottom,
    state,className,style,
    innerHtml
  );

  if(!props){return '';}

  var imgAttrs = '';
  var imgStyle = '';

  if(props.id){imgAttrs += ' id="'+props.id+'"';}
  if(props.className){imgAttrs += ' class="'+props.className+'"';}

  if(props.style){
    for(var prop in props.style){
      if(!props.style.hasOwnProperty(prop)){continue;}

      var propVal = props.style[prop];
      if(!String.isString(propVal) || !propVal){continue;}

      imgStyle += prop+':'+propVal+';';
    }
    if(imgStyle){
      imgStyle = ' style="'+imgStyle+'"';
    }
  }

  return '<div unselectable="on"'+imgAttrs+imgStyle+'>'
      +props.innerHtml
    +'</div>';
};
bbbfly.renderer._frameHTML = function(proxy,state,className){
  var frameHtml = '';

  if(Object.isObject(proxy)){
    frameHtml += this.ImageHTML(
      proxy.L,0,proxy.LT.H,null,proxy.LB.H,state,className
    );
    frameHtml += this.ImageHTML(
      proxy.T,proxy.LT.W,0,proxy.RT.W,null,state,className
    );
    frameHtml += this.ImageHTML(
      proxy.R,null,proxy.RT.H,0,proxy.RB.H,state,className
    );
    frameHtml += this.ImageHTML(
      proxy.B,proxy.LB.W,null,proxy.RB.W,0,state,className
    );
    frameHtml += this.ImageHTML(
      proxy.LT,0,0,null,null,state,className
    );
    frameHtml += this.ImageHTML(
      proxy.RT,null,0,0,null,state,className
    );
    frameHtml += this.ImageHTML(
      proxy.LB,0,null,null,0,state,className
    );
    frameHtml += this.ImageHTML(
      proxy.RB,null,null,0,0,state,className
    );
    frameHtml += this.ImageHTML(
      proxy.C,proxy.L.W,proxy.T.H,proxy.R.W,proxy.B.H,state,className
    );
  }
  return frameHtml;
};
bbbfly.renderer._dynamicFrameHTML = function(
  proxy,state,className,innerHtml
){
  var frameHtml = this.FrameHTML(proxy,state,className);

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
    if(Object.isObject(proxy) && String.isString(proxy.Id)){
      attrs += ' id="'+proxy.Id+'_C"';
    }

    frameHtml += '<div unselectable="on"'+attrs+'>'+innerHtml+'</div>';
  }
  return frameHtml;
};
bbbfly.renderer._updateImageHTML = function(proxy,state){
  if(!Object.isObject(proxy) || proxy._mock){return;}
  if(!String.isString(proxy.Id) || (proxy.Id === '')){return;}

  var node = document.getElementById(proxy.Id);
  if(!node){return;}

  var over = (state && state.mouseover);
  var left = over ? proxy.oL : proxy.L;
  var top = over ? proxy.oT : proxy.T;

  left = this.StyleDim(left,true);
  top = this.StyleDim(top,true);

  node.style.backgroundPosition = left+' '+top;
};
bbbfly.renderer._updateFrameHTML = function(proxy,state){
  if(Object.isObject(proxy)){
    this.UpdateImageHTML(proxy.L,state);
    this.UpdateImageHTML(proxy.T,state);
    this.UpdateImageHTML(proxy.R,state);
    this.UpdateImageHTML(proxy.B,state);
    this.UpdateImageHTML(proxy.LT,state);
    this.UpdateImageHTML(proxy.RT,state);
    this.UpdateImageHTML(proxy.LB,state);
    this.UpdateImageHTML(proxy.RB,state);
    this.UpdateImageHTML(proxy.C,state);
  }
};
bbbfly.Renderer = {
  ImgLTPattern: new RegExp('^[o]?[h]?[D]?[R]?[I]?[S|G]?[L|T]$'),
  ImageHTMLProps: bbbfly.renderer._imageHTMLProps,
  StyleDim: bbbfly.renderer._styleDim,
  IsImageLTPosition: bbbfly.renderer._isImageLTPosition,
  UpdateHTMLState: bbbfly.renderer._updateHTMLState,
  RecalcImage: bbbfly.renderer._recalcImage,
  RecalcFrame: bbbfly.renderer._recalcFrame,
  ImageProxy: bbbfly.renderer._imageProxy,
  FrameProxy: bbbfly.renderer._frameProxy,
  UpdateImageProxy: bbbfly.renderer._updateImageProxy,
  UpdateFrameProxy: bbbfly.renderer._updateFrameProxy,
  SetImage: bbbfly.renderer._setImage,
  ImageHTML: bbbfly.renderer._imageHTML,
  FrameHTML: bbbfly.renderer._frameHTML,
  DynamicFrameHTML: bbbfly.renderer._dynamicFrameHTML,
  UpdateImageHTML: bbbfly.renderer._updateImageHTML,
  UpdateFrameHTML: bbbfly.renderer._updateFrameHTML
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
 * @typedef {object} frameproxy
 * @memberOf bbbfly.Renderer
 *
 * @description Frame image properties for certain state
 *
 * @property {string|undefined} [Id] - Frame ID
 * @property {bbbfly.Renderer.imageproxy} [L] - Left image properties
 * @property {bbbfly.Renderer.imageproxy} [T] - Top image properties
 * @property {bbbfly.Renderer.imageproxy} [R] - Right image properties
 * @property {bbbfly.Renderer.imageproxy} [B] - Bottom image properties
 * @property {bbbfly.Renderer.imageproxy} [LT] - LeftTop image properties
 * @property {bbbfly.Renderer.imageproxy} [RT] - RightTop image properties
 * @property {bbbfly.Renderer.imageproxy} [LB] - LeftBottom image properties
 * @property {bbbfly.Renderer.imageproxy} [RB] - RightBottom image properties
 * @property {bbbfly.Renderer.imageproxy} [C] - Center image properties
 */
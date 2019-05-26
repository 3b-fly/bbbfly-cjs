/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/


var bbbfly = bbbfly || {};
bbbfly.renderer = {};
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

  bbbfly.renderer._updateImageProps(img,'L',['SL','GL','IL','DL']);
  bbbfly.renderer._updateImageProps(img,'T',['ST','GT','IT','DT']);

  bbbfly.renderer._updateImageProps(img,'SL',['ISL','DSL']);
  bbbfly.renderer._updateImageProps(img,'ST',['IST','DST']);
  bbbfly.renderer._updateImageProps(img,'GL',['IGL','DGL']);
  bbbfly.renderer._updateImageProps(img,'GT',['IGT','DGT']);

  bbbfly.renderer._updateImageProps(img,'DSL',['DISL']);
  bbbfly.renderer._updateImageProps(img,'DST',['DIST']);
  bbbfly.renderer._updateImageProps(img,'DGL',['DIGL']);
  bbbfly.renderer._updateImageProps(img,'DGT',['DIGT']);
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

  var propName = '';
  var overProp = bbbfly.Renderer.stateprop.mouseOver;

  if(Object.isObject(state)){
    if(state.disabled){propName += bbbfly.Renderer.stateprop.disabled;}
    if(state.invalid){propName += bbbfly.Renderer.stateprop.invalid;}

    if(state.selected){propName += bbbfly.Renderer.stateprop.selected;}
    else if(state.grayed){propName += bbbfly.Renderer.stateprop.grayed;}

    if(state.highlight){
      var hlProp = bbbfly.Renderer.stateprop.highlight;
      var hlPropName = hlProp+propName;

      l = proxy.Img[hlPropName+'L'];
      t = proxy.Img[hlPropName+'T'];
      ol = proxy.Img[overProp+hlPropName+'L'];
      ot = proxy.Img[overProp+hlPropName+'T'];
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

    ol = proxy.Img[overProp+propName+'L'];
    ot = proxy.Img[overProp+propName+'T'];
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
bbbfly.renderer._imageHTML = function(
  proxy,left,top,right,bottom,state,className,style,innerHtml
){
  if(!Object.isObject(proxy) || proxy._mock){return '';}
  if(!String.isString(proxy.Src) || (proxy.Src === '')){return '';}

  var widht = bbbfly.renderer._styleDim(proxy.W);
  var height = bbbfly.renderer._styleDim(proxy.H);

  var mouseOver = (state && state.mouseOver);
  var l = mouseOver ? proxy.oL : proxy.L;
  var t = mouseOver ? proxy.oT : proxy.T;

  var imgStyle = ' style="position:absolute;overflow:hidden';
  imgStyle += ";background: transparent url('"+proxy.Src+"')";

  if(!widht && !height){imgStyle += 'repeat';}
  else if(!widht){imgStyle += ' repeat-x';}
  else if(!height){imgStyle += ' repeat-y';}
  else{imgStyle += ' no-repeat';}

  imgStyle += ' scroll'
    +' '+bbbfly.renderer._styleDim(l,true)
    +' '+bbbfly.renderer._styleDim(t,true);

  if(widht){imgStyle += ';width:'+widht;}
  if(height){imgStyle += ';height:'+height;}

  left = bbbfly.renderer._styleDim(left);
  top = bbbfly.renderer._styleDim(top);
  right = bbbfly.renderer._styleDim(right);
  bottom = bbbfly.renderer._styleDim(bottom);

  if(left){imgStyle += ';left:'+left;}
  if(top){imgStyle += ';top:'+top;}
  if(right){imgStyle += ';right:'+right;}
  if(bottom){imgStyle += ';bottom:'+bottom;}
  imgStyle += String.isString(style) ? ';'+style+'"' : '"';

  var attrs = '';
  if(String.isString(proxy.Id)){attrs += ' id="'+proxy.Id+'"';}
  if(String.isString(className)){attrs += ' class="'+className+'"';}

  if(!String.isString(innerHtml)){innerHtml = '';}
  return '<div unselectable="on"'+imgStyle+attrs+'>'+innerHtml+'</div>';
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
    var left = bbbfly.renderer._styleDim(proxy.L.W);
    var top = bbbfly.renderer._styleDim(proxy.T.H);
    var right = bbbfly.renderer._styleDim(proxy.R.W);
    var bottom = bbbfly.renderer._styleDim(proxy.B.H);

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

  var mouseOver = (state && state.mouseOver);
  var left = mouseOver ? proxy.oL : proxy.L;
  var top = mouseOver ? proxy.oT : proxy.T;

  left = bbbfly.renderer._styleDim(left,true);
  top = bbbfly.renderer._styleDim(top,true);

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
  RecalcImage: bbbfly.renderer._recalcImage,
  RecalcFrame: bbbfly.renderer._recalcFrame,
  ImageProxy: bbbfly.renderer._imageProxy,
  FrameProxy: bbbfly.renderer._frameProxy,
  UpdateImageProxy: bbbfly.renderer._updateImageProxy,
  UpdateFrameProxy: bbbfly.renderer._updateFrameProxy,
  ImageHTML: bbbfly.renderer._imageHTML,
  FrameHTML: bbbfly.renderer._frameHTML,
  DynamicFrameHTML: bbbfly.renderer._dynamicFrameHTML,
  UpdateImageHTML: bbbfly.renderer._updateImageHTML,
  UpdateFrameHTML: bbbfly.renderer._updateFrameHTML
};
bbbfly.Renderer.stateprop = {
  disabled: 'D',
  invalid: 'I',
  selected: 'S',
  grayed: 'G',
  highlight: 'h',
  mouseOver: 'o'
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
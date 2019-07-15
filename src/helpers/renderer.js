/**
 * @file
 * @author Jan Nejedly [support@3b-fly.eu]
 * @copyright Jan Nejedly
 *
 * @inpackage renderer
 */

/** @ignore */
var bbbfly = bbbfly || {};
/** @ignore */
bbbfly.renderer = {};

/** @ignore */
bbbfly.renderer._isImageLTPosition = function(propName){
  if(!String.isString(propName)){return false;}
  return this.ImgLTPattern.test(propName);
};

/** @ignore */
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

/** @ignore */
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

/** @ignore */
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
//DRI SG
/** @ignore */
bbbfly.renderer._updateImageProps = function(img,source,target){
  if(!Object.isObject(img) || !Array.isArray(target)){return;}

  for(var i in target){
    var prop = target[i];
    if(!Number.isInteger(img[prop])){
      img[prop] = img[source];
    }
  }
};

/** @ignore */
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

/** @ignore */
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

/** @ignore */
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

/** @ignore */
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

/** @ignore */
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

/** @ignore */
bbbfly.renderer._imageHTML = function(
  proxy,left,top,right,bottom,state,className,style,innerHtml
){
  if(!Object.isObject(proxy) || proxy._mock){return '';}
  if(!String.isString(proxy.Src) || (proxy.Src === '')){return '';}

  var widht = this.StyleDim(proxy.W);
  var height = this.StyleDim(proxy.H);

  var over = (state && state.mouseover);
  var l = over ? proxy.oL : proxy.L;
  var t = over ? proxy.oT : proxy.T;

  var imgStyle = ' style="position:absolute;overflow:hidden';
  imgStyle += ";background: transparent url('"+proxy.Src+"')";

  if(!widht && !height){imgStyle += 'repeat';}
  else if(!widht){imgStyle += ' repeat-x';}
  else if(!height){imgStyle += ' repeat-y';}
  else{imgStyle += ' no-repeat';}

  imgStyle += ' scroll'
    +' '+this.StyleDim(l,true)
    +' '+this.StyleDim(t,true);

  if(widht){imgStyle += ';width:'+widht;}
  if(height){imgStyle += ';height:'+height;}

  left = this.StyleDim(left);
  top = this.StyleDim(top);
  right = this.StyleDim(right);
  bottom = this.StyleDim(bottom);

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

/** @ignore */
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

/** @ignore */
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

/** @ignore */
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

/** @ignore */
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

/**
 * @class
 * @hideconstructor
 *
 * @inpackage renderer
 *
 * @property {RegExp} [ImgLTPattern=^[o]?[h]?[D]?[R]?[I]?[S|G]?[L|T]$]
 *   Image definition left/top position regular expression.
 */
bbbfly.Renderer = {
  ImgLTPattern: new RegExp('^[o]?[h]?[D]?[R]?[I]?[S|G]?[L|T]$'),

  /**
   * @function
   * @name StyleDim
   * @memberof bbbfly.Renderer#
   * @description Creates valid css dimmension.
   *
   * @param {integer|string} dim - CSS dimmension
   * @param {boolean} neg - Negate value
   * @return {string}
   */
  StyleDim: bbbfly.renderer._styleDim,
  /**
   * @function
   * @name IsImageLTPosition
   * @memberof bbbfly.Renderer#
   * @description Checks image left/top position property name.
   *
   * @param {string} propName
   * @return {boolean}
   */
  IsImageLTPosition: bbbfly.renderer._isImageLTPosition,
  /**
   * @function
   * @name UpdateHTMLState
   * @memberof bbbfly.Renderer#
   * @description Sets html node state attributes.
   *
   * @param {HTMLElement} node
   * @param {bbbfly.Renderer.state} [state=undefined]
   */
  UpdateHTMLState: bbbfly.renderer._updateHTMLState,
  /**
   * @function
   * @name RecalcImage
   * @memberof bbbfly.Renderer#
   * @description Fills in all image states.
   *
   * @param {bbbfly.Renderer.image} [img] - Image definition
   */
  RecalcImage: bbbfly.renderer._recalcImage,
  /**
   * @function
   * @name RecalcFrame
   * @memberof bbbfly.Renderer#
   * @description Fills in all frame image states.
   *
   * @param {bbbfly.Renderer.frame} [frame] - Frame definition
   */
  RecalcFrame: bbbfly.renderer._recalcFrame,
  /**
   * @function
   * @name ImageProxy
   * @memberof bbbfly.Renderer#
   *
   * @param {bbbfly.Renderer.image} [img=undefined] - Image definition
   * @param {bbbfly.Renderer.state} [state=undefined] - Image state
   * @param {string} [id=undefined] - Image ID
   * @return {bbbfly.Renderer.imageproxy}
   */
  ImageProxy: bbbfly.renderer._imageProxy,
  /**
   * @function
   * @name FrameProxy
   * @memberof bbbfly.Renderer#
   *
   * @param {bbbfly.Renderer.frame} [frame=undefined] - Frame definition
   * @param {bbbfly.Renderer.state} [state=undefined] - Frame images state
   * @param {string} [id=undefined] - Frame images ID
   * @return {bbbfly.Renderer.frameproxy}
   */
  FrameProxy: bbbfly.renderer._frameProxy,
  /**
   * @function
   * @name UpdateImageProxy
   * @memberof bbbfly.Renderer#
   * @description Recalculate image properties to certain state.
   *
   * @param {bbbfly.Renderer.imageproxy} [proxy=undefined]
   * @param {bbbfly.Renderer.state} [state=undefined] - Image state
   */
  UpdateImageProxy: bbbfly.renderer._updateImageProxy,
  /**
   * @function
   * @name UpdateFrameProxy
   * @memberof bbbfly.Renderer#
   *
   * @param {bbbfly.Renderer.frameproxy} [proxy=undefined]
   * @param {bbbfly.Renderer.state} [state=undefined] - Frame images state
   */
  UpdateFrameProxy: bbbfly.renderer._updateFrameProxy,
  /**
   * @function
   * @name ImageHTML
   * @memberof bbbfly.Renderer#
   *
   * @param {bbbfly.Renderer.imageproxy} [proxy=undefined]
   * @param {px|percentage} [left=undefined] - Image left position
   * @param {px|percentage} [top=undefined] - Image top position
   * @param {px|percentage} [right=undefined] - Image right position
   * @param {px|percentage} [bottom=undefined] - Image bottom position
   * @param {bbbfly.Renderer.state} [state=undefined] - Image state
   * @param {string} [className=undefined] - Image className
   * @param {string} [style=undefined] - Additional image style
   * @param {string} [innerHtml=undefined] - Image innerHtml
   * @return {string} Image Html
   */
  ImageHTML: bbbfly.renderer._imageHTML,
  /**
   * @function
   * @name FrameHTML
   * @memberof bbbfly.Renderer#
   *
   * @param {bbbfly.Renderer.frameproxy} [proxyundefined]
   * @param {bbbfly.Renderer.state} [state=undefined] - Frame images state
   * @param {string} [className=undefined] - Frame images className
   * @return {string} Frame images Html
   */
  FrameHTML: bbbfly.renderer._frameHTML,
  /**
   * @function
   * @name DynamicFrameHTML
   * @memberof bbbfly.Renderer#
   *
   * @param {bbbfly.Renderer.frameproxy} [proxy=undefined]
   * @param {bbbfly.Renderer.state} [state=undefined] - Frame images state
   * @param {string} [className=undefined] - Frame images className
   * @param {string} [innerHtml=undefined] - Frame innerHtml
   * @return {string} Frame images Html
   */
  DynamicFrameHTML: bbbfly.renderer._dynamicFrameHTML,
  /**
   * @function
   * @name UpdateImageHTML
   * @memberof bbbfly.Renderer#
   *
   * @param {bbbfly.Renderer.imageproxy} [proxy=undefined]
   * @param {bbbfly.Renderer.state} [state=undefined] - Image state
   */
  UpdateImageHTML: bbbfly.renderer._updateImageHTML,
  /**
   * @function
   * @name UpdateFrameHTML
   * @memberof bbbfly.Renderer#
   *
   * @param {bbbfly.Renderer.frameproxy} [proxy=undefined]
   * @param {bbbfly.Renderer.state} [state=undefined] - Frame images state
   */
  UpdateFrameHTML: bbbfly.renderer._updateFrameHTML
};

/**
 * @enum {string}
 */
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
 * @typedef {object} state
 * @memberOf bbbfly.Renderer
 *
 * @property {boolean} mouseover
 * @property {boolean} highlight
 * @property {boolean} disabled
 * @property {boolean} readonly
 * @property {boolean} invalid
 * @property {boolean} selected
 * @property {boolean} grayed
 *
 *
 */

/**
 * @typedef {px} imagepos
 * @memberOf bbbfly.Renderer
 * @description
 *   Property name must meet
 *   <a>/[o]?[h]?[D]?[R]?[I]?[S|G]?[L|T]/</a>
 *   state mask
 *   <br/><br/>
 *   <ul>
 *     <li><b>o</b> - mouse over</li>
 *     <li><b>h</b> - highlight</li>
 *     <li><b>D</b> - disabled</li>
 *     <li><b>R</b> - read only</li>
 *     <li><b>I</b> - invalid</li>
 *     <li><b>S</b> - selected</li>
 *     <li><b>G</b> - grayed</li>
 *     <li><b>L</b> - left</li>
 *     <li><b>T</b> - top</li>
 *   </ul>
 * </code>
 */

/**
 * @typedef {object} image
 * @memberOf bbbfly.Renderer
 *
 * @property {bbbfly.Renderer.imagepos} ...L
 * @property {bbbfly.Renderer.imagepos} ...T
 * @property {px} W
 * @property {px} H
 * @property {url} Src
 */

/**
 * @typedef {object} frame
 * @memberOf bbbfly.Renderer
 *
 * @property {bbbfly.Renderer.image} LeftTop
 * @property {bbbfly.Renderer.image} RightTop
 * @property {bbbfly.Renderer.image} LeftBottom
 * @property {bbbfly.Renderer.image} RightBottom
 * @property {bbbfly.Renderer.image} Left
 * @property {bbbfly.Renderer.image} Top
 * @property {bbbfly.Renderer.image} Right
 * @property {bbbfly.Renderer.image} Bottom
 * @property {bbbfly.Renderer.image} Center
 */

/**
 * @typedef {object} imageproxy
 * @memberOf bbbfly.Renderer
 *
 * @description Image properties for certain state
 *
 * @property {bbbfly.Renderer.image} [Img] - Full image definition
 * @property {string|undefined} [Id] - Image ID
 * @property {url|undefined} [Src] - Image source url
 * @property {px|undefined} [W] - Image width
 * @property {px|undefined} [H] - Image height
 * @property {px} [L] - Image cutout left position
 * @property {px} [T] - Image cutout top position
 * @property {px} [oL] - Mouse-over image cutout left position
 * @property {px} [oT] - Mouse-over image cutout top position
 */

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
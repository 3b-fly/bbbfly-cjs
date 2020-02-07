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
bbbfly.renderer._imageId = function(id,suffix){
  if(!String.isString(id)){return null;}
  return String.isString(suffix) ? id+suffix : id;
};

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

/** @ignore */
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

/** @ignore */
bbbfly.renderer._recalcImageState = function(img,state,pos){
  if(!Object.isObject(img)){return;}
  if(!Object.isObject(state)){return;}
  if(!Object.isObject(pos)){return;}

  var hasLeft = Number.isInteger(pos.L);
  var hasTop = Number.isInteger(pos.T);
  if(!hasLeft && !hasTop){return;}

  for(var propName in img){
    if(!Number.isInteger(img[propName])){continue;}
    if(!this.IsImageLTPosition(propName)){continue;}
    if(!this.ContainsState(propName,state)){continue;}

    var lastChar = propName.slice(-1);
    if(hasLeft && (lastChar === 'L')){img[propName] += pos.L;}
    if(hasTop && (lastChar === 'T')){img[propName] += pos.T;}
  }
};

/** @ignore */
bbbfly.renderer._recalcImage = function(img){
  if(!Object.isObject(img)){return;}

  if(!Number.isInteger(img.L)){img.L = 0;}
  if(!Number.isInteger(img.T)){img.T = 0;}

  var map = this.ImgStateMap;
  if(!Object.isObject(map)){return;}

  bbbfly.renderer._updateImageProps(img,map);
};

/** @ignore */
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

      if(bbbfly.Renderer.IsImageLTPosition(imgState)){
        var defState = imgState.slice(-1);
        img[imgState] = img[defState];
      }
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

  if(Object.isObject(img.Anchor)){
    proxy.Anchor = {L:0,T:0};
    if(Number.isInteger(img.Anchor.L)){proxy.Anchor.L = img.Anchor.L;}
    if(Number.isInteger(img.Anchor.T)){proxy.Anchor.T = img.Anchor.T;}
  }

  this.UpdateImageProxy(proxy,state);
  return proxy;
};

/** @ignore */
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

/** @ignore */
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

/** @ignore */
bbbfly.renderer._updateImageProxy = function(proxy,state){
  if(!Object.isObject(proxy) || proxy._mock){return;}
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
bbbfly.renderer._updateStackProxy = function(proxy,state){
  if(!Object.isObject(proxy)){return;}

  for(var i in proxy.Imgs){
    this.UpdateImageProxy(proxy.Imgs[i],state);
  }
};

/** @ignore */
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

/** @ignore */
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

/** @ignore */
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

/** @ignore */
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

/** @ignore */
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

/** @ignore */
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

/** @ignore */
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

/** @ignore */
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

/** @ignore */
bbbfly.renderer._updateStackHTML = function(proxy,state,id){
  if(!Object.isObject(proxy)){return;}

  for(var i in proxy.Imgs){
    this.UpdateImageHTML(
      proxy.Imgs[i],state,this.ImageId(id,'_'+i)
    );
  }
};

/**
 * @class
 * @hideconstructor
 *
 * @inpackage renderer
 *
 * @property {RegExp} [ImgLTPattern=^[o]?[h]?[D]?[R]?[I]?[S|G]?[L|T]$]
 *   Image definition left/top position regular expression
 *
 * @property {object} ImgStateMap - Image state dependancy map
 */
bbbfly.Renderer = {
  ImgLTPattern: new RegExp('^[o]?[h]?[D]?[R]?[I]?[S|G]?[L|T]$'),

  ImgStateMap: {
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

  /** @private */
  ImageId: bbbfly.renderer._imageId,
  /** @private */
  ImageHTMLProps: bbbfly.renderer._imageHTMLProps,

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
   * @name StyleToString
   * @memberof bbbfly.Renderer#
   * @description Converts style definition into CSS style string.
   *
   * @param {bbbfly.Renderer.style} [style=undefined]
   * @return {string}
   */
  StyleToString: bbbfly.renderer._styleToString,
  /**
   * @function
   * @name ContainsState
   * @memberof bbbfly.Renderer#
   * @description Checks if image property fits state.
   *
   * @param {string} propName
   * @param {bbbfly.Renderer.state} state
   * @return {boolean}
   */
  ContainsState: bbbfly.renderer._containsState,
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
   * @param {bbbfly.Renderer.state} state
   */
  UpdateHTMLState: bbbfly.renderer._updateHTMLState,
  /**
   * @function
   * @name RecalcImageState
   * @memberof bbbfly.Renderer#
   * @description Modifies in all state positions.
   *
   * @param {bbbfly.Renderer.image} img - Image definition
   * @param {bbbfly.Renderer.state} state - State to recalc
   * @param {bbbfly.Renderer.pos} pos - State position
   */
  RecalcImageState: bbbfly.renderer._recalcImageState,
  /**
   * @function
   * @name RecalcImage
   * @memberof bbbfly.Renderer#
   * @description Fills in all image states.
   *
   * @param {bbbfly.Renderer.image} img - Image definition
   */
  RecalcImage: bbbfly.renderer._recalcImage,
  /**
   * @function
   * @name RecalcFrame
   * @memberof bbbfly.Renderer#
   * @description Fills in all frame image states.
   *
   * @param {bbbfly.Renderer.frame} frame - Frame definition
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
   * @name StackProxy
   * @memberof bbbfly.Renderer#
   *
   * @param {bbbfly.Renderer.image[]} [imgs=undefined] - Image definitions
   * @param {bbbfly.Renderer.state} [state=undefined] - Stack images state
   * @param {string} [id=undefined] - Stack images ID
   * @return {bbbfly.Renderer.stackproxy}
   */
  StackProxy: bbbfly.renderer._stackProxy,
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
   * @name UpdateStackProxy
   * @memberof bbbfly.Renderer#
   *
   * @param {bbbfly.Renderer.stackproxy} [proxy=undefined]
   * @param {bbbfly.Renderer.state} [state=undefined] - Frame images state
   */
  UpdateStackProxy: bbbfly.renderer._updateStackProxy,
  /**
   * @function
   * @name SetImage
   * @memberof bbbfly.Renderer#
   *
   * @param {bbbfly.Renderer.imageproxy} [proxy=undefined]
   * @param {px|percentage} [left=undefined] - Image left position
   * @param {px|percentage} [top=undefined] - Image top position
   * @param {px|percentage} [right=undefined] - Image right position
   * @param {px|percentage} [bottom=undefined] - Image bottom position
   * @param {bbbfly.Renderer.state} [state=undefined] - Image state
   * @param {string} [className=undefined] - Image className
   * @param {bbbfly.Renderer.style} [style=undefined] - Additional image style
   * @param {string} [innerHtml=undefined] - Image innerHtml
   * @param {string} [id=undefined] - Force image ID
   * @return {string} Image Html
   */
  SetImage: bbbfly.renderer._setImage,
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
   * @param {bbbfly.Renderer.style} [style=undefined] - Additional image style
   * @param {string} [innerHtml=undefined] - Image innerHtml
   * @param {string} [id=undefined] - Force image ID
   * @return {string} Image Html
   */
  ImageHTML: bbbfly.renderer._imageHTML,
  /**
   * @function
   * @name FrameHTML
   * @memberof bbbfly.Renderer#
   *
   * @param {bbbfly.Renderer.frameproxy} [proxy=undefined]
   * @param {bbbfly.Renderer.state} [state=undefined] - Frame images state
   * @param {string} [className=undefined] - Frame images className
   * @param {string} [id=undefined] - Force frame ID
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
   * @param {string} [id=undefined] - Force frame ID
   * @return {string} Frame images Html
   */
  DynamicFrameHTML: bbbfly.renderer._dynamicFrameHTML,
  /**
   * @function
   * @name StackHTML
   * @memberof bbbfly.Renderer#
   *
   * @param {bbbfly.Renderer.stackproxy} [proxy=undefined]
   * @param {bbbfly.Renderer.state} [state=undefined] - Stack images state
   * @param {string} [className=undefined] - Stack images className
   * @param {string} [id=undefined] - Force stack ID
   * @return {string} Stack images Html
   */
  StackHTML: bbbfly.renderer._stackHTML,
  /**
   * @function
   * @name UpdateImageHTML
   * @memberof bbbfly.Renderer#
   *
   * @param {bbbfly.Renderer.imageproxy} [proxy=undefined]
   * @param {bbbfly.Renderer.state} [state=undefined] - Image state
   * @param {string} [id=undefined] - Force image ID
   */
  UpdateImageHTML: bbbfly.renderer._updateImageHTML,
  /**
   * @function
   * @name UpdateFrameHTML
   * @memberof bbbfly.Renderer#
   *
   * @param {bbbfly.Renderer.frameproxy} [proxy=undefined]
   * @param {bbbfly.Renderer.state} [state=undefined] - Frame images state
   * @param {string} [id=undefined] - Force frame ID
   */
  UpdateFrameHTML: bbbfly.renderer._updateFrameHTML,
  /**
   * @function
   * @name UpdateStackHTML
   * @memberof bbbfly.Renderer#
   *
   * @param {bbbfly.Renderer.stackproxy} [proxy=undefined]
   * @param {bbbfly.Renderer.state} [state=undefined] - Stack images state
   * @param {string} [id=undefined] - Force stack ID
   */
  UpdateStackHTML: bbbfly.renderer._updateStackHTML
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
 * @typedef {object} style
 * @memberOf bbbfly.Renderer
 *
 * @description Object with CSS property name - value pairs.
 */

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
 * @typedef {object} pos
 * @memberOf bbbfly.Renderer
 *
 * @property {px} L
 * @property {px} T
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
 * @property {pos} Anchor
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
 * @property {pos} [Anchor] - Image reference point
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
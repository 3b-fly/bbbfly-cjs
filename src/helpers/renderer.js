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
  if(Object.isObject(img)){
    if(!Number.isInteger(img.L)){img.L = 0;}
    if(!Number.isInteger(img.T)){img.T = 0;}

    if(!Number.isInteger(img.SL)){img.SL = img.L;}
    if(!Number.isInteger(img.ST)){img.ST = img.T;}
    if(!Number.isInteger(img.GL)){img.GL = img.L;}
    if(!Number.isInteger(img.GT)){img.GT = img.T;}

    if(!Number.isInteger(img.DL)){img.DL = img.L;}
    if(!Number.isInteger(img.DT)){img.DT = img.T;}
    if(!Number.isInteger(img.IL)){img.IL = img.L;}
    if(!Number.isInteger(img.IT)){img.IT = img.T;}

    if(!Number.isInteger(img.DSL)){img.DSL = img.SL;}
    if(!Number.isInteger(img.DST)){img.DST = img.ST;}
    if(!Number.isInteger(img.DGL)){img.DGL = img.GL;}
    if(!Number.isInteger(img.DGT)){img.DGT = img.GT;}

    if(!Number.isInteger(img.ISL)){img.ISL = img.SL;}
    if(!Number.isInteger(img.IST)){img.IST = img.ST;}
    if(!Number.isInteger(img.IGL)){img.IGL = img.GL;}
    if(!Number.isInteger(img.IGT)){img.IGT = img.GT;}

    if(!Number.isInteger(img.hL)){img.hL = img.L;}
    if(!Number.isInteger(img.hT)){img.hT = img.T;}

    if(!Number.isInteger(img.hSL)){img.hSL = img.SL;}
    if(!Number.isInteger(img.hST)){img.hST = img.ST;}
    if(!Number.isInteger(img.hGL)){img.hGL = img.GL;}
    if(!Number.isInteger(img.hGT)){img.hGT = img.GT;}

    if(!Number.isInteger(img.hDL)){img.hDL = img.DL;}
    if(!Number.isInteger(img.hDT)){img.hDT = img.DT;}
    if(!Number.isInteger(img.hIL)){img.hIL = img.IL;}
    if(!Number.isInteger(img.hIT)){img.hIT = img.IT;}

    if(!Number.isInteger(img.hDSL)){img.hDSL = img.DSL;}
    if(!Number.isInteger(img.hDST)){img.hDST = img.DST;}
    if(!Number.isInteger(img.hDGL)){img.hDGL = img.DGL;}
    if(!Number.isInteger(img.hDGT)){img.hDGT = img.DGT;}

    if(!Number.isInteger(img.hISL)){img.hISL = img.ISL;}
    if(!Number.isInteger(img.hIST)){img.hIST = img.IST;}
    if(!Number.isInteger(img.hIGL)){img.hIGL = img.IGL;}
    if(!Number.isInteger(img.hIGT)){img.hIGT = img.IGT;}
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
    this.RecalcImage(frame.Pane);
  }
};

/** @ignore */
bbbfly.renderer._imageProps = function(img,state,id){
  if(!Object.isObject(img)){return {W:0,H:0,_mock:true};}

  var props = {_mock:false};
  if(String.isString(id)){props.id = id;}
  if(String.isString(img.Src)){props.Src = img.Src;}

  if(Number.isInteger(img.W)){props.W = img.W;}
  if(Number.isInteger(img.H)){props.H = img.H;}

  var propName = '';
  if(Object.isObject(state)){
    if(state.highlight){propName += 'h';}

    if(state.disabled){propName += 'D';}
    else if(state.invalid){propName += 'I';}

    if(state.selected){propName += 'S';}
    else if(state.grayed){propName += 'G';}
  }

  var l = img[propName+'L'];
  var t = img[propName+'T'];

  if(!Number.isInteger(l) || !Number.isInteger(t)){
    this.RecalcImage(img);
    l = img[propName+'L'];
    t = img[propName+'T'];
  }

  var ol = img['o'+propName+'L'];
  var ot = img['o'+propName+'T'];

  if(Number.isInteger(l)){props.L = l;}
  if(Number.isInteger(t)){props.T = t;}

  props.oL = Number.isInteger(ol) ? ol : props.L;
  props.oT = Number.isInteger(ot) ? ot : props.T;

  return props;
};

/** @ignore */
bbbfly.renderer._frameProps = function(frame,state,id){
  if(!Object.isObject(frame)){frame = {};}
  var hasId = String.isString(id);

  function imgId(suffix){
    return (hasId) ? id+suffix : null;
  };

  var props = {
    L: this.ImageProps(frame.Left,state,imgId('_FL')),
    T: this.ImageProps(frame.Top,state,imgId('_FT')),
    R: this.ImageProps(frame.Right,state,imgId('_FR')),
    B: this.ImageProps(frame.Bottom,state,imgId('_FB')),
    LT: this.ImageProps(frame.LeftTop,state,imgId('_FLT')),
    RT: this.ImageProps(frame.RightTop,state,imgId('_FRT')),
    LB: this.ImageProps(frame.LeftBottom,state,imgId('_FLB')),
    RB: this.ImageProps(frame.RightBottom,state,imgId('_FRB')),
    P: this.ImageProps(frame.Pane,state,imgId('_FP'))
  };

  if(String.isString(id)){props.id = id;}
  return props;
};

/** @ignore */
bbbfly.renderer._imageHTML = function(
  props,left,top,right,bottom,state,className,style,innerHtml
){
  if(!Object.isObject(props) || props._mock){return '';}
  if(!String.isString(props.Src) || (props.Src === '')){return '';}

  var widht = bbbfly.renderer._styleDim(props.W);
  var height = bbbfly.renderer._styleDim(props.H);

  var mouseOver = (state && state.mouseOver);
  var l = mouseOver ? props.oL : props.L;
  var t = mouseOver ? props.oT : props.T;

  var imgStyle = ' style="position:absolute;overflow:hidden';
  imgStyle += ";background: transparent url('"+props.Src+"')";

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
  if(String.isString(props.id)){attrs += ' id="'+props.id+'"';}
  if(String.isString(className)){attrs += ' class="'+className+'"';}

  if((props.L !== props.oL)||(props.T !== props.oT)){
    if(Number.isInteger(props.L)){attrs += ' L="'+props.L+'"';}
    if(Number.isInteger(props.T)){attrs += ' T="'+props.T+'"';}
    if(Number.isInteger(props.oL)){attrs += ' oL="'+props.oL+'"';}
    if(Number.isInteger(props.oT)){attrs += ' oT="'+props.oT+'"';}
  }

  if(!String.isString(innerHtml)){innerHtml = '';}
  return '<div unselectable="on"'+imgStyle+attrs+'>'+innerHtml+'</div>';
};

/** @ignore */
bbbfly.renderer._frameHTML = function(props,state,className){
  var frameHtml = '';

  if(Object.isObject(props)){
    frameHtml += this.ImageHTML(
      props.L,0,props.LT.H,null,props.LB.H,state,className
    );
    frameHtml += this.ImageHTML(
      props.T,props.LT.W,0,props.RT.W,null,state,className
    );
    frameHtml += this.ImageHTML(
      props.R,null,props.RT.H,0,props.RB.H,state,className
    );
    frameHtml += this.ImageHTML(
      props.B,props.LB.W,null,props.RB.W,0,state,className
    );
    frameHtml += this.ImageHTML(
      props.LT,0,0,null,null,state,className
    );
    frameHtml += this.ImageHTML(
      props.RT,null,0,0,null,state,className
    );
    frameHtml += this.ImageHTML(
      props.LB,0,null,null,0,state,className
    );
    frameHtml += this.ImageHTML(
      props.RB,null,null,0,0,state,className
    );
    frameHtml += this.ImageHTML(
      props.P,props.L.W,props.T.H,props.R.W,props.B.H,state,className
    );
  }
  return frameHtml;
};

/** @ignore */
bbbfly.renderer._dynamicFrameHTML = function(
  props,state,className,innerHtml
){
  var frameHtml = this.FrameHTML(props,state,className);

  if(String.isString(innerHtml)){
    var left = bbbfly.renderer._styleDim(props.L.W);
    var top = bbbfly.renderer._styleDim(props.T.H);
    var right = bbbfly.renderer._styleDim(props.R.W);
    var bottom = bbbfly.renderer._styleDim(props.B.H);

    var attrs = '';
    if(left){attrs += 'padding-left:'+left+';';}
    if(top){attrs += 'padding-top:'+top+';';}
    if(right){attrs += 'padding-right:'+right+';';}
    if(bottom){attrs += 'padding-bottom:'+bottom+';';}
    if(attrs){attrs = ' style="'+attrs+'"';}

    if(String.isString(className)){attrs += ' class="'+className+'"';}
    if(Object.isObject(props) && String.isString(props.id)){
      attrs += ' id="'+props.id+'_C"';
    }

    frameHtml += '<div unselectable="on"'+attrs+'>'+innerHtml+'</div>';
  }
  return frameHtml;
};

/**
 * @class
 * @hideconstructor
 *
 * @inpackage renderer
 */
bbbfly.Renderer = {
  /**
   * @function
   * @name RecalcImage
   * @memberof bbbfly.Renderer#
   * @description fills in all image states.
   *
   * @param {bbbfly.Renderer.image} [img] - Image definition
   */
  RecalcImage: bbbfly.renderer._recalcImage,
  /**
   * @function
   * @name RecalcFrame
   * @memberof bbbfly.Renderer#
   * @description fills in all frame image states.
   *
   * @param {bbbfly.Renderer.frame} [frame] - Frame definition
   */
  RecalcFrame: bbbfly.renderer._recalcFrame,
  /**
   * @function
   * @name ImageProps
   * @memberof bbbfly.Renderer#
   *
   * @param {bbbfly.Renderer.image} [img=undefined] - Image definition
   * @param {bbbfly.Renderer.state} [state=undefined] - Image state
   * @param {string} [id=undefined] - Image ID
   * @return {bbbfly.Renderer.imageprops}
   */
  ImageProps: bbbfly.renderer._imageProps,
  /**
   * @function
   * @name FrameProps
   * @memberof bbbfly.Renderer#
   *
   * @param {bbbfly.Renderer.frame} [frame=undefined] - Frame definition
   * @param {bbbfly.Renderer.state} [state=undefined] - Frame images state
   * @param {string} [id=undefined] - Frame images ID
   * @return {bbbfly.Renderer.frameprops}
   */
  FrameProps: bbbfly.renderer._frameProps,
  /**
   * @function
   * @name ImageHTML
   * @memberof bbbfly.Renderer#
   *
   * @param {bbbfly.Renderer.imageprops} [props=undefined]
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
   * @param {bbbfly.Renderer.frameprops} [props=undefined]
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
   * @param {bbbfly.Renderer.frameprops} [props=undefined]
   * @param {bbbfly.Renderer.state} [state=undefined] - Frame images state
   * @param {string} [className=undefined] - Frame images className
   * @param {string} [innerHtml=undefined] - Frame innerHtml
   * @return {string} Frame images Html
   */
  DynamicFrameHTML: bbbfly.renderer._dynamicFrameHTML
};

/**
 * @typedef {object} state
 * @memberOf bbbfly.Renderer
 *
 * @property {boolean} disabled
 * @property {boolean} invalid
 * @property {boolean} selected
 * @property {boolean} grayed
 * @property {boolean} highlight
 * @property {boolean} mouseOver
 */

/**
 * @typedef {object} image
 * @memberOf bbbfly.Renderer
 *
 * @property {px} ...L - Any <a>/[o]?[h]?[D|I]?[S|G]?L/</a> property
 * @property {px} ...T - Any <a>/[o]?[h]?[D|I]?[S|G]?T/</a> property
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
 * @property {bbbfly.Renderer.image} Pane
 */

/**
 * @typedef {object} imageprops
 * @memberOf bbbfly.Renderer
 *
 * @description Image properties for certain state
 *
 * @property {string|undefined} [id] - Image ID
 * @property {url|undefined} [Src] - Image source url
 * @property {px|undefined} [W] - Image width
 * @property {px|undefined} [H] - Image height
 * @property {px|undefined} [L] - Image cutout left position
 * @property {px|undefined} [T] - Image cutout top position
 * @property {px|undefined} [oL] - Mouse-over image cutout left position
 * @property {px|undefined} [oT] - Mouse-over image cutout top position
 */

/**
 * @typedef {object} frameprops
 * @memberOf bbbfly.Renderer
 *
 * @description Frame image properties for certain state
 *
 * @property {string|undefined} [id] - Frame ID
 * @property {bbbfly.Renderer.imageprops} [L] - Left image properties
 * @property {bbbfly.Renderer.imageprops} [T] - Top image properties
 * @property {bbbfly.Renderer.imageprops} [R] - Right image properties
 * @property {bbbfly.Renderer.imageprops} [B] - Bottom image properties
 * @property {bbbfly.Renderer.imageprops} [LT] - LeftTop image properties
 * @property {bbbfly.Renderer.imageprops} [RT] - RightTop image properties
 * @property {bbbfly.Renderer.imageprops} [LB] - LeftBottom image properties
 * @property {bbbfly.Renderer.imageprops} [RB] - RightBottom image properties
 * @property {bbbfly.Renderer.imageprops} [P] - Pane image properties
 */
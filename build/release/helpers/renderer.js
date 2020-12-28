/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/

var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Number.isFinite",function(a){return a?a:function(a){return"number"!==typeof a?!1:!isNaN(a)&&Infinity!==a&&-Infinity!==a}},"es6","es3");
$jscomp.polyfill("Number.isInteger",function(a){return a?a:function(a){return Number.isFinite(a)?a===Math.floor(a):!1}},"es6","es3");var bbbfly=bbbfly||{};bbbfly.renderer={};bbbfly.renderer._imageId=function(a,b){return String.isString(a)?String.isString(b)?a+b:a:null};bbbfly.renderer._updateHTMLState=function(a,b){if(a instanceof HTMLElement&&Object.isObject(b))for(var c in b){var d=bbbfly.Renderer.stateattr[c];String.isString(d)&&(b[c]?a.setAttribute(d,"1"):a.removeAttribute(d))}};
bbbfly.renderer._styleDim=function(a,b){return Number.isInteger(a)?(b&&(a*=-1),a+"px"):String.isString(a)?b?0===a.indexOf("-")?a.substring(1):"-"+a:a:""};bbbfly.renderer._styleToString=function(a){if(!Object.isObject(a))return"";var b="",c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];String.isString(d)&&d&&(b+=c+":"+d+";")}b&&(b=' style="'+b+'"');return b};
bbbfly.renderer._getStatePropName=function(a,b){var c="";if(Object.isObject(a)){var d=bbbfly.Renderer.stateattr;a.disabled&&(c+=d.disabled);a.readonly&&(c+=d.readonly);a.invalid&&(c+=d.invalid);a.selected?c+=d.selected:a.grayed&&(c+=d.grayed)}String.isString(b)&&(c+=b);return c};bbbfly.renderer._isStateProp=function(a,b){if(!String.isString(a))return!1;String.isString(b)||(b=this.StatePropPattern_Any);return(new RegExp("^"+this.StatePropPattern+b+"$")).test(a)};
bbbfly.renderer._getStateValue=function(a,b,c){if(!Object.isObject(a))return a;if(Object.isObject(b)){var d=bbbfly.Renderer.stateattr,e=this.GetStatePropName(b,c);if(b.highlight){if(b.mouseover&&(b=d.mouseover+d.highlight+e,a.hasOwnProperty(b)))return a[b];b=d.highlight+e;if(a.hasOwnProperty(b))return a[b]}b=d.mouseover+e;if(a.hasOwnProperty(b))return a[b];b=e;if(a.hasOwnProperty(b))return a[b];this.RecalcValue(a,c);if(a.hasOwnProperty(b))return a[b]}};
bbbfly.renderer._containsState=function(a,b){if(!String.isString(a)||!Object.isObject(b))return!1;for(var c in b){var d=bbbfly.Renderer.stateattr[c];if(String.isString(d)&&!(0>a.indexOf(d))!==!!b[c])return!1}return!0};bbbfly.renderer._isImagePosition=function(a){return String.isString(a)?this.IsStateProp(a,this.StatePropPattern_Pos):!1};
bbbfly.renderer._recalcValue=function(a,b){if(Object.isObject(a)){String.isString(b)||(b="");a.hasOwnProperty(b)||(a[b]=void 0);var c=this.StateMap;Object.isObject(c)&&bbbfly.renderer._updateValueProps(a,b,c)}};
bbbfly.renderer._updateValueProps=function(a,b,c,d){if(Object.isObject(a)&&Object.isObject(c)){String.isString(b)||(b="");var e=String.isString(d),g;for(g in c){var f=g+b;a.hasOwnProperty(f)||(a[f]=e?a[d+b]:void 0);f=c[g];Object.isObject(f)&&bbbfly.renderer._updateValueProps(a,b,f,g)}if(!e)for(var h in a)"undefined"===typeof a[h]&&bbbfly.Renderer.IsStateProp(h,b)&&(a[h]=a[b])}};
bbbfly.renderer._recalcImage=function(a){if(Object.isObject(a)){Number.isInteger(a.L)||(a.L=0);Number.isInteger(a.T)||(a.T=0);var b=this.StateMap;Object.isObject(b)&&bbbfly.renderer._updateImageProps(a,b)}};
bbbfly.renderer._recalcImageState=function(a,b,c){if(Object.isObject(a)&&Object.isObject(b)&&Object.isObject(c)){var d=Number.isInteger(c.L),e=Number.isInteger(c.T);if(d||e)for(var g in a)if(Number.isInteger(a[g])&&this.IsImagePosition(g)&&this.ContainsState(g,b)){var f=g.slice(-1);d&&"L"===f&&(a[g]+=c.L);e&&"T"===f&&(a[g]+=c.T)}}};
bbbfly.renderer._updateImageProps=function(a,b,c){if(Object.isObject(a)&&Object.isObject(b)){var d=String.isString(c),e;for(e in b){Number.isInteger(a[e+"L"])||(a[e+"L"]=d?a[c+"L"]:void 0);Number.isInteger(a[e+"T"])||(a[e+"T"]=d?a[c+"T"]:void 0);var g=b[e];Object.isObject(g)&&bbbfly.renderer._updateImageProps(a,g,e)}if(!d)for(var f in a)!Number.isInteger(a[f])&&bbbfly.Renderer.IsImagePosition(f)&&(b=f.slice(-1),a[f]=a[b])}};
bbbfly.renderer._recalcFrame=function(a){Object.isObject(a)&&(this.RecalcImage(a.Left),this.RecalcImage(a.Top),this.RecalcImage(a.Right),this.RecalcImage(a.Bottom),this.RecalcImage(a.LeftTop),this.RecalcImage(a.RightTop),this.RecalcImage(a.LeftBottom),this.RecalcImage(a.RightBottom),this.RecalcImage(a.Center))};
bbbfly.renderer._imageProxy=function(a,b,c){if(!Object.isObject(a))return{W:0,H:0,_mock:!0};var d={Img:a,_mock:!1};String.isString(c)&&(d.Id=c);String.isString(a.Src)&&(d.Src=a.Src);Number.isInteger(a.W)&&(d.W=a.W);Number.isInteger(a.H)&&(d.H=a.H);Object.isObject(a.Anchor)&&(d.Anchor={L:0,T:0},Number.isInteger(a.Anchor.L)&&(d.Anchor.L=a.Anchor.L),Number.isInteger(a.Anchor.T)&&(d.Anchor.T=a.Anchor.T));this.UpdateImageProxy(d,b);return d};
bbbfly.renderer._frameProxy=function(a,b,c){Object.isObject(a)||(a={});a={L:this.ImageProxy(a.Left,b,this.ImageId(c,"_FL")),T:this.ImageProxy(a.Top,b,this.ImageId(c,"_FT")),R:this.ImageProxy(a.Right,b,this.ImageId(c,"_FR")),B:this.ImageProxy(a.Bottom,b,this.ImageId(c,"_FB")),LT:this.ImageProxy(a.LeftTop,b,this.ImageId(c,"_FLT")),RT:this.ImageProxy(a.RightTop,b,this.ImageId(c,"_FRT")),LB:this.ImageProxy(a.LeftBottom,b,this.ImageId(c,"_FLB")),RB:this.ImageProxy(a.RightBottom,b,this.ImageId(c,"_FRB")),
C:this.ImageProxy(a.Center,b,this.ImageId(c,"_FC"))};String.isString(c)&&(a.Id=c);return a};bbbfly.renderer._stackProxy=function(a,b,c){Array.isArray(a)||(a=[]);var d=[],e={L:0,T:0,R:0,B:0},g;for(g in a){var f=this.ImageProxy(a[g],b,this.ImageId(c,"_"+g));d.push(f);if(f.W&&f.H){var h=f.Anchor?f.Anchor.L:0,m=f.Anchor?f.Anchor.T:0,k=f.W?f.W-h:0;f=f.H?f.H-m:0;h>e.L&&(e.L=h);m>e.T&&(e.T=m);k>e.R&&(e.R=k);f>e.B&&(e.B=f)}}a={Imgs:d,Anchor:e,W:e.L+e.R,H:e.T+e.B};String.isString(c)&&(a.Id=c);return a};
bbbfly.renderer._updateImageProxy=function(a,b){if(Object.isObject(a)&&!a._mock&&Object.isObject(a.Img)){var c=null,d=null,e=null,g=null,f=bbbfly.Renderer.stateattr,h=this.GetStatePropName(b);Object.isObject(b)&&b.highlight&&(b=f.highlight+h,c=a.Img[b+"L"],d=a.Img[b+"T"],e=a.Img[f.mouseover+b+"L"],g=a.Img[f.mouseover+b+"T"]);Number.isInteger(c)&&Number.isInteger(d)||(c=a.Img[h+"L"],d=a.Img[h+"T"],Number.isInteger(c)&&Number.isInteger(d)||(this.RecalcImage(a.Img),c=a.Img[h+"L"],d=a.Img[h+"T"]),e=a.Img[f.mouseover+
h+"L"],g=a.Img[f.mouseover+h+"T"]);Number.isInteger(c)&&(a.L=c);Number.isInteger(d)&&(a.T=d);a.oL=Number.isInteger(e)?e:a.L;a.oT=Number.isInteger(g)?g:a.T}};bbbfly.renderer._updateFrameProxy=function(a,b){Object.isObject(a)&&(this.UpdateImageProxy(a.L,b),this.UpdateImageProxy(a.T,b),this.UpdateImageProxy(a.R,b),this.UpdateImageProxy(a.B,b),this.UpdateImageProxy(a.LT,b),this.UpdateImageProxy(a.RT,b),this.UpdateImageProxy(a.LB,b),this.UpdateImageProxy(a.RB,b),this.UpdateImageProxy(a.C,b))};
bbbfly.renderer._updateStackProxy=function(a,b){if(Object.isObject(a))for(var c in a.Imgs)this.UpdateImageProxy(a.Imgs[c],b)};
bbbfly.renderer._imageHTMLProps=function(a,b,c,d,e,g,f,h,m,k){if(!Object.isObject(a)||a._mock||!String.isString(a.Src)||""===a.Src)return null;var l={id:null,className:null,innerHtml:"",style:{}};b=this.StyleDim(b);c=this.StyleDim(c);d=this.StyleDim(d);e=this.StyleDim(e);var n=this.StyleDim(a.W),q=this.StyleDim(a.H),p=g&&g.mouseover;g=p?a.oL:a.L;p=p?a.oT:a.T;l.style.position="absolute";l.style.overflow="hidden";l.style.left=b;l.style.top=c;l.style.right=d;l.style.bottom=e;l.style.width=n;l.style.height=
q;b="transparent url('"+a.Src+"')";b=(n||q?n?q?b+" no-repeat":b+" repeat-y":b+" repeat-x":b+" repeat")+(" scroll "+this.StyleDim(g,!0)+" "+this.StyleDim(p,!0));l.style.background=b;Object.isObject(h)&&ng_MergeVarReplace(l.style,h);String.isString(k)?l.id=k:String.isString(a.Id)&&(l.id=a.Id);String.isString(f)&&(l.className=f);String.isString(m)&&(l.innerHtml=m);return l};
bbbfly.renderer._setImage=function(a,b,c,d,e,g,f,h,m,k,l){if(a instanceof HTMLElement&&(b=this.ImageHTMLProps(b,c,d,e,g,f,h,m,k,l))){b.id&&(a.id=b.id);b.className&&(a.className=b.className);if(b.style)for(var n in b.style)if(b.style.hasOwnProperty(n)){c=b.style[n];String.isString(c)||(c="");n=n.split("-",2);switch(n.length){case 1:n=n[0];break;case 2:n=n[0]+String.capitalize(n[1]);break;default:continue}a.style[n]=c}a.innerHtml=b.innerHtml}};
bbbfly.renderer._imageHTML=function(a,b,c,d,e,g,f,h,m,k){a=this.ImageHTMLProps(a,b,c,d,e,g,f,h,m,k);if(!a)return"";c=b="";a.id&&(b+=' id="'+a.id+'"');a.className&&(b+=' class="'+a.className+'"');a.style&&(c=this.StyleToString(a.style));return'<div unselectable="on"'+b+c+">"+a.innerHtml+"</div>"};
bbbfly.renderer._frameHTML=function(a,b,c,d){var e="";Object.isObject(a)&&(e+=this.ImageHTML(a.L,0,a.LT.H,null,a.LB.H,b,c,null,this.ImageId(d,"_FL")),e+=this.ImageHTML(a.T,a.LT.W,0,a.RT.W,null,b,c,null,this.ImageId(d,"_FT")),e+=this.ImageHTML(a.R,null,a.RT.H,0,a.RB.H,b,c,null,this.ImageId(d,"_FR")),e+=this.ImageHTML(a.B,a.LB.W,null,a.RB.W,0,b,c,null,this.ImageId(d,"_FB")),e+=this.ImageHTML(a.LT,0,0,null,null,b,c,null,this.ImageId(d,"_FLT")),e+=this.ImageHTML(a.RT,null,0,0,null,b,c,null,this.ImageId(d,
"_FRT")),e+=this.ImageHTML(a.LB,0,null,null,0,b,c,null,this.ImageId(d,"_FLB")),e+=this.ImageHTML(a.RB,null,null,0,0,b,c,null,this.ImageId(d,"_FRB")),e+=this.ImageHTML(a.C,a.L.W,a.T.H,a.R.W,a.B.H,b,c,null,this.ImageId(d,"_FC")));return e};
bbbfly.renderer._dynamicFrameHTML=function(a,b,c,d,e){b=this.FrameHTML(a,b,c,e);if(String.isString(d)){var g=this.StyleDim(a.L.W),f=this.StyleDim(a.T.H),h=this.StyleDim(a.R.W),m=this.StyleDim(a.B.H),k="";g&&(k+="padding-left:"+g+";");f&&(k+="padding-top:"+f+";");h&&(k+="padding-right:"+h+";");m&&(k+="padding-bottom:"+m+";");k&&(k=' style="'+k+'"');String.isString(c)&&(k+=' class="'+c+'"');!String.isString(e)&&Object.isObject(a)&&(e=a.Id);String.isString(e)&&(k+=' id="'+a.Id+'_C"');b+='<div unselectable="on"'+
k+">"+d+"</div>"}return b};bbbfly.renderer._stackHTML=function(a,b,c,d){var e="";if(Object.isObject(a)&&Array.isArray(a.Imgs)){var g=a.Anchor?a.Anchor.L:0,f=a.Anchor?a.Anchor.T:0,h;for(h in a.Imgs){var m=a.Imgs[h],k={"z-index":(parseInt(h)+1).toString()},l=g,n=f;m.Anchor&&(l-=m.Anchor.L,n-=m.Anchor.T);e+=this.ImageHTML(m,l,n,null,null,b,c,k,null,this.ImageId(d,"_"+h))}}return e};
bbbfly.renderer._updateImageHTML=function(a,b,c){if(Object.isObject(a)&&!a._mock&&(String.isString(c)||(c=a.Id),String.isString(c)&&""!==c&&(c=document.getElementById(c)))){var d=b&&b.mouseover;b=d?a.oL:a.L;a=d?a.oT:a.T;b=this.StyleDim(b,!0);a=this.StyleDim(a,!0);c.style.backgroundPosition=b+" "+a}};
bbbfly.renderer._updateFrameHTML=function(a,b,c){Object.isObject(a)&&(this.UpdateImageHTML(a.L,b,this.ImageId(c,"_FL")),this.UpdateImageHTML(a.T,b,this.ImageId(c,"_FT")),this.UpdateImageHTML(a.R,b,this.ImageId(c,"_FR")),this.UpdateImageHTML(a.B,b,this.ImageId(c,"_FB")),this.UpdateImageHTML(a.LT,b,this.ImageId(c,"_FLT")),this.UpdateImageHTML(a.RT,b,this.ImageId(c,"_FRT")),this.UpdateImageHTML(a.LB,b,this.ImageId(c,"_FLB")),this.UpdateImageHTML(a.RB,b,this.ImageId(c,"_FRB")),this.UpdateImageHTML(a.C,
b,this.ImageId(c,"_FC")))};bbbfly.renderer._updateStackHTML=function(a,b,c){if(Object.isObject(a))for(var d in a.Imgs)this.UpdateImageHTML(a.Imgs[d],b,this.ImageId(c,"_"+d))};
bbbfly.Renderer={StatePropPattern:"[o]?[h]?[D]?[R]?[I]?[S|G]?",StatePropPattern_Any:"(.*)",StatePropPattern_Pos:"[L|T]",StateMap:{D:{DR:!0,DI:!0,DS:!0,DG:!0},R:{DR:!0,RI:!0,RS:!0,RG:!0},I:{DI:!0,RI:!0,IS:!0,IG:!0},S:{DS:!0,RS:!0,IS:!0},G:{DG:!0,RG:!0,IG:!0},DR:{DRI:!0,DRS:!0,DRG:!0},DI:{DRI:!0,DIS:!0,DIG:!0},DS:{DRS:!0,DIS:!0},DG:{DRG:!0,DIG:!0},RI:{DRI:!0,RIS:!0,RIG:!0},RS:{DRS:!0,RIS:!0},RG:{DRG:!0,RIG:!0},IS:{DIS:!0,RIS:!0},IG:{DIG:!0,RIG:!0},DRI:{DRIS:!0,DRIG:!0},DRS:{DRIS:!0},DRG:{DRIG:!0},DIS:{DRIS:!0},
DIG:{DRIG:!0},RIS:{DRIS:!0},RIG:{DRIG:!0}},ImageId:bbbfly.renderer._imageId,ImageHTMLProps:bbbfly.renderer._imageHTMLProps,StyleDim:bbbfly.renderer._styleDim,StyleToString:bbbfly.renderer._styleToString,GetStatePropName:bbbfly.renderer._getStatePropName,IsStateProp:bbbfly.renderer._isStateProp,GetStateValue:bbbfly.renderer._getStateValue,ContainsState:bbbfly.renderer._containsState,IsImagePosition:bbbfly.renderer._isImagePosition,UpdateHTMLState:bbbfly.renderer._updateHTMLState,RecalcValue:bbbfly.renderer._recalcValue,
RecalcImage:bbbfly.renderer._recalcImage,RecalcImageState:bbbfly.renderer._recalcImageState,RecalcFrame:bbbfly.renderer._recalcFrame,ImageProxy:bbbfly.renderer._imageProxy,FrameProxy:bbbfly.renderer._frameProxy,StackProxy:bbbfly.renderer._stackProxy,UpdateImageProxy:bbbfly.renderer._updateImageProxy,UpdateFrameProxy:bbbfly.renderer._updateFrameProxy,UpdateStackProxy:bbbfly.renderer._updateStackProxy,SetImage:bbbfly.renderer._setImage,ImageHTML:bbbfly.renderer._imageHTML,FrameHTML:bbbfly.renderer._frameHTML,
DynamicFrameHTML:bbbfly.renderer._dynamicFrameHTML,StackHTML:bbbfly.renderer._stackHTML,UpdateImageHTML:bbbfly.renderer._updateImageHTML,UpdateFrameHTML:bbbfly.renderer._updateFrameHTML,UpdateStackHTML:bbbfly.renderer._updateStackHTML};bbbfly.Renderer.stateattr={mouseover:"o",highlight:"h",disabled:"D",readonly:"R",invalid:"I",selected:"S",grayed:"G"};

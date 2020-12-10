/**
 * @file
 * @author Jan Nejedly [support@3b-fly.eu]
 * @copyright Jan Nejedly
 *
 * @inpackage locale
 */

/** @ignore */
var bbbfly = bbbfly || {};

/**
 * @namespace
 * @inpackage locale
 */
bbbfly.locale = {
    /** @ignore */
  _lang: null,
  /** @ignore */
  _locs: {}
};

/**
 * @function
 * @name SetLang
 * @memberOf bbbfly.locale
 * @description Set default local language
 *
 * @param {bbbfly.locale.Lang} lang
 * @return {boolean} - If language was set
 */
bbbfly.locale.SetLang = function(lang){
  if(!(lang instanceof bbbfly.locale.Lang)){
    return false;
  }

  this._lang = lang;
  return true;
};

/**
 * @function
 * @name GetLang
 * @memberOf bbbfly.locale
 * @description Get default local language
 *
 * @return {bbbfly.locale.Lang}
 */
bbbfly.locale.GetLang = function(){
  if(this._lang){return this._lang;}
  return new bbbfly.locale.Lang();
};

/**
 * @function
 * @name Register
 * @memberOf bbbfly.locale
 * @description Register local rules
 *
 * @param {bbbfly.locale.Rules} loc
 * @return {boolean} - If localization was registered
 */
bbbfly.locale.Register = function(loc){
  if(!Object.isObject(loc)){return false;}

  var lang = loc.Lang;
  var reg = loc.Region;

  if(!String.isString(lang)){lang = '-';}
  if(!String.isString(reg)){reg = '-';}

  if(!Object.isObject(this._locs[lang])){
    this._locs[lang] = {};
  }

  var defs = this._locs[lang];
  if(!Object.isObject(defs[reg])){
    defs[reg] = loc;
  }

  return true;
};

/**
 * @function
 * @name GetLocalRules
 * @memberOf bbbfly.locale
 * @description Get local rules
 *
 * @param {bbbfly.locale.Lang} [lang=undefined]
 * @return {bbbfly.locale.Rules|null}
 */
bbbfly.locale.GetLocalRules = function(lang){
  if(!(lang instanceof bbbfly.locale.Lang)){
    lang = this.GetLang();
  }

  var locs = (lang.Lang) ? this._locs[lang.Lang] : null;
  if(!locs){locs = this._locs['-'];}
  if(!locs){return null;}

  var loc = (lang.Region) ? locs[lang.Region] : null;
  if(!loc){loc = locs['-'];}
  return (loc) ? loc : null;
};

/**
 * @function
 * @name RemoveDiacritics
 * @memberOf bbbfly.locale
 * @description Remove local diacritics from string
 *
 * @param {void} text
 * @param {bbbfly.locale.Lang} [lang=undefined]
 * @return {void}
 */
bbbfly.locale.RemoveDiacritics = function(text,lang){
  if(String.isString(text)){

    var def = this.GetLocalRules(lang);
    if(def && Object.isObject(def.Diacritics)){

      var map = def.Diacritics;

      for(var key in map){
        if(map.hasOwnProperty(key)){
          text = text.replace(new RegExp(key,'g'),map[key]);
        }
      }
    }
  }
  return text;
};

/**
 * @function
 * @name RemoveDiacritics
 * @memberOf bbbfly.locale
 * @description Compare two values by local rules
 *
 * @param {void} valueA
 * @param {void} valueB
 * @param {bbbfly.locale.Lang} [lang=undefined]
 * @return {integer} - -1|0|1
 */
bbbfly.locale.Compare = function(valueA,valueB,lang){
  if(String.isString(valueA) && String.isString(valueA)){

    var def = this.GetLocalRules(lang);
    if(def && String.isString(def.CharOrder)){

      var map = def.CharOrder;
      var minLng = Math.min(valueA.length,valueB.length);

      for(var i=0;i<(minLng+1);i++){
        var charA = valueA.charAt(i);
        var charB = valueB.charAt(i);

        var emptyA = (charA === '');
        var emptyB = (charB === '');

        if(emptyA || emptyB){
          valueA = charA;
          valueB = charB;
          break;
        }

        var idxA = map.indexOf(charA);
        var idxB = map.indexOf(charB);

        if(idxA !== idxB){
          valueA = idxA;
          valueB = idxB;
          break;
        }
      }
    }
  }

  if(valueA < valueB){return -1;}
  else if(valueA > valueB){return 1;}
  return 0;
};

/**
 * @class
 * @description Language definition
 *
 * @inpackage locale
 *
 * @param {string} lang - 'en'|'en-UK'
 * @param {string} [region=undefined] - 'UK'
 *
 * @property {string} [Lang=null]
 * @property {string} [Region=null]
 */
bbbfly.locale.Lang = function(lang,region){
  this.Lang = null;
  this.Region = null;

  if(String.isString(lang)){
    lang = lang.split('-');

    if(lang[0]){this.Lang = lang[0];}
    if(lang[1]){this.Region = lang[1];}
  }

  if(String.isString(region)){
    this.Region = region;
  }
};

/**
 * @interface
 * @name Rules
 * @memberof bbbfly.locale
 * @description Locale rules definition
 *
 * @property {string} Lang - 'en'
 * @property {string} [Region=undefined] - 'UK'
 *
 * @property {string} CharOrder - 'abc...'
 * @property {object} Diacritics - { 'á': 'a', ... }
 */
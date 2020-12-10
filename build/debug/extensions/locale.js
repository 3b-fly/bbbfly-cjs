/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/


var bbbfly = bbbfly || {};
bbbfly.locale = {
  _lang: null,
  _locs: {}
};
bbbfly.locale.SetLang = function(lang){
  if(!(lang instanceof bbbfly.locale.Lang)){
    return false;
  }

  this._lang = lang;
  return true;
};
bbbfly.locale.GetLang = function(){
  if(this._lang){return this._lang;}
  return new bbbfly.locale.Lang();
};
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
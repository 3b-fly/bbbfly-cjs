/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/

var bbbfly=bbbfly||{};bbbfly.geojs={};bbbfly.geojs._geoJSONToWKT=function(a){if(Object.isObject(a)){if("FeatureCollection"===a.type){var b={type:"GeometryCollection",geometries:[]};if(Array.isArray(a.features))for(var d in a.features){var e=a.features[d];e&&e.geometry&&b.geometries.push(e.geometry)}return Terraformer.WKT.convert(b)}return Terraformer.WKT.convert(a)}return null};
bbbfly.geojs._wktToGeoJSON=function(a,b){if("string"===typeof a){var d=bbbfly.GeoJS.CollectionPattern.exec(a);if(d){a={type:"FeatureCollection",features:[]};if(d=d[1]){var e=0;var c="";for(var g in d){var f=d[g];switch(f){case "(":e+=1;break;case ")":--e;break;case ",":if(0===e){(c=bbbfly.geojs._wktToGeoJSONFeature(c,b))&&a.features.push(c);c="";continue}}c+=f}(c=bbbfly.geojs._wktToGeoJSONFeature(c,b))&&a.features.push(c)}return a}return bbbfly.geojs._wktToGeoJSONGeometry(a,b)}return null};
bbbfly.geojs._wktToGeoJSONGeometry=function(a,b){if("string"===typeof a&&a){if(a=Terraformer.WKT.parse(a))a=a.toJSON(),b||delete a.bbox;return a}return null};bbbfly.geojs._wktToGeoJSONFeature=function(a,b){return(a=bbbfly.geojs._wktToGeoJSONGeometry(a,b))?{type:"Feature",properties:{},geometry:a}:null};bbbfly.GeoJS={GeoJSONToWKT:bbbfly.geojs._geoJSONToWKT,WKTToGeoJSON:bbbfly.geojs._wktToGeoJSON};bbbfly.GeoJS.CollectionPattern=/^GEOMETRYCOLLECTIONs?\((.*)\)$/;

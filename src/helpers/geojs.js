/**
 * @file
 * @author Jan Nejedly [support@3b-fly.eu]
 * @copyright Jan Nejedly
 *
 * @inpackage geojs
 */

/** @ignore */
var bbbfly = bbbfly || {};
/** @ignore */
bbbfly.geojs = {};

/** @ignore */
bbbfly.geojs._geoJSONToWKT = function(json){
  if(Object.isObject(json)){
    if((json.type === 'FeatureCollection')){

      var collection = {
        type: 'GeometryCollection',
        geometries: []
      };

      if(Array.isArray(json.features)){
        for(var i in json.features){
          var feature = json.features[i];
          if(feature && feature.geometry){
            collection.geometries.push(feature.geometry);
          }
        }
      }

      return Terraformer.WKT.convert(collection);
    }
    return Terraformer.WKT.convert(json);
  }
  return null;
};

/** @ignore */
bbbfly.geojs._wktToGeoJSON = function(wkt,bbox){
  if(String.isString(wkt)){
    var parts = bbbfly.GeoJS.CollectionPattern.exec(wkt);
    if(parts){

      var collection = {
        type: 'FeatureCollection',
        features: []
      };

      var geoms = parts[1];
      if(geoms){

        var depth = 0;
        var geom = '';

        for(var i in geoms){
          var char = geoms[i];

          switch(char){
            case '(': depth += 1; break;
            case ')': depth -= 1; break;
            case ',':
              if(depth === 0){
                var feature = bbbfly.geojs._wktToGeoJSONFeature(geom,bbox);
                if(feature){collection.features.push(feature);}
                geom = '';
                continue;
              }
            break;
          }

           geom += char;
        }

        var feature = bbbfly.geojs._wktToGeoJSONFeature(geom,bbox);
        if(feature){collection.features.push(feature);}
      }

      return collection;
    }
    return bbbfly.geojs._wktToGeoJSONGeometry(wkt,bbox);
  }
  return null;
};

/** @ignore */
bbbfly.geojs._wktToGeoJSONGeometry = function(wkt,bbox){
  if(String.isString(wkt) && (wkt !== '')){
    var geometry = Terraformer.WKT.parse(wkt);
    if(geometry){
      geometry = geometry.toJSON();
      if(!bbox){delete geometry.bbox;}
    }
    return geometry;
  }
  return null;
};

/** @ignore */
bbbfly.geojs._wktToGeoJSONFeature = function(wkt,bbox){
  var geometry = bbbfly.geojs._wktToGeoJSONGeometry(wkt,bbox);
  if(geometry){
    return {
      type: 'Feature',
      properties: {},
      geometry: geometry
    };
  }
  return null;
};

/**
 * @class
 * @hideconstructor
 *
 * @inpackage geojs
 */
bbbfly.GeoJS = {
  /**
   * @function
   * @name GeoJSONToWKT
   * @memberof bbbfly.GeoJS#
   *
   * @param {GeoJSON} json
   * @return {WKT|null}
   */
  GeoJSONToWKT: bbbfly.geojs._geoJSONToWKT,
  /**
   * @function
   * @name WKTToGeoJSON
   * @memberof bbbfly.GeoJS#
   *
   * @param {WKT} wkt
   * @param {boolean} bbox - If bounding boxes should be added
   * @return {GeoJSON|null}
   */
  WKTToGeoJSON: bbbfly.geojs._wktToGeoJSON
};

/**
 * @typedef {RegExp}
 * @description
 *   {@link WKT} GeometryCollection pattern
 */
bbbfly.GeoJS.CollectionPattern = new RegExp(
  '^GEOMETRYCOLLECTION\s?\\((.*)\\)$'
);
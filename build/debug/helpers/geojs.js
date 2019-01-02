/*!
 * @author Jan Nejedly support@3b-fly.eu
 * @copyright Jan Nejedly
 * @version 2.0.0
 * @license see license in 'LICENSE' file
*/


var bbbfly = bbbfly || {};
bbbfly.geojs = {};
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
bbbfly.geojs._wktToGeoJSON = function(wkt,bbox){
  if(typeof wkt === 'string'){
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
bbbfly.geojs._wktToGeoJSONGeometry = function(wkt,bbox){
  if((typeof wkt === 'string') && (wkt)){
    var geometry = Terraformer.WKT.parse(wkt);
    if(geometry){
      geometry = geometry.toJSON();
      if(!bbox){delete geometry.bbox;}
    }
    return geometry;
  }
  return null;
};
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
bbbfly.GeoJS = {
  GeoJSONToWKT: bbbfly.geojs._geoJSONToWKT,
  WKTToGeoJSON: bbbfly.geojs._wktToGeoJSON
};
bbbfly.GeoJS.CollectionPattern = new RegExp(
  '^GEOMETRYCOLLECTION\s?\\((.*)\\)$'
);
Wkt.Wkt.prototype.isRectangle=false;Wkt.coordsFromLatLngs=function(arr){var i,j,coords;coords=[];for(i=0;i<arr.length;i+=1)if(Wkt.isArray(arr[i]))coords.push(this.coordsFromLatLngs(arr[i]));else coords.push({x:arr[i].lng,y:arr[i].lat});return coords};
Wkt.Wkt.prototype.construct={point:function(config,component){var coord=component||this.components;if(coord instanceof Array)coord=coord[0];return L.marker(this.coordsToLatLng(coord),config)},multipoint:function(config){var i,layers=[],coords=this.components,latlng;for(i=0;i<coords.length;i+=1)layers.push(this.construct.point.call(this,config,coords[i]));return L.featureGroup(layers,config)},linestring:function(config,component){var coords=component||this.components,latlngs=this.coordsToLatLngs(coords);
return L.polyline(latlngs,config)},multilinestring:function(config){var coords=this.components,latlngs=this.coordsToLatLngs(coords,1);return L.multiPolyline(latlngs,config)},polygon:function(config){var coords=this.components,latlngs=this.coordsToLatLngs(coords,1);return L.polygon(latlngs,config)},multipolygon:function(config){var coords=this.components,latlngs=this.coordsToLatLngs(coords,2);return L.multiPolygon(latlngs,config)}};
L.Util.extend(Wkt.Wkt.prototype,{coordsToLatLngs:L.GeoJSON.coordsToLatLngs,coordsToLatLng:function(coords,reverse){var lat=reverse?coords.x:coords.y,lng=reverse?coords.y:coords.x;return L.latLng(lat,lng,true)}});
Wkt.Wkt.prototype.deconstruct=function(obj){var i,j,verts,rings,tmp;if(obj.setIcon&&typeof obj.setIcon==="function")return{type:"point",components:[{x:obj.getLatLng().lng,y:obj.getLatLng().lat}]};if(obj.spliceLatLngs&&typeof obj.spliceLatLngs==="function"){verts=[];tmp=obj.getLatLngs();if(!tmp[0].equals(tmp[tmp.length-1])){for(i=0;i<tmp.length;i+=1)verts.push({x:tmp[i].lng,y:tmp[i].lat});return{type:"linestring",components:verts}}rings=[];for(i=0;i<obj._latlngs.length;i+=1)verts.push({x:tmp[i].lng,
y:tmp[i].lat});verts.push({x:tmp[0].lng,y:tmp[0].lat});rings.push(verts);if(obj._holes.length>0)rings.push(Wkt.coordsFromLatLngs(obj._holes)[0]);return{type:"polygon",components:rings}}if(obj.spliceLatLngs&&typeof obj.spliceLatLngs==="function"&&obj.setBounds&&typeof obj.setBounds==="function"){tmp=obj.getBounds();return{type:"polygon",isRectangle:true,components:[[{x:tmp.getSouthWest().lng,y:tmp.getNorthEast().lat},{x:tmp.getNorthEast().lng,y:tmp.getNorthEast().lat},{x:tmp.getNorthEast().lng,y:tmp.getSouthWest().lat},
{x:tmp.getSouthWest().lng,y:tmp.getSouthWest().lat},{x:tmp.getSouthWest().lng,y:tmp.getNorthEast().lat}]]}}if(obj.getBounds&&obj.getRadius)console.log("Deconstruction of L.Circle objects is not yet supported");else console.log("The passed object does not have any recognizable properties.")};

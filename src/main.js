import 'leaflet/dist/leaflet.css';

import NgwMap from '@nextgis/ngw-map';
import MapAdapter from '@nextgis/leaflet-map-adapter';

import config from '../config.json';
import { ImagePanelControl } from './components/ImagePanelControl/ImagePanelControl.js';
import { LegendPanelControl } from './components/LegendPanelControl/LegendPanelControl.js';

// install custom controls
MapAdapter.controlAdapters.LOGO = ImagePanelControl;
MapAdapter.controlAdapters.LEGEND = LegendPanelControl;

const ngwMap = new NgwMap(new MapAdapter(), {
  target: 'map',
  ...config
});

ngwMap.emitter.on('ngw:select', function (resp) {
  let feature;

  for (let l in resp) {
    if (resp.hasOwnProperty(l)) {
      if (l !== 'featureCount' && !resp[l].error) {
        const layerFeatures = resp[l].features;
        const f = layerFeatures[0];
        if (f) {
          // select only one feature from first layer
          feature = {
            fid: f.id,
            id: l
          };
        }
      }
    }
  }
  info(feature);
});

let getFeaturePromise;

const clean = function () {
  if (getFeaturePromise) {
    getFeaturePromise.cancel();
  }
  ngwMap.removeLayer('highlight');
}

const info = function (item) {
  clean();
  if (item) {
    getFeaturePromise = ngwMap.connector.get('feature_layer.feature.item', null, {
      id: item.id,
      fid: item.fid
    }).then((selected) => {
      const geojson = NgwMap.wktToGeoJson(selected.geom);
      ngwMap.addLayer('GEOJSON', {
        id: 'highlight',
        data: geojson,
        visibility: true,
        paint: { color: 'red', stroke: true, fillOpacity: '0.5' }
      });
      console.log(selected);
    });
  }
}
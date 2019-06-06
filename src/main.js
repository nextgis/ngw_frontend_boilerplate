import 'leaflet/dist/leaflet.css';
import './main.css';

import NgwMap from '@nextgis/ngw-map';
import MapAdapter from '@nextgis/leaflet-map-adapter';

import config from '../config.json';
import { ImagePanelControl } from './components/ImagePanelControl/ImagePanelControl';
import { PanelControl } from './components/PanelControl/PanelControl';
import { CollapsiblePanelControl } from './components/CollapsiblePanelControl/CollapsiblePanelControl';

// install custom controls
NgwMap.controls.LOGO = (webMap, options) => {
  return webMap.createControl(new ImagePanelControl(options), { margin: true })
};
NgwMap.controls.PANEL = (webMap, options) => {
  return webMap.createControl(new PanelControl(options), { bar: true })
};
NgwMap.controls.COLLAPSIBLE_PANEL = (webMap, options) => {
  return webMap.createControl(new CollapsiblePanelControl(webMap, options), { bar: true })
};

NgwMap.controls.INFO = (webMap, options) => {

  const attribution = webMap.getAttributions({ onlyVisible: false });
  if (options.html) {
    attribution.push(options.html);
  }
  attribution.push('<a href="http://nextgis.ru" target="_blank">©NextGIS</a>');
  let html = '';
  attribution.forEach((x) => {
    html += `<span>${x}</span>`;
  });
  options.html = html;
  options.className = 'ngw-control-attribution';
  options = {
    btnHtml: '<i class="material-icons">info</i>',
    ...options
  }
  return webMap.createControl(new CollapsiblePanelControl(webMap, options), { bar: true })

};


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
        paint: config.selectedPaint || { color: 'red', stroke: true, fillOpacity: '0.5' }
      });
      console.log(selected);
    });
  }
}
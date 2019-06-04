import 'leaflet/dist/leaflet.css';

import NgwMap from '@nextgis/ngw-map';
import LeafletMapAdapter from '@nextgis/leaflet-map-adapter';

import config from '../config.json';

const ngwMap = new NgwMap(new LeafletMapAdapter(), {
  target: 'map',
  ...config
});

if (config.ngwResources) {
  config.ngwResources.forEach((x) => {
    ngwMap.addNgwLayer(x);
  })
}
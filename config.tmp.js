module.exports = {
  "#": "this indicates a commented parameter, remove the first # character to activate the parameter",
  "baseUrl": "https://demo.nextgis.com",
  "resources": [
      {
        "resourceId": 464, 
        "id": "webmap", 
        "fit": true, 
        "selectable": true
      }
  ],

  "qmsId": [487, "basemap"],
  "#auth": {"login": "", "password": ""},
  "#center": [53, 64],
  "#zoom": 16,
  "maxZoom": 19,
  "minZoom": 16,
  "controls": ["ZOOM", "ATTRIBUTION", "SCALE", "LOGO", "INFO", "legend"],
  "controlsOptions": {
    "ZOOM": {
      "position": "top-left"
    },
    "SCALE": {
      "position": "bottom-left",
      "metric": true,
      "imperial": false
    },
    "LOGO": {
      "position": "bottom-right",
      "width": "64px",
      "height": "64px",
      "href": "http://code.nextgis.com/readme",
      "src": "https://raw.githubusercontent.com/nextgis/nextgisweb_frontend/master/packages/demo/src/images/logo_96x96.png"
    },
    "INFO": {
      "position": "bottom-right",
       "width": "200px",
       "height": "36px",
       "#btnHtml": "",
       "html": "<div> information </div>"
    },
    "legend": {
      "control": "COLLAPSIBLE_PANEL",
      "position": "bottom-right",
      "btnHtml": "<i class='material-icons'>style</i>",
      "html": "<div>Legend block is empty</div>"
    }
  },

  "selectedPaint": {"color": "purple", "stroke": true, "fillOpacity": 0.5}
}

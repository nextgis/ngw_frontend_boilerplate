# NextGIS Frontend Boilerplate

WebGIS application builder based on NextGIS frontend libraries

## Developer dependencies

- [Node.js](https://nodejs.org/en/)
- NextGIS Frontend:
  - [Documentation/Api](http://code.nextgis.com)
  - [GitHub](https://github.com/nextgis/nextgisweb_frontend)

## Preparation

1. If you don't have it yet - install for [Ubuntu](https://github.com/nodesource/distributions/blob/master/README.md#installation-instructions)

## Usage

```bash
git clone https://github.com/nextgis/ngw_frontend_boilerplate
cd ./ngw_frontend_boilerplate
# create or copy config.json
cp ./config.tmp.json ./config.json
#  then edit
vim ./config.json
npm install
# for development run
npm start
# and open http://localhost:8080
# or
npm start -- --https
# and open https://localhost:8080
# for production
npm run prod
# to open dist/index.html in browser as static app run
npm run static
```

## Serve static

Put your static files (png, jpg, ico etc.) in the `src/statics` directory then call to then turn through html, css or some specific config properties like `favicon`

## Example

![example-image](http://m-d.me/img/ss/20190604_163715.png)

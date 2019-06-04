# NextGIS Frontend Boilerplate

WebGIS application builder based on NextGIS frontend libraries

NextGIS Frontend: 
 - [Documentation/Api](http://code.nextgis.com)
 - [GitHub](https://github.com/nextgis/nextgisweb_frontend)

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
# or 
npm start -- --https
# for production
npm run prod
```
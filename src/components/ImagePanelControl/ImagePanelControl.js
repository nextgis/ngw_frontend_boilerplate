import L from 'leaflet';

export class ImagePanelControl extends L.Control {

  onAdd() {
    this._container = this._createContainer();
    return this._container;
  }

  _createContainer() {
    let element ;
    if (this.options.href) {
      element = document.createElement('a')
      element.href = this.options.href;
      element.setAttribute('target', '_blank');
      element.style.cursor = 'pointer';
    } else {
      element = document.createElement('div')
    }

    const img = document.createElement('img');
    img.style.width = this.options.width;
    img.style.height = this.options.height;
    img.src = this.options.src
    element.appendChild(img);
    return element;
  }
}
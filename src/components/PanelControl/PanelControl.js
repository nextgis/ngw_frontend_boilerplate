import './PanelControl.css';

export class PanelControl {

  constructor(options) {
    this.options = options;
  }

  onAdd() {
    this._container = this._createContainer();
    return this._container;
  }

  _createContainer() {
    const element = document.createElement('div');
    element.className = 'ngw-control-legend';
    element.style.width = this.options.width;
    element.style.height = this.options.height;


    const img = document.createElement('img');
    img.src = this.options.src
    element.appendChild(img);
    return element;
  }
}
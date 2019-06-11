import './CollapsiblePanelControl.css';

import L from 'leaflet';

const OPTIONS = {
  collapsed: true,
  autoZIndex: true,
  toggleOnClick: true,
}

export class CollapsiblePanelControl {

  constructor(webMap, options) {
    this.webMap = webMap;
    this.options = { ...OPTIONS, ...options, };

    this._lastZIndex = 0;
    this._handlingClick = false;
  }

  onAdd() {
    this._map = this.webMap.mapAdapter.map;

    this._initLayout();
    this._update();

    this._expandIfNotCollapsed();

    return this._container;
  }

  onRemove() {
    // ignore
  }

  toggle() {
    if (this.status) {
      this.collapse();
    } else {
      this.expand();
    }
  }

  expand() {
    this._layersLink.style.display = 'none';
    this._container.classList.add('ngw-control-panel-expanded');
    this._section.style.height = null;
    var acceptableHeight = this._map.getSize().y - (this._container.offsetTop + 50);
    if (acceptableHeight < this._section.clientHeight) {
      this._section.classList.add('ngw-control-panel-scrollbar');
      this._section.style.height = acceptableHeight + 'px';
    } else {
      this._section.classList.remove('ngw-control-panel-scrollbar');
    }
    const { width, height } = this.options;
    if (width) {
      this._container.style.width = width;
    }
    if (height) {
      this._container.style.height = height;
      this._container.style.lineHeight = height;
    }
    this.status = true;
    return this;
  }

  collapse() {
    this._container.classList.remove('ngw-control-panel-expanded');
    this._layersLink.style.display = 'inherit';
    this._container.style.width = 'auto';
    this._container.style.height = 'auto';

    this.status = false;
    return this;
  }

  _initLayout() {
    const className = 'ngw-control-panel';
    const container = this._container = document.createElement('div');
    container.className = className + (this.options.className ? ' ' + this.options.className : '');
    const collapsed = this.options.collapsed;

    // makes this work on IE touch devices by stopping it from firing a mouseout event when the touch is released
    container.setAttribute('aria-haspopup', true);

    L.DomEvent.disableClickPropagation(container);
    L.DomEvent.disableScrollPropagation(container);

    const section = this._section = document.createElement('section');
    section.className = className + '-list';

    if (collapsed) {
      this._map.on('click', this.collapse, this);

      if (!L.Browser.android && !this.options.toggleOnClick) {
        L.DomEvent.on(container, {
          mouseenter: this.expand,
          mouseleave: this.collapse
        }, this);
      } else {
        L.DomEvent.on(container, {
          click: this.toggle,
        }, this);
        container.style.cursor = 'pointer';
      }
    }

    const link = this._layersLink = L.DomUtil.create('a', className + '-toggle', container);
    link.href = '#';

    link.title = this.options.btnTitle || 'Collapsible panel';

    this._appendHtml(link, this.options.btnHtml);

    if (L.Browser.touch || this.options.toggleOnClick) {
      L.DomEvent.on(link, 'click', L.DomEvent.stop);
      L.DomEvent.on(link, 'click', this.expand, this);
    } else {
      L.DomEvent.on(link, 'focus', this.expand, this);
    }

    if (!collapsed) {
      this.expand();
    }

    this._content = L.DomUtil.create('div', className + '-base', section);

    container.appendChild(section);
  }


  _update(obj) {
    if (!this._container) { return this; }

    L.DomUtil.empty(this._content);

    const html = (obj && obj.html) || this.options.html;

    this._appendHtml(this._content, html);

    return this;
  }

  _appendHtml(parent, child) {
    if (typeof child === 'string') {
      parent.innerHTML = child;
    } else if (child instanceof HTMLElement) {
      parent.appendChild(child);
    }
  }


  _expandIfNotCollapsed() {
    if (this._map && !this.options.collapsed) {
      this.expand();
    }
    return this;
  }

}
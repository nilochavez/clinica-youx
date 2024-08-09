import * as L from 'leaflet';

export class InfoControl extends L.Control {
  private div: HTMLElement;

  constructor() {
    super({ position: 'topright' });
    this.div = L.DomUtil.create('div', 'info');
  }

  override onAdd(map: L.Map): HTMLElement {
    this.div.innerHTML = '<h4>Pessoas Por Estado</h4>';
    return this.div;
  }

  /*update(props?: any): void {
    this.div.innerHTML = '<h4>US Population Density</h4>' +
      (props ?
        `<b>${props.sigla}</b><br />${props.count} pessoas`
        : 'Hover over a state');
  }*/
}

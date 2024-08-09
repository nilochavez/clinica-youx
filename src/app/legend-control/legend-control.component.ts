import * as L from 'leaflet';

export class LegendControl extends L.Control {
  private groupedData: { [key: string]: number };

  constructor(groupedData: { [key: string]: number }) {
    super({ position: 'bottomright' });
    this.groupedData = groupedData;
  }

  override onAdd(_map: L.Map): HTMLElement {
    const div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = '<h4>Pessoas</h4>';
    
    // Ordenar estados para garantir que eles apareçam em ordem alfabética
    const sortedKeys = Object.keys(this.groupedData).sort();

    sortedKeys.forEach(key => {
      div.innerHTML +=
        `<i style="background:${this.getColorForUf(this.groupedData[key])}"></i> ` +
        `${key}: ${this.groupedData[key]}<br>`;
    });

    return div;
  }

  private getColorForUf(count: number): string {
    return count > 40 ? '#800026' :
           count > 30  ? '#BD0026' :
           count > 20  ? '#E31A1C' :
           count > 10  ? '#FC4E2A' :
           count > 7   ? '#FD8D3C' :
           count > 5   ? '#FEB24C' :
           count > 2   ? '#FED976' :
                          '#07a62c';
  }
}

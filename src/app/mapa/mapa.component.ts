import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GeoJsonObject } from 'geojson';
import { InfoControl } from '../info-control/info-control.component';
import { LegendControl } from '../legend-control/legend-control.component';

interface Paciente {
  uf: string;
}

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css'],
  imports: [HttpClientModule],
  standalone: true
})
export class MapaComponent implements OnInit {
  private map!: L.Map;
  private groupedData: { [key: string]: number } = {};
  private infoControl!: InfoControl;
  private legendControl!: LegendControl;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.initMap();
    this.loadPatientData();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [-15.7801, -47.9292],
      zoom: 4,
    });

    L.tileLayer.wms('http://sistemas.gt4w.com.br/geoserver/processo_seletivo/wms', {
      layers: 'processo_seletivo:ufs_brasil',
      format: 'image/png',
      transparent: true,
      attribution: "Dados geográficos © Servidor WMS"
    }).addTo(this.map);
  }

  private loadPatientData(): void {
    this.http.get<any>('https://clinica-youx-backend.onrender.com/pacientes').subscribe(data => {
      this.groupedData = this.groupDataByUF(data.content);
      this.colorizeMap();
    });
  }

  private groupDataByUF(pacientes: Paciente[]): any {
    return pacientes.reduce((acc: any, paciente: Paciente) => {
      acc[paciente.uf] = (acc[paciente.uf] || 0) + 1;
      return acc;
    }, {});
  }

  private addLegendControl(): void {
    this.legendControl = new LegendControl(this.groupedData);
    this.legendControl.addTo(this.map);
  }

  private async colorizeMap(): Promise<void> {
    if (!this.map) return;

    const geoJsonData = await this.getGeoJSONForUFs();

    L.geoJSON(geoJsonData, {
      style: (feature) => {
        if (feature && feature.properties && feature.properties.sigla) {
          const uf = feature.properties.sigla as string;
          const count = this.groupedData[uf] || 0;
          return {
            color: this.getColorForUf(count),
            weight: 2,
            opacity: 1,
            fillOpacity: 0.7
          };
        }
        return { color: '#FFFFFF', weight: 2, opacity: 1, fillOpacity: 0.7 };
      },
      onEachFeature: this.onEachFeature.bind(this)
    }).addTo(this.map);

    this.addLegendControl();
    this.infoControl = new InfoControl();
    this.infoControl.addTo(this.map);

    
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

  private getGeoJSONForUFs(): Promise<GeoJsonObject> {
    const url = 'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson';
    return fetch(url)
      .then(response => response.json())
      .catch(error => {
        console.error('Erro ao carregar o GeoJSON:', error);
        return { type: 'FeatureCollection', features: [] } as GeoJsonObject;
      });
  }

  private onEachFeature(feature: GeoJSON.Feature, layer: L.Layer): void {
    if (feature.properties && feature.properties['sigla']) {
      const uf = feature.properties['sigla'] as string;
      const count = this.groupedData[uf] || 0;
      
      // Adiciona o rótulo ao estado
      layer.bindPopup(`${uf}: ${count} pessoas`);
      
      // Adiciona o rótulo diretamente no mapa
      const label = L.divIcon({
        className: 'label',
        html: `<div>${uf}<br>${count}</div>`,
        iconSize: [100, 40],
      });
      
      // Centraliza o rótulo no centro do polígono
      const center = (layer as L.Polygon).getBounds().getCenter();
      L.marker(center, { icon: label }).addTo(this.map);
    }
  }
}

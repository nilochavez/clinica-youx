import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private apiUrl = 'https://servicodados.ibge.gov.br/api/v2/localidades/estados';

  constructor(private http: HttpClient ) { }

  getStates(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}

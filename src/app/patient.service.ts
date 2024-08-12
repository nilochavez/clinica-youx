import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private apiUrl = 'http://clinica-youx-backend.onrender.com/pacientes';

  constructor(private http: HttpClient) { }

  createPatient(patient: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, patient);
  }
}

import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as L from 'leaflet';
import { MapaComponent } from '../../mapa/mapa.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';

@Component({
  selector: 'app-patient-list',
  standalone: true,
  imports: [MapaComponent, CommonModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent  {
  private map: L.Map | undefined;

  canManagePatients: boolean = false; 
  canManageNurses: boolean =false;

  patientData: any = {}; 
  nurseData: any = {};
  patientId: any = {};
  token: any = {};
  patients: any[] = [];
  isAdmin: boolean = false;
  userRole: any = {};
  private apiUrl = 'http://localhost:8080/pacientes';
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.isAdmin = sessionStorage.getItem('userRole') === 'ADMIN';
    this.fetchPatients(); 
    this.token = sessionStorage.getItem('angular17token');
    this.userRole = sessionStorage.getItem('userRole');
    
    if (this.userRole === 'ADMIN') {
      this.canManagePatients = true;
      this.canManageNurses = true;
  } else if (this.userRole === 'USER') {
      this.canManagePatients = true;
      this.canManageNurses = false; 
  } else {
      this.canManagePatients = false;
      this.canManageNurses = false;
      
  }
}
  

fetchPatients(): void {
  this.http.get('http://localhost:8080/pacientes').subscribe((response: any) => {
    this.patients = response.content;
  });
}


addPatient(): void {
  this.router.navigate(['/patients/create']);
}

editPatient(): void {
 
}


addNurse(): void {
  
  console.log('Adicionar enfermeiro:', this.nurseData);
}


//ajustar metodo delete!
deletePatient(id: number): Observable<void> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`
  });

  console.log(`Deleting patient with ID: ${id}`); 

  return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
    catchError(error => {
      console.error('Error deleting patient', error);
      return of<void>();
    })
  );
}



 
}

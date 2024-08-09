import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component'; 
import { PatientListComponent } from './patients/patient-list/patient-list.component'; 
import { PatientCreateComponent } from './patients/patient-create/patient-create.component';
import { authGuard } from './auth.guard'; 

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'patients', component: PatientListComponent, canActivate: [authGuard], data: { role: 'ALL' } },
  { path: 'patients/create', component: PatientCreateComponent, canActivate: [authGuard], data: { role: 'ALL' } },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

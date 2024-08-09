import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  
  isAuthenticated(): Observable<boolean> {
    const token = sessionStorage.getItem('angular17token');
    
    if(!token){
    return of(false); 
  }

    return of(true);
}

getUserRole(): Observable<string> {
 
  const role = sessionStorage.getItem('userRole'); // 'USER' ou 'ADMIN'
  return of(role || 'USER'); 
}

 
  getToken(): string | null {
    return localStorage.getItem('angular17token');
  }


  logout(): void {
    sessionStorage.removeItem('angular17token');
  }
}

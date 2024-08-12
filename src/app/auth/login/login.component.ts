import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  

  loginObj: Login;

  constructor(private http: HttpClient,private router: Router) {
    this.loginObj = new Login();
  }

  onLogin() {
    this.http.post('https://clinica-youx-backend.onrender.com/login', this.loginObj).subscribe(
      (res: any) => {
        if (res.token) {
          alert("Login Success");
          sessionStorage.setItem('angular17token', res.token); 
          sessionStorage.setItem('userRole', res.cargo);
          this.router.navigateByUrl('/patients'); 
        } else {
          alert("Login failed: No token received.");
        }
      },
      (error) => {
        if (error.status === 403) {
          alert("Access Denied: Invalid credentials or unauthorized access.");
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
      }
    );
  }
  
}

export class Login { 
    login: string;
    senha: string;
    constructor() {
      this.login = '';
      this.senha = '';
    } 
}